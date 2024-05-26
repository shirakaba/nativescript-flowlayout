import { nodeNames } from "./constants";
import { FlowElement } from "./element";
import { isInline, isText } from "./helpers";
import type { FlowNode } from "./node";

/**
 * Allowed children: Inline, FlowText.
 *
 * A stylable container with inline display mode, based on Element from the DOM
 * spec.
 * @see Element
 */
export class Inline extends FlowElement {
  static {
    this.prototype.nodeName = nodeNames.Inline;
  }

  nodeName!: string;

  appendChild<T extends FlowNode>(node: T): T {
    if (!isInline(node) && !isText(node)) {
      throw new Error("Can only add Inline or Text to an Inline.");
    }

    // TODO: support adding InlineBlock

    const appended = super.appendChild(node);

    if (isInline(node)) {
      this.block?.onDescendantDidInsertInline(node);
    } else {
      this.block?.onDescendantDidInsertText(node);
    }

    return appended;
  }

  attributes?: Record<string, unknown>;
  setAttribute(key: string, value: unknown) {
    super.setAttribute(key, value);

    this.block?.onDescendantDidUpdateAttributes(this);
  }

  deleteAttribute(key: string) {
    if (!super.deleteAttribute(key)) {
      return false;
    }

    this.block?.onDescendantDidUpdateAttributes(this);

    return true;
  }
}
