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
    return tree.appendChild(this, node);
  }
  removeChild<T extends FlowNode>(child: T): T {
    return tree.remove(child);
  }
}
