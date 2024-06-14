import { nodeTypes } from "./constants";
import { closest, isFlowLayout } from "./helpers";
import { FlowNode } from "./node";

/**
 * Allowed children: Inline.
 *
 * A stylable container, based on Element from the DOM spec.
 * @see Element
 */
export abstract class FlowElement extends FlowNode {
  static {
    this.prototype.nodeType = nodeTypes.ELEMENT_NODE;
  }
  nodeType!: number;

  get textContent() {
    let data = "";
    for (const child of this.childNodes) {
      data += child.textContent;
    }
    return data;
  }
  get nodeValue(): string | null {
    return null;
  }

  private _attributes?: Record<string, unknown>;
  get attributes() {
    return this._attributes;
  }
  set attributes(value: Record<string, unknown> | undefined) {
    this._attributes = value;
  }

  /**
   * Records an NSAttributedString attribute to be applied. Subclasses should
   * inform the closest Block upon any change.
   *
   * @param key the name of the NSAttributedString attribute key.
   * @param value the value of the NSAttributedString attribute.
   *
   * Supported keys are detailed here:
   * @see https://developer.apple.com/documentation/foundation/nsattributedstringkey?language=objc
   */
  setAttribute(key: string, value: unknown) {
    if (!this.attributes) {
      this.attributes = {};
    }
    this.attributes[key] = value;
  }

  /**
   * Deletes a record of an NSAttributedString attribute to be applied.
   * Subclasses should inform the closest Block upon any change.
   *
   * @param key the name of the NSAttributedString attribute key.
   *
   * Supported keys are detailed here:
   * @see https://developer.apple.com/documentation/foundation/nsattributedstringkey?language=objc
   */
  deleteAttribute(key: string) {
    if (!this.attributes || !(key in this.attributes)) {
      return;
    }

    delete this.attributes[key];
    if (!Object.keys(this.attributes).length) {
      delete this.attributes;
    }
  }

  /** The closest FlowLayout ancestor, or null if there is none. */
  protected get flowLayout() {
    return closest(this, isFlowLayout);
  }
}
