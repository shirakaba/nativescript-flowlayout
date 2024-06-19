import { suite } from "uvu";
import * as assert from "uvu/assert";

import { FlowLayout } from "../dom/flow-layout";
import { Inline } from "../dom/inline";
import { FlowText } from "../dom/text";
import { InlineBlock } from "./../dom/inline-block";
import type { Context } from "./context";
import { context } from "./context";

export const test = suite(
  "insertion",
  context as Context & { flowLayout: FlowLayout },
);

test.before.each((context) => {
  context.reset();

  const flowLayout = new FlowLayout();
  context.flowLayout = flowLayout;
  context.setUp(flowLayout);
});

// Unstyled tests

test("can append FlowTexts into Inlines", ({ flowLayout }) => {
  // Adding an empty Inline should not change the FlowLayout's text content.
  const inline = new Inline();
  flowLayout.appendChild(inline);
  assert.is(flowLayout.debugDescription(), "");

  // Adding a FlowText into an already-added Inline should update the FlowLayout.
  inline.appendChild(new FlowText("abc"));
  assert.is(flowLayout.debugDescription(), "abc");

  // Adding subsequent FlowTexts into a solitary Inline should update the FlowLayout.
  inline.appendChild(new FlowText("def"));
  assert.is(flowLayout.debugDescription(), "abcdef");
});

test("can nest Inlines", ({ flowLayout }) => {
  // Adding an empty Inline should not change the FlowLayout's text content.
  const parent = new Inline();
  flowLayout.appendChild(parent);
  assert.is(flowLayout.debugDescription(), "");

  // Adding a nested empty Inline should not change the FlowLayout's text content.
  const child = new Inline();
  parent.appendChild(child);
  assert.is(flowLayout.debugDescription(), "");

  // Adding a FlowText into a nested Inline should update the FlowLayout.
  child.appendChild(new FlowText("abc"));
  assert.is(flowLayout.debugDescription(), "abc");

  // Adding subsequent FlowTexts into a neighboured Inline should update the
  // FlowLayout.
  parent.appendChild(new FlowText("def"));
  assert.is(flowLayout.debugDescription(), "abcdef");
});

// Styled tests

test("can style whole FlowLayout", ({ flowLayout }) => {
  flowLayout.setAttribute(
    NSUnderlineStyleAttributeName,
    NSUnderlineStyle.Single,
  );

  // Inlines should correctly inherit style from the FlowLayout:

  // … when the Inline already has FlowText.
  const inline = new Inline();
  inline.appendChild(new FlowText("abc"));
  flowLayout.appendChild(inline);
  assert.is(flowLayout.debugDescription({ styles: true }), "[u:abc]");

  // … when adding new FlowTexts to the Inline.
  inline.appendChild(new FlowText("def"));
  assert.is(flowLayout.debugDescription({ styles: true }), "[u:abcdef]");

  // … when the FlowLayout deletes a style.
  flowLayout.deleteAttribute(NSUnderlineStyleAttributeName);
  assert.is(flowLayout.debugDescription({ styles: true }), "[abcdef]");
});

test("can style Inlines", ({ flowLayout }) => {
  flowLayout.setAttribute(
    NSUnderlineStyleAttributeName,
    NSUnderlineStyle.Single,
  );

  // Inlines should correctly inherit style from the FlowLayout:

  // … when adding ready-styled, ready-populated Inlines.
  const inline = new Inline();
  inline.appendChild(new FlowText("abc"));
  flowLayout.appendChild(inline);
  inline.setAttribute(NSBackgroundColorAttributeName, UIColor.yellowColor);
  assert.is(flowLayout.debugDescription({ styles: true }), "[bu:abc]");

  // … when adding new FlowTexts to styled Inlines.
  inline.appendChild(new FlowText("def"));
  assert.is(flowLayout.debugDescription({ styles: true }), "[bu:abcdef]");

  // … when adding unstyled, ready-populated Inlines.
  const inline2 = new Inline();
  inline2.appendChild(new FlowText("ghi"));
  flowLayout.appendChild(inline2);
  assert.is(
    flowLayout.debugDescription({ styles: true }),
    "[bu:abcdef][u:ghi]",
  );

  // … when adding new FlowTexts to unstyled Inlines.
  inline2.appendChild(new FlowText("jkl"));
  assert.is(
    flowLayout.debugDescription({ styles: true }),
    "[bu:abcdef][u:ghijkl]",
  );

  // … when the FlowLayout deletes a style.
  flowLayout.deleteAttribute(NSUnderlineStyleAttributeName);
  assert.is(
    flowLayout.debugDescription({ styles: true }),
    "[b:abcdef][ghijkl]",
  );
});

test("can style nested Inlines", ({ flowLayout }) => {
  flowLayout.setAttribute(
    NSUnderlineStyleAttributeName,
    NSUnderlineStyle.Single,
  );

  // Inlines should correctly inherit style from the FlowLayout:

  // … when adding ready-styled, ready-populated Inlines.
  const inline = new Inline();
  inline.appendChild(new FlowText("aaa"));
  flowLayout.appendChild(inline);
  inline.setAttribute(NSBackgroundColorAttributeName, UIColor.yellowColor);
  assert.is(flowLayout.debugDescription({ styles: true }), "[bu:aaa]");

  // … when nesting ready-styled, ready-populated Inlines.
  const nested = new Inline();
  nested.appendChild(new FlowText("bbb"));
  inline.appendChild(nested);
  nested.setAttribute(NSForegroundColorAttributeName, UIColor.redColor);
  assert.is(flowLayout.debugDescription({ styles: true }), "[bu:aaa][bfu:bbb]");

  // … when adding new FlowTexts to unstyled, nested Inlines.
  nested.appendChild(new FlowText("BBB"));
  assert.is(
    flowLayout.debugDescription({ styles: true }),
    "[bu:aaa][bfu:bbbBBB]",
  );

  // … when restyling nested Inlines.
  nested.deleteAttribute(NSForegroundColorAttributeName);
  assert.is(flowLayout.debugDescription({ styles: true }), "[bu:aaabbbBBB]");
});

test("can set size of InlineBlocks", ({ flowLayout }) => {
  // Make the text big enough to easily wrap onto a new line, at least on iPhone
  // (in future, we'll make a more robust device-agnostic test, but as we're
  // only asserting on size rather than origin point for now, we're fine)
  flowLayout.setAttribute(NSFontAttributeName, UIFont.systemFontOfSize(36));

  const inline1 = new Inline();
  inline1.appendChild(new FlowText("abc def ghi jkl mno pqr stu vwx yz"));
  flowLayout.appendChild(inline1);

  const inlineBlock = new InlineBlock();
  flowLayout.appendChild(inlineBlock);
  inlineBlock.setSize(60, 60);

  const inline2 = new Inline();
  inline2.appendChild(
    new FlowText("abc def ghi jkl mno pqr stu vwx yz".toUpperCase()),
  );
  flowLayout.appendChild(inline2);

  const view = UIView.alloc().initWithFrame(CGRectMake(0, 0, 100, 100));
  view.backgroundColor = UIColor.purpleColor;
  inlineBlock.view = view;
  flowLayout.textView.addSubview(inlineBlock.view);

  // Don't really have a good way to assert on origin yet
  const { width, height } = view.bounds.size;
  assert.is(width, 60);
  assert.is(height, 60);
});
