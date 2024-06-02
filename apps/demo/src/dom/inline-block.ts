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
    // For now, we set an explicit width and height because setting 0,0 causes
    // the NSTextAttachment's default image to fill up to its intrinsic content
    // size (causing downstream calculations to become invalid).
    // TODO: reduce to 0,0 by defining our own 0,0 UIImage.
    this.prototype._width = 10;
    this.prototype._height = 10;
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
    this.flowLayout?.onDescendantDidUpdateSize(this, value, "width");
  }

  private _attachment?: NSTextAttachment;
  get attachment(): NSTextAttachment {
    if (!this._attachment) {
      const attachment = NSTextAttachment.new();
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
    const oldView = this._view;

    // Tell the flowLayout that the view changed
    if (this._view) {
      // overlayView.translatesAutoresizingMaskIntoConstraints = NO;
      // underlyingView.translatesAutoresizingMaskIntoConstraints = NO;
      // // Add the overlay view to the same superview as the underlying view
      // [underlyingView.superview addSubview:overlayView];
      // // Set up the constraints
      // [NSLayoutConstraint activateConstraints:@[
      //     [overlayView.topAnchor constraintEqualToAnchor:underlyingView.topAnchor],
      //     [overlayView.bottomAnchor constraintEqualToAnchor:underlyingView.bottomAnchor],
      //     [overlayView.leadingAnchor constraintEqualToAnchor:underlyingView.leadingAnchor],
      //     [overlayView.trailingAnchor constraintEqualToAnchor:underlyingView.trailingAnchor]
      // ]];
    }
    this._view = value;

    this.flowLayout?.onDescendantDidUpdateAttachment(this, oldView, this._view);
  }

  private _height!: number;
  get height() {
    return this._height;
  }
  set height(value: number) {
    this._height = value;
    this.flowLayout?.onDescendantDidUpdateSize(this, value, "height");
  }
}
