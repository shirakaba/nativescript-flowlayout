import { nodeNames, nodeTypes } from "./constants";
import { FlowNode } from "./node";

/**
 * A hack to keep track of blocks in NSAttributedString.
 *
 * While a <br/> would be an intentional line break introduced by a user, a
 * ParagraphMarker is an internal implementation detail for keeping track of
 * when we've inserted a line break into NSAttributedString to start a new
 * paragraph (thus block box).
 *
 * It returns an empty string for textContent.
 *
 * Better idea: We should make BlockBox and InlineBox components.
 *
 * <block>
 *   <block>a<inline>b</inline>c</block>
 *   <block></block>
 *   <block></block>
 *   <block><block>x<inline>y</inline>z</block></block>
 * <block>
 *
 * ->
 *
 * <block-box>
 *   <block-box><inline-box>abc</inline-box></block-box>
 *   <block-box><inline-box>xyz</inline-box></block-box>
 * </block-box>
 *
 * Or not components at all? Just another symbol tree?
 * Maybe change how getOffset works so that it doesn't use textContent as-is.
 *
 * Or maybe we should not try to match HTML 1:1 at this level. If we implement
 * <br/> as an inline element, and let a higher-level orchestrater handle the
 * concept of block-nesting by coordinating when to implicitly place <br/> and
 * when to ignore empty blocks, it'd be far easier to implement and not coupled
 * to iOS. Also makes it far easier to decide how to style the line break
 * character. Whether we truly implement <br/> as per spec or just make a #text
 * with value "\n" is another discussion.
 */
export class ParagraphMarker extends FlowNode {
  get textContent(): string | null {
    return "";
  }
  get _textContentWithParagraphMarkers() {
    return "\n";
  }
  get nodeValue(): string | null {
    return null;
  }
  static {
    this.prototype.nodeName = nodeNames.ParagraphMarker;
    this.prototype.nodeType = nodeTypes.PARAGRAPH_MARKER;
  }
  nodeName!: string;
  nodeType!: number;
}
