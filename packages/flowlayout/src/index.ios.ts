/* eslint-disable unicorn/prefer-at */
import { View } from "@nativescript/core";
import { layout } from "@nativescript/core/utils";

import { getBoxType, WrapLayoutBase } from "./common";

export class FlowLayout extends WrapLayoutBase {
  /**
   * The lengths along the block axis for each layout child.
   * - For an inline orientation of "horizontal", this means the block heights;
   * - For an inline orientation of "vertical", this means the block widths.
   */
  private readonly blockLengths = new Array<number>();

  onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec);

    let measureInline = 0;
    let measureBlock = 0;

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

    const isHorizontal = this.orientation === "horizontal";

    const availableWidth =
      widthMode === layout.UNSPECIFIED
        ? Number.MAX_VALUE
        : width - horizontalPaddingsAndMargins;
    const availableHeight =
      heightMode === layout.UNSPECIFIED
        ? Number.MAX_VALUE
        : height - verticalPaddingsAndMargins;
    const availableInline = isHorizontal ? availableWidth : availableHeight;

    const childWidthMeasureSpec = getChildMeasureSpec(
      widthMode,
      availableWidth,
    );
    const childHeightMeasureSpec = getChildMeasureSpec(
      heightMode,
      availableHeight,
    );

    let remainingInlineLength = availableInline;

    this.blockLengths.length = 0;
    let maxInlineLength = 0;

    let prevChildIsBlock = false;
    this.eachLayoutChild((child, _last) => {
      // For now, `display: none` is substituted by `visibility: collapse`.
      // eachLayoutChild() naturally skips the latter.
      const childBoxType = getBoxType(
        (child as unknown as { display: string }).display,
      );

      const desiredSize = View.measureChild(
        this,
        child,
        childWidthMeasureSpec,
        childHeightMeasureSpec,
      );

      const childMeasuredInlineLength = isHorizontal
        ? desiredSize.measuredWidth
        : desiredSize.measuredHeight;
      const childMeasuredBlockLength = isHorizontal
        ? desiredSize.measuredHeight
        : desiredSize.measuredWidth;

      if (
        childMeasuredInlineLength > remainingInlineLength ||
        prevChildIsBlock
      ) {
        maxInlineLength = Math.max(maxInlineLength, measureInline);
        measureInline = childMeasuredInlineLength;
        remainingInlineLength = availableInline - childMeasuredInlineLength;
        this.blockLengths.push(childMeasuredBlockLength);
      } else {
        remainingInlineLength -= childMeasuredInlineLength;
        measureInline += childMeasuredInlineLength;
      }

      this.blockLengths[this.blockLengths.length - 1] = Math.max(
        this.blockLengths[this.blockLengths.length - 1],
        childMeasuredBlockLength,
      );

      // If the last-added child won't share its line with another child (is a
      // block), make sure we account for that when adding the next child.
      prevChildIsBlock = childBoxType === "block";
    });

    // |....|
    // |...|.|
    // |...| ^---- maxInlineLength
    // |.|
    //   ^-------- measureInline
    //
    // maxInlineLength is the width of the widest row
    // measureInline is the width up to the last child

    measureInline = Math.max(maxInlineLength, measureInline);
    for (const value of this.blockLengths) {
      measureBlock += value;
    }

    let measureWidth: number;
    let measureHeight: number;
    if (isHorizontal) {
      measureInline += horizontalPaddingsAndMargins;
      measureBlock += verticalPaddingsAndMargins;

      // Check against our minimum sizes
      measureWidth = Math.max(measureInline, this.effectiveMinWidth);
      measureHeight = Math.max(measureBlock, this.effectiveMinHeight);
    } else {
      measureInline += verticalPaddingsAndMargins;
      measureBlock += horizontalPaddingsAndMargins;

      // Check against our minimum sizes
      measureWidth = Math.max(measureBlock, this.effectiveMinWidth);
      measureHeight = Math.max(measureInline, this.effectiveMinHeight);
    }

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
