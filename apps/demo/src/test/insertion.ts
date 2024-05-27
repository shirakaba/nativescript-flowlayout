import { suite } from "uvu";
import * as assert from "uvu/assert";

import { Block } from "../dom/block";
import { Inline } from "../dom/inline";
import { FlowText } from "../dom/text";
import type { Context } from "./context";
import { context } from "./context";

export const test = suite("insertion", context as Context & { block: Block });

test.before.each((context) => {
  context.reset();

  const block = new Block();
  context.block = block;
  context.setUp(block.textContainer);
});

// Unstyled tests

test("can append FlowTexts into Inlines", ({ block }) => {
  // Adding an empty Inline should not change the Block's text content.
  const inline = new Inline();
  block.appendChild(inline);
  assert.is(block.debugDescription(), "");

  // Adding a FlowText into an already-added Inline should update the Block.
  inline.appendChild(new FlowText("abc"));
  assert.is(block.debugDescription(), "abc");

  // Adding subsequent FlowTexts into a solitary Inline should update the Block.
  inline.appendChild(new FlowText("def"));
  assert.is(block.debugDescription(), "abcdef");
});

test("can nest Inlines", ({ block }) => {
  // Adding an empty Inline should not change the Block's text content.
  const parent = new Inline();
  block.appendChild(parent);
  assert.is(block.debugDescription(), "");

  // Adding a nested empty Inline should not change the Block's text content.
  const child = new Inline();
  parent.appendChild(child);
  assert.is(block.debugDescription(), "");

  // Adding a FlowText into a nested Inline should update the Block.
  child.appendChild(new FlowText("abc"));
  assert.is(block.debugDescription(), "abc");

  // Adding subsequent FlowTexts into a neighboured Inline should update the
  // Block.
  parent.appendChild(new FlowText("def"));
  assert.is(block.debugDescription(), "abcdef");
});

// Styled tests

test("can style whole Block", ({ block }) => {
  block.setAttribute(NSUnderlineStyleAttributeName, NSUnderlineStyle.Single);

  // Inlines should correctly inherit style from the Block:

  // … when the Inline already has FlowText.
  const inline = new Inline();
  inline.appendChild(new FlowText("abc"));
  block.appendChild(inline);
  assert.is(block.debugDescription({ styles: true }), "[u:abc]");

  // … when adding new FlowTexts to the Inline.
  inline.appendChild(new FlowText("def"));
  assert.is(block.debugDescription({ styles: true }), "[u:abcdef]");

  // … when the Block deletes a style.
  block.deleteAttribute(NSUnderlineStyleAttributeName);
  assert.is(block.debugDescription({ styles: true }), "[abcdef]");
});

test("can style Inlines", ({ block }) => {
  block.setAttribute(NSUnderlineStyleAttributeName, NSUnderlineStyle.Single);

  // Inlines should correctly inherit style from the Block:

  // … when adding ready-styled, ready-populated Inlines.
  const inline = new Inline();
  inline.appendChild(new FlowText("abc"));
  block.appendChild(inline);
  inline.setAttribute(NSBackgroundColorAttributeName, UIColor.yellowColor);
  assert.is(block.debugDescription({ styles: true }), "[bu:abc]");

  // … when adding new FlowTexts to styled Inlines.
  inline.appendChild(new FlowText("def"));
  assert.is(block.debugDescription({ styles: true }), "[bu:abcdef]");

  // … when adding unstyled, ready-populated Inlines.
  const inline2 = new Inline();
  inline2.appendChild(new FlowText("ghi"));
  block.appendChild(inline2);
  assert.is(block.debugDescription({ styles: true }), "[bu:abcdef][u:ghi]");

  // … when adding new FlowTexts to unstyled Inlines.
  inline2.appendChild(new FlowText("jkl"));
  assert.is(block.debugDescription({ styles: true }), "[bu:abcdef][u:ghijkl]");

  // … when the Block deletes a style.
  block.deleteAttribute(NSUnderlineStyleAttributeName);
  assert.is(block.debugDescription({ styles: true }), "[b:abcdef][ghijkl]");
});

test("can style nested Inlines", ({ block }) => {
  block.setAttribute(NSUnderlineStyleAttributeName, NSUnderlineStyle.Single);

  // Inlines should correctly inherit style from the Block:

  // … when adding ready-styled, ready-populated Inlines.
  const inline = new Inline();
  inline.appendChild(new FlowText("aaa"));
  block.appendChild(inline);
  inline.setAttribute(NSBackgroundColorAttributeName, UIColor.yellowColor);
  assert.is(block.debugDescription({ styles: true }), "[bu:aaa]");

  // … when nesting ready-styled, ready-populated Inlines.
  const nested = new Inline();
  nested.appendChild(new FlowText("bbb"));
  inline.appendChild(nested);
  nested.setAttribute(NSForegroundColorAttributeName, UIColor.redColor);
  assert.is(block.debugDescription({ styles: true }), "[bu:aaa][bfu:bbb]");

  // … when adding new FlowTexts to unstyled, nested Inlines.
  nested.appendChild(new FlowText("BBB"));
  assert.is(block.debugDescription({ styles: true }), "[bu:aaa][bfu:bbbBBB]");

  // … when restyling nested Inlines.
  nested.deleteAttribute(NSForegroundColorAttributeName);
  assert.is(block.debugDescription({ styles: true }), "[bu:aaabbbBBB]");
});
