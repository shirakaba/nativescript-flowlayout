/* eslint-disable unicorn/prefer-dom-node-remove */
/* eslint-disable unicorn/prefer-dom-node-append */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@nativescript/types-ios" />

import type { EventData, Page } from "@nativescript/core";

import { Block } from "./dom/block";
import { Inline } from "./dom/inline";
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

  for (let i = 0; i < 3; i++) {
    const inline = new Inline();
    inline.appendChild(new FlowText(`[${i}] lorem ipsum dolor sit amet, `));
    inline.setAttribute(
      NSForegroundColorAttributeName,
      i % 2 === 0 ? UIColor.systemMintColor : UIColor.blueColor,
    );
    block.appendChild(inline);
  }

  // Some extra tests once we've already pushed the initial Inlines into the
  // Block:

  // Prove that we can update attributes.
  const [firstInline, middleInline, lastInline] = [...block.childNodes] as [
    Inline,
    Inline,
    Inline,
  ];
  lastInline.setAttribute(NSForegroundColorAttributeName, UIColor.redColor);

  // Prove that we can update text.
  const textNode = [...middleInline.childNodes][0] as FlowText;
  textNode.data = "[1] updated text! ";

  // Prove that we can insert a second FlowText into an inline.
  firstInline.appendChild(new FlowText("[0a] Inserted text node. "));

  // Prove that we can insert a second Inline into an Inline.
  const anotherInline = new Inline();
  anotherInline.appendChild(new FlowText("[0b] Inserted green inline. "));
  anotherInline.setAttribute(
    NSForegroundColorAttributeName,
    UIColor.greenColor,
  );
  firstInline.appendChild(anotherInline);

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
