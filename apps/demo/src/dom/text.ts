import { FlowNode } from "./node";
import { closest, isBlock, isText, tree } from "./tree";

/**
 * A leaf node representing a text fragment, based on Text from the DOM spec.
 * @see Text
 */
export class FlowText extends FlowNode {
  static {
    this.prototype.nodeName = "#text";
    this.prototype.nodeType = 3;
  }

  private _data: string;
  constructor(data = "") {
    super();
    this._data = data;
  }

  /**
   * Replaces the original characters of the attributed string without clearing
   * attributes.
   */
  set data(value: string) {
    const prevData = this._data;
    this._data = value;

    const closestBlock = closest(this, isBlock);
    closestBlock?.onDescendantDidUpdateData(this, prevData, this._data);
  }

  get length(): number {
    return this.data.length;
  }

  get wholeText(): string {
    let precedingText = "";
    for (const prevSibling of tree.previousSiblingsIterator(this)) {
      if (!isText(prevSibling)) {
        break;
      }
      precedingText = `${prevSibling.data}${precedingText}`;
    }

    let followingText = "";
    for (const nextSibling of tree.nextSiblingsIterator(this)) {
      if (!isText(nextSibling)) {
        break;
      }
      followingText = `${followingText}${nextSibling.data}`;
    }

    return `${precedingText}${this.data}${followingText}`;
  }

  get textContent() {
    return this.data;
  }

  get data() {
    return this._data;
  }

  get nodeValue() {
    return this.data;
  }
  nodeName!: string;
  nodeType!: number;
}
