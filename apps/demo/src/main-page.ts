/* eslint-disable unicorn/prefer-dom-node-remove */
/* eslint-disable unicorn/prefer-dom-node-append */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@nativescript/types-ios" />

import type { EventData, Page } from "@nativescript/core";

import { Block } from "./dom/block";
import { Inline } from "./dom/inline";
import { InlineBlock } from "./dom/inline-block";
import { FlowText } from "./dom/text";
import { HelloWorldModel } from "./main-view-model";

// CoreText came with macOS Cocoa; TextKit 1 and TextKit 2 came with iOS.
// https://github.com/objcio/issue-5-textkit/tree/master/TextKitDemo
// https://news.ycombinator.com/item?id=39603087
// https://www.objc.io/issues/5-ios7/getting-to-know-textkit/
// https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/TextLayout/TextLayout.html#//apple_ref/doc/uid/10000158i

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  const content = page.content;
  console.log(content);

  const block = new Block();
  block.setAttribute(NSUnderlineStyleAttributeName, NSUnderlineStyle.Single);
  block.setAttribute(NSFontAttributeName, UIFont.systemFontOfSize(36));

  const inlineBlock = new InlineBlock();
  // width: 0, height: 0 seems to behave as "auto", which may be a blessing and
  // a curse
  inlineBlock.width = 0;
  inlineBlock.height = 0;

  for (let i = 0; i < 3; i++) {
    if (i === 1) {
      block.appendChild(inlineBlock);
    }

    const inline = new Inline();
    inline.appendChild(new FlowText(`[${i}] lorem ipsum dolor sit amet, `));
    inline.setAttribute(
      NSForegroundColorAttributeName,
      i % 2 === 0 ? UIColor.systemMintColor : UIColor.blueColor,
    );
    block.appendChild(inline);
  }

  inlineBlock.width = 50;
  inlineBlock.height = 50;

  // Some extra tests once we've already pushed the initial Inlines into the
  // Block:

  const [inline0, _inlineBlock1, _inline2, inline3] = [...block.childNodes] as [
    Inline,
    InlineBlock,
    Inline,
    Inline,
  ];
  // Prove that we can update attributes.
  inline3.setAttribute(NSForegroundColorAttributeName, UIColor.redColor);

  // TODO: I'm not clear whether our inline block is inserting at the right
  // index, nor whether the other nodes are playing correctly with it. When I
  // uncommented this, the UIImage disappeared. Maybe it's a complication of
  // NSTextAttachment being 0 characters wide, that if you replace characters
  // starting at its edge, it gets deleted due to the ambiguous range. We'll
  // have to either check for the presence of a zero-character NSTextAttachment
  // before running `this.textStorage.replaceCharactersInRangeWithString()` and
  // ensure to reattach it or keep it attached; or remove it from the DOM tree
  // in response to any time it gets removed from the native tree.
  // // Prove that we can update text.
  // const textNode = [...inline2.childNodes][0] as FlowText;
  // textNode.data = "[1] updated text! ";

  // Prove that we can insert a second FlowText into an inline.
  inline0.appendChild(new FlowText("[0a] Inserted text node. "));

  // Prove that we can insert a second Inline into an Inline.
  const anotherInline = new Inline();
  anotherInline.appendChild(new FlowText("[0b] Inserted green inline. "));
  anotherInline.setAttribute(
    NSForegroundColorAttributeName,
    UIColor.greenColor,
  );
  inline0.appendChild(anotherInline);

  // Once the native view from Core has been populated, insert our view into it.
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
