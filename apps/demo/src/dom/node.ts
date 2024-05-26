import { tree } from "./tree";

export abstract class NodeImpl implements Pick<Node, "nodeName" | "nodeType"> {
  /**
   * Warning: Implements only a subset of NodeListOf<T> (just Symbol.iterator).
   */
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

  appendChild<T extends NodeImpl>(node: T): T {
    return tree.appendChild(this, node);
  }
  removeChild<T extends NodeImpl>(child: T): T {
    return tree.remove(child);
  }
}
