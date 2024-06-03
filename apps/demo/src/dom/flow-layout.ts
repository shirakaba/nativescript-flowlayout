import { nodeNames } from "./constants";
import { FlowElement } from "./element";
import { isElement, isInline, isInlineBlock, isText } from "./helpers";
import type { Inline } from "./inline";
import type { InlineBlock } from "./inline-block";
import type { FlowNode } from "./node";
import type { FlowText } from "./text";
import { tree } from "./tree";

const recycledEmptyObject = Object.freeze({});

const customAttributeNames = {
  inlineBlock: "inline-block", // WeakRef<InlineBlock>
} as const;

/**
 * Allowed children: Inline, InlineBlock.
 *
 * A stylable container with block display mode, based on Element from the DOM
 * spec.
 * @see Element
 *
 * TODO:
 * - Support nesting Blocks in FlowLayout. This thing coordinates native objects
 *   yet only understands inlines. We still lack the concept of a Block, which
 *   we could achieve by reconciling three patterns of block content:
 *   - Final: <inline>content</inline> # Has no <br/>.
 *   - Empty: <inline><inline></inline></inline> # Has no texts, so no <br/>.
 *   - Populated: <inline>content<br/></inline>. # Has content and <br/>.
 * - React to resizes and text changes.
 */
export class FlowLayout extends FlowElement {
  static {
    this.prototype.nodeName = nodeNames.FlowLayout;
  }

  nodeName!: string;

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

  // > An NSLayoutManager uses NSTextContainer to determine where to break lines,
  // lay out portions of text, and so on.
  //
  // This is the object passed into the UITextView. So, to support nested
  // Blocks in one UITextView, it would seem that we should have one "active"
  // textContainer managed by the topmost Block. However, styles should still
  // cascade from the topmost block down to all descendants, despite being
  // different paragraphs (which is how HTML works, just not how Word works).
  readonly textContainer = NSTextContainer.new();

  readonly textView: UITextView;

  // Not sure whether NSParagraphStyle will be much help for implementing
  // inter-block margin/padding, because it only works in the block direction
  // and only when the parent is a Block (rather than a foreign layout manager
  // like a Grid).
  // https://papereditor.app/internals#styling
  //
  // We can surely implement padding using insets, however:
  // https://papereditor.app/internals#text-container-math

  constructor(rect = CGRectMake(0, 0, 394, 760)) {
    super();
    this.textStorage.addLayoutManager(this.layoutManager);
    this.layoutManager.addTextContainer(this.textContainer);

    this.textContainer.size = rect.size;
    this.textView = UITextView.alloc().initWithFrameTextContainer(
      rect,
      this.textContainer,
    );

    // At any time, we can update the frame with, e.g.:
    // this.textView.frame = CGRectMake(0, 0, 100, 760);
    //
    // Strangely, setting the frame updates the width of the text container as
    // specified, but updates the height to max_int or something.
  }

  debugDescription(options?: {
    styles?: true;
    shortestEffectiveRanges?: true;
  }) {
    if (!options?.styles) {
      return this.textStorage.string;
    }

    const fragments = new Array<{
      attributes?: NSDictionary<string, unknown>;
      text: string;
    }>();
    // An explanation of how ranges work (they're relative):
    // https://papereditor.app/internals#attributes
    this.textStorage.enumerateAttributesInRangeOptionsUsingBlock(
      { location: 0, length: this.textStorage.length },
      options?.shortestEffectiveRanges
        ? NSAttributedStringEnumerationOptions.LongestEffectiveRangeNotRequired
        : (0 as NSAttributedStringEnumerationOptions),
      (attributes, range, _stop) => {
        // console.log(
        //   `enumerate { location: ${range.location}, length: ${range.length} }`,
        //   attributes,
        // );
        fragments.push({
          attributes:
            attributes instanceof NSDictionary ? attributes : undefined,
          text: this.textStorage.attributedSubstringFromRange(range).string,
        });
      },
    );

    let result = "";
    for (const { attributes, text } of fragments) {
      const codes = new Array<string>();
      attributes?.enumerateKeysAndObjectsUsingBlock((key) => {
        // const value = attributes.valueForKey(key);
        // console.log(`attribute ${key}`, value);

        switch (key) {
          case NSUnderlineStyleAttributeName: {
            // For explicit NSUnderlineStyle.None, should we push or not?
            codes.push("u");
            break;
          }
          case NSForegroundColorAttributeName: {
            codes.push("f");
            break;
          }
          case NSBackgroundColorAttributeName: {
            codes.push("b");
            break;
          }
          // Ignore these
          case "NSFont":
          case "NSOriginalFont": {
            break;
          }
          default: {
            console.warn(`Got unknown attribute ${key}`);
            codes.push("?");
          }
        }
      });
      const code = codes.length ? `${codes.sort().join("")}:` : "";
      result += `[${code}${text}]`;
    }

    return result;
  }

  setAttribute(key: string, value: unknown) {
    super.setAttribute(key, value);

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
    super.deleteAttribute(key);

    for (const inline of this.childNodes) {
      if (!isInline(inline)) {
        throw new Error(
          "Expected all child nodes of Block to be of type Inline.",
        );
      }
      inline.deleteAttribute(key);
    }
  }

  appendChild<T extends FlowNode>(node: T): T {
    if (!isInline(node) && !isInlineBlock(node)) {
      throw new Error(
        "Block can only append child nodes of type Inline or InlineBlock.",
      );
    }

    // Need to set this from the start, as the TextNode grandchildren will be
    // climbing up to here during updateAttributes
    const appended = super.appendChild(node);

    if (isInlineBlock(node)) {
      // Ignore descendants of InlineBlock for now; treat as a leaf node.

      // Create an attributed string, and after insertion, set some attributes
      // on it that link the attachment back to its corresponding InlineBlock.
      // We may want to do that as a WeakRef later.
      const attributedString =
        NSAttributedString.attributedStringWithAttachment(node.attachment);
      const length = attributedString.length;
      const location = this.textStorage.length;
      this.textStorage.appendAttributedString(attributedString);
      this.textStorage.addAttributesRange(
        {
          [customAttributeNames.inlineBlock]: new WeakRef(node),
        } as unknown as NSDictionary<string, unknown>,
        { location, length },
      );

      // I'm sure NSTextAttachmentViewProvider is superior, but I couldn't find
      // any docs for it.
      // https://developer.apple.com/documentation/uikit/nstextattachmentviewprovider?language=objc

      return appended;
    }

    for (const childNode of node.childNodes) {
      if (isText(childNode)) {
        const attributes = resolveAttributes(node);
        // console.log(
        //   `[FlowLayout] Appending inline "${childNode.data}"`,
        //   attributes ?? "<no attributes>",
        // );
        const attributedString = createAttributedString(
          childNode.data,
          attributes,
        );

        this.textStorage.appendAttributedString(attributedString);
        continue;
      }

      this.appendChild(childNode);
    }

    return appended;
  }

  /**
   * Descendants should call this method upon any data (text) change, so that
   * this Block instance can update the text contents across the corresponding
   * range.
   *
   * @param descendant The descendant FlowText that updated.
   * @param prevData The previous data of that FlowText.
   * @param newData The data that FlowText has just updated to.
   */
  onDescendantDidUpdateData(
    descendant: FlowText,
    prevData: string,
    newData: string,
  ) {
    const startOffset = getStartOffsetOfDescendant(descendant, this);

    this.textStorage.replaceCharactersInRangeWithString(
      { location: startOffset, length: prevData.length },
      newData,
    );
  }

  /**
   * Descendants should call this method upon any insertion of an Inline, so
   * that this Block instance can reflect the native changes.
   *
   * @param insertedInline The inline that was just inserted.
   */
  onDescendantDidInsertInline(insertedInline: Inline) {
    for (const childNode of insertedInline.childNodes) {
      if (isText(childNode)) {
        this.onDescendantDidInsertText(childNode);
        continue;
      }

      if (!isInline(childNode)) {
        throw new Error(
          "Expected Block to have only child nodes of type Inline or Text.",
        );
      }

      this.onDescendantDidInsertInline(childNode);
    }
  }

  onDescendantDidInsertText(insertedText: FlowText) {
    const startOffset = getStartOffsetOfDescendant(insertedText, this);
    const attributedString = createAttributedString(
      insertedText.data,
      resolveAttributes(insertedText),
    );

    this.textStorage.insertAttributedStringAtIndex(
      attributedString,
      startOffset,
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
      if (!isInline(node)) {
        // Only act upon descendants that manage attributes.
        continue;
      }

      const startOffset = getStartOffsetOfDescendant(node, this);
      const attributes = resolveAttributes(node) ?? recycledEmptyObject;

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

  /**
   * Descendant InlineBlocks should call this method upon any size update, so
   * that this Block instance can update the size of the corresponding
   * NSTextAttachment.
   */
  onDescendantDidUpdateSize(descendant: InlineBlock) {
    if (!isInlineBlock(descendant)) {
      // Only act upon descendants that manage size. We'll have to revisit this
      // once we support nesting blocks into blocks.
      return;
    }

    const startOffset = getStartOffsetOfDescendant(descendant);
    console.log(`onDescendantDidUpdateSize startOffset: ${startOffset}`);

    this.textStorage.enumerateAttributeInRangeOptionsUsingBlock(
      NSAttachmentAttributeName,
      // This function only runs if length is at least 1.
      { location: startOffset, length: 1 },
      0 as NSAttributedStringEnumerationOptions,
      (
        /**
         * In practice, this will be the attribute. It'd only be null if we
         * iterated onto a character lacking the attribute.
         */
        attribute: NSObject | null,
        /**
         * While `range.length` will be constant, `range.location` increments as
         * the function enumerates over the string.
         */
        range: NSRange,
        /**
         * An inout reference to allow us to stop enumeration early. I'm not
         * sure what the NativeScript API is for using it, so we'll be leaving
         * it for now. Fortunately, we're only enumerating one character anyway.
         */
        _stop: interop.Pointer | interop.Reference<boolean>,
      ) => {
        console.log(
          `Enumerating attribute at range ${range.location} / ${startOffset + range.length - 1}`,
          attribute,
        );
        if (!(attribute instanceof NSTextAttachment)) {
          return;
        }

        // Have to set bounds rather than bounds.size.
        attribute.bounds = CGRectMake(
          0,
          0,
          descendant.width,
          descendant.height,
        );
      },
    );
  }

  onDescendantDidUpdateAttachment(descendant: InlineBlock) {
    this.textStorage.enumerateAttributesInRangeOptionsUsingBlock(
      { location: 0, length: this.textStorage.length },
      0 as NSAttributedStringEnumerationOptions,
      (attributes, range) => {
        const attachment = attributes.valueForKey(NSAttachmentAttributeName);
        if (!attachment || !(attachment instanceof NSTextAttachment)) {
          return;
        }

        const inlineBlock = (
          attributes.valueForKey(
            customAttributeNames.inlineBlock,
          ) as WeakRef<InlineBlock>
        ).deref();
        if (inlineBlock !== descendant) {
          return;
        }

        // console.log(`[onDescendantDidUpdateAttachment] inlineBlock`, {
        //   attachment,
        //   inlineBlock,
        // });

        const inlineBlockView = inlineBlock.view;
        if (!inlineBlockView) {
          return;
        }

        const { x, y } =
          this.layoutManager.boundingRectForGlyphRangeInTextContainer(
            range,
            this.textContainer,
          ).origin;
        const { width, height } = attachment.bounds.size;
        const frame = CGRectMake(x, y + height, width, height);

        // When we come to support "auto", "min", and "max" sizes, we will have
        // to look into intrinsicContentSize and sizeThatFits, and will have to
        // decide whether we change the framge of the view, the attachment, or
        // both. But for now, we only need to deal with literal sizes.
        inlineBlockView.frame = frame;
      },
    );
  }
}

/**
 * Walks up the DOM ancestors (including self) to resolve the attributes to
 * apply.
 */
function resolveAttributes(node: FlowText | Inline) {
  let attributes: Record<string, unknown> | undefined;

  for (const ancestor of tree.ancestorsIterator(node) as Generator<
    FlowText | Inline
  >) {
    // console.log(
    //   `[resolveAttributes] climbAncestors(<${inline.nodeName.toLowerCase()}>${inline.textContent}</${inline.nodeName.toLowerCase()}>): <${ancestor.nodeName.toLowerCase()}>${ancestor.textContent}</${ancestor.nodeName.toLowerCase()}>`,
    // );

    if (!isElement(ancestor) || !ancestor.attributes) {
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

function createAttributedString(
  text: string,
  attributes?: Record<string, unknown>,
) {
  const placeholderString = NSAttributedString.alloc();

  return attributes
    ? placeholderString.initWithStringAttributes(
        text,
        attributes as unknown as NSDictionary<string, unknown>,
      )
    : placeholderString.initWithString(text);
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
function getStartOffsetOfDescendant(
  descendant: FlowNode,
  traverseUntilAncestor?: FlowLayout,
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
