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
    this.flowLayout?.onDescendantDidUpdateSize(this);
  }

  private _height!: number;
  get height() {
    return this._height;
  }
  set height(value: number) {
    this._height = value;
    this.flowLayout?.onDescendantDidUpdateSize(this);
  }

  setSize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this.flowLayout?.onDescendantDidUpdateSize(this);
  }

  private static _placeholderImage?: UIImage;
  /**
   * The default placeholder image is a generic file icon. It's inconvenient
   * because it has an intrinsic content size, meaning that setting its width
   * and height to 0x0 doesn't actually size the image to 0x0, which messes up
   * all layout calculations.
   */
  private static get placeholderImage() {
    if (!this._placeholderImage) {
      this._placeholderImage = UIImage.new();
    }
    return this._placeholderImage;
  }

  private _attachment?: NSTextAttachment;
  get attachment(): NSTextAttachment {
    if (!this._attachment) {
      const attachment = NSTextAttachment.new();
      attachment.image = InlineBlock.placeholderImage;
      attachment.bounds = CGRectMake(0, 0, this.width, this.height);
      this._attachment = attachment;
    }
    return this._attachment;
  }

  private _view?: UIView;
  get view(): UIView | undefined {
    return this._view;
  }
  set view(value: UIView | undefined) {
    // No need to change width and height to 0 when view is set to `undefined`,
    // as `display: inline-block` respects width and height regardless of
    // contents, unlike `display: inline` which ignores them altogether.
    this._view = value;
    this.flowLayout?.onDescendantDidUpdateAttachment(this);
  }
}
