import { FlowNode } from "./node";
import { closest, isBlock, isInline, isText } from "./tree";

/**
 * Allowed children: Inline, FlowText.
 *
 * A stylable container with inline display mode, based on Element from the DOM
 * spec.
 * @see Element
 */
export class Inline extends FlowNode {
  static {
    this.prototype.nodeName = "INLINE";
    this.prototype.nodeType = 1;
  }

  get nodeValue(): string | null {
    return null;
  }
  nodeName!: string;
  nodeType!: number;

  get textContent() {
    let data = "";
    for (const child of this.childNodes) {
      data += child.textContent;
    }
    return data;
  }

  appendChild<T extends FlowNode>(node: T): T {
    if (!isInline(node) && !isText(node)) {
      throw new Error("Can only add Inline or Text to an Inline.");
    }

    // TODO: if TextImpl is added, inform parent

    return super.appendChild(node);
  }
  attributes?: Record<string, unknown>;
  setAttribute(key: string, value: unknown) {
    if (!this.attributes) {
      this.attributes = {};
    }
    this.attributes[key] = value;

    const closestBlock = closest(this, isBlock);
    closestBlock?.onDescendantDidUpdateAttributes(this);
  }
  deleteAttribute(key: string) {
    if (!this.attributes) {
      return;
    }
    delete this.attributes[key];
    if (!Object.keys(this.attributes).length) {
      delete this.attributes;
    }

    const closestBlock = closest(this, isBlock);
    closestBlock?.onDescendantDidUpdateAttributes(this);
  }
}
