import * as SymbolTree from "symbol-tree";

import type { FlowNode } from "./node";

// We can manage with one central tree, as it has no singular root. Effectively,
// the way to express a "connected" tree is just to designate a certain node as
// being a RootNode (like Document), and saying that a node is "connected" if it
// has a RootNode ancestor.
//
// If a parent is removed from the tree, it still maintains its connections to
// all its children (and they to theirs), so we can express disconnected trees.
// https://github.com/jsdom/js-symbol-tree/blob/77dc2877246d91f3b82d0fbc6ae80ef7d5618b80/test/SymbolTree.js#L363
// https://github.com/jsdom/js-symbol-tree/blob/77dc2877246d91f3b82d0fbc6ae80ef7d5618b80/lib/SymbolTree.js#L645
export const tree = new SymbolTree<FlowNode>("flow layout");
