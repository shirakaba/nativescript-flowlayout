/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@nativescript/types-ios" />

import type { EventData, Page } from "@nativescript/core";

import { HelloWorldModel } from "./main-view-model";

// Just crashes
// //
// // https://docs.nativescript.org/guide/extending-classes-and-conforming-to-protocols-ios
// @NativeClass()
// class TKDHighlightingTextStorage extends NSTextStorage {
//   private readonly _imp = NSMutableAttributedString.new();

//   // init() {
//   //   const self = super.init() ?? null;
//   //   if (self) {
//   //     // The base class initialized successfully
//   //     console.log("Initialized with self", self);
//   //   }
//   //   console.log("this._imp:", this._imp);
//   //   return self;
//   // }

//   // // @ts-expect-error whatever
//   // string() {
//   //   return this._imp.string;
//   // }

//   attributesAtIndexEffectiveRange(
//     location: number,
//     range: interop.Pointer | interop.Reference<NSRange>,
//   ): NSDictionary<string, any> {
//     return this._imp.attributesAtIndexEffectiveRange(location, range);
//   }

//   replaceCharactersInRangeWithString(range: NSRange, str: string): void {
//     this._imp.replaceCharactersInRangeWithString(range, str);
//     // this.edited
//   }

//   setAttributesRange(attrs: NSDictionary<string, any>, range: NSRange): void {
//     this._imp.setAttributesRange(attrs, range);
//   }

//   // A selector will be exposed so it can be called from native.
//   // static ObjCExposedMethods = {
//   //   "attributesAtIndex:effectiveRange:": {
//   //     returns: interop.types.id,
//   //     params: [interop.types.uint64, interop.Pointer],
//   //   },
//   //   "replaceCharactersInRange:withString:": {
//   //     returns: interop.types.void,
//   //     params: [NSRange, interop.types.id],
//   //   },
//   //   "setAttributes:range:": {
//   //     returns: interop.types.void,
//   //     params: [interop.types.id, interop.Reference<NSRange>],
//   //   },
//   //   string: {
//   //     returns: interop.types.id,
//   //     params: [],
//   //   },
//   // };
// }

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  const content = page.content;
  console.log(content);
  console.log(TKDHighlightingTextStorage.new());

  // CoreText came with macOS Cocoa; TextKit 1 and TextKit 2 came with iOS.
  // https://www.objc.io/issues/5-ios7/getting-to-know-textkit/
  // https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/TextLayout/TextLayout.html#//apple_ref/doc/uid/10000158i
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
