import {
  CoreTypes,
  CSSType,
  LayoutBase,
  Length,
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

export const itemWidthProperty = new Property<
  WrapLayoutBase,
  CoreTypes.LengthType
>({
  name: "itemWidth",
  defaultValue: "auto",
  affectsLayout: __IOS__,
  valueConverter: (v) => Length.parse(v),
  valueChanged: (target, oldValue, newValue) =>
    (target.effectiveItemWidth = Length.toDevicePixels(newValue, -1)),
});
itemWidthProperty.register(WrapLayoutBase);

export const itemHeightProperty = new Property<
  WrapLayoutBase,
  CoreTypes.LengthType
>({
  name: "itemHeight",
  defaultValue: "auto",
  affectsLayout: __IOS__,
  valueConverter: (v) => Length.parse(v),
  valueChanged: (target, oldValue, newValue) =>
    (target.effectiveItemHeight = Length.toDevicePixels(newValue, -1)),
});
itemHeightProperty.register(WrapLayoutBase);

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
