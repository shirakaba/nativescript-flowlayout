import { nodeNames } from "./constants";
import { FlowElement } from "./element";

/**
 * Allowed children: not sure yet.
 *
 * A stylable container with inline-block display mode, based on Element from
 * the DOM spec.
 * @see Element
 */
export class InlineBlock extends FlowElement {
  static {
    this.prototype.nodeName = nodeNames.InlineBlock;
    this.prototype._width = 0;
    this.prototype._height = 0;
  }

  // For now, assumes InlineBlock is a leaf node.
  //
  // `NSAttributedString.attributedStringWithAttachment(attachment)` produces a
  // single-character string with this codepoint, so we reflect that here.
  get textContent() {
    return String.fromCodePoint(65_532);
  }

  nodeName!: string;

  private _width!: number;
  get width() {
    return this._width;
  }
  set width(value: number) {
    this._width = value;
    this.furthestBlock?.onDescendantDidUpdateSize(this, value, "width");
  }

  private _height!: number;
  get height() {
    return this._height;
  }
  set height(value: number) {
    this._height = value;
    this.furthestBlock?.onDescendantDidUpdateSize(this, value, "height");
  }
}
