/* eslint-disable unicorn/prefer-at */
import { View } from "@nativescript/core";
import { layout } from "@nativescript/core/utils";

import { getBoxType, WrapLayoutBase } from "./common";

export class FlowLayout extends WrapLayoutBase {
  /**
   * The cross-axis lengths for each layout child
   */
  private readonly _lengths = new Array<number>();

  onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec);

    let measureWidth = 0;
    let measureHeight = 0;

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

    const childWidthMeasureSpec = getChildMeasureSpec(
      widthMode,
      availableWidth,
    );
    const childHeightMeasureSpec = getChildMeasureSpec(
      heightMode,
      availableHeight,
    );

    let remainingWidth = availableWidth;
    let remainingHeight = availableHeight;

    this._lengths.length = 0;
    let maxLength = 0;

    const isVertical = this.orientation === "vertical";

    let prevChildIsBlock = false;
    this.eachLayoutChild((child, _last) => {
      const desiredSize = View.measureChild(
        this,
        child,
        childWidthMeasureSpec,
        childHeightMeasureSpec,
      );
      const childMeasuredWidth = desiredSize.measuredWidth;
      const childMeasuredHeight = desiredSize.measuredHeight;

      if (isVertical) {
        if (childMeasuredHeight > remainingHeight || prevChildIsBlock) {
          maxLength = Math.max(maxLength, measureHeight);
          measureHeight = childMeasuredHeight;
          remainingHeight = availableHeight - childMeasuredHeight;
          this._lengths.push(childMeasuredWidth);
        } else {
          remainingHeight -= childMeasuredHeight;
          measureHeight += childMeasuredHeight;
        }
      } else {
        if (childMeasuredWidth > remainingWidth || prevChildIsBlock) {
          maxLength = Math.max(maxLength, measureWidth);
          measureWidth = childMeasuredWidth;
          remainingWidth = availableWidth - childMeasuredWidth;
          this._lengths.push(childMeasuredHeight);
        } else {
          remainingWidth -= childMeasuredWidth;
          measureWidth += childMeasuredWidth;
        }
      }

      this._lengths[this._lengths.length - 1] = Math.max(
        this._lengths[this._lengths.length - 1],
        isVertical ? childMeasuredWidth : childMeasuredHeight,
      );

      // If the last-added child won't share its line with another child (is a
      // block), make sure we account for that when adding the next child.
      prevChildIsBlock =
        getBoxType((child as unknown as { display: string }).display) ===
        "block";
    });

    // |....|
    // |...|.|
    // |...| ^---- maxLength
    // |.|
    //   ^-------- measureWidth
    //
    // maxLength is the width of the widest row
    // measureWidth is the width up to the last child

    if (isVertical) {
      measureHeight = Math.max(maxLength, measureHeight);
      for (const value of this._lengths) {
        measureWidth += value;
      }
    } else {
      measureWidth = Math.max(maxLength, measureWidth);
      for (const value of this._lengths) {
        measureHeight += value;
      }
    }

    measureWidth += horizontalPaddingsAndMargins;
    measureHeight += verticalPaddingsAndMargins;

    // Check against our minimum sizes
    measureWidth = Math.max(measureWidth, this.effectiveMinWidth);
    measureHeight = Math.max(measureHeight, this.effectiveMinHeight);

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

    const insets: {
      left: number;
      top: number;
      right: number;
      bottom: number;
    } = this.getSafeAreaInsets();

    // This layout method is `box-sizing: border-box`.

    const isVertical = this.orientation === "vertical";
    const paddingLeft =
      this.effectiveBorderLeftWidth + this.effectivePaddingLeft + insets.left;
    const paddingTop =
      this.effectiveBorderTopWidth + this.effectivePaddingTop + insets.top;
    const paddingRight =
      this.effectiveBorderRightWidth +
      this.effectivePaddingRight +
      insets.right;
    const paddingBottom =
      this.effectiveBorderBottomWidth +
      this.effectivePaddingBottom +
      insets.bottom;

    let childLeft = paddingLeft;
    let childTop = paddingTop;
    const childrenHeight = bottom - top - paddingBottom;
    const childrenWidth = right - left - paddingRight;
    let rowOrColumn = 0;

    let i = 0;
    this.eachLayoutChild((child, _last) => {
      const length = this._lengths[rowOrColumn];
      let childHeight: number;
      let childWidth: number;

      if (isVertical) {
        // Add margins because layoutChild will subtract them.
        // * density converts them to device pixels.
        childHeight =
          child.getMeasuredHeight() +
          child.effectiveMarginTop +
          child.effectiveMarginBottom;
        childWidth = length;

        if (
          childTop + childHeight > childrenHeight &&
          childLeft + childWidth <= childrenWidth
        ) {
          // Move to top.
          childTop = paddingTop;

          if (i > 0) {
            // Move to right with current column width.
            childLeft += length;
          }

          // Move to next column.
          rowOrColumn++;

          // Take respective column width.
          childWidth = this._lengths[rowOrColumn];
        }

        if (childLeft < childrenWidth && childTop < childrenHeight) {
          View.layoutChild(
            this,
            child,
            childLeft,
            childTop,
            childLeft + childWidth,
            childTop + childHeight,
          );
        }

        // Move next child Top position to bottom.
        childTop += childHeight;
      } else {
        // Add margins because layoutChild will subtract them.
        // * density converts them to device pixels.
        childWidth =
          child.getMeasuredWidth() +
          child.effectiveMarginLeft +
          child.effectiveMarginRight;
        childHeight = length;

        if (
          childLeft + childWidth > childrenWidth &&
          childTop + childHeight <= childrenHeight
        ) {
          // Move to left.
          childLeft = paddingLeft;

          if (i > 0) {
            // Move to bottom with current row height.
            childTop += length;
          }

          // Move to next row.
          rowOrColumn++;

          // Take respective row height.
          childHeight = this._lengths[rowOrColumn];
        }

        if (childLeft < childrenWidth && childTop < childrenHeight) {
          View.layoutChild(
            this,
            child,
            childLeft,
            childTop,
            childLeft + childWidth,
            childTop + childHeight,
          );
        }

        // Move next child Left position to right.
        childLeft += childWidth;
      }

      i++;
    });
  }
}

function getChildMeasureSpec(parentMode: number, parentLength: number): number {
  return parentMode === layout.UNSPECIFIED
    ? layout.makeMeasureSpec(0, layout.UNSPECIFIED)
    : layout.makeMeasureSpec(parentLength, layout.AT_MOST);
}
