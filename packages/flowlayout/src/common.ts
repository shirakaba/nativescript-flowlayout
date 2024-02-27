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

const converter = makeParser<CoreTypes.OrientationType>(
  makeValidator<CoreTypes.OrientationType>(
    CoreTypes.Orientation.horizontal,
    CoreTypes.Orientation.vertical,
  ),
);
export const orientationProperty = new Property<
  WrapLayoutBase,
  CoreTypes.OrientationType
>({
  name: "orientation",
  defaultValue: CoreTypes.Orientation.horizontal,
  affectsLayout: __IOS__,
  valueConverter: converter,
});
orientationProperty.register(WrapLayoutBase);
