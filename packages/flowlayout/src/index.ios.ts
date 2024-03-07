/// <reference types="@nativescript/types-ios/lib/ios/objc-x86_64/objc!Foundation.d.ts" />
/// <reference types="@nativescript/types-ios/lib/ios/objc-x86_64/objc!CoreFoundation.d.ts" />
/// <reference types="@nativescript/types-ios/lib/ios/objc-x86_64/objc!UIKit.d.ts" />
/// <reference types="@nativescript/types-ios/lib/ios/objc-x86_64/objc!CoreText.d.ts" />
/// <reference types="@nativescript/types-ios/lib/ios/objc-x86_64/objc!CoreGraphics.d.ts" />

/* eslint-disable unicorn/prefer-at */
import type { AddChildFromBuilder } from "@nativescript/core";
import { View } from "@nativescript/core";
import { layout } from "@nativescript/core/utils";

import { WrapLayoutBase } from "./common";
import { TextNode } from "./text-node";

export class FlowLayout extends WrapLayoutBase implements AddChildFromBuilder {
  /**
   * Initialized upon the call of createNativeView() by the first-created
   * FlowLayout instance.
   */
  static sharedPlaceholderImage?: UIImage;

  private attributedString?: NSMutableAttributedString;
  private textStorage?: NSTextStorage;

  createNativeView() {
    if (!FlowLayout.sharedPlaceholderImage) {
      FlowLayout.sharedPlaceholderImage = UIImage.new();
    }

    // See @nativescript/core/ui/core/view/index.ios.js
    return super.createNativeView();
  }

  // @see https://github.com/facebook/react-native/blob/7d47781046c53177bdae607736a3f599628c8704/packages/react-native/Libraries/Text/Text/RCTTextShadowView.mm#L170

  onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec);

    this.attributedString = NSMutableAttributedString.new();
    this.textStorage = NSTextStorage.alloc().initWithAttributedString(
      this.attributedString,
    );

    const sharedPlaceholderImage = FlowLayout.sharedPlaceholderImage;
    if (!sharedPlaceholderImage) {
      console.warn(
        "FlowLayout.prototype.onMeasure() unexpectedly called before FlowLayout.prototype.createNativeView()",
      );
      return;
    }

    const width = layout.getMeasureSpecSize(widthMeasureSpec);
    const widthMode = layout.getMeasureSpecMode(widthMeasureSpec);

    const height = layout.getMeasureSpecSize(heightMeasureSpec);
    const heightMode = layout.getMeasureSpecMode(heightMeasureSpec);

    const horizontalPaddingsAndMargins =
      this.effectivePaddingLeft +
      this.effectivePaddingRight +
      this.effectiveBorderLeftWidth +
      this.effectiveBorderRightWidth;
    const verticalPaddingsAndMargins =
      this.effectivePaddingTop +
      this.effectivePaddingBottom +
      this.effectiveBorderTopWidth +
      this.effectiveBorderBottomWidth;

    const availableWidth =
      widthMode === layout.UNSPECIFIED
        ? Number.MAX_VALUE
        : width - horizontalPaddingsAndMargins;
    const availableHeight =
      heightMode === layout.UNSPECIFIED
        ? Number.MAX_VALUE
        : height - verticalPaddingsAndMargins;

    this.eachLayoutChild((child: View | TextNode, _last) => {
      // TODO: need to figure out the width of the contents. This could be
      // simple if we call this a block (it'd be 100% of its parent), but

      // If it's a text node, just append it as another attributed string
      // without measuring anything.
      //
      // TODO: make distinction between text nodes and inline text runs. While
      // both should wrap with the block and inherit styles from the parent, the
      // latter should be able to override styles.
      if (child instanceof TextNode) {
        this.attributedString!.appendAttributedString(
          NSMutableAttributedString.alloc().initWithString(child.text),
        );
        return;
      }

      // Otherwise, treat it as inline-block (such that height and width is
      // meaningful, and top/left/right/bottom are still ignored). Margin and
      // padding are respected whether inline or inline-block.

      const childWidthMeasureSpec = getChildMeasureSpec(
        widthMode,
        availableWidth,
        child.effectivePaddingLeft +
          child.effectivePaddingRight +
          child.effectiveMarginLeft +
          child.effectiveMarginRight,
        child.effectiveWidth,
      );
      const childHeightMeasureSpec = getChildMeasureSpec(
        heightMode,
        availableHeight,
        child.effectivePaddingTop +
          child.effectivePaddingBottom +
          child.effectiveMarginTop +
          child.effectiveMarginBottom,
        child.effectiveHeight,
      );

      const { measuredWidth, measuredHeight } = View.measureChild(
        this,
        child,
        childWidthMeasureSpec,
        childHeightMeasureSpec,
      );

      const attachment = NSTextAttachment.new();
      attachment.bounds = CGRectMake(0, 0, measuredWidth, measuredHeight);
      attachment.image = sharedPlaceholderImage;

      this.attributedString!.appendAttributedString(
        NSAttributedString.attributedStringWithAttachment(attachment),
      );
      // TODO: reconcile attributedString any time onMeasure() is called again
    });

    const boundingRectSize =
      this.attributedString!.boundingRectWithSizeOptionsContext(
        {
          width: layout.toDeviceIndependentPixels(availableWidth),
          height: layout.toDeviceIndependentPixels(availableHeight),
        },
        NSStringDrawingOptions.UsesLineFragmentOrigin |
          NSStringDrawingOptions.UsesFontLeading,
        // @ts-expect-error is actually nullable
        null,
      );
    console.log(`Got boundingRectSize`, boundingRectSize);

    const measureWidth = Math.max(
      boundingRectSize.size.width,
      this.effectiveMinWidth,
    );
    const measureHeight = Math.max(
      boundingRectSize.size.height,
      this.effectiveMinHeight,
    );

    const widthAndState = View.resolveSizeAndState(
      measureWidth,
      width,
      widthMode,
      0,
    );
    const heightAndState = View.resolveSizeAndState(
      measureHeight,
      height,
      heightMode,
      0,
    );

    this.setMeasuredDimension(widthAndState, heightAndState);
  }

  onLayout(left: number, top: number, right: number, bottom: number): void {
    super.onLayout(left, top, right, bottom);

    const insets = this.getSafeAreaInsets();

    // FIXME: these measured widths are not currently informed by CoreText at
    // all. We need to join this up with the below.
    this.eachLayoutChild((child, _last) => {
      if (child instanceof TextNode) {
        // These are virtual elements, so no need to lay out.
        return;
      }

      const childWidth = child.getMeasuredWidth();
      const childHeight = child.getMeasuredHeight();

      const childLeft =
        this.effectiveBorderLeftWidth +
        this.effectivePaddingLeft +
        child.effectiveLeft +
        insets.left;
      const childTop =
        this.effectiveBorderTopWidth +
        this.effectivePaddingTop +
        child.effectiveTop +
        insets.top;
      const childRight =
        childLeft +
        childWidth +
        child.effectiveMarginLeft +
        child.effectiveMarginRight;
      const childBottom =
        childTop +
        childHeight +
        child.effectiveMarginTop +
        child.effectiveMarginBottom;

      View.layoutChild(
        this,
        child,
        childLeft,
        childTop,
        childRight,
        childBottom,
      );
    });

    const layoutManager = NSLayoutManager.new();
    layoutManager.usesFontLeading = false;

    this.textStorage!.addLayoutManager(layoutManager);

    // Can only set size at init time, so can't reuse textContainer.
    const textContainer = NSTextContainer.alloc().initWithSize(
      CGSizeMake(this.effectiveWidth, this.effectiveHeight),
    );
    textContainer.lineFragmentPadding = 0; // Note, the default value is 5.
    // this.textContainer.lineBreakMode = _maximumNumberOfLines > 0 ? lineBreakMode : NSLineBreakMode.ByClipping;
    // this.textContainer.maximumNumberOfLines = _maximumNumberOfLines;
    textContainer.lineBreakMode = NSLineBreakMode.ByClipping;

    // Set this new textContainer as the layoutManager's only textContainer.
    const textContainers = layoutManager.textContainers;
    while (textContainers.count > 0) {
      layoutManager.removeTextContainerAtIndex(0);
    }
    layoutManager.addTextContainer(textContainer);

    // TODO: do a partial layout rather than a full layout
    // TODO: use a cached layout if the text hasn't changed
    // TODO: perform layout during onLayout() instead of onMeasure()
    const fullRange = { location: 0, length: this.textStorage!.length };
    layoutManager.ensureLayoutForCharacterRange(fullRange);

    // Iterate through the glyphs and check for NSTextAttachment
    this.textStorage!.enumerateAttributeInRangeOptionsUsingBlock(
      NSAttachmentAttributeName,
      fullRange,
      // @ts-expect-error Empty NSAttributedStringEnumerationOptions
      0,
      (attachment: NSTextAttachment, range: NSRange, _stop) => {
        if (!attachment) {
          return;
        }
        // Now you have the NSTextAttachment and its position information
        const attachmentRect =
          layoutManager.boundingRectForGlyphRangeInTextContainer(
            range,
            textContainer,
          );
        console.log(
          `Attachment: ${attachment}, Position: ${NSStringFromCGRect(
            attachmentRect,
          )}`,
        );
      },
    );
  }
}

// From flexbox-layout/index.ios.js
const MATCH_PARENT = -1;
const WRAP_CONTENT = -2;
const View_sUseZeroUnspecifiedMeasureSpec = true;

function getChildMeasureSpec(
  specMode: number,
  specSize: number,
  padding: number,
  childDimension: number,
): number {
  const size = Math.max(0, specSize - padding);

  let resultSize = 0;
  let resultMode = 0;

  switch (specMode) {
    // Parent has imposed an exact size on us
    case layout.EXACTLY: {
      if (childDimension >= 0) {
        resultSize = childDimension;
        resultMode = layout.EXACTLY;
      } else if (childDimension === MATCH_PARENT) {
        resultSize = size;
        resultMode = layout.EXACTLY;
      } else if (childDimension === WRAP_CONTENT) {
        resultSize = size;
        resultMode = layout.AT_MOST;
      }
      break;
    }

    case layout.AT_MOST: {
      if (childDimension >= 0) {
        resultSize = childDimension;
        resultMode = layout.EXACTLY;
      } else if (childDimension === MATCH_PARENT) {
        resultSize = size;
        resultMode = layout.AT_MOST;
      } else if (childDimension === WRAP_CONTENT) {
        resultSize = size;
        resultMode = layout.AT_MOST;
      }
      break;
    }

    case layout.UNSPECIFIED: {
      if (childDimension >= 0) {
        resultSize = childDimension;
        resultMode = layout.EXACTLY;
      } else if (childDimension === MATCH_PARENT) {
        resultSize = View_sUseZeroUnspecifiedMeasureSpec ? 0 : size;
        resultMode = layout.UNSPECIFIED;
      } else if (childDimension === WRAP_CONTENT) {
        resultSize = View_sUseZeroUnspecifiedMeasureSpec ? 0 : size;
        resultMode = layout.UNSPECIFIED;
      }
      break;
    }
  }

  return layout.makeMeasureSpec(resultSize, resultMode);
}
