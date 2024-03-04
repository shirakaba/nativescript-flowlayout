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

    const attributedString = NSMutableAttributedString.new();
    const textStorage =
      NSTextStorage.alloc().initWithAttributedString(attributedString);

    const sharedPlaceholderImage = FlowLayout.sharedPlaceholderImage;
    if (!sharedPlaceholderImage) {
      console.warn(
        "FlowLayout.prototype.onMeasure() unexpectedly called before FlowLayout.prototype.createNativeView()",
      );
      return;
    }

    const layoutManager = NSLayoutManager.new();
    layoutManager.usesFontLeading = false;

    textStorage.addLayoutManager(layoutManager);

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

    // Can only set size at init time, so can't reuse textContainer.
    const textContainer = NSTextContainer.alloc().initWithSize(
      CGSizeMake(availableWidth, availableHeight),
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
    const fullRange = { location: 0, length: textStorage.length };
    layoutManager.ensureLayoutForCharacterRange(fullRange);

    // Iterate through the glyphs and check for NSTextAttachment
    textStorage.enumerateAttributeInRangeOptionsUsingBlock(
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

    const childWidthMeasureSpec = getChildMeasureSpec(
      widthMode,
      availableWidth,
    );
    const childHeightMeasureSpec = getChildMeasureSpec(
      heightMode,
      availableHeight,
    );

    this.eachLayoutChild((child: View | TextNode, _last) => {
      if (child instanceof TextNode) {
        // If it's a text node, just append it as another attributed string
        // without measuring anything.
        attributedString.appendAttributedString(
          NSAttributedString.alloc().initWithString(child.text),
        );
        return;
      }

      const { measuredWidth, measuredHeight } = View.measureChild(
        this,
        child,
        childWidthMeasureSpec,
        childHeightMeasureSpec,
      );

      const attachment = NSTextAttachment.new();
      attachment.bounds = CGRectMake(0, 0, measuredWidth, measuredHeight);
      attachment.image = sharedPlaceholderImage;

      attributedString.appendAttributedString(
        NSAttributedString.attributedStringWithAttachment(attachment),
      );
      // TODO: reconcile attributedString any time onMeasure() is called again
    });

    // measureWidth +=
    //   this.effectiveBorderLeftWidth +
    //   this.effectivePaddingLeft +
    //   this.effectivePaddingRight +
    //   this.effectiveBorderRightWidth;
    // measureHeight +=
    //   this.effectiveBorderTopWidth +
    //   this.effectivePaddingTop +
    //   this.effectivePaddingBottom +
    //   this.effectiveBorderBottomWidth;

    // measureWidth = Math.max(measureWidth, this.effectiveMinWidth);
    // measureHeight = Math.max(measureHeight, this.effectiveMinHeight);

    // const widthAndState = View.resolveSizeAndState(
    //   measureWidth,
    //   width,
    //   widthMode,
    //   0,
    // );
    // const heightAndState = View.resolveSizeAndState(
    //   measureHeight,
    //   height,
    //   heightMode,
    //   0,
    // );

    // this.setMeasuredDimension(widthAndState, heightAndState);
  }

  onLayout(left: number, top: number, right: number, bottom: number): void {
    super.onLayout(left, top, right, bottom);

    const insets = this.getSafeAreaInsets();
    this.eachLayoutChild((child, _last) => {
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
  }
}

function getChildMeasureSpec(parentMode: number, parentLength: number): number {
  return parentMode === layout.UNSPECIFIED
    ? layout.makeMeasureSpec(0, layout.UNSPECIFIED)
    : layout.makeMeasureSpec(parentLength, layout.AT_MOST);
}
