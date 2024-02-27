import { View } from "@nativescript/core";
import { layout } from "@nativescript/core/utils";

import { WrapLayoutBase } from "./common";

export class FlowLayout extends WrapLayoutBase {
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
      this.effectiveItemWidth,
    );
    const childHeightMeasureSpec = getChildMeasureSpec(
      heightMode,
      availableHeight,
      this.effectiveItemHeight,
    );

    let remainingWidth = availableWidth;
    let remainingHeight = availableHeight;

    this._lengths.length = 0;
    let rowOrColumn = 0;
    let maxLength = 0;

    const isVertical = this.orientation === "vertical";

    const useItemWidth = this.effectiveItemWidth > 0;
    const useItemHeight = this.effectiveItemHeight > 0;
    const itemWidth = this.effectiveItemWidth;
    const itemHeight = this.effectiveItemHeight;

    this.eachLayoutChild((child, _last) => {
      const desiredSize = View.measureChild(
        this,
        child,
        childWidthMeasureSpec,
        childHeightMeasureSpec,
      );
      const childMeasuredWidth = useItemWidth
        ? itemWidth
        : desiredSize.measuredWidth;
      const childMeasuredHeight = useItemHeight
        ? itemHeight
        : desiredSize.measuredHeight;
      const isFirst = this._lengths.length <= rowOrColumn;

      if (isVertical) {
        if (childMeasuredHeight > remainingHeight) {
          rowOrColumn++;
          maxLength = Math.max(maxLength, measureHeight);
          measureHeight = childMeasuredHeight;
          remainingHeight = availableHeight - childMeasuredHeight;
          this._lengths[isFirst ? rowOrColumn - 1 : rowOrColumn] =
            childMeasuredWidth;
        } else {
          remainingHeight -= childMeasuredHeight;
          measureHeight += childMeasuredHeight;
        }
      } else {
        if (childMeasuredWidth > remainingWidth) {
          rowOrColumn++;
          maxLength = Math.max(maxLength, measureWidth);
          measureWidth = childMeasuredWidth;
          remainingWidth = availableWidth - childMeasuredWidth;
          this._lengths[isFirst ? rowOrColumn - 1 : rowOrColumn] =
            childMeasuredHeight;
        } else {
          remainingWidth -= childMeasuredWidth;
          measureWidth += childMeasuredWidth;
        }
      }

      if (isFirst) {
        this._lengths[rowOrColumn] = isVertical
          ? childMeasuredWidth
          : childMeasuredHeight;
      } else {
        this._lengths[rowOrColumn] = Math.max(
          this._lengths[rowOrColumn],
          isVertical ? childMeasuredWidth : childMeasuredHeight,
        );
      }
    });

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

    this.eachLayoutChild((child, _last) => {
      // Add margins because layoutChild will subtract them.
      // * density converts them to device pixels.
      let childHeight =
        child.getMeasuredHeight() +
        child.effectiveMarginTop +
        child.effectiveMarginBottom;
      let childWidth =
        child.getMeasuredWidth() +
        child.effectiveMarginLeft +
        child.effectiveMarginRight;

      const length = this._lengths[rowOrColumn];
      if (isVertical) {
        childWidth = length;
        childHeight =
          this.effectiveItemHeight > 0 ? this.effectiveItemHeight : childHeight;
        const isFirst = childTop === paddingTop;
        if (
          childTop + childHeight > childrenHeight &&
          childLeft + childWidth <= childrenWidth
        ) {
          // Move to top.
          childTop = paddingTop;

          if (!isFirst) {
            // Move to right with current column width.
            childLeft += length;
          }

          // Move to next column.
          rowOrColumn++;

          // Take respective column width.
          childWidth = this._lengths[isFirst ? rowOrColumn - 1 : rowOrColumn];
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
        childWidth =
          this.effectiveItemWidth > 0 ? this.effectiveItemWidth : childWidth;
        childHeight = length;
        const isFirst = childLeft === paddingLeft;
        if (
          childLeft + childWidth > childrenWidth &&
          childTop + childHeight <= childrenHeight
        ) {
          // Move to left.
          childLeft = paddingLeft;

          if (!isFirst) {
            // Move to bottom with current row height.
            childTop += length;
          }

          // Move to next row.
          rowOrColumn++;

          // Take respective row height.
          childHeight = this._lengths[isFirst ? rowOrColumn - 1 : rowOrColumn];
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
    });
  }
}

function getChildMeasureSpec(
  parentMode: number,
  parentLength: number,
  itemLength: number,
): number {
  switch (true) {
    case itemLength > 0: {
      return layout.makeMeasureSpec(itemLength, layout.EXACTLY);
    }
    case parentMode === layout.UNSPECIFIED: {
      return layout.makeMeasureSpec(0, layout.UNSPECIFIED);
    }
    default: {
      return layout.makeMeasureSpec(parentLength, layout.AT_MOST);
    }
  }
}
