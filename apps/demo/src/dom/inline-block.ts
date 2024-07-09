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

  get attributes() {
    return super.attributes;
  }
  set attributes(value: Record<string, unknown> | undefined) {
    super.attributes = value;

    this.flowLayout?.onDescendantDidUpdateAttributes(this);
  }
  setAttribute(key: string, value: unknown) {
    super.setAttribute(key, value);

    this.flowLayout?.onDescendantDidUpdateAttributes(this);
  }
  deleteAttribute(key: string) {
    super.deleteAttribute(key);

    this.flowLayout?.onDescendantDidUpdateAttributes(this);
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

  private _attachment?: Attachment;
  get attachment(): Attachment {
    if (!this._attachment) {
      const attachment = Attachment.new() as Attachment;
      attachment.allowsTextAttachmentView = true;
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

@NativeClass
class AttachmentView extends UIView {
  drawRect(_rect: CGRect): void {
    console.log("[AttachmentView.drawRect]");
    UIColor.systemBackgroundColor.set();
    UIRectFill(this.bounds);
    const fillColor = UIColor.systemBlueColor;
    fillColor.set();
    const cornerRadius = 10;
    UIBezierPath.bezierPathWithRoundedRectCornerRadius(
      this.bounds,
      cornerRadius,
    );
    const labelText = NSAttributedString.alloc().initWithString("heya");
    const labelSize = labelText.size();
    const yPadding = 0;
    labelText.drawAtPoint({
      x: this.bounds.origin.x + (this.bounds.size.width - labelSize.width) / 2,
      y: this.bounds.origin.y + yPadding,
    });
  }
}

@NativeClass
class AttachmentViewProvider extends NSTextAttachmentViewProvider {
  // FIXME: This never gets called
  loadView(): void {
    console.log("[AttachmentViewProvider.loadView]");
    const attachmentView = AttachmentView.new() as AttachmentView;
    this.view = attachmentView;
  }

  // FIXME: This never gets called, either.
  attachmentBoundsForAttributesLocationTextContainerProposedLineFragmentPosition(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _attributes: NSDictionary<string, any>,
    _location: NSTextLocation,
    _textContainer: NSTextContainer,
    _proposedLineFragment: CGRect,
    _position: CGPoint,
  ): CGRect {
    console.log(
      "[AttachmentViewProvider.attachmentBoundsForAttributesLocationTextContainerProposedLineFragmentPosition]",
      { "this.view": this.view, "this.view.bounds": this.view.bounds },
    );
    return this.view?.bounds ?? CGRectZero;
  }
}

@NativeClass
class Attachment extends NSTextAttachment {
  viewProviderForParentViewLocationTextContainer(
    parentView: UIView,
    location: NSTextLocation,
    textContainer: NSTextContainer,
  ): NSTextAttachmentViewProvider {
    const viewProvider =
      AttachmentViewProvider.alloc().initWithTextAttachmentParentViewTextLayoutManagerLocation(
        this,
        parentView,
        textContainer?.textLayoutManager,
        location,
      );
    viewProvider.tracksTextAttachmentViewBounds = true;
    return viewProvider;
  }
}
