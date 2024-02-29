import {
  CoreTypes,
  CSSType,
  LayoutBase,
  makeParser,
  makeValidator,
  Property,
} from "@nativescript/core";

@CSSType("WrapLayout")
export abstract class WrapLayoutBase extends LayoutBase {
  declare orientation: CoreTypes.OrientationType;
  declare itemWidth: CoreTypes.LengthType;
  declare itemHeight: CoreTypes.LengthType;
  declare effectiveItemWidth: number;
  declare effectiveItemHeight: number;
}

WrapLayoutBase.prototype.recycleNativeView = "auto";

export const orientationProperty = new Property<
  WrapLayoutBase,
  CoreTypes.OrientationType
>({
  name: "orientation",
  defaultValue: CoreTypes.Orientation.horizontal,
  affectsLayout: __IOS__,
  valueConverter: makeParser<CoreTypes.OrientationType>(
    makeValidator<CoreTypes.OrientationType>(
      CoreTypes.Orientation.horizontal,
      CoreTypes.Orientation.vertical,
    ),
  ),
});
orientationProperty.register(WrapLayoutBase);

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
orientationProperty.register(WrapLayoutBase);

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
