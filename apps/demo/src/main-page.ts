import type { EventData, Page } from "@nativescript/core";

import { HelloWorldModel } from "./main-view-model";
import { runAllTestSuites } from "./test";

// CoreText came with macOS Cocoa; TextKit 1 and TextKit 2 came with iOS.
// - https://github.com/objcio/issue-5-textkit/tree/master/TextKitDemo
// - https://news.ycombinator.com/item?id=39603087
//   - https://papereditor.app/dev
//   - https://papereditor.app/internals
//   - https://papereditor.app/apple-rich-text
// - https://www.objc.io/issues/5-ios7/getting-to-know-textkit/
// - https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/TextLayout/TextLayout.html#//apple_ref/doc/uid/10000158i

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  const content = page.content;

  // Once the native view from Core has been populated, insert our view into it.
  content.addEventListener("loaded", () => {
    runAllTestSuites({
      root: content.nativeView,
      stageSize: CGRectMake(0, 0, 394, 760),
    });
  });
}
