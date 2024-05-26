/* eslint-disable unicorn/prefer-dom-node-remove */
/* eslint-disable unicorn/prefer-dom-node-append */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@nativescript/types-ios" />

import type { EventData, Page } from "@nativescript/core";
import { dataSerialize } from "@nativescript/core/utils/native-helper.ios";
import * as SymbolTree from "symbol-tree";
import type * as TreeIterator from "symbol-tree/lib/TreeIterator";

import { HelloWorldModel } from "./main-view-model";

const recycledEmptyObject = Object.freeze({});

// We can manage with one central tree, as it has no singular root. Effectively,
// the way to express a "connected" tree is just to designate a certain node as
// being a RootNode (like Document), and saying that a node is "connected" if it
// has a RootNode ancestor.
//
// If a parent is removed from the tree, it still maintains its connections to
// all its children (and they to theirs), so we can express disconnected trees.
// https://github.com/jsdom/js-symbol-tree/blob/77dc2877246d91f3b82d0fbc6ae80ef7d5618b80/test/SymbolTree.js#L363
// https://github.com/jsdom/js-symbol-tree/blob/77dc2877246d91f3b82d0fbc6ae80ef7d5618b80/lib/SymbolTree.js#L645
const tree = new SymbolTree<BaseNode>("flow layout");

// Currently TextNode extends this, which means it has to return `never` for
// some of these hierarchy methods (it is a leaf node). Kinda shows we should
// follow what DOM does instead (Node, Text, and Element). Let's refactor later.
class BaseNode {
  get parent() {
    return tree.parent(this);
  }
  get children() {
    return tree.childrenIterator(this);
  }

  // Not yet sure about these two. We have addTextNode() and addInline(), but
  // we could replace them by overriding appendChild() and doing an instanceof
  // check.
  appendChild(child: BaseNode) {
    tree.appendChild(this, child);
  }
  removeChild(child: BaseNode) {
    tree.remove(child);
  }
}

// CoreText came with macOS Cocoa; TextKit 1 and TextKit 2 came with iOS.
// https://github.com/objcio/issue-5-textkit/tree/master/TextKitDemo
// https://news.ycombinator.com/item?id=39603087
// https://www.objc.io/issues/5-ios7/getting-to-know-textkit/
// https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/TextLayout/TextLayout.html#//apple_ref/doc/uid/10000158i

interface Block {
  get children(): TreeIterator<Inline>;
  appendChild(child: Inline): void;
  removeChild(child: Inline): void;
}
class Block extends BaseNode {
  // One textStorage can hold multiple layoutManagers.
  //
  // Allows multiple visual representations of the same text that can be placed
  // and sized independently. Any edit in one such representation will reflect
  // in the others.
  //
  // NSTextStorage extends NSAttributedString, so you can call
  // initWithStringAttributes. However, the attributes specified apply only to
  // that initial string, and do not cascade to subsequently appended
  // attributed strings.
  private readonly textStorage = NSTextStorage.new();

  // One layoutManager can hold multiple textContainers.
  //
  // Allows one representation of the text to be spread across multiple views,
  // e.g. to allow paginated layout (with each page containing a separate view).
  private readonly layoutManager = NSLayoutManager.new();

  readonly textContainer = NSTextContainer.new();

  constructor() {
    super();
    this.textStorage.addLayoutManager(this.layoutManager);
    this.layoutManager.addTextContainer(this.textContainer);
  }

  attributes?: Record<string, unknown>;
  setAttribute(key: string, value: unknown) {
    if (!this.attributes) {
      this.attributes = {};
    }
    this.attributes[key] = value;

    // Iterate over all inlines and cascade styles down to descendants (allowing
    // clobbering by more specific styles).
    //
    // Alternatively, we could do this without referring to the JS model at all
    // - we could just iterate through all the attributed string children
    // directly, setting the attribute only if it's missing.
    for (const inline of this.children) {
      inline.setAttribute(key, value);
    }
  }

  deleteAttribute(key: string) {
    if (!this.attributes || !(key in this.attributes)) {
      return;
    }
    delete this.attributes[key];

    for (const inline of this.children) {
      inline.deleteAttribute(key);
    }
  }

  addInline(inline: Inline) {
    // Need to set this from the start, as the TextNode grandchildren will be
    // climbing up to here during updateAttributes
    this.appendChild(inline);

    for (const childNode of inline.children) {
      if (childNode instanceof TextNode) {
        // Update attributes (i.e. resolve the style cascade) before insertion
        // into the native tree.
        console.log(
          `[Block] updating attributes for "${childNode.data}".`,
          dataSerialize(this.attributes),
        );
        childNode.updateAttributes();
        this.textStorage.appendAttributedString(childNode.attributedString);
        continue;
      }

      this.addInline(childNode);
    }
  }

  removeInline(inline: Inline) {
    this.removeChild(inline);
  }

  /**
   *
   * @param range The range into the textStorage affected by the update
   * @param data The new data to write into that range
   */
  onAncestorDidUpdateData(range: NSRange, data: string) {
    // Ideally, the block should work out the range for us.
    // https://github.com/jsdom/jsdom/blob/2f8a7302a43fff92f244d5f3426367a8eb2b8896/lib/jsdom/living/nodes/CharacterData-impl.js#L11
  }
}

interface TextNode {
  get parent(): Inline | null;
  get children(): TreeIterator<never>;
  appendChild(child: never): void;
  removeChild(child: never): void;
}
class TextNode extends BaseNode {
  private _data: string;
  constructor(data = "") {
    super();
    this._data = data;
  }
  get data() {
    return this._data;
  }
  /**
   * Replaces the original characters of the attributed string without clearing
   * attributes.
   */
  set data(value: string) {
    const prevData = this._data;
    this._data = value;

    this.parent?.onChildTextNodeDidUpdateData(this, prevData);
  }

  appendData(data: string) {
    this._data += data;
  }
}

interface Inline {
  get parent(): Block | Inline | null;
  get children(): TreeIterator<Inline | TextNode>;
  appendChild(child: Inline | TextNode): void;
  removeChild(child: Inline | TextNode): void;
}
class Inline extends BaseNode {
  // This is getting hard. Will try to port _referencedRanges and CharacterData
  // from JSDOM instead.
  //
  // _referencedRanges: Set comes from Node:
  // https://github.com/jsdom/jsdom/blob/main/lib/jsdom/living/nodes/Node-impl.js

  onChildInlineDidUpdateData(child: Inline) {
    this.parent?.onChildInlineDidUpdateData(this);
  }
  onChildTextNodeDidUpdateData(updatedChild: TextNode, previousData: string) {
    const payload = Inline.getPayload({
      updatedTextNode: updatedChild,
      inline: this,
      startOffset: 0,
      previousData,
    });

    // this.parent?.onChildInlineDidUpdateData(this);

    // TODO: convey payload to parent (which is complicated by it being
    // Inline | Block).
  }

  private static getPayload({
    updatedTextNode,
    inline,
    startOffset,
    previousData,
  }: {
    updatedTextNode: TextNode;
    inline: Inline;
    startOffset: number;
    previousData: string;
  }) {
    for (const childNode of inline.children) {
      if (childNode instanceof TextNode) {
        if (childNode === updatedTextNode) {
          return {
            startOffset,
            previousData,
            updatedData: childNode.data,
          };
        }

        startOffset += childNode.data.length;
        continue;
      }

      const payload = this.getPayload({
        updatedTextNode,
        inline: childNode,
        startOffset,
        previousData,
      });
      if (payload) {
        return payload;
      }
    }

    return null;
  }

  onChildInlineDidUpdateAttributes(_child: Inline) {
    //
  }
  onChildInlineDidUpdateAttribute(_child: Inline) {
    //
  }

  addTextNode(textNode: TextNode) {
    this.appendChild(textNode);
    // FIXME: needs to inform parent Block of insertion
  }
  removeTextNode(textNode: TextNode) {
    this.removeChild(textNode);
  }
  addInline(inline: Inline) {
    this.appendChild(inline);
  }
  removeInline(inline: Inline) {
    this.removeChild(inline);
  }
  attributes?: Record<string, unknown>;
  setAttribute(key: string, value: unknown) {
    if (!this.attributes) {
      this.attributes = {};
    }
    this.attributes[key] = value;

    // Iterate over all inlines and cascade styles down to descendants (allowing
    // clobbering by more specific styles).
    for (const childNode of this.children) {
      if (childNode instanceof TextNode) {
        console.log(
          `[Inline] updating attributes for "${childNode.data}".`,
          dataSerialize(this.attributes),
        );
        childNode.updateAttributes();
        continue;
      }

      childNode.setAttribute(key, value);
    }
  }
  deleteAttribute(key: string) {
    if (!this.attributes) {
      return;
    }
    delete this.attributes[key];

    for (const childNode of this.children) {
      if (childNode instanceof TextNode) {
        childNode.updateAttributes();
        continue;
      }

      childNode.deleteAttribute(key);
    }
  }
}

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new HelloWorldModel();

  const content = page.content;
  console.log(content);

  const block = new Block();
  block.setAttribute(NSUnderlineStyleAttributeName, NSUnderlineStyle.Single);
  block.setAttribute(NSFontAttributeName, UIFont.systemFontOfSize(36));

  for (let i = 0; i < 3; i++) {
    const inline = new Inline();
    inline.addTextNode(new TextNode(`[${i}] lorem ipsum dolor sit amet, `));
    inline.setAttribute(
      NSForegroundColorAttributeName,
      i % 2 === 0 ? UIColor.systemMintColor : UIColor.blueColor,
    );
    block.addInline(inline);

    // FIXME: ensure update runs when we set attribute post-hoc.
    inline.setAttribute(NSForegroundColorAttributeName, UIColor.redColor);
    // Is it the case that we just can't change attributes anymore once the
    // attributed string is appended?
    inline.setAttribute(
      NSForegroundColorAttributeName,
      UIColor.systemBrownColor,
    );
  }

  // No idea why attribute-setting is failing to be reflected visually, beyond
  // the fact that we've moved from ready-initialized NSAttributedStrings to
  // setting attributes dynamically on NSMutableAttributedStrings.

  content.addEventListener("loaded", () => {
    console.log("loaded!");
    const rect = CGRectMake(0, 0, 394, 760);
    block.textContainer.size = rect.size;
    const tv = UITextView.alloc().initWithFrameTextContainer(
      rect,
      block.textContainer,
    );
    console.log(
      "textContainer.size",
      tv.textContainer.size.width,
      tv.textContainer.size.height,
    );
    content.nativeView.addSubview(tv);

    // tv.frame can be updated at any time and causes reflow. Strangely, setting
    // the tv.frame updates the width of the text container as specified, but
    // updates the height to max_int or something.
    // setTimeout(() => {
    //   tv.frame = CGRectMake(0, 0, 100, 760);
    //   console.log(
    //     "textContainer.size",
    //     tv.textContainer.size.width,
    //     tv.textContainer.size.height,
    //   );
    // }, 1000);
  });
}
