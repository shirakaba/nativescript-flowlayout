import { Inline } from "./inline";
import { NodeImpl } from "./node";
import { TextImpl } from "./text";
import { isInline, tree } from "./tree";

const recycledEmptyObject = Object.freeze({});

/**
 * Allowed children: Inline.
 */
export class Block extends NodeImpl {
  static {
    this.prototype.nodeName = "BLOCK";
    this.prototype.nodeType = 1;
  }

  get nodeValue(): string | null {
    throw new Error("Method not implemented.");
  }
  nodeName!: string;
  nodeType!: number;

  // One textStorage can hold multiple layoutManagers.
  //
  // Allows multiple visual representations of the same text that can be placed
  // and sized independently. Any edit in one such representation will reflect
  // in the others.
  //
  // NSTextStorage extends NSAttributedString, so you can call
  // initWithStringAttributes. However, the attributes specified apply only to
  // that initial string, and do not cascade to subsequently appended
  // attributed strings.
  private readonly textStorage = NSTextStorage.new();

  // One layoutManager can hold multiple textContainers.
  //
  // Allows one representation of the text to be spread across multiple views,
  // e.g. to allow paginated layout (with each page containing a separate view).
  private readonly layoutManager = NSLayoutManager.new();

  readonly textContainer = NSTextContainer.new();

  get textContent() {
    let data = "";
    for (const child of this.childNodes) {
      data += child.textContent;
    }
    return data;
  }

  constructor() {
    super();
    this.textStorage.addLayoutManager(this.layoutManager);
    this.layoutManager.addTextContainer(this.textContainer);
  }

  attributes?: Record<string, unknown>;
  setAttribute(key: string, value: unknown) {
    if (!this.attributes) {
      this.attributes = {};
    }
    this.attributes[key] = value;

    // Iterate over all inlines and cascade styles down to descendants (allowing
    // clobbering by more specific styles).
    //
    // Alternatively, we could do this without referring to the JS model at all
    // - we could just iterate through all the attributed string children
    // directly, setting the attribute only if it's missing.
    for (const inline of this.childNodes) {
      if (!isInline(inline)) {
        throw new Error(
          "Expected all child nodes of Block to be of type Inline.",
        );
      }
      inline.setAttribute(key, value);
    }
  }

  deleteAttribute(key: string) {
    if (!this.attributes || !(key in this.attributes)) {
      return;
    }
    delete this.attributes[key];

    for (const inline of this.childNodes) {
      if (!isInline(inline)) {
        throw new Error(
          "Expected all child nodes of Block to be of type Inline.",
        );
      }
      inline.deleteAttribute(key);
    }
  }

  /**
   * Walks up the DOM ancestors (including self) to resolve the attributes to
   * apply.
   */
  private static resolveAttributes(inline: Inline | Block) {
    let attributes: Record<string, unknown> | undefined;

    for (const ancestor of tree.ancestorsIterator(inline) as Generator<
      Inline | Block
    >) {
      // console.log(
      //   `[resolveAttributes] climbAncestors(<${inline.nodeName.toLowerCase()}>${inline.textContent}</${inline.nodeName.toLowerCase()}>): <${ancestor.nodeName.toLowerCase()}>${ancestor.textContent}</${ancestor.nodeName.toLowerCase()}>`,
      // );
      if (!ancestor.attributes) {
        continue;
      }

      for (const key in ancestor.attributes) {
        // A child already has the attribute, so disregard the parent's value.
        if (attributes?.[key]) {
          continue;
        }

        if (!attributes) {
          attributes = {};
        }
        attributes[key] = ancestor.attributes[key];
      }
    }

    return attributes;
  }

  appendChild<T extends NodeImpl>(node: T): T {
    if (!isInline(node)) {
      throw new Error("Block can only append child nodes of type Inline.");
    }

    // Need to set this from the start, as the TextNode grandchildren will be
    // climbing up to here during updateAttributes
    const appended = super.appendChild(node);

    for (const childNode of node.childNodes) {
      if (childNode instanceof TextImpl) {
        const attributes = Block.resolveAttributes(node);
        console.log(
          `[Block] Appending inline "${childNode.data}"`,
          attributes ?? "<no attributes>",
        );
        const placeholderString = NSAttributedString.alloc();

        const attributedString = attributes
          ? placeholderString.initWithStringAttributes(
              childNode.data,
              attributes as unknown as NSDictionary<string, unknown>,
            )
          : placeholderString.initWithString(childNode.data);

        this.textStorage.appendAttributedString(attributedString);
        continue;
      }

      this.appendChild(childNode);
    }

    return appended;
  }

  /**
   * Calculates the startOffset of the given descendant by walking in tree order
   * counting all text leading up to it.
   *
   * @param descendant The descendant to count the text offset up until.
   * @param traverseUntilAncestor Optional. Specifies the ancestor to stop
   *   traversal at. Siblings preceding the ancestor, and ancestors of that
   *   ancestor, will not contribute towards the startOffset. In other words,
   *   the startOffset begins from this node.
   *
   *   Haven't yet decided how to handle nested blocks (is it possible to nest
   *   NSTextStorage, or do we have to merge them, or is it impossible to
   *   support altogether?). When the time comes, the consumer will have to
   *   work out whether to stop traversal at the closest Block or walk the
   *   whole tree.
   * @returns
   */
  private static getStartOffsetOfDescendant(
    descendant: NodeImpl,
    traverseUntilAncestor?: Block,
  ) {
    let startOffset = 0;

    // Walk up the inclusive ancestors of the descendant (i.e. first the
    // descendant, then its ancestors). For each ancestor traversed, count the
    // preceding text length.
    //
    // Aside: We could alternatively implement this by running
    // `tree.preceding(precedingNode, { root: traverseUntilAncestor })` until
    // `precedingNode` becomes null from hitting the root. Unlike this method,
    // `tree.preceding()` buries into elements, so we'd probably filter on
    // TextNodes and collect `textNode.data` rather than just calling
    // `node.textContent` on all previous siblings.
    for (const ancestor of tree.ancestorsIterator(descendant)) {
      if (ancestor === traverseUntilAncestor) {
        break;
      }

      for (const prevSibling of tree.previousSiblingsIterator(ancestor)) {
        startOffset += prevSibling.textContent?.length ?? 0;
      }
    }

    return startOffset;
  }

  /**
   * Descendants should call this method upon any data (text) change, so that
   * this Block instance can update the text contents across the corresponding
   * range.
   *
   * @param descendant The descendant TextImpl that updated.
   * @param prevData The previous data of that TextImpl.
   * @param newData The data that TextImpl has just updated to.
   */
  onDescendantDidUpdateData(
    descendant: TextImpl,
    prevData: string,
    newData: string,
  ) {
    const startOffset = Block.getStartOffsetOfDescendant(descendant, this);

    this.textStorage.replaceCharactersInRangeWithString(
      {
        location: startOffset,
        length: prevData.length,
      },
      newData,
    );
  }

  /**
   * Descendants should call this method upon any attribute update, so that this
   * Block instance can update the attributes across all affected ranges.
   *
   * @param descendant The descendant TextNode that updated.
   * @param prevData The previous data of that TextNode.
   * @param newData The data that TextNode has just updated to.
   */
  onDescendantDidUpdateAttributes(descendant: Inline) {
    // Iterate over all descendants in tree order, updating attributes within
    // the affected range.
    //
    // The search is inclusive, so begins with the descendant itself.
    for (const node of tree.treeIterator(descendant)) {
      if (!(node instanceof Inline) && !(node instanceof Block)) {
        // Only act upon descendants that manage attributes.
        continue;
      }

      const startOffset = Block.getStartOffsetOfDescendant(node, this);
      const attributes = Block.resolveAttributes(node) ?? recycledEmptyObject;

      this.textStorage.setAttributesRange(
        attributes as unknown as NSDictionary<string, unknown>,
        {
          location: startOffset,
          length: descendant.textContent.length,
        },
      );

      // console.log(`[onDescendantDidUpdateAttributes]`, {
      //   startOffset,
      //   length: descendant.textContent.length,
      //   attributes,
      // });
    }
  }
}
