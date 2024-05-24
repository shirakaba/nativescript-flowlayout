/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@nativescript/types-ios" />

import type { EventData, Page } from "@nativescript/core";

import { HelloWorldModel } from "./main-view-model";

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
    if (!this.attributes) {
      return;
    }
    delete this.attributes[key];

    for (const inline of this.inlines) {
      inline.deleteAttribute(key);
    }
  }

  private inlines = new Array<Inline>();

  addInline(inline: Inline) {
    for (const childNode of inline.getChildNodes()) {
      if (childNode instanceof TextNode) {
        const placeholderString = NSAttributedString.alloc();

        // Checking this can save us an unnecessary allocation.
        const hasAttributes =
          (this.attributes && Object.keys(this.attributes).length) ||
          (inline.attributes && Object.keys(inline.attributes).length);

        // Here we take effort to set the attributes at construction time.
        const attributedString = hasAttributes
          ? placeholderString.initWithStringAttributes(childNode.data, {
              ...this.attributes,
              ...inline.attributes,
            } as unknown as NSDictionary<string, any>)
          : placeholderString.initWithString(childNode.data);

        this.textStorage.appendAttributedString(attributedString);
        continue;
      }

      this.addInline(childNode);
    }

    this.inlines.push(inline);
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

  appendData(data: string) {
    this._data += data;
    // TODO: inform parents
  }
}

class Inline {
  private _childNodes = new Array<TextNode | Inline>();

  *getChildNodes() {
    for (const childNode of this._childNodes) {
      yield childNode;
    }
  }

  addTextNode(textNode: TextNode) {
    this._childNodes.push(textNode);
  }
  addInline(inline: Inline) {
    this._childNodes.push(inline);
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
      if (childNode instanceof Inline) {
        childNode.setAttribute(key, value);
        continue;
      }

      // TODO: handle TextNode. Should we call up to the containing Block?
    }
  }
  deleteAttribute(key: string) {
    if (!this.attributes) {
      return;
    }
    delete this.attributes[key];

    for (const childNode of this.getChildNodes()) {
      if (childNode instanceof Inline) {
        childNode.deleteAttribute(key);
        continue;
      }

      // TODO: handle TextNode. Should we call up to the containing Block?
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
    inline.addTextNode(new TextNode("lorem ipsum dolor sit amet, "));
    block.addInline(inline);
    inline.setAttribute(
      NSForegroundColorAttributeName,
      i % 2 === 0 ? UIColor.brownColor : UIColor.blueColor,
    );
  }

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
