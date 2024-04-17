/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@nativescript/types-ios" />

import type { EventData, Page } from "@nativescript/core";

import { HelloWorldModel } from "./main-view-model";

// https://github.com/objcio/issue-5-textkit/tree/master/TextKitDemo

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

  private readonly textContainer = NSTextContainer.new();

  constructor() {
    this.textStorage.addLayoutManager(this.layoutManager);
    this.layoutManager.addTextContainer(this.textContainer);
  }
}

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  const content = page.content;
  console.log(content);
  console.log(new Block());

  // @ts-ignore
  console.log(JBBlock.new());
  // @ts-ignore
  console.log(JBTextStorage.new());

  // CoreText came with macOS Cocoa; TextKit 1 and TextKit 2 came with iOS.
  // https://www.objc.io/issues/5-ios7/getting-to-know-textkit/
  // https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/TextLayout/TextLayout.html#//apple_ref/doc/uid/10000158i
}
