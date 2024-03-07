import type { EventData, Page } from "@nativescript/core";
// import { TextView } from "@nativescript/core";
import { FlowLayout } from "@repo/flowlayout/dist/index.ios";
import { TextNode } from "@repo/flowlayout/dist/text-node";

// import { HelloWorldModel } from "./main-view-model";

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  // page.bindingContext = new HelloWorldModel();

  const text1 = new TextNode();
  text1.text =
    "whatever whatever whatever whatever whatever whatever whatever whatever";
  const text2 = new TextNode();
  text2.text = "dog";

  const flow = new FlowLayout();
  // The simulator's width is 1179px (393 @3x)
  // width 1179 and mode 1073741824 (1 << 30, hence layout.EXACTLY)
  // page.frame.width = { unit: "%", value: 100 };
  page.width = { unit: "%", value: 100 };
  flow.width = { unit: "%", value: 100 };
  flow._addChildFromBuilder("", text1);
  flow._addChildFromBuilder("", text2);

  page.content = flow;

  // const tv = new TextView();
  // tv.text = `${text1.text}${text2.text}`;
  // page.content = tv;
}
