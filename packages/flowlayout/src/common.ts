import type { AddChildFromBuilder, CoreTypes } from "@nativescript/core";
import {
  CSSType,
  LayoutBase,
  makeParser,
  makeValidator,
  Property,
  View,
} from "@nativescript/core";

import { TextNode } from "./text-node";

@CSSType("WrapLayout")
export abstract class WrapLayoutBase
  extends LayoutBase
  implements AddChildFromBuilder
{
  declare orientation: CoreTypes.OrientationType;
  declare itemWidth: CoreTypes.LengthType;
  declare itemHeight: CoreTypes.LengthType;
  declare effectiveItemWidth: number;
  declare effectiveItemHeight: number;

  private readonly _subViews = new Array<View | TextNode>();

  // Implemented by LayoutBaseCommon
  _addChildFromBuilder(name: string, value: unknown) {
    if (value instanceof TextNode || value instanceof View) {
      // @ts-expect-error TextNode should work fine.
      this.addChild(value);
    }
  }

  _registerLayoutChild(_child: View | TextNode): void {
    // No-op
  }

  eachChildView(callback: (child: View) => boolean): void {
    for (const child of this._subViews) {
      if (!(child instanceof View)) {
        continue;
      }

      if (!callback(child)) {
        return;
      }
    }
  }

  eachLayoutChild(callback: (child: View, isLast: boolean) => void): void {
    let lastChild: View | null = null;

    for (const child of this._subViews) {
      if (lastChild && !lastChild.isCollapsed) {
        callback(lastChild, false);
      }

      // @ts-expect-error View should work fine.
      lastChild = child;
    }

    if (lastChild && !lastChild.isCollapsed) {
      callback(lastChild, true);
    }
  }
}

WrapLayoutBase.prototype.recycleNativeView = "auto";

// export const orientationProperty = new Property<
//   WrapLayoutBase,
//   CoreTypes.OrientationType
// >({
//   name: "orientation",
//   defaultValue: CoreTypes.Orientation.horizontal,
//   affectsLayout: __IOS__,
//   valueConverter: makeParser<CoreTypes.OrientationType>(
//     makeValidator<CoreTypes.OrientationType>(
//       CoreTypes.Orientation.horizontal,
//       CoreTypes.Orientation.vertical,
//     ),
//   ),
// });
// orientationProperty.register(WrapLayoutBase);

/**
 * For now, this is a simplification of `display`, supporting only `block` and
 * `inline` (and thus only precomposed syntax). `display: none` is currently
 * substituted by `visibility: collapse`.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
 */
export const displayProperty = new Property<WrapLayoutBase, string>({
  name: "display",
  defaultValue: "block",
  affectsLayout: true,
  valueConverter: makeParser<string>(
    makeValidator<string>(
      "block",
      "flex",
      "inline-block",
      "inline-flex",
      "inline",
    ),
  ),
});
displayProperty.register(WrapLayoutBase);

export function getBoxType(display: string): "inline" | "block" {
  switch (display) {
    case "block":
    case "flex": {
      return "block";
    }
    case "inline-block":
    case "inline-flex":
    case "inline": {
      return "inline";
    }
    default: {
      throw new Error(`Unable to parse box type from display mode ${display}`);
    }
  }
}
