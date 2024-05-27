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

test("Block > Inline > FlowText", ({ block }) => {
  const inline = new Inline();
  inline.appendChild(new FlowText("abc"));
  inline.appendChild(new FlowText("def"));
  inline.appendChild(new FlowText("ghi"));
  block.appendChild(inline);

  assert.is(block.debugDescription(), "abcdefghi");
});
