import type { Block } from "./block";
import { nodeNames, nodeTypes } from "./constants";
import type { FlowElement } from "./element";
import type { Inline } from "./inline";
import type { InlineBlock } from "./inline-block";
import type { FlowNode } from "./node";
import type { ParagraphMarker } from "./paragraph-marker";
import type { FlowText } from "./text";
import { tree } from "./tree";

export function closest<T extends FlowNode>(
  self: FlowNode,
  test:
    | ((ancestor: unknown) => ancestor is T)
    | ((ancestor: FlowNode) => boolean),
) {
  for (const ancestor of tree.ancestorsIterator(self)) {
    if (test(ancestor)) {
      return ancestor as T;
    }
  }

  return null;
}

/**
 * Walk up the whole tree, finding the ancestor closest to the root that
 * satisfies the condition. Search includes the node passed in.
 */
export function furthest<T extends FlowNode>(
  self: FlowNode,
  test:
    | ((ancestor: unknown) => ancestor is T)
    | ((ancestor: FlowNode) => boolean),
) {
  let best: T | null = null;
  for (const ancestor of tree.ancestorsIterator(self)) {
    if (test(ancestor)) {
      best = ancestor as T;
    }
  }

  return best;
}

export function* climbAncestors(node: FlowNode) {
  let parentNode: FlowNode | null = node.parentNode;
  while (parentNode) {
    yield parentNode;
    parentNode = parentNode.parentNode;
  }
}

export function isElement(value: FlowNode): value is FlowElement {
  return value.nodeType === nodeTypes.ELEMENT_NODE;
}
export function isText(value: FlowNode): value is FlowText {
  return value.nodeType === nodeTypes.TEXT_NODE;
}
export function isInline(value: FlowNode): value is Inline {
  return value.nodeName === nodeNames.Inline;
}
export function isBlock(value: FlowNode): value is Block {
  return value.nodeName === nodeNames.Block;
}
export function isInlineBlock(value: FlowNode): value is InlineBlock {
  return value.nodeName === nodeNames.InlineBlock;
}
export function isParagraphMarker(value: FlowNode): value is ParagraphMarker {
  return value.nodeName === nodeNames.ParagraphMarker;
}
