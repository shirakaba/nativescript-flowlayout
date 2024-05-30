import { nodeTypes } from "./constants";
import { closest, furthest, isBlock, isParagraphMarker } from "./helpers";
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
    let textContent = "";
    for (const child of this.childNodes) {
      if (!isParagraphMarker(child)) {
        textContent += child.textContent;
      }
    }
    return textContent;
  }
  get _textContentWithParagraphMarkers() {
    let data = "";
    for (const child of this.childNodes) {
      data += child._textContentWithParagraphMarkers;
    }
    return data;
  }
  get nodeValue(): string | null {
    return null;
  }

  attributes?: Record<string, unknown>;

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

  /** The closest Block ancestor, or null if there is none. */
  get closestBlock() {
    return closest(this, isBlock);
  }

  /** The furthest Block ancestor, or null if there is none. */
  get furthestBlock() {
    return furthest(this, isBlock);
  }
}
