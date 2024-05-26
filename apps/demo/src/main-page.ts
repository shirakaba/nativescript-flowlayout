/* eslint-disable unicorn/prefer-dom-node-remove */
/* eslint-disable unicorn/prefer-dom-node-append */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@nativescript/types-ios" />

import type { EventData, Page } from "@nativescript/core";

import { Block } from "./dom/block";
import { Inline } from "./dom/inline";
import { TextImpl } from "./dom/text";
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
    inline.appendChild(new TextImpl(`[${i}] lorem ipsum dolor sit amet, `));
    inline.setAttribute(
      NSForegroundColorAttributeName,
      i % 2 === 0 ? UIColor.systemMintColor : UIColor.blueColor,
    );
    block.appendChild(inline);

    // FIXME: ensure update runs when we set attribute post-hoc.
    inline.setAttribute(NSForegroundColorAttributeName, UIColor.redColor);
    // Is it the case that we just can't change attributes anymore once the
    // attributed string is appended?
    inline.setAttribute(
      NSForegroundColorAttributeName,
      UIColor.systemBrownColor,
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
