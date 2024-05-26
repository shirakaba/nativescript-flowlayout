import * as SymbolTree from "symbol-tree";

import type { Block } from "./block";
import type { Inline } from "./inline";
import type { NodeImpl } from "./node";
import type { TextImpl } from "./text";

// We can manage with one central tree, as it has no singular root. Effectively,
// the way to express a "connected" tree is just to designate a certain node as
// being a RootNode (like Document), and saying that a node is "connected" if it
// has a RootNode ancestor.
//
// If a parent is removed from the tree, it still maintains its connections to
// all its children (and they to theirs), so we can express disconnected trees.
// https://github.com/jsdom/js-symbol-tree/blob/77dc2877246d91f3b82d0fbc6ae80ef7d5618b80/test/SymbolTree.js#L363
// https://github.com/jsdom/js-symbol-tree/blob/77dc2877246d91f3b82d0fbc6ae80ef7d5618b80/lib/SymbolTree.js#L645
export const tree = new SymbolTree<NodeImpl>("flow layout");

export function closest<T extends NodeImpl>(
  self: NodeImpl,
  test:
    | ((ancestor: unknown) => ancestor is T)
    | ((ancestor: NodeImpl) => boolean),
) {
  for (const ancestor of tree.ancestorsIterator(self)) {
    if (test(ancestor)) {
      return ancestor as T;
    }
  }

  return null;
}

export function* climbAncestors(node: NodeImpl) {
  let parentNode: NodeImpl | null = node.parentNode;
  while (parentNode) {
    yield parentNode;
    parentNode = parentNode.parentNode;
  }
}

export function isText(value: NodeImpl): value is TextImpl {
  return value.nodeName === "#text";
}
export function isInline(value: NodeImpl): value is Inline {
  return value.nodeName === "INLINE";
}
export function isBlock(value: NodeImpl): value is Block {
  return value.nodeName === "BLOCK";
}
