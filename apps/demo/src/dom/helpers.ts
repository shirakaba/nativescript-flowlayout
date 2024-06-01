import { nodeNames, nodeTypes } from "./constants";
import type { FlowElement } from "./element";
import type { FlowLayout } from "./flow-layout";
import type { Inline } from "./inline";
import type { InlineBlock } from "./inline-block";
import type { FlowNode } from "./node";
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

export function* climbAncestors(node: FlowNode) {
  let parentNode: FlowNode | null = node.parentNode;
  while (parentNode) {
    yield parentNode;
    parentNode = parentNode.parentNode;
  }
}

export function* followingIterator(node: FlowNode) {
  let following: FlowNode | null = tree.following(node);
  while (following) {
    yield following;
    following = tree.following(following);
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
export function isFlowLayout(value: FlowNode): value is FlowLayout {
  return value.nodeName === nodeNames.FlowLayout;
}
export function isInlineBlock(value: FlowNode): value is InlineBlock {
  return value.nodeName === nodeNames.InlineBlock;
}
