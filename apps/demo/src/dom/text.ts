import { NodeImpl } from "./node";
import { closest, isBlock, tree } from "./tree";

export class TextImpl
  extends NodeImpl
  implements Pick<CharacterData, "data" | "length">, Pick<Text, "wholeText">
{
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
      if (!(prevSibling instanceof TextImpl)) {
        break;
      }
      precedingText = `${prevSibling.data}${precedingText}`;
    }

    let followingText = "";
    for (const nextSibling of tree.nextSiblingsIterator(this)) {
      if (!(nextSibling instanceof TextImpl)) {
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
