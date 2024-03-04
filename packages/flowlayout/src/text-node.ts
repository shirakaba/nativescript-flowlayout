import { ViewBase } from "@nativescript/core";

/**
 * Like a Span, but less.
 */
export class TextNode extends ViewBase {
  static {
    // Prevent onLoaded event ever firing, as there is no native view to be
    // populated upon `parentView.loadView(textNode)` being called.
    Object.defineProperty(TextNode.prototype, "isLoaded", { value: true });
  }

  private _text = "";
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    if (this._text !== value) {
      if (value === null || value === undefined) {
        this._text = "";
      } else {
        // value can be a number
        this._text =
          typeof value === "string"
            ? `${value}`.replace("\\n", "\n").replace("\\t", "\t")
            : `${value}`;
      }
      this.notifyPropertyChange("text", this._text);
    }
  }

  _inheritStyles(_view: ViewBase): void {
    // No-op (virtual element)
  }

  _setupUI(
    _context: unknown /* android.content.Context */,
    _atIndex?: number,
    _parentIsLoaded?: boolean,
  ): void {
    // No-op (virtual element)
  }
}
