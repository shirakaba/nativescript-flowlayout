import { tree } from "./tree";

/**
 * The base-level node of the FlowLayout tree, based on Node from the DOM spec.
 * @see Node
 */
export abstract class FlowNode {
  get childNodes() {
    return tree.childrenIterator(this);
  }
  get parentNode() {
    return tree.parent(this);
  }
  abstract get textContent(): string | null;
  abstract get nodeValue(): string | null;
  abstract nodeName: string;
  abstract nodeType: number;

  appendChild<T extends FlowNode>(node: T): T {
    // Unlike the same-named DOM method, symbol-tree will throw rather than
    // reparent a child with an existing parent.
    // https://github.com/jsdom/js-symbol-tree/blob/77dc2877246d91f3b82d0fbc6ae80ef7d5618b80/test/SymbolTree.js#L400
    node.parentNode?.removeChild(node);

    return tree.appendChild(this, node);
  }
  removeChild<T extends FlowNode>(child: T): T {
    // symbol-tree effectively no-ops if the child already lacks a parentNode.

    return tree.remove(child);
  }
}
