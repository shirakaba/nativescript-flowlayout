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
