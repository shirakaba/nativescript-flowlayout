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

  private inlines = new Array<Inline>();

  private addTextNodeOrInline(
    childNode: TextNode | Inline,
    attributes: NSDictionary<string, any>,
  ) {
    if (childNode instanceof TextNode) {
      this.textStorage.appendAttributedString(
        NSAttributedString.alloc().initWithStringAttributes(
          childNode.text,
          attributes,
        ),
      );
      return;
    }

    for (const grandChildNode of childNode.getChildNodes()) {
      this.addTextNodeOrInline(grandChildNode, attributes);
    }
  }

  addInline(inline: Inline) {
    for (const childNode of inline.getChildNodes()) {
      this.addTextNodeOrInline(childNode, inline.attributes);
    }

    this.inlines.push(inline);
  }
}

class TextNode {
  constructor(public readonly text: string) {}
}

class Inline {
  private _childNodes = new Array<TextNode | Inline>();

  constructor(readonly attributes: NSDictionary<string, any>) {
    //
  }

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
}

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  const content = page.content;
  console.log(content);
  const block = new Block();

  // I'm currently unclear whether attributes cascade from parent
  // NSAttributedStrings to child ones.
  for (let i = 0; i < 3; i++) {
    // const dict = NSMutableDictionary.alloc().init();
    // dict.setValueForKey(
    //   i % 2 === 0 ? UIColor.brownColor : UIColor.blueColor,
    //   NSForegroundColorAttributeName,
    // );

    const inline1 = new Inline({
      [NSForegroundColorAttributeName]:
        i % 2 === 0 ? UIColor.brownColor : UIColor.blueColor,
    } as unknown as NSDictionary<string, any>);
    inline1.addTextNode(
      new TextNode(
        "lorem ipsum dolor sit amet\nlorem ipsum dolor sit amet\nlorem ipsum dolor sit amet\n",
      ),
    );
    block.addInline(inline1);
  }

  content.addEventListener("loaded", () => {
    console.log("loaded!");
    content.nativeView.addSubview(
      UITextView.alloc().initWithFrameTextContainer(
        CGRectMake(0, 0, 394, 760),
        block.textContainer,
      ),
    );
  });

  // block.
}
