/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@nativescript/types-ios" />

import type { EventData, Page } from "@nativescript/core";

import { HelloWorldModel } from "./main-view-model";

const recycledEmptyObject = Object.freeze({});

// CoreText came with macOS Cocoa; TextKit 1 and TextKit 2 came with iOS.
// https://github.com/objcio/issue-5-textkit/tree/master/TextKitDemo
// https://news.ycombinator.com/item?id=39603087
// https://www.objc.io/issues/5-ios7/getting-to-know-textkit/
// https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/TextLayout/TextLayout.html#//apple_ref/doc/uid/10000158i

class Block {
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

  constructor() {
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
    for (const inline of this.inlines) {
      inline.setAttribute(key, value);
    }
  }

  deleteAttribute(key: string) {
    if (!this.attributes || !(key in this.attributes)) {
      return;
    }
    delete this.attributes[key];

    for (const inline of this.inlines) {
      inline.deleteAttribute(key);
    }
  }

  /**
   * To be updated, by the parent, upon insertion and removal.
   */
  parent: Block | null = null;

  private inlines = new Array<Inline>();

  addInline(inline: Inline) {
    // Need to set this from the start, as the TextNode grandchildren will be
    // climbing up to here during updateAttributes
    inline.parent = this;
    this.inlines.push(inline);

    for (const childNode of inline.getChildNodes()) {
      if (childNode instanceof TextNode) {
        // Update attributes (i.e. resolve the style cascade) before insertion
        // into the native tree.
        console.log(`[Block] updating attributes for "${childNode.data}"`);
        childNode.updateAttributes();
        this.textStorage.appendAttributedString(childNode.attributedString);
        continue;
      }

      this.addInline(childNode);
    }
  }

  removeInline(inline: Inline) {
    const index = this.inlines.indexOf(inline);
    if (index === -1) {
      return;
    }
    this.inlines.splice(index, 1);
    inline.parent = null;
  }
}

class TextNode {
  private _data: string;
  constructor(data = "") {
    this._data = data;
  }
  get data() {
    return this._data;
  }

  /**
   * To be updated, by the parent, upon insertion and removal.
   */
  parent: Inline | null = null;

  private _attributedString?: NSMutableAttributedString;
  get attributedString() {
    if (!this._attributedString) {
      this._attributedString = NSMutableAttributedString.alloc().initWithString(
        this.data,
      );
    }
    return this._attributedString;
  }

  /**
   * Walks up the DOM parents to resolve the attributes to apply.
   */
  updateAttributes() {
    let attributes: Record<string, unknown> | undefined;

    for (const ancestor of this.climbAncestors()) {
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

    this.setAttributes(attributes ?? recycledEmptyObject);
  }

  private *climbAncestors() {
    let parent: Inline | Block | null = this.parent;
    while (parent) {
      yield parent;
      parent = parent.parent;
    }
  }

  private setAttributes(
    attributes: NSDictionary<string, unknown> | Record<string, unknown>,
  ) {
    console.log(
      `[TextNode.setAttributes] 0->${this.attributedString.length}`,
      attributes,
    );
    this.attributedString.setAttributesRange(
      attributes as unknown as NSDictionary<string, unknown>,
      // @ts-ignore missing from typings, somehow
      NSMakeRange(0, this.attributedString.length),
    );

    console.log(
      "Resulting attributes of TextNode",
      this.attributedString.attributesAtIndexEffectiveRange(
        0,
        new interop.Pointer(),
      ),
    );
  }

  appendData(data: string) {
    this._data += data;
    // TODO: inform parents
  }
}

class Inline {
  private _childNodes = new Array<TextNode | Inline>();
  /**
   * To be updated, by the parent, upon insertion and removal.
   */
  parent: Block | Inline | null = null;

  *getChildNodes() {
    for (const childNode of this._childNodes) {
      yield childNode;
    }
  }

  addTextNode(textNode: TextNode) {
    this._childNodes.push(textNode);
    textNode.parent = this;
  }
  removeTextNode(textNode: TextNode) {
    const index = this._childNodes.indexOf(textNode);
    if (index === -1) {
      return;
    }
    this._childNodes.splice(index, 1);
    textNode.parent = null;
  }
  addInline(inline: Inline) {
    this._childNodes.push(inline);
    inline.parent = this;
  }
  removeInline(inline: Inline) {
    const index = this._childNodes.indexOf(inline);
    if (index === -1) {
      return;
    }
    this._childNodes.splice(index, 1);
    inline.parent = null;
  }
  attributes?: Record<string, unknown>;
  setAttribute(key: string, value: unknown) {
    if (!this.attributes) {
      this.attributes = {};
    }
    this.attributes[key] = value;

    // Iterate over all inlines and cascade styles down to descendants (allowing
    // clobbering by more specific styles).
    for (const childNode of this.getChildNodes()) {
      if (childNode instanceof TextNode) {
        console.log(`[Inline] updating attributes for "${childNode.data}"`);
        childNode.updateAttributes();
        continue;
      }

      childNode.setAttribute(key, value);
    }
  }
  deleteAttribute(key: string) {
    if (!this.attributes) {
      return;
    }
    delete this.attributes[key];

    for (const childNode of this.getChildNodes()) {
      if (childNode instanceof TextNode) {
        childNode.updateAttributes();
        continue;
      }

      childNode.deleteAttribute(key);
    }
  }
}

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  const content = page.content;
  console.log(content);
  const block = new Block();
  block.setAttribute(NSUnderlineStyleAttributeName, NSUnderlineStyle.Single);

  for (let i = 0; i < 3; i++) {
    const inline = new Inline();
    inline.addTextNode(new TextNode(`[${i}] lorem ipsum dolor sit amet, `));
    block.addInline(inline);
    inline.setAttribute(
      NSForegroundColorAttributeName,
      i % 2 === 0 ? UIColor.brownColor : UIColor.blueColor,
    );
  }

  // No idea why attribute-setting is failing to be reflected visually, beyond
  // the fact that we've moved from ready-initialized NSAttributedStrings to
  // setting attributes dynamically on NSMutableAttributedStrings.

  content.addEventListener("loaded", () => {
    console.log("loaded!");
    const rect = CGRectMake(0, 0, 394, 760);
    block.textContainer.size = rect.size;
    const tv = UITextView.alloc().initWithFrameTextContainer(
      rect,
      block.textContainer,
    );
    console.log(
      "textContainer.size",
      tv.textContainer.size.width,
      tv.textContainer.size.height,
    );
    content.nativeView.addSubview(tv);

    // tv.frame can be updated at any time and causes reflow. Strangely, setting
    // the tv.frame updates the width of the text container as specified, but
    // updates the height to max_int or something.
    // setTimeout(() => {
    //   tv.frame = CGRectMake(0, 0, 100, 760);
    //   console.log(
    //     "textContainer.size",
    //     tv.textContainer.size.width,
    //     tv.textContainer.size.height,
    //   );
    // }, 1000);
  });
}
