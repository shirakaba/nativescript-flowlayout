(() => {
var exports = {};
exports.id = "bundle";
exports.ids = ["bundle"];
exports.modules = {

/***/ "./src sync recursive \\.(xml%7Cjs%7C(?<%21\\.d\\.)ts%7Cs?css)$":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./app-root.xml": "./src/app-root.xml",
	"./app.css": "./src/app.css",
	"./app.ts": "./src/app.ts",
	"./dom/constants.ts": "./src/dom/constants.ts",
	"./dom/element.ts": "./src/dom/element.ts",
	"./dom/flow-layout.ts": "./src/dom/flow-layout.ts",
	"./dom/helpers.ts": "./src/dom/helpers.ts",
	"./dom/inline-block.ts": "./src/dom/inline-block.ts",
	"./dom/inline.ts": "./src/dom/inline.ts",
	"./dom/node.ts": "./src/dom/node.ts",
	"./dom/text.ts": "./src/dom/text.ts",
	"./dom/tree.ts": "./src/dom/tree.ts",
	"./main-page.ts": "./src/main-page.ts",
	"./main-page.xml": "./src/main-page.xml",
	"./main-view-model.ts": "./src/main-view-model.ts",
	"./test/context.ts": "./src/test/context.ts",
	"./test/index.ts": "./src/test/index.ts",
	"./test/insertion.ts": "./src/test/insertion.ts",
	"./test/setup.ts": "./src/test/setup.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src sync recursive \\.(xml%7Cjs%7C(?<%21\\.d\\.)ts%7Cs?css)$";

/***/ }),

/***/ "./src/app.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/app.css");
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@nativescript/core/application/application.ios.js");
// Added by app-css-loader

/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

_nativescript_core__WEBPACK_IMPORTED_MODULE_1__.Application.run({ moduleName: "app-root" });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/


/***/ }),

/***/ "./src/app.css":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* CSS2JSON */

const ___CSS2JSON_LOADER_EXPORT___ = {"type":"stylesheet","stylesheet":{"rules":[{"type":"rule","selectors":["Button.-primary"],"declarations":[{"type":"declaration","property":"font-size","value":"18"}]}],"parsingErrors":[]}}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS2JSON_LOADER_EXPORT___);
const { addTaggedAdditionalCSS } = __webpack_require__("../../node_modules/@nativescript/core/ui/styling/style-scope.js");
addTaggedAdditionalCSS(___CSS2JSON_LOADER_EXPORT___, "/Users/jamie/Documents/git/nativescript-flowlayout/apps/demo/src/app.css")


/***/ }),

/***/ "./src/dom/constants.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nodeNames: () => (/* binding */ nodeNames),
/* harmony export */   nodeTypes: () => (/* binding */ nodeTypes)
/* harmony export */ });
// This lonely file pays its rent by resolving circular dependencies.
const nodeTypes = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
};
const nodeNames = {
    FlowLayout: "COORDINATOR",
    Inline: "INLINE",
    InlineBlock: "INLINEBLOCK",
    Text: "#text",
};


/***/ }),

/***/ "./src/dom/element.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlowElement: () => (/* binding */ FlowElement)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/dom/constants.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/dom/helpers.ts");
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/dom/node.ts");
var _a;



/**
 * Allowed children: Inline.
 *
 * A stylable container, based on Element from the DOM spec.
 * @see Element
 */
class FlowElement extends _node__WEBPACK_IMPORTED_MODULE_2__.FlowNode {
    get textContent() {
        let data = "";
        for (const child of this.childNodes) {
            data += child.textContent;
        }
        return data;
    }
    get nodeValue() {
        return null;
    }
    get attributes() {
        return this._attributes;
    }
    set attributes(value) {
        this._attributes = value;
    }
    /**
     * Records an NSAttributedString attribute to be applied. Subclasses should
     * inform the closest Block upon any change.
     *
     * @param key the name of the NSAttributedString attribute key.
     * @param value the value of the NSAttributedString attribute.
     *
     * Supported keys are detailed here:
     * @see https://developer.apple.com/documentation/foundation/nsattributedstringkey?language=objc
     */
    setAttribute(key, value) {
        if (!this.attributes) {
            this.attributes = {};
        }
        this.attributes[key] = value;
    }
    /**
     * Deletes a record of an NSAttributedString attribute to be applied.
     * Subclasses should inform the closest Block upon any change.
     *
     * @param key the name of the NSAttributedString attribute key.
     *
     * Supported keys are detailed here:
     * @see https://developer.apple.com/documentation/foundation/nsattributedstringkey?language=objc
     */
    deleteAttribute(key) {
        if (!this.attributes || !(key in this.attributes)) {
            return;
        }
        delete this.attributes[key];
        if (!Object.keys(this.attributes).length) {
            delete this.attributes;
        }
    }
    /** The closest FlowLayout ancestor, or null if there is none. */
    get flowLayout() {
        return (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.closest)(this, _helpers__WEBPACK_IMPORTED_MODULE_1__.isFlowLayout);
    }
}
_a = FlowElement;
(() => {
    _a.prototype.nodeType = _constants__WEBPACK_IMPORTED_MODULE_0__.nodeTypes.ELEMENT_NODE;
})();


/***/ }),

/***/ "./src/dom/flow-layout.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlowLayout: () => (/* binding */ FlowLayout)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/dom/constants.ts");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/dom/element.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/dom/helpers.ts");
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/dom/tree.ts");
var _a;




const recycledEmptyObject = Object.freeze({});
const customAttributeNames = {
    inlineBlock: "inline-block", // WeakRef<InlineBlock>
};
/**
 * Allowed children: Inline, InlineBlock.
 *
 * A stylable container with block display mode, based on Element from the DOM
 * spec.
 * @see Element
 *
 * TODO:
 * - Support nesting Blocks in FlowLayout. This thing coordinates native objects
 *   yet only understands inlines. We still lack the concept of a Block, which
 *   we could achieve by reconciling three patterns of block content:
 *   - Final: <inline>content</inline> # Has no <br/>.
 *   - Empty: <inline><inline></inline></inline> # Has no texts, so no <br/>.
 *   - Populated: <inline>content<br/></inline>. # Has content and <br/>.
 * - React to resizes and text changes.
 */
class FlowLayout extends _element__WEBPACK_IMPORTED_MODULE_1__.FlowElement {
    // Not sure whether NSParagraphStyle will be much help for implementing
    // inter-block margin/padding, because it only works in the block direction
    // and only when the parent is a Block (rather than a foreign layout manager
    // like a Grid).
    // https://papereditor.app/internals#styling
    //
    // We can surely implement padding using insets, however:
    // https://papereditor.app/internals#text-container-math
    constructor(rect = CGRectMake(0, 0, 394, 760)) {
        super();
        // One layoutManager can hold multiple textContainers.
        //
        // Allows one representation of the text to be spread across multiple views,
        // e.g. to allow paginated layout (with each page containing a separate view).
        this.textLayoutManager = NSTextLayoutManager.new();
        // > An NSLayoutManager uses NSTextContainer to determine where to break lines,
        // lay out portions of text, and so on.
        //
        // This is the object passed into the UITextView. So, to support nested
        // Blocks in one UITextView, it would seem that we should have one "active"
        // textContainer managed by the topmost Block. However, styles should still
        // cascade from the topmost block down to all descendants, despite being
        // different paragraphs (which is how HTML works, just not how Word works).
        this.textContainer = NSTextContainer.new();
        this.textContentStorage = NSTextContentStorage.new();
        this.textLayoutManager.textContainer = this.textContainer;
        this.textContentStorage.addTextLayoutManager(this.textLayoutManager);
        this.textView = UITextView.alloc().initWithFrameTextContainer(rect, this.textLayoutManager.textContainer);
        // At any time, we can update the frame with, e.g.:
        // this.textView.frame = CGRectMake(0, 0, 100, 760);
        //
        // Strangely, setting the frame updates the width of the text container as
        // specified, but updates the height to max_int or something.
    }
    get width() {
        return this.textView.frame.size.width;
    }
    set width(width) {
        const { origin: { x, y }, size: { height }, } = this.textView.frame;
        this.textView.frame = CGRectMake(x, y, width, height);
        // Call this to update the positions of all views tracking attachments.
        // TODO: perhaps better to listen to native resizes? Not sure yet.
        this.onDescendantDidUpdateAttachment();
    }
    get height() {
        return this.textView.frame.size.height;
    }
    set height(height) {
        const { origin: { x, y }, size: { width }, } = this.textView.frame;
        this.textView.frame = CGRectMake(x, y, width, height);
        // Call this to update the positions of all views tracking attachments.
        // TODO: perhaps better to listen to native resizes? Not sure yet.
        this.onDescendantDidUpdateAttachment();
    }
    debugDescription(options) {
        if (!options?.styles) {
            return this.textContentStorage.attributedString.string;
        }
        const fragments = new Array();
        // An explanation of how ranges work (they're relative):
        // https://papereditor.app/internals#attributes
        this.textContentStorage.attributedString.enumerateAttributesInRangeOptionsUsingBlock({ location: 0, length: this.textContentStorage.attributedString.length }, options?.shortestEffectiveRanges
            ? NSAttributedStringEnumerationOptions.LongestEffectiveRangeNotRequired
            : 0, (attributes, range, _stop) => {
            // console.log(
            //   `enumerate { location: ${range.location}, length: ${range.length} }`,
            //   attributes,
            // );
            fragments.push({
                attributes: attributes instanceof NSDictionary ? attributes : undefined,
                text: this.textContentStorage.attributedString.attributedSubstringFromRange(range).string,
            });
        });
        let result = "";
        for (const { attributes, text } of fragments) {
            const codes = new Array();
            attributes?.enumerateKeysAndObjectsUsingBlock((key) => {
                // const value = attributes.valueForKey(key);
                // console.log(`attribute ${key}`, value);
                switch (key) {
                    case NSUnderlineStyleAttributeName: {
                        // For explicit NSUnderlineStyle.None, should we push or not?
                        codes.push("u");
                        break;
                    }
                    case NSForegroundColorAttributeName: {
                        codes.push("f");
                        break;
                    }
                    case NSBackgroundColorAttributeName: {
                        codes.push("b");
                        break;
                    }
                    // Ignore these
                    case "NSFont":
                    case "NSOriginalFont": {
                        break;
                    }
                    default: {
                        console.warn(`Got unknown attribute ${key}`);
                        codes.push("?");
                    }
                }
            });
            const code = codes.length ? `${codes.sort().join("")}:` : "";
            result += `[${code}${text}]`;
        }
        return result;
    }
    setAttribute(key, value) {
        super.setAttribute(key, value);
        // Iterate over all inlines and cascade styles down to descendants (allowing
        // clobbering by more specific styles).
        //
        // Alternatively, we could do this without referring to the JS model at all
        // - we could just iterate through all the attributed string children
        // directly, setting the attribute only if it's missing.
        for (const inline of this.childNodes) {
            if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isInline)(inline)) {
                throw new Error("Expected all child nodes of Block to be of type Inline.");
            }
            inline.setAttribute(key, value);
        }
    }
    deleteAttribute(key) {
        super.deleteAttribute(key);
        for (const inline of this.childNodes) {
            if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isInline)(inline)) {
                throw new Error("Expected all child nodes of Block to be of type Inline.");
            }
            inline.deleteAttribute(key);
        }
    }
    appendChild(node) {
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isInline)(node) && !(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isInlineBlock)(node)) {
            throw new Error("Block can only append child nodes of type Inline or InlineBlock.");
        }
        // Need to set this from the start, as the TextNode grandchildren will be
        // climbing up to here during updateAttributes
        const appended = super.appendChild(node);
        if ((0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isInlineBlock)(node)) {
            // Ignore descendants of InlineBlock for now; treat as a leaf node.
            // Create an attributed string, and after insertion, set some attributes
            // on it that link the attachment back to its corresponding InlineBlock.
            //
            // In future, if needed, we could avoid the convenience method and
            // manually assemble an attributed string with an attachment:
            // https://stackoverflow.com/a/75513159/5951226
            const attributedString = NSAttributedString.attributedStringWithAttachment(node.attachment);
            const location = this.textContentStorage.attributedString.length;
            this.textContentStorage.textStorage.appendAttributedString(attributedString);
            const attribute = this.textContentStorage.attributedString.attributeAtIndexEffectiveRange(NSAttachmentAttributeName, location, null);
            node.attributes = {
                ...node.attributes,
                [NSAttachmentAttributeName]: attribute,
                [customAttributeNames.inlineBlock]: new WeakRef(node),
            };
            // Even if it doesn't have a view associated yet, ensure it occupies the
            // correct amount of space.
            this.onDescendantDidUpdateSize(node);
            // I'm sure NSTextAttachmentViewProvider is superior, but I couldn't find
            // any docs for it.
            // https://developer.apple.com/documentation/uikit/nstextattachmentviewprovider?language=objc
            return appended;
        }
        for (const childNode of node.childNodes) {
            if ((0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isText)(childNode)) {
                const attributes = resolveAttributes(node);
                // console.log(
                //   `[FlowLayout] Appending inline "${childNode.data}"`,
                //   attributes ?? "<no attributes>",
                // );
                const attributedString = createAttributedString(childNode.data, attributes);
                this.textContentStorage.textStorage.appendAttributedString(attributedString);
                continue;
            }
            this.appendChild(childNode);
        }
        return appended;
    }
    /**
     * Descendants should call this method upon any data (text) change, so that
     * this Block instance can update the text contents across the corresponding
     * range.
     *
     * @param descendant The descendant FlowText that updated.
     * @param prevData The previous data of that FlowText.
     * @param newData The data that FlowText has just updated to.
     */
    onDescendantDidUpdateData(descendant, prevData, newData) {
        const startOffset = getStartOffsetOfDescendant(descendant, this);
        this.textContentStorage.textStorage.replaceCharactersInRangeWithString({ location: startOffset, length: prevData.length }, newData);
    }
    /**
     * Descendants should call this method upon any insertion of an Inline, so
     * that this Block instance can reflect the native changes.
     *
     * @param insertedInline The inline that was just inserted.
     */
    onDescendantDidInsertInline(insertedInline) {
        for (const childNode of insertedInline.childNodes) {
            if ((0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isText)(childNode)) {
                this.onDescendantDidInsertText(childNode);
                continue;
            }
            if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isInline)(childNode)) {
                throw new Error("Expected Block to have only child nodes of type Inline or Text.");
            }
            this.onDescendantDidInsertInline(childNode);
        }
    }
    onDescendantDidInsertText(insertedText) {
        const startOffset = getStartOffsetOfDescendant(insertedText, this);
        const attributedString = createAttributedString(insertedText.data, resolveAttributes(insertedText));
        this.textContentStorage.textStorage.insertAttributedStringAtIndex(attributedString, startOffset);
    }
    /**
     * Descendants should call this method upon any attribute update, so that this
     * Block instance can update the attributes across all affected ranges.
     *
     * @param descendant The descendant TextNode that updated.
     * @param prevData The previous data of that TextNode.
     * @param newData The data that TextNode has just updated to.
     */
    onDescendantDidUpdateAttributes(descendant) {
        // Iterate over all descendants in tree order, updating attributes within
        // the affected range.
        //
        // The search is inclusive, so begins with the descendant itself.
        for (const node of _tree__WEBPACK_IMPORTED_MODULE_3__.tree.treeIterator(descendant)) {
            if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isInline)(node) && !(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isInlineBlock)(node)) {
                // Only act upon descendants that manage attributes.
                continue;
            }
            const startOffset = getStartOffsetOfDescendant(node, this);
            const attributes = resolveAttributes(node) ?? recycledEmptyObject;
            this.textContentStorage.textStorage.setAttributesRange(attributes, {
                location: startOffset,
                length: descendant.textContent.length,
            });
            console.log(`[onDescendantDidUpdateAttributes]`, {
                startOffset,
                length: descendant.textContent.length,
                attributes,
            });
        }
    }
    /**
     * Descendant InlineBlocks should call this method upon any size update, so
     * that this Block instance can update the size of the corresponding
     * NSTextAttachment.
     *
     * If we ever support nesting Blocks into Blocks, this will need to accept
     * those as well.
     */
    onDescendantDidUpdateSize(descendant) {
        const startOffset = getStartOffsetOfDescendant(descendant);
        console.log(`onDescendantDidUpdateSize startOffset: ${startOffset}`);
        this.textContentStorage.attributedString.enumerateAttributeInRangeOptionsUsingBlock(NSAttachmentAttributeName, 
        // This function only runs if length is at least 1.
        { location: startOffset, length: 1 }, 0, (
        /**
         * In practice, this will be the attribute. It'd only be null if we
         * iterated onto a character lacking the attribute.
         */
        attribute, 
        /**
         * While `range.length` will be constant, `range.location` increments as
         * the function enumerates over the string.
         */
        range, 
        /**
         * An inout reference to allow us to stop enumeration early. I'm not
         * sure what the NativeScript API is for using it, so we'll be leaving
         * it for now. Fortunately, we're only enumerating one character anyway.
         */
        _stop) => {
            console.log(`Enumerating attribute at range ${range.location} / ${startOffset + range.length - 1}`, attribute);
            if (!(attribute instanceof NSTextAttachment)) {
                return;
            }
            // Have to set bounds rather than bounds.size.
            attribute.bounds = CGRectMake(0, 0, descendant.width, descendant.height);
            // attribute.frame;
        });
    }
    /**
     * Updates the bounds for the attachment of the given descendant, or all
     * descendants if no descendant is passed.
     */
    onDescendantDidUpdateAttachment(descendant) {
        const enumerationRange = descendant
            ? { location: getStartOffsetOfDescendant(descendant), length: 1 }
            : {
                location: 0,
                length: this.textContentStorage.attributedString.length,
            };
        this.textContentStorage.attributedString.enumerateAttributesInRangeOptionsUsingBlock(enumerationRange, 0, (attributes, range, pointer) => {
            const attachment = attributes.valueForKey(NSAttachmentAttributeName);
            if (!(attachment instanceof NSTextAttachment)) {
                return;
            }
            const inlineBlock = attributes.valueForKey(customAttributeNames.inlineBlock).deref();
            if (!inlineBlock) {
                return;
            }
            // Unexpected. Stop the search.
            if (descendant && inlineBlock !== descendant) {
                pointer.value = true;
                return;
            }
            // Stop the search.
            pointer.value = true;
        });
    }
}
_a = FlowLayout;
(() => {
    _a.prototype.nodeName = _constants__WEBPACK_IMPORTED_MODULE_0__.nodeNames.FlowLayout;
})();
/**
 * Walks up the DOM ancestors (including self) to resolve the attributes to
 * apply.
 */
function resolveAttributes(node) {
    let attributes;
    for (const ancestor of _tree__WEBPACK_IMPORTED_MODULE_3__.tree.ancestorsIterator(node)) {
        // console.log(
        //   `[resolveAttributes] climbAncestors(<${inline.nodeName.toLowerCase()}>${inline.textContent}</${inline.nodeName.toLowerCase()}>): <${ancestor.nodeName.toLowerCase()}>${ancestor.textContent}</${ancestor.nodeName.toLowerCase()}>`,
        // );
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isElement)(ancestor) || !ancestor.attributes) {
            continue;
        }
        for (const key in ancestor.attributes) {
            // A child already has the attribute, so disregard the parent's value.
            if (attributes?.[key]) {
                continue;
            }
            if (!attributes) {
                attributes = {};
            }
            attributes[key] = ancestor.attributes[key];
        }
    }
    return attributes;
}
function createAttributedString(text, attributes) {
    const placeholderString = NSAttributedString.alloc();
    return attributes
        ? placeholderString.initWithStringAttributes(text, attributes)
        : placeholderString.initWithString(text);
}
/**
 * Calculates the startOffset of the given descendant by walking in tree order
 * counting all text leading up to it.
 *
 * @param descendant The descendant to count the text offset up until.
 * @param traverseUntilAncestor Optional. Specifies the ancestor to stop
 *   traversal at. Siblings preceding the ancestor, and ancestors of that
 *   ancestor, will not contribute towards the startOffset. In other words,
 *   the startOffset begins from this node.
 *
 *   Haven't yet decided how to handle nested blocks (is it possible to nest
 *   NSTextStorage, or do we have to merge them, or is it impossible to
 *   support altogether?). When the time comes, the consumer will have to
 *   work out whether to stop traversal at the closest Block or walk the
 *   whole tree.
 * @returns
 */
function getStartOffsetOfDescendant(descendant, traverseUntilAncestor) {
    let startOffset = 0;
    // Walk up the inclusive ancestors of the descendant (i.e. first the
    // descendant, then its ancestors). For each ancestor traversed, count the
    // preceding text length.
    //
    // Aside: We could alternatively implement this by running
    // `tree.preceding(precedingNode, { root: traverseUntilAncestor })` until
    // `precedingNode` becomes null from hitting the root. Unlike this method,
    // `tree.preceding()` buries into elements, so we'd probably filter on
    // TextNodes and collect `textNode.data` rather than just calling
    // `node.textContent` on all previous siblings.
    for (const ancestor of _tree__WEBPACK_IMPORTED_MODULE_3__.tree.ancestorsIterator(descendant)) {
        if (ancestor === traverseUntilAncestor) {
            break;
        }
        for (const prevSibling of _tree__WEBPACK_IMPORTED_MODULE_3__.tree.previousSiblingsIterator(ancestor)) {
            startOffset += prevSibling.textContent?.length ?? 0;
        }
    }
    return startOffset;
}


/***/ }),

/***/ "./src/dom/helpers.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   climbAncestors: () => (/* binding */ climbAncestors),
/* harmony export */   closest: () => (/* binding */ closest),
/* harmony export */   followingIterator: () => (/* binding */ followingIterator),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isFlowLayout: () => (/* binding */ isFlowLayout),
/* harmony export */   isInline: () => (/* binding */ isInline),
/* harmony export */   isInlineBlock: () => (/* binding */ isInlineBlock),
/* harmony export */   isText: () => (/* binding */ isText)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/dom/constants.ts");
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/dom/tree.ts");


function closest(self, test) {
    for (const ancestor of _tree__WEBPACK_IMPORTED_MODULE_1__.tree.ancestorsIterator(self)) {
        if (test(ancestor)) {
            return ancestor;
        }
    }
    return null;
}
function* climbAncestors(node) {
    let parentNode = node.parentNode;
    while (parentNode) {
        yield parentNode;
        parentNode = parentNode.parentNode;
    }
}
function* followingIterator(node) {
    let following = _tree__WEBPACK_IMPORTED_MODULE_1__.tree.following(node);
    while (following) {
        yield following;
        following = _tree__WEBPACK_IMPORTED_MODULE_1__.tree.following(following);
    }
}
function isElement(value) {
    return value.nodeType === _constants__WEBPACK_IMPORTED_MODULE_0__.nodeTypes.ELEMENT_NODE;
}
function isText(value) {
    return value.nodeType === _constants__WEBPACK_IMPORTED_MODULE_0__.nodeTypes.TEXT_NODE;
}
function isInline(value) {
    return value.nodeName === _constants__WEBPACK_IMPORTED_MODULE_0__.nodeNames.Inline;
}
function isFlowLayout(value) {
    return value.nodeName === _constants__WEBPACK_IMPORTED_MODULE_0__.nodeNames.FlowLayout;
}
function isInlineBlock(value) {
    return value.nodeName === _constants__WEBPACK_IMPORTED_MODULE_0__.nodeNames.InlineBlock;
}


/***/ }),

/***/ "./src/dom/inline-block.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InlineBlock: () => (/* binding */ InlineBlock)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/dom/constants.ts");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/dom/element.ts");
var _a;


/**
 * Allowed children: not sure yet.
 *
 * A stylable container with inline-block display mode, based on Element from
 * the DOM spec.
 * @see Element
 */
class InlineBlock extends _element__WEBPACK_IMPORTED_MODULE_1__.FlowElement {
    // For now, assumes InlineBlock is a leaf node.
    //
    // `NSAttributedString.attributedStringWithAttachment(attachment)` produces a
    // single-character string with this codepoint, so we reflect that here.
    get textContent() {
        return String.fromCodePoint(65532);
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
        this.flowLayout?.onDescendantDidUpdateSize(this);
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.flowLayout?.onDescendantDidUpdateSize(this);
    }
    setSize(width, height) {
        this._width = width;
        this._height = height;
        this.flowLayout?.onDescendantDidUpdateSize(this);
    }
    get attributes() {
        return super.attributes;
    }
    set attributes(value) {
        super.attributes = value;
        this.flowLayout?.onDescendantDidUpdateAttributes(this);
    }
    setAttribute(key, value) {
        super.setAttribute(key, value);
        this.flowLayout?.onDescendantDidUpdateAttributes(this);
    }
    deleteAttribute(key) {
        super.deleteAttribute(key);
        this.flowLayout?.onDescendantDidUpdateAttributes(this);
    }
    /**
     * The default placeholder image is a generic file icon. It's inconvenient
     * because it has an intrinsic content size, meaning that setting its width
     * and height to 0x0 doesn't actually size the image to 0x0, which messes up
     * all layout calculations.
     */
    static get placeholderImage() {
        if (!this._placeholderImage) {
            this._placeholderImage = UIImage.new();
        }
        return this._placeholderImage;
    }
    get attachment() {
        if (!this._attachment) {
            const attachment = Attachment.new();
            attachment.allowsTextAttachmentView = true;
            attachment.bounds = CGRectMake(0, 0, this.width, this.height);
            this._attachment = attachment;
        }
        return this._attachment;
    }
    get view() {
        return this._view;
    }
    set view(value) {
        // No need to change width and height to 0 when view is set to `undefined`,
        // as `display: inline-block` respects width and height regardless of
        // contents, unlike `display: inline` which ignores them altogether.
        this._view = value;
        this.attachment.viewToProvide = value;
        this.flowLayout?.onDescendantDidUpdateAttachment(this);
    }
}
_a = InlineBlock;
(() => {
    _a.prototype.nodeName = _constants__WEBPACK_IMPORTED_MODULE_0__.nodeNames.InlineBlock;
    _a.prototype._width = 0;
    _a.prototype._height = 0;
})();
var AttachmentViewProvider = /** @class */ (function (_super) {
    __extends(AttachmentViewProvider, _super);
    function AttachmentViewProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AttachmentViewProvider.prototype, "viewToProvide", {
        get: function () {
            return this._viewToProvide;
        },
        set: function (view) {
            this.view = view;
            this._viewToProvide = view;
        },
        enumerable: true,
        configurable: true
    });
    AttachmentViewProvider.prototype.initWithTextAttachmentParentViewTextLayoutManagerLocation = function (textAttachment, parentView, textLayoutManager, location) {
        _super.prototype.initWithTextAttachmentParentViewTextLayoutManagerLocation.call(this, textAttachment, parentView, textLayoutManager, location);
        this.tracksTextAttachmentViewBounds = true;
        console.log("SANITY");
        // Force loadView to be called by accessing the view
        // console.log("viewProvider.view", this.view);
        return this;
    };
    // // loadView is never called:
    // // https://stackoverflow.com/questions/70481279/trackstextattachmentviewbounds-not-working
    // loadView(): void {
    //   console.log("[AttachmentViewProvider.loadView]");
    //   // const attachmentView = AttachmentView.new() as AttachmentView;
    //   // this.view = attachmentView;
    //   // const img = UIImage.systemImageNamed("face.smiling");
    //   // const imageView = UIImageView.alloc().initWithImage(img);
    //   // this.view = imageView;
    //   if (this.viewToProvide) {
    //     this.view = this.viewToProvide;
    //   }
    // }
    // this never gets called, either, which is the whole problem.
    AttachmentViewProvider.prototype.attachmentBoundsForAttributesLocationTextContainerProposedLineFragmentPosition = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _attributes, _location, _textContainer, _proposedLineFragment, _position) {
        var _a, _b;
        console.log("[AttachmentViewProvider.attachmentBoundsForAttributesLocationTextContainerProposedLineFragmentPosition]", { "this.view": this.view, "this.view.bounds": this.view.bounds });
        return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.bounds) !== null && _b !== void 0 ? _b : CGRectZero;
    };
    return AttachmentViewProvider;
}(NSTextAttachmentViewProvider));
var Attachment = /** @class */ (function (_super) {
    __extends(Attachment, _super);
    function Attachment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Attachment.prototype.viewProviderForParentViewLocationTextContainer = function (parentView, location, textContainer) {
        var viewProvider = AttachmentViewProvider.alloc().initWithTextAttachmentParentViewTextLayoutManagerLocation(this, parentView, textContainer === null || textContainer === void 0 ? void 0 : textContainer.textLayoutManager, location);
        return viewProvider;
    };
    return Attachment;
}(NSTextAttachment));


/***/ }),

/***/ "./src/dom/inline.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Inline: () => (/* binding */ Inline)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/dom/constants.ts");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/dom/element.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/dom/helpers.ts");
var _a;



/**
 * Allowed children: Inline, FlowText.
 *
 * A stylable container with inline display mode, based on Element from the DOM
 * spec.
 * @see Element
 */
class Inline extends _element__WEBPACK_IMPORTED_MODULE_1__.FlowElement {
    appendChild(node) {
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isInline)(node) && !(0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isText)(node)) {
            throw new Error("Can only add Inline or Text to an Inline.");
        }
        // TODO: support adding InlineBlock
        const appended = super.appendChild(node);
        if ((0,_helpers__WEBPACK_IMPORTED_MODULE_2__.isInline)(node)) {
            this.flowLayout?.onDescendantDidInsertInline(node);
        }
        else {
            this.flowLayout?.onDescendantDidInsertText(node);
        }
        return appended;
    }
    get attributes() {
        return super.attributes;
    }
    set attributes(value) {
        super.attributes = value;
        this.flowLayout?.onDescendantDidUpdateAttributes(this);
    }
    setAttribute(key, value) {
        super.setAttribute(key, value);
        this.flowLayout?.onDescendantDidUpdateAttributes(this);
    }
    deleteAttribute(key) {
        // Don't bail out even if this Inline lacked the attribute, because the way
        // a FlowLayout deletes its own attributes is to call deleteAttribute on
        // all its Inlines and then have them call back up to update the FlowLayout
        // for the given text range that they manage.
        super.deleteAttribute(key);
        this.flowLayout?.onDescendantDidUpdateAttributes(this);
    }
}
_a = Inline;
(() => {
    _a.prototype.nodeName = _constants__WEBPACK_IMPORTED_MODULE_0__.nodeNames.Inline;
})();


/***/ }),

/***/ "./src/dom/node.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlowNode: () => (/* binding */ FlowNode)
/* harmony export */ });
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/dom/tree.ts");

/**
 * The base-level node of the FlowLayout tree, based on Node from the DOM spec.
 * @see Node
 */
class FlowNode {
    get childNodes() {
        return _tree__WEBPACK_IMPORTED_MODULE_0__.tree.childrenIterator(this);
    }
    get parentNode() {
        return _tree__WEBPACK_IMPORTED_MODULE_0__.tree.parent(this);
    }
    appendChild(node) {
        // Unlike the same-named DOM method, symbol-tree will throw rather than
        // reparent a child with an existing parent.
        // https://github.com/jsdom/js-symbol-tree/blob/77dc2877246d91f3b82d0fbc6ae80ef7d5618b80/test/SymbolTree.js#L400
        node.parentNode?.removeChild(node);
        return _tree__WEBPACK_IMPORTED_MODULE_0__.tree.appendChild(this, node);
    }
    removeChild(child) {
        // symbol-tree effectively no-ops if the child already lacks a parentNode.
        return _tree__WEBPACK_IMPORTED_MODULE_0__.tree.remove(child);
    }
}


/***/ }),

/***/ "./src/dom/text.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlowText: () => (/* binding */ FlowText)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/dom/constants.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/dom/helpers.ts");
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/dom/node.ts");
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/dom/tree.ts");
var _a;




/**
 * A leaf node representing a text fragment, based on Text from the DOM spec.
 * @see Text
 */
class FlowText extends _node__WEBPACK_IMPORTED_MODULE_2__.FlowNode {
    constructor(data = "") {
        super();
        this._data = data;
    }
    /**
     * Replaces the original characters of the attributed string without clearing
     * attributes.
     */
    set data(value) {
        const prevData = this._data;
        this._data = value;
        const closestFlowLayout = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.closest)(this, _helpers__WEBPACK_IMPORTED_MODULE_1__.isFlowLayout);
        closestFlowLayout?.onDescendantDidUpdateData(this, prevData, this._data);
    }
    get length() {
        return this.data.length;
    }
    get wholeText() {
        let precedingText = "";
        for (const prevSibling of _tree__WEBPACK_IMPORTED_MODULE_3__.tree.previousSiblingsIterator(this)) {
            if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isText)(prevSibling)) {
                break;
            }
            precedingText = `${prevSibling.data}${precedingText}`;
        }
        let followingText = "";
        for (const nextSibling of _tree__WEBPACK_IMPORTED_MODULE_3__.tree.nextSiblingsIterator(this)) {
            if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.isText)(nextSibling)) {
                break;
            }
            followingText = `${followingText}${nextSibling.data}`;
        }
        return `${precedingText}${this.data}${followingText}`;
    }
    get textContent() {
        return this.data;
    }
    get data() {
        return this._data;
    }
    get nodeValue() {
        return this.data;
    }
}
_a = FlowText;
(() => {
    _a.prototype.nodeName = _constants__WEBPACK_IMPORTED_MODULE_0__.nodeNames.Text;
    _a.prototype.nodeType = _constants__WEBPACK_IMPORTED_MODULE_0__.nodeTypes.TEXT_NODE;
})();


/***/ }),

/***/ "./src/dom/tree.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var symbol_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/symbol-tree/lib/SymbolTree.js");
/* harmony import */ var symbol_tree__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(symbol_tree__WEBPACK_IMPORTED_MODULE_0__);

// We can manage with one central tree, as it has no singular root. Effectively,
// the way to express a "connected" tree is just to designate a certain node as
// being a RootNode (like Document), and saying that a node is "connected" if it
// has a RootNode ancestor.
//
// If a parent is removed from the tree, it still maintains its connections to
// all its children (and they to theirs), so we can express disconnected trees.
// https://github.com/jsdom/js-symbol-tree/blob/77dc2877246d91f3b82d0fbc6ae80ef7d5618b80/test/SymbolTree.js#L363
// https://github.com/jsdom/js-symbol-tree/blob/77dc2877246d91f3b82d0fbc6ae80ef7d5618b80/lib/SymbolTree.js#L645
const tree = new symbol_tree__WEBPACK_IMPORTED_MODULE_0__("flow layout");


/***/ }),

/***/ "./src/main-page.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   navigatingTo: () => (/* binding */ navigatingTo)
/* harmony export */ });
/* harmony import */ var _main_view_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/main-view-model.ts");
/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/test/index.ts");


// CoreText came with macOS Cocoa; TextKit 1 and TextKit 2 came with iOS.
// - https://github.com/objcio/issue-5-textkit/tree/master/TextKitDemo
// - https://news.ycombinator.com/item?id=39603087
//   - https://papereditor.app/dev
//   - https://papereditor.app/internals
//   - https://papereditor.app/apple-rich-text
// - https://www.objc.io/issues/5-ios7/getting-to-know-textkit/
// - https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/TextLayout/TextLayout.html#//apple_ref/doc/uid/10000158i
function navigatingTo(args) {
    const page = args.object;
    page.bindingContext = new _main_view_model__WEBPACK_IMPORTED_MODULE_0__.HelloWorldModel();
    const content = page.content;
    // Once the native view from Core has been populated, insert our view into it.
    content.addEventListener("loaded", () => {
        (0,_test__WEBPACK_IMPORTED_MODULE_1__.runAllTestSuites)({
            root: content.nativeView,
            stageSize: CGRectMake(0, 0, 394, 760),
        });
    });
}


/***/ }),

/***/ "./src/main-view-model.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelloWorldModel: () => (/* binding */ HelloWorldModel)
/* harmony export */ });
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nativescript/core/data/observable/index.js");

class HelloWorldModel extends _nativescript_core__WEBPACK_IMPORTED_MODULE_0__.Observable {
}


/***/ }),

/***/ "./src/test/context.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   context: () => (/* binding */ context),
/* harmony export */   initializeTestContext: () => (/* binding */ initializeTestContext)
/* harmony export */ });
const usedBeforeInitMessage = "Context accessed before initialization.";
const lazyContext = {};
const context = {
    get stageSize() {
        if (!lazyContext.stageSize) {
            throw new Error(usedBeforeInitMessage);
        }
        return lazyContext.stageSize;
    },
    get root() {
        if (!lazyContext.root) {
            throw new Error(usedBeforeInitMessage);
        }
        return lazyContext.root;
    },
    reset() {
        for (const subview of context.root.subviews) {
            subview?.removeFromSuperview();
        }
    },
    setUp(flowLayout) {
        if (context.root.subviews.count) {
            throw new Error("Root still has subviews. Must call reset() before setUp()");
        }
        context.root.addSubview(flowLayout.textView);
    },
};
function initializeTestContext(context) {
    lazyContext.root = context.root;
    lazyContext.stageSize = context.stageSize;
}


/***/ }),

/***/ "./src/test/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runAllTestSuites: () => (/* binding */ runAllTestSuites)
/* harmony export */ });
/* harmony import */ var _setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/test/setup.ts");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/test/context.ts");
/* harmony import */ var _insertion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/test/insertion.ts");



function runAllTestSuites(context) {
    (0,_context__WEBPACK_IMPORTED_MODULE_1__.initializeTestContext)(context);
    _insertion__WEBPACK_IMPORTED_MODULE_2__.test.run();
}


/***/ }),

/***/ "./src/test/insertion.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   test: () => (/* binding */ test)
/* harmony export */ });
/* harmony import */ var uvu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/uvu/dist/index.mjs");
/* harmony import */ var uvu_assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/uvu/assert/index.mjs");
/* harmony import */ var _dom_flow_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/dom/flow-layout.ts");
/* harmony import */ var _dom_inline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/dom/inline.ts");
/* harmony import */ var _dom_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/dom/text.ts");
/* harmony import */ var _dom_inline_block__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/dom/inline-block.ts");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/test/context.ts");







const test = (0,uvu__WEBPACK_IMPORTED_MODULE_0__.suite)("insertion", _context__WEBPACK_IMPORTED_MODULE_6__.context);
test.before.each((context) => {
    context.reset();
    const flowLayout = new _dom_flow_layout__WEBPACK_IMPORTED_MODULE_2__.FlowLayout();
    context.flowLayout = flowLayout;
    context.setUp(flowLayout);
});
// Unstyled tests
test("can append FlowTexts into Inlines", ({ flowLayout }) => {
    // Adding an empty Inline should not change the FlowLayout's text content.
    const inline = new _dom_inline__WEBPACK_IMPORTED_MODULE_3__.Inline();
    flowLayout.appendChild(inline);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription(), "");
    // Adding a FlowText into an already-added Inline should update the FlowLayout.
    inline.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("abc"));
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription(), "abc");
    // Adding subsequent FlowTexts into a solitary Inline should update the FlowLayout.
    inline.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("def"));
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription(), "abcdef");
});
test("can nest Inlines", ({ flowLayout }) => {
    // Adding an empty Inline should not change the FlowLayout's text content.
    const parent = new _dom_inline__WEBPACK_IMPORTED_MODULE_3__.Inline();
    flowLayout.appendChild(parent);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription(), "");
    // Adding a nested empty Inline should not change the FlowLayout's text content.
    const child = new _dom_inline__WEBPACK_IMPORTED_MODULE_3__.Inline();
    parent.appendChild(child);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription(), "");
    // Adding a FlowText into a nested Inline should update the FlowLayout.
    child.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("abc"));
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription(), "abc");
    // Adding subsequent FlowTexts into a neighboured Inline should update the
    // FlowLayout.
    parent.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("def"));
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription(), "abcdef");
});
// Styled tests
test("can style whole FlowLayout", ({ flowLayout }) => {
    flowLayout.setAttribute(NSUnderlineStyleAttributeName, NSUnderlineStyle.Single);
    // Inlines should correctly inherit style from the FlowLayout:
    // … when the Inline already has FlowText.
    const inline = new _dom_inline__WEBPACK_IMPORTED_MODULE_3__.Inline();
    inline.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("abc"));
    flowLayout.appendChild(inline);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[u:abc]");
    // … when adding new FlowTexts to the Inline.
    inline.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("def"));
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[u:abcdef]");
    // … when the FlowLayout deletes a style.
    flowLayout.deleteAttribute(NSUnderlineStyleAttributeName);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[abcdef]");
});
test("can style Inlines", ({ flowLayout }) => {
    flowLayout.setAttribute(NSUnderlineStyleAttributeName, NSUnderlineStyle.Single);
    // Inlines should correctly inherit style from the FlowLayout:
    // … when adding ready-styled, ready-populated Inlines.
    const inline = new _dom_inline__WEBPACK_IMPORTED_MODULE_3__.Inline();
    inline.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("abc"));
    flowLayout.appendChild(inline);
    inline.setAttribute(NSBackgroundColorAttributeName, UIColor.yellowColor);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[bu:abc]");
    // … when adding new FlowTexts to styled Inlines.
    inline.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("def"));
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[bu:abcdef]");
    // … when adding unstyled, ready-populated Inlines.
    const inline2 = new _dom_inline__WEBPACK_IMPORTED_MODULE_3__.Inline();
    inline2.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("ghi"));
    flowLayout.appendChild(inline2);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[bu:abcdef][u:ghi]");
    // … when adding new FlowTexts to unstyled Inlines.
    inline2.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("jkl"));
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[bu:abcdef][u:ghijkl]");
    // … when the FlowLayout deletes a style.
    flowLayout.deleteAttribute(NSUnderlineStyleAttributeName);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[b:abcdef][ghijkl]");
});
test("can style nested Inlines", ({ flowLayout }) => {
    flowLayout.setAttribute(NSUnderlineStyleAttributeName, NSUnderlineStyle.Single);
    // Inlines should correctly inherit style from the FlowLayout:
    // … when adding ready-styled, ready-populated Inlines.
    const inline = new _dom_inline__WEBPACK_IMPORTED_MODULE_3__.Inline();
    inline.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("aaa"));
    flowLayout.appendChild(inline);
    inline.setAttribute(NSBackgroundColorAttributeName, UIColor.yellowColor);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[bu:aaa]");
    // … when nesting ready-styled, ready-populated Inlines.
    const nested = new _dom_inline__WEBPACK_IMPORTED_MODULE_3__.Inline();
    nested.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("bbb"));
    inline.appendChild(nested);
    nested.setAttribute(NSForegroundColorAttributeName, UIColor.redColor);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[bu:aaa][bfu:bbb]");
    // … when adding new FlowTexts to unstyled, nested Inlines.
    nested.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("BBB"));
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[bu:aaa][bfu:bbbBBB]");
    // … when restyling nested Inlines.
    nested.deleteAttribute(NSForegroundColorAttributeName);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(flowLayout.debugDescription({ styles: true }), "[bu:aaabbbBBB]");
});
test.only("can set size of InlineBlocks", ({ flowLayout }) => {
    // Make the text big enough to easily wrap onto a new line, at least on iPhone
    // (in future, we'll make a more robust device-agnostic test, but as we're
    // only asserting on size rather than origin point for now, we're fine)
    flowLayout.setAttribute(NSFontAttributeName, UIFont.systemFontOfSize(36));
    const inline1 = new _dom_inline__WEBPACK_IMPORTED_MODULE_3__.Inline();
    inline1.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("abc def ghi jkl mno pqr stu vwx yz"));
    flowLayout.appendChild(inline1);
    const view = UIView.alloc().initWithFrame(CGRectMake(0, 0, 100, 100));
    view.backgroundColor = UIColor.purpleColor;
    const inlineBlock = new _dom_inline_block__WEBPACK_IMPORTED_MODULE_5__.InlineBlock();
    inlineBlock.view = view;
    console.log(`[test] inlineBlock.attachment.viewToProvide`, inlineBlock.attachment.viewToProvide);
    flowLayout.appendChild(inlineBlock);
    inlineBlock.setSize(60, 60);
    const inline2 = new _dom_inline__WEBPACK_IMPORTED_MODULE_3__.Inline();
    inline2.appendChild(new _dom_text__WEBPACK_IMPORTED_MODULE_4__.FlowText("abc def ghi jkl mno pqr stu vwx yz".toUpperCase()));
    flowLayout.appendChild(inline2);
    // Should be sized correctly before adding view
    // TODO: assert on position once we have a robust way to do so
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(inlineBlock.attachment.bounds.size.width, 60);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(inlineBlock.attachment.bounds.size.height, 60);
    // inlineBlock.view = view;
    // flowLayout.textView.addSubview(inlineBlock.view);
    // Should be sized correctly after adding view too
    // TODO: assert on position once we have a robust way to do so
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(inlineBlock.attachment.bounds.size.width, 60);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(inlineBlock.attachment.bounds.size.height, 60);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(view.bounds.size.width, 60);
    uvu_assert__WEBPACK_IMPORTED_MODULE_1__.is(view.bounds.size.height, 60);
    // Should be sized correctly on subsequent size updates
    // FIXME: get this test to pass.
    // console.log("NOW");
    // inlineBlock.setSize(25, 25);
    // assert.is(inlineBlock.attachment.bounds.size.width, 25);
    // assert.is(inlineBlock.attachment.bounds.size.height, 25);
    // assert.is(view.bounds.size.width, 25);
    // assert.is(view.bounds.size.height, 25);
});


/***/ }),

/***/ "./src/test/setup.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var kleur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/kleur/index.mjs");

// Disable terminal colors (they aren't coming through correctly).
kleur__WEBPACK_IMPORTED_MODULE_0__["default"].enabled = false;


/***/ }),

/***/ "./src/app-root.xml":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* XML-NAMESPACE-LOADER */
const ___XML_NAMESPACE_LOADER_EXPORT___ = "<Frame defaultPage=\"main-page\">\n</Frame>\n"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___XML_NAMESPACE_LOADER_EXPORT___);


/***/ }),

/***/ "./src/main-page.xml":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* XML-NAMESPACE-LOADER */
const ___XML_NAMESPACE_LOADER_EXPORT___ = "<Page xmlns=\"http://schemas.nativescript.org/tns.xsd\" navigatingTo=\"navigatingTo\" backgroundColor=\"gray\">\n  <StackLayout backgroundColor=\"white\" iosOverflowSafeArea=\"false\"></StackLayout>\n</Page>\n"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___XML_NAMESPACE_LOADER_EXPORT___);


/***/ }),

/***/ "~/package.json":
/***/ ((module) => {

"use strict";
module.exports = require("~/package.json");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor"], () => (__webpack_exec__("../../node_modules/@nativescript/core/globals/index.js"), __webpack_exec__("../../node_modules/@nativescript/webpack/dist/stubs/virtual-entry-typescript.js"), __webpack_exec__("../../node_modules/@nativescript/core/bundle-entry-points.js"), __webpack_exec__("./src/app.ts")));
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztJQUV2Qyx1REFBdUQ7SUFFdkQsZ0NBQWdDO0lBQ2hDLHNCQUFzQjtJQUN0QiwrQkFBK0I7SUFDL0IsMkRBQTJEO0lBQzNELDREQUE0RDtJQUM1RCx5Q0FBeUM7SUFDekMsMENBQTBDO0FBQzVDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQ3JObUI7QUFFdEIsa0VBQWtFO0FBQ2xFLDZDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNGbEI7QUFDQTtBQUNBLGlFQUFlLGlDQUFpQzs7Ozs7Ozs7Ozs7Ozs7QUNGaEQ7QUFDQTtBQUNBLGlFQUFlLGlDQUFpQzs7Ozs7Ozs7O0FDSGhEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHJlcG8vZGVtby8uL3NyYy8gc3luYyBcXC4oeG1sJTdDanMlN0MoIiwid2VicGFjazovL0ByZXBvL2RlbW8vLi9zcmMvYXBwLnRzIiwid2VicGFjazovL0ByZXBvL2RlbW8vLi9zcmMvYXBwLmNzcyIsIndlYnBhY2s6Ly9AcmVwby9kZW1vLy4vc3JjL2RvbS9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vQHJlcG8vZGVtby8uL3NyYy9kb20vZWxlbWVudC50cyIsIndlYnBhY2s6Ly9AcmVwby9kZW1vLy4vc3JjL2RvbS9mbG93LWxheW91dC50cyIsIndlYnBhY2s6Ly9AcmVwby9kZW1vLy4vc3JjL2RvbS9oZWxwZXJzLnRzIiwid2VicGFjazovL0ByZXBvL2RlbW8vLi9zcmMvZG9tL2lubGluZS1ibG9jay50cyIsIndlYnBhY2s6Ly9AcmVwby9kZW1vLy4vc3JjL2RvbS9pbmxpbmUudHMiLCJ3ZWJwYWNrOi8vQHJlcG8vZGVtby8uL3NyYy9kb20vbm9kZS50cyIsIndlYnBhY2s6Ly9AcmVwby9kZW1vLy4vc3JjL2RvbS90ZXh0LnRzIiwid2VicGFjazovL0ByZXBvL2RlbW8vLi9zcmMvZG9tL3RyZWUudHMiLCJ3ZWJwYWNrOi8vQHJlcG8vZGVtby8uL3NyYy9tYWluLXBhZ2UudHMiLCJ3ZWJwYWNrOi8vQHJlcG8vZGVtby8uL3NyYy9tYWluLXZpZXctbW9kZWwudHMiLCJ3ZWJwYWNrOi8vQHJlcG8vZGVtby8uL3NyYy90ZXN0L2NvbnRleHQudHMiLCJ3ZWJwYWNrOi8vQHJlcG8vZGVtby8uL3NyYy90ZXN0L2luZGV4LnRzIiwid2VicGFjazovL0ByZXBvL2RlbW8vLi9zcmMvdGVzdC9pbnNlcnRpb24udHMiLCJ3ZWJwYWNrOi8vQHJlcG8vZGVtby8uL3NyYy90ZXN0L3NldHVwLnRzIiwid2VicGFjazovL0ByZXBvL2RlbW8vLi9zcmMvYXBwLXJvb3QueG1sIiwid2VicGFjazovL0ByZXBvL2RlbW8vLi9zcmMvbWFpbi1wYWdlLnhtbCIsIndlYnBhY2s6Ly9AcmVwby9kZW1vL2V4dGVybmFsIGNvbW1vbmpzIFwifi9wYWNrYWdlLmpzb25cIiJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLXJvb3QueG1sXCI6IFwiLi9zcmMvYXBwLXJvb3QueG1sXCIsXG5cdFwiLi9hcHAuY3NzXCI6IFwiLi9zcmMvYXBwLmNzc1wiLFxuXHRcIi4vYXBwLnRzXCI6IFwiLi9zcmMvYXBwLnRzXCIsXG5cdFwiLi9kb20vY29uc3RhbnRzLnRzXCI6IFwiLi9zcmMvZG9tL2NvbnN0YW50cy50c1wiLFxuXHRcIi4vZG9tL2VsZW1lbnQudHNcIjogXCIuL3NyYy9kb20vZWxlbWVudC50c1wiLFxuXHRcIi4vZG9tL2Zsb3ctbGF5b3V0LnRzXCI6IFwiLi9zcmMvZG9tL2Zsb3ctbGF5b3V0LnRzXCIsXG5cdFwiLi9kb20vaGVscGVycy50c1wiOiBcIi4vc3JjL2RvbS9oZWxwZXJzLnRzXCIsXG5cdFwiLi9kb20vaW5saW5lLWJsb2NrLnRzXCI6IFwiLi9zcmMvZG9tL2lubGluZS1ibG9jay50c1wiLFxuXHRcIi4vZG9tL2lubGluZS50c1wiOiBcIi4vc3JjL2RvbS9pbmxpbmUudHNcIixcblx0XCIuL2RvbS9ub2RlLnRzXCI6IFwiLi9zcmMvZG9tL25vZGUudHNcIixcblx0XCIuL2RvbS90ZXh0LnRzXCI6IFwiLi9zcmMvZG9tL3RleHQudHNcIixcblx0XCIuL2RvbS90cmVlLnRzXCI6IFwiLi9zcmMvZG9tL3RyZWUudHNcIixcblx0XCIuL21haW4tcGFnZS50c1wiOiBcIi4vc3JjL21haW4tcGFnZS50c1wiLFxuXHRcIi4vbWFpbi1wYWdlLnhtbFwiOiBcIi4vc3JjL21haW4tcGFnZS54bWxcIixcblx0XCIuL21haW4tdmlldy1tb2RlbC50c1wiOiBcIi4vc3JjL21haW4tdmlldy1tb2RlbC50c1wiLFxuXHRcIi4vdGVzdC9jb250ZXh0LnRzXCI6IFwiLi9zcmMvdGVzdC9jb250ZXh0LnRzXCIsXG5cdFwiLi90ZXN0L2luZGV4LnRzXCI6IFwiLi9zcmMvdGVzdC9pbmRleC50c1wiLFxuXHRcIi4vdGVzdC9pbnNlcnRpb24udHNcIjogXCIuL3NyYy90ZXN0L2luc2VydGlvbi50c1wiLFxuXHRcIi4vdGVzdC9zZXR1cC50c1wiOiBcIi4vc3JjL3Rlc3Qvc2V0dXAudHNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMgc3luYyByZWN1cnNpdmUgXFxcXC4oeG1sJTdDanMlN0MoPzwlMjFcXFxcLmRcXFxcLil0cyU3Q3M/Y3NzKSRcIjsiLCIvKlxuSW4gTmF0aXZlU2NyaXB0LCB0aGUgYXBwLnRzIGZpbGUgaXMgdGhlIGVudHJ5IHBvaW50IHRvIHlvdXIgYXBwbGljYXRpb24uXG5Zb3UgY2FuIHVzZSB0aGlzIGZpbGUgdG8gcGVyZm9ybSBhcHAtbGV2ZWwgaW5pdGlhbGl6YXRpb24sIGJ1dCB0aGUgcHJpbWFyeVxucHVycG9zZSBvZiB0aGUgZmlsZSBpcyB0byBwYXNzIGNvbnRyb2wgdG8gdGhlIGFwcOKAmXMgZmlyc3QgbW9kdWxlLlxuKi9cblxuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tIFwiQG5hdGl2ZXNjcmlwdC9jb3JlXCI7XG5cbkFwcGxpY2F0aW9uLnJ1bih7IG1vZHVsZU5hbWU6IFwiYXBwLXJvb3RcIiB9KTtcblxuLypcbkRvIG5vdCBwbGFjZSBhbnkgY29kZSBhZnRlciB0aGUgYXBwbGljYXRpb24gaGFzIGJlZW4gc3RhcnRlZCBhcyBpdCB3aWxsIG5vdFxuYmUgZXhlY3V0ZWQgb24gaU9TLlxuKi9cbiIsIi8qIENTUzJKU09OICovXG5cbmNvbnN0IF9fX0NTUzJKU09OX0xPQURFUl9FWFBPUlRfX18gPSB7XCJ0eXBlXCI6XCJzdHlsZXNoZWV0XCIsXCJzdHlsZXNoZWV0XCI6e1wicnVsZXNcIjpbe1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiQnV0dG9uLi1wcmltYXJ5XCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiMThcIn1dfV0sXCJwYXJzaW5nRXJyb3JzXCI6W119fVxuZXhwb3J0IGRlZmF1bHQgX19fQ1NTMkpTT05fTE9BREVSX0VYUE9SVF9fX1xuY29uc3QgeyBhZGRUYWdnZWRBZGRpdGlvbmFsQ1NTIH0gPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5hZGRUYWdnZWRBZGRpdGlvbmFsQ1NTKF9fX0NTUzJKU09OX0xPQURFUl9FWFBPUlRfX18sIFwiL1VzZXJzL2phbWllL0RvY3VtZW50cy9naXQvbmF0aXZlc2NyaXB0LWZsb3dsYXlvdXQvYXBwcy9kZW1vL3NyYy9hcHAuY3NzXCIpXG4iLCIvLyBUaGlzIGxvbmVseSBmaWxlIHBheXMgaXRzIHJlbnQgYnkgcmVzb2x2aW5nIGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cblxuZXhwb3J0IGNvbnN0IG5vZGVUeXBlcyA9IHtcbiAgRUxFTUVOVF9OT0RFOiAxLFxuICBURVhUX05PREU6IDMsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgY29uc3Qgbm9kZU5hbWVzID0ge1xuICBGbG93TGF5b3V0OiBcIkNPT1JESU5BVE9SXCIsXG4gIElubGluZTogXCJJTkxJTkVcIixcbiAgSW5saW5lQmxvY2s6IFwiSU5MSU5FQkxPQ0tcIixcbiAgVGV4dDogXCIjdGV4dFwiLFxufSBhcyBjb25zdDtcbiIsImltcG9ydCB7IG5vZGVUeXBlcyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY2xvc2VzdCwgaXNGbG93TGF5b3V0IH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgRmxvd05vZGUgfSBmcm9tIFwiLi9ub2RlXCI7XG5cbi8qKlxuICogQWxsb3dlZCBjaGlsZHJlbjogSW5saW5lLlxuICpcbiAqIEEgc3R5bGFibGUgY29udGFpbmVyLCBiYXNlZCBvbiBFbGVtZW50IGZyb20gdGhlIERPTSBzcGVjLlxuICogQHNlZSBFbGVtZW50XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGbG93RWxlbWVudCBleHRlbmRzIEZsb3dOb2RlIHtcbiAgc3RhdGljIHtcbiAgICB0aGlzLnByb3RvdHlwZS5ub2RlVHlwZSA9IG5vZGVUeXBlcy5FTEVNRU5UX05PREU7XG4gIH1cbiAgbm9kZVR5cGUhOiBudW1iZXI7XG5cbiAgZ2V0IHRleHRDb250ZW50KCkge1xuICAgIGxldCBkYXRhID0gXCJcIjtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuY2hpbGROb2Rlcykge1xuICAgICAgZGF0YSArPSBjaGlsZC50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbiAgZ2V0IG5vZGVWYWx1ZSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dHJpYnV0ZXM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgZ2V0IGF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZXM7XG4gIH1cbiAgc2V0IGF0dHJpYnV0ZXModmFsdWU6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fYXR0cmlidXRlcyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY29yZHMgYW4gTlNBdHRyaWJ1dGVkU3RyaW5nIGF0dHJpYnV0ZSB0byBiZSBhcHBsaWVkLiBTdWJjbGFzc2VzIHNob3VsZFxuICAgKiBpbmZvcm0gdGhlIGNsb3Nlc3QgQmxvY2sgdXBvbiBhbnkgY2hhbmdlLlxuICAgKlxuICAgKiBAcGFyYW0ga2V5IHRoZSBuYW1lIG9mIHRoZSBOU0F0dHJpYnV0ZWRTdHJpbmcgYXR0cmlidXRlIGtleS5cbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSBvZiB0aGUgTlNBdHRyaWJ1dGVkU3RyaW5nIGF0dHJpYnV0ZS5cbiAgICpcbiAgICogU3VwcG9ydGVkIGtleXMgYXJlIGRldGFpbGVkIGhlcmU6XG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24vZm91bmRhdGlvbi9uc2F0dHJpYnV0ZWRzdHJpbmdrZXk/bGFuZ3VhZ2U9b2JqY1xuICAgKi9cbiAgc2V0QXR0cmlidXRlKGtleTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bikge1xuICAgIGlmICghdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZXMgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5hdHRyaWJ1dGVzW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgcmVjb3JkIG9mIGFuIE5TQXR0cmlidXRlZFN0cmluZyBhdHRyaWJ1dGUgdG8gYmUgYXBwbGllZC5cbiAgICogU3ViY2xhc3NlcyBzaG91bGQgaW5mb3JtIHRoZSBjbG9zZXN0IEJsb2NrIHVwb24gYW55IGNoYW5nZS5cbiAgICpcbiAgICogQHBhcmFtIGtleSB0aGUgbmFtZSBvZiB0aGUgTlNBdHRyaWJ1dGVkU3RyaW5nIGF0dHJpYnV0ZSBrZXkuXG4gICAqXG4gICAqIFN1cHBvcnRlZCBrZXlzIGFyZSBkZXRhaWxlZCBoZXJlOlxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL2ZvdW5kYXRpb24vbnNhdHRyaWJ1dGVkc3RyaW5na2V5P2xhbmd1YWdlPW9iamNcbiAgICovXG4gIGRlbGV0ZUF0dHJpYnV0ZShrZXk6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5hdHRyaWJ1dGVzIHx8ICEoa2V5IGluIHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkZWxldGUgdGhpcy5hdHRyaWJ1dGVzW2tleV07XG4gICAgaWYgKCFPYmplY3Qua2V5cyh0aGlzLmF0dHJpYnV0ZXMpLmxlbmd0aCkge1xuICAgICAgZGVsZXRlIHRoaXMuYXR0cmlidXRlcztcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIGNsb3Nlc3QgRmxvd0xheW91dCBhbmNlc3Rvciwgb3IgbnVsbCBpZiB0aGVyZSBpcyBub25lLiAqL1xuICBwcm90ZWN0ZWQgZ2V0IGZsb3dMYXlvdXQoKSB7XG4gICAgcmV0dXJuIGNsb3Nlc3QodGhpcywgaXNGbG93TGF5b3V0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbm9kZU5hbWVzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBGbG93RWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRcIjtcbmltcG9ydCB7IGlzRWxlbWVudCwgaXNJbmxpbmUsIGlzSW5saW5lQmxvY2ssIGlzVGV4dCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmltcG9ydCB0eXBlIHsgSW5saW5lIH0gZnJvbSBcIi4vaW5saW5lXCI7XG5pbXBvcnQgdHlwZSB7IElubGluZUJsb2NrIH0gZnJvbSBcIi4vaW5saW5lLWJsb2NrXCI7XG5pbXBvcnQgdHlwZSB7IEZsb3dOb2RlIH0gZnJvbSBcIi4vbm9kZVwiO1xuaW1wb3J0IHR5cGUgeyBGbG93VGV4dCB9IGZyb20gXCIuL3RleHRcIjtcbmltcG9ydCB7IHRyZWUgfSBmcm9tIFwiLi90cmVlXCI7XG5cbmNvbnN0IHJlY3ljbGVkRW1wdHlPYmplY3QgPSBPYmplY3QuZnJlZXplKHt9KTtcblxuY29uc3QgY3VzdG9tQXR0cmlidXRlTmFtZXMgPSB7XG4gIGlubGluZUJsb2NrOiBcImlubGluZS1ibG9ja1wiLCAvLyBXZWFrUmVmPElubGluZUJsb2NrPlxufSBhcyBjb25zdDtcblxuLyoqXG4gKiBBbGxvd2VkIGNoaWxkcmVuOiBJbmxpbmUsIElubGluZUJsb2NrLlxuICpcbiAqIEEgc3R5bGFibGUgY29udGFpbmVyIHdpdGggYmxvY2sgZGlzcGxheSBtb2RlLCBiYXNlZCBvbiBFbGVtZW50IGZyb20gdGhlIERPTVxuICogc3BlYy5cbiAqIEBzZWUgRWxlbWVudFxuICpcbiAqIFRPRE86XG4gKiAtIFN1cHBvcnQgbmVzdGluZyBCbG9ja3MgaW4gRmxvd0xheW91dC4gVGhpcyB0aGluZyBjb29yZGluYXRlcyBuYXRpdmUgb2JqZWN0c1xuICogICB5ZXQgb25seSB1bmRlcnN0YW5kcyBpbmxpbmVzLiBXZSBzdGlsbCBsYWNrIHRoZSBjb25jZXB0IG9mIGEgQmxvY2ssIHdoaWNoXG4gKiAgIHdlIGNvdWxkIGFjaGlldmUgYnkgcmVjb25jaWxpbmcgdGhyZWUgcGF0dGVybnMgb2YgYmxvY2sgY29udGVudDpcbiAqICAgLSBGaW5hbDogPGlubGluZT5jb250ZW50PC9pbmxpbmU+ICMgSGFzIG5vIDxici8+LlxuICogICAtIEVtcHR5OiA8aW5saW5lPjxpbmxpbmU+PC9pbmxpbmU+PC9pbmxpbmU+ICMgSGFzIG5vIHRleHRzLCBzbyBubyA8YnIvPi5cbiAqICAgLSBQb3B1bGF0ZWQ6IDxpbmxpbmU+Y29udGVudDxici8+PC9pbmxpbmU+LiAjIEhhcyBjb250ZW50IGFuZCA8YnIvPi5cbiAqIC0gUmVhY3QgdG8gcmVzaXplcyBhbmQgdGV4dCBjaGFuZ2VzLlxuICovXG5leHBvcnQgY2xhc3MgRmxvd0xheW91dCBleHRlbmRzIEZsb3dFbGVtZW50IHtcbiAgc3RhdGljIHtcbiAgICB0aGlzLnByb3RvdHlwZS5ub2RlTmFtZSA9IG5vZGVOYW1lcy5GbG93TGF5b3V0O1xuICB9XG5cbiAgbm9kZU5hbWUhOiBzdHJpbmc7XG5cbiAgLy8gT25lIGxheW91dE1hbmFnZXIgY2FuIGhvbGQgbXVsdGlwbGUgdGV4dENvbnRhaW5lcnMuXG4gIC8vXG4gIC8vIEFsbG93cyBvbmUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRleHQgdG8gYmUgc3ByZWFkIGFjcm9zcyBtdWx0aXBsZSB2aWV3cyxcbiAgLy8gZS5nLiB0byBhbGxvdyBwYWdpbmF0ZWQgbGF5b3V0ICh3aXRoIGVhY2ggcGFnZSBjb250YWluaW5nIGEgc2VwYXJhdGUgdmlldykuXG4gIHByaXZhdGUgcmVhZG9ubHkgdGV4dExheW91dE1hbmFnZXIgPSBOU1RleHRMYXlvdXRNYW5hZ2VyLm5ldygpO1xuXG4gIC8vID4gQW4gTlNMYXlvdXRNYW5hZ2VyIHVzZXMgTlNUZXh0Q29udGFpbmVyIHRvIGRldGVybWluZSB3aGVyZSB0byBicmVhayBsaW5lcyxcbiAgLy8gbGF5IG91dCBwb3J0aW9ucyBvZiB0ZXh0LCBhbmQgc28gb24uXG4gIC8vXG4gIC8vIFRoaXMgaXMgdGhlIG9iamVjdCBwYXNzZWQgaW50byB0aGUgVUlUZXh0Vmlldy4gU28sIHRvIHN1cHBvcnQgbmVzdGVkXG4gIC8vIEJsb2NrcyBpbiBvbmUgVUlUZXh0VmlldywgaXQgd291bGQgc2VlbSB0aGF0IHdlIHNob3VsZCBoYXZlIG9uZSBcImFjdGl2ZVwiXG4gIC8vIHRleHRDb250YWluZXIgbWFuYWdlZCBieSB0aGUgdG9wbW9zdCBCbG9jay4gSG93ZXZlciwgc3R5bGVzIHNob3VsZCBzdGlsbFxuICAvLyBjYXNjYWRlIGZyb20gdGhlIHRvcG1vc3QgYmxvY2sgZG93biB0byBhbGwgZGVzY2VuZGFudHMsIGRlc3BpdGUgYmVpbmdcbiAgLy8gZGlmZmVyZW50IHBhcmFncmFwaHMgKHdoaWNoIGlzIGhvdyBIVE1MIHdvcmtzLCBqdXN0IG5vdCBob3cgV29yZCB3b3JrcykuXG4gIHJlYWRvbmx5IHRleHRDb250YWluZXIgPSBOU1RleHRDb250YWluZXIubmV3KCk7XG4gIHJlYWRvbmx5IHRleHRDb250ZW50U3RvcmFnZSA9IE5TVGV4dENvbnRlbnRTdG9yYWdlLm5ldygpO1xuXG4gIHJlYWRvbmx5IHRleHRWaWV3OiBVSVRleHRWaWV3O1xuXG4gIC8vIE5vdCBzdXJlIHdoZXRoZXIgTlNQYXJhZ3JhcGhTdHlsZSB3aWxsIGJlIG11Y2ggaGVscCBmb3IgaW1wbGVtZW50aW5nXG4gIC8vIGludGVyLWJsb2NrIG1hcmdpbi9wYWRkaW5nLCBiZWNhdXNlIGl0IG9ubHkgd29ya3MgaW4gdGhlIGJsb2NrIGRpcmVjdGlvblxuICAvLyBhbmQgb25seSB3aGVuIHRoZSBwYXJlbnQgaXMgYSBCbG9jayAocmF0aGVyIHRoYW4gYSBmb3JlaWduIGxheW91dCBtYW5hZ2VyXG4gIC8vIGxpa2UgYSBHcmlkKS5cbiAgLy8gaHR0cHM6Ly9wYXBlcmVkaXRvci5hcHAvaW50ZXJuYWxzI3N0eWxpbmdcbiAgLy9cbiAgLy8gV2UgY2FuIHN1cmVseSBpbXBsZW1lbnQgcGFkZGluZyB1c2luZyBpbnNldHMsIGhvd2V2ZXI6XG4gIC8vIGh0dHBzOi8vcGFwZXJlZGl0b3IuYXBwL2ludGVybmFscyN0ZXh0LWNvbnRhaW5lci1tYXRoXG5cbiAgY29uc3RydWN0b3IocmVjdCA9IENHUmVjdE1ha2UoMCwgMCwgMzk0LCA3NjApKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGV4dExheW91dE1hbmFnZXIudGV4dENvbnRhaW5lciA9IHRoaXMudGV4dENvbnRhaW5lcjtcbiAgICB0aGlzLnRleHRDb250ZW50U3RvcmFnZS5hZGRUZXh0TGF5b3V0TWFuYWdlcih0aGlzLnRleHRMYXlvdXRNYW5hZ2VyKTtcblxuICAgIHRoaXMudGV4dFZpZXcgPSBVSVRleHRWaWV3LmFsbG9jKCkuaW5pdFdpdGhGcmFtZVRleHRDb250YWluZXIoXG4gICAgICByZWN0LFxuICAgICAgdGhpcy50ZXh0TGF5b3V0TWFuYWdlci50ZXh0Q29udGFpbmVyLFxuICAgICk7XG5cbiAgICAvLyBBdCBhbnkgdGltZSwgd2UgY2FuIHVwZGF0ZSB0aGUgZnJhbWUgd2l0aCwgZS5nLjpcbiAgICAvLyB0aGlzLnRleHRWaWV3LmZyYW1lID0gQ0dSZWN0TWFrZSgwLCAwLCAxMDAsIDc2MCk7XG4gICAgLy9cbiAgICAvLyBTdHJhbmdlbHksIHNldHRpbmcgdGhlIGZyYW1lIHVwZGF0ZXMgdGhlIHdpZHRoIG9mIHRoZSB0ZXh0IGNvbnRhaW5lciBhc1xuICAgIC8vIHNwZWNpZmllZCwgYnV0IHVwZGF0ZXMgdGhlIGhlaWdodCB0byBtYXhfaW50IG9yIHNvbWV0aGluZy5cbiAgfVxuXG4gIGdldCB3aWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0Vmlldy5mcmFtZS5zaXplLndpZHRoO1xuICB9XG4gIHNldCB3aWR0aCh3aWR0aDogbnVtYmVyKSB7XG4gICAgY29uc3Qge1xuICAgICAgb3JpZ2luOiB7IHgsIHkgfSxcbiAgICAgIHNpemU6IHsgaGVpZ2h0IH0sXG4gICAgfSA9IHRoaXMudGV4dFZpZXcuZnJhbWU7XG4gICAgdGhpcy50ZXh0Vmlldy5mcmFtZSA9IENHUmVjdE1ha2UoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAvLyBDYWxsIHRoaXMgdG8gdXBkYXRlIHRoZSBwb3NpdGlvbnMgb2YgYWxsIHZpZXdzIHRyYWNraW5nIGF0dGFjaG1lbnRzLlxuICAgIC8vIFRPRE86IHBlcmhhcHMgYmV0dGVyIHRvIGxpc3RlbiB0byBuYXRpdmUgcmVzaXplcz8gTm90IHN1cmUgeWV0LlxuICAgIHRoaXMub25EZXNjZW5kYW50RGlkVXBkYXRlQXR0YWNobWVudCgpO1xuICB9XG5cbiAgZ2V0IGhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0Vmlldy5mcmFtZS5zaXplLmhlaWdodDtcbiAgfVxuICBzZXQgaGVpZ2h0KGhlaWdodDogbnVtYmVyKSB7XG4gICAgY29uc3Qge1xuICAgICAgb3JpZ2luOiB7IHgsIHkgfSxcbiAgICAgIHNpemU6IHsgd2lkdGggfSxcbiAgICB9ID0gdGhpcy50ZXh0Vmlldy5mcmFtZTtcbiAgICB0aGlzLnRleHRWaWV3LmZyYW1lID0gQ0dSZWN0TWFrZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIC8vIENhbGwgdGhpcyB0byB1cGRhdGUgdGhlIHBvc2l0aW9ucyBvZiBhbGwgdmlld3MgdHJhY2tpbmcgYXR0YWNobWVudHMuXG4gICAgLy8gVE9ETzogcGVyaGFwcyBiZXR0ZXIgdG8gbGlzdGVuIHRvIG5hdGl2ZSByZXNpemVzPyBOb3Qgc3VyZSB5ZXQuXG4gICAgdGhpcy5vbkRlc2NlbmRhbnREaWRVcGRhdGVBdHRhY2htZW50KCk7XG4gIH1cblxuICBkZWJ1Z0Rlc2NyaXB0aW9uKG9wdGlvbnM/OiB7XG4gICAgc3R5bGVzPzogdHJ1ZTtcbiAgICBzaG9ydGVzdEVmZmVjdGl2ZVJhbmdlcz86IHRydWU7XG4gIH0pIHtcbiAgICBpZiAoIW9wdGlvbnM/LnN0eWxlcykge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dENvbnRlbnRTdG9yYWdlLmF0dHJpYnV0ZWRTdHJpbmcuc3RyaW5nO1xuICAgIH1cblxuICAgIGNvbnN0IGZyYWdtZW50cyA9IG5ldyBBcnJheTx7XG4gICAgICBhdHRyaWJ1dGVzPzogTlNEaWN0aW9uYXJ5PHN0cmluZywgdW5rbm93bj47XG4gICAgICB0ZXh0OiBzdHJpbmc7XG4gICAgfT4oKTtcbiAgICAvLyBBbiBleHBsYW5hdGlvbiBvZiBob3cgcmFuZ2VzIHdvcmsgKHRoZXkncmUgcmVsYXRpdmUpOlxuICAgIC8vIGh0dHBzOi8vcGFwZXJlZGl0b3IuYXBwL2ludGVybmFscyNhdHRyaWJ1dGVzXG4gICAgdGhpcy50ZXh0Q29udGVudFN0b3JhZ2UuYXR0cmlidXRlZFN0cmluZy5lbnVtZXJhdGVBdHRyaWJ1dGVzSW5SYW5nZU9wdGlvbnNVc2luZ0Jsb2NrKFxuICAgICAgeyBsb2NhdGlvbjogMCwgbGVuZ3RoOiB0aGlzLnRleHRDb250ZW50U3RvcmFnZS5hdHRyaWJ1dGVkU3RyaW5nLmxlbmd0aCB9LFxuICAgICAgb3B0aW9ucz8uc2hvcnRlc3RFZmZlY3RpdmVSYW5nZXNcbiAgICAgICAgPyBOU0F0dHJpYnV0ZWRTdHJpbmdFbnVtZXJhdGlvbk9wdGlvbnMuTG9uZ2VzdEVmZmVjdGl2ZVJhbmdlTm90UmVxdWlyZWRcbiAgICAgICAgOiAoMCBhcyBOU0F0dHJpYnV0ZWRTdHJpbmdFbnVtZXJhdGlvbk9wdGlvbnMpLFxuICAgICAgKGF0dHJpYnV0ZXMsIHJhbmdlLCBfc3RvcCkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgLy8gICBgZW51bWVyYXRlIHsgbG9jYXRpb246ICR7cmFuZ2UubG9jYXRpb259LCBsZW5ndGg6ICR7cmFuZ2UubGVuZ3RofSB9YCxcbiAgICAgICAgLy8gICBhdHRyaWJ1dGVzLFxuICAgICAgICAvLyApO1xuICAgICAgICBmcmFnbWVudHMucHVzaCh7XG4gICAgICAgICAgYXR0cmlidXRlczpcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgaW5zdGFuY2VvZiBOU0RpY3Rpb25hcnkgPyBhdHRyaWJ1dGVzIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHRleHQ6IHRoaXMudGV4dENvbnRlbnRTdG9yYWdlLmF0dHJpYnV0ZWRTdHJpbmcuYXR0cmlidXRlZFN1YnN0cmluZ0Zyb21SYW5nZShcbiAgICAgICAgICAgIHJhbmdlLFxuICAgICAgICAgICkuc3RyaW5nLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGZvciAoY29uc3QgeyBhdHRyaWJ1dGVzLCB0ZXh0IH0gb2YgZnJhZ21lbnRzKSB7XG4gICAgICBjb25zdCBjb2RlcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgICBhdHRyaWJ1dGVzPy5lbnVtZXJhdGVLZXlzQW5kT2JqZWN0c1VzaW5nQmxvY2soKGtleSkgPT4ge1xuICAgICAgICAvLyBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZXMudmFsdWVGb3JLZXkoa2V5KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYGF0dHJpYnV0ZSAke2tleX1gLCB2YWx1ZSk7XG5cbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlIE5TVW5kZXJsaW5lU3R5bGVBdHRyaWJ1dGVOYW1lOiB7XG4gICAgICAgICAgICAvLyBGb3IgZXhwbGljaXQgTlNVbmRlcmxpbmVTdHlsZS5Ob25lLCBzaG91bGQgd2UgcHVzaCBvciBub3Q/XG4gICAgICAgICAgICBjb2Rlcy5wdXNoKFwidVwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIE5TRm9yZWdyb3VuZENvbG9yQXR0cmlidXRlTmFtZToge1xuICAgICAgICAgICAgY29kZXMucHVzaChcImZcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSBOU0JhY2tncm91bmRDb2xvckF0dHJpYnV0ZU5hbWU6IHtcbiAgICAgICAgICAgIGNvZGVzLnB1c2goXCJiXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElnbm9yZSB0aGVzZVxuICAgICAgICAgIGNhc2UgXCJOU0ZvbnRcIjpcbiAgICAgICAgICBjYXNlIFwiTlNPcmlnaW5hbEZvbnRcIjoge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgR290IHVua25vd24gYXR0cmlidXRlICR7a2V5fWApO1xuICAgICAgICAgICAgY29kZXMucHVzaChcIj9cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGNvZGUgPSBjb2Rlcy5sZW5ndGggPyBgJHtjb2Rlcy5zb3J0KCkuam9pbihcIlwiKX06YCA6IFwiXCI7XG4gICAgICByZXN1bHQgKz0gYFske2NvZGV9JHt0ZXh0fV1gO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzZXRBdHRyaWJ1dGUoa2V5OiBzdHJpbmcsIHZhbHVlOiB1bmtub3duKSB7XG4gICAgc3VwZXIuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBpbmxpbmVzIGFuZCBjYXNjYWRlIHN0eWxlcyBkb3duIHRvIGRlc2NlbmRhbnRzIChhbGxvd2luZ1xuICAgIC8vIGNsb2JiZXJpbmcgYnkgbW9yZSBzcGVjaWZpYyBzdHlsZXMpLlxuICAgIC8vXG4gICAgLy8gQWx0ZXJuYXRpdmVseSwgd2UgY291bGQgZG8gdGhpcyB3aXRob3V0IHJlZmVycmluZyB0byB0aGUgSlMgbW9kZWwgYXQgYWxsXG4gICAgLy8gLSB3ZSBjb3VsZCBqdXN0IGl0ZXJhdGUgdGhyb3VnaCBhbGwgdGhlIGF0dHJpYnV0ZWQgc3RyaW5nIGNoaWxkcmVuXG4gICAgLy8gZGlyZWN0bHksIHNldHRpbmcgdGhlIGF0dHJpYnV0ZSBvbmx5IGlmIGl0J3MgbWlzc2luZy5cbiAgICBmb3IgKGNvbnN0IGlubGluZSBvZiB0aGlzLmNoaWxkTm9kZXMpIHtcbiAgICAgIGlmICghaXNJbmxpbmUoaW5saW5lKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJFeHBlY3RlZCBhbGwgY2hpbGQgbm9kZXMgb2YgQmxvY2sgdG8gYmUgb2YgdHlwZSBJbmxpbmUuXCIsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpbmxpbmUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUF0dHJpYnV0ZShrZXk6IHN0cmluZykge1xuICAgIHN1cGVyLmRlbGV0ZUF0dHJpYnV0ZShrZXkpO1xuXG4gICAgZm9yIChjb25zdCBpbmxpbmUgb2YgdGhpcy5jaGlsZE5vZGVzKSB7XG4gICAgICBpZiAoIWlzSW5saW5lKGlubGluZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiRXhwZWN0ZWQgYWxsIGNoaWxkIG5vZGVzIG9mIEJsb2NrIHRvIGJlIG9mIHR5cGUgSW5saW5lLlwiLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaW5saW5lLmRlbGV0ZUF0dHJpYnV0ZShrZXkpO1xuICAgIH1cbiAgfVxuXG4gIGFwcGVuZENoaWxkPFQgZXh0ZW5kcyBGbG93Tm9kZT4obm9kZTogVCk6IFQge1xuICAgIGlmICghaXNJbmxpbmUobm9kZSkgJiYgIWlzSW5saW5lQmxvY2sobm9kZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJCbG9jayBjYW4gb25seSBhcHBlbmQgY2hpbGQgbm9kZXMgb2YgdHlwZSBJbmxpbmUgb3IgSW5saW5lQmxvY2suXCIsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIE5lZWQgdG8gc2V0IHRoaXMgZnJvbSB0aGUgc3RhcnQsIGFzIHRoZSBUZXh0Tm9kZSBncmFuZGNoaWxkcmVuIHdpbGwgYmVcbiAgICAvLyBjbGltYmluZyB1cCB0byBoZXJlIGR1cmluZyB1cGRhdGVBdHRyaWJ1dGVzXG4gICAgY29uc3QgYXBwZW5kZWQgPSBzdXBlci5hcHBlbmRDaGlsZChub2RlKTtcblxuICAgIGlmIChpc0lubGluZUJsb2NrKG5vZGUpKSB7XG4gICAgICAvLyBJZ25vcmUgZGVzY2VuZGFudHMgb2YgSW5saW5lQmxvY2sgZm9yIG5vdzsgdHJlYXQgYXMgYSBsZWFmIG5vZGUuXG5cbiAgICAgIC8vIENyZWF0ZSBhbiBhdHRyaWJ1dGVkIHN0cmluZywgYW5kIGFmdGVyIGluc2VydGlvbiwgc2V0IHNvbWUgYXR0cmlidXRlc1xuICAgICAgLy8gb24gaXQgdGhhdCBsaW5rIHRoZSBhdHRhY2htZW50IGJhY2sgdG8gaXRzIGNvcnJlc3BvbmRpbmcgSW5saW5lQmxvY2suXG4gICAgICAvL1xuICAgICAgLy8gSW4gZnV0dXJlLCBpZiBuZWVkZWQsIHdlIGNvdWxkIGF2b2lkIHRoZSBjb252ZW5pZW5jZSBtZXRob2QgYW5kXG4gICAgICAvLyBtYW51YWxseSBhc3NlbWJsZSBhbiBhdHRyaWJ1dGVkIHN0cmluZyB3aXRoIGFuIGF0dGFjaG1lbnQ6XG4gICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzU1MTMxNTkvNTk1MTIyNlxuICAgICAgY29uc3QgYXR0cmlidXRlZFN0cmluZyA9XG4gICAgICAgIE5TQXR0cmlidXRlZFN0cmluZy5hdHRyaWJ1dGVkU3RyaW5nV2l0aEF0dGFjaG1lbnQobm9kZS5hdHRhY2htZW50KTtcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy50ZXh0Q29udGVudFN0b3JhZ2UuYXR0cmlidXRlZFN0cmluZy5sZW5ndGg7XG4gICAgICB0aGlzLnRleHRDb250ZW50U3RvcmFnZS50ZXh0U3RvcmFnZS5hcHBlbmRBdHRyaWJ1dGVkU3RyaW5nKFxuICAgICAgICBhdHRyaWJ1dGVkU3RyaW5nLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgYXR0cmlidXRlID1cbiAgICAgICAgdGhpcy50ZXh0Q29udGVudFN0b3JhZ2UuYXR0cmlidXRlZFN0cmluZy5hdHRyaWJ1dGVBdEluZGV4RWZmZWN0aXZlUmFuZ2UoXG4gICAgICAgICAgTlNBdHRhY2htZW50QXR0cmlidXRlTmFtZSxcbiAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICBudWxsIGFzIHVua25vd24gYXMgaW50ZXJvcC5Qb2ludGVyLFxuICAgICAgICApO1xuXG4gICAgICBub2RlLmF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIC4uLm5vZGUuYXR0cmlidXRlcyxcbiAgICAgICAgW05TQXR0YWNobWVudEF0dHJpYnV0ZU5hbWVdOiBhdHRyaWJ1dGUsXG4gICAgICAgIFtjdXN0b21BdHRyaWJ1dGVOYW1lcy5pbmxpbmVCbG9ja106IG5ldyBXZWFrUmVmKG5vZGUpLFxuICAgICAgfTtcbiAgICAgIC8vIEV2ZW4gaWYgaXQgZG9lc24ndCBoYXZlIGEgdmlldyBhc3NvY2lhdGVkIHlldCwgZW5zdXJlIGl0IG9jY3VwaWVzIHRoZVxuICAgICAgLy8gY29ycmVjdCBhbW91bnQgb2Ygc3BhY2UuXG4gICAgICB0aGlzLm9uRGVzY2VuZGFudERpZFVwZGF0ZVNpemUobm9kZSk7XG5cbiAgICAgIC8vIEknbSBzdXJlIE5TVGV4dEF0dGFjaG1lbnRWaWV3UHJvdmlkZXIgaXMgc3VwZXJpb3IsIGJ1dCBJIGNvdWxkbid0IGZpbmRcbiAgICAgIC8vIGFueSBkb2NzIGZvciBpdC5cbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL3Vpa2l0L25zdGV4dGF0dGFjaG1lbnR2aWV3cHJvdmlkZXI/bGFuZ3VhZ2U9b2JqY1xuXG4gICAgICByZXR1cm4gYXBwZW5kZWQ7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjaGlsZE5vZGUgb2Ygbm9kZS5jaGlsZE5vZGVzKSB7XG4gICAgICBpZiAoaXNUZXh0KGNoaWxkTm9kZSkpIHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IHJlc29sdmVBdHRyaWJ1dGVzKG5vZGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAgICAgLy8gICBgW0Zsb3dMYXlvdXRdIEFwcGVuZGluZyBpbmxpbmUgXCIke2NoaWxkTm9kZS5kYXRhfVwiYCxcbiAgICAgICAgLy8gICBhdHRyaWJ1dGVzID8/IFwiPG5vIGF0dHJpYnV0ZXM+XCIsXG4gICAgICAgIC8vICk7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZWRTdHJpbmcgPSBjcmVhdGVBdHRyaWJ1dGVkU3RyaW5nKFxuICAgICAgICAgIGNoaWxkTm9kZS5kYXRhLFxuICAgICAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy50ZXh0Q29udGVudFN0b3JhZ2UudGV4dFN0b3JhZ2UuYXBwZW5kQXR0cmlidXRlZFN0cmluZyhcbiAgICAgICAgICBhdHRyaWJ1dGVkU3RyaW5nLFxuICAgICAgICApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hcHBlbmRDaGlsZChjaGlsZE5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBhcHBlbmRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNjZW5kYW50cyBzaG91bGQgY2FsbCB0aGlzIG1ldGhvZCB1cG9uIGFueSBkYXRhICh0ZXh0KSBjaGFuZ2UsIHNvIHRoYXRcbiAgICogdGhpcyBCbG9jayBpbnN0YW5jZSBjYW4gdXBkYXRlIHRoZSB0ZXh0IGNvbnRlbnRzIGFjcm9zcyB0aGUgY29ycmVzcG9uZGluZ1xuICAgKiByYW5nZS5cbiAgICpcbiAgICogQHBhcmFtIGRlc2NlbmRhbnQgVGhlIGRlc2NlbmRhbnQgRmxvd1RleHQgdGhhdCB1cGRhdGVkLlxuICAgKiBAcGFyYW0gcHJldkRhdGEgVGhlIHByZXZpb3VzIGRhdGEgb2YgdGhhdCBGbG93VGV4dC5cbiAgICogQHBhcmFtIG5ld0RhdGEgVGhlIGRhdGEgdGhhdCBGbG93VGV4dCBoYXMganVzdCB1cGRhdGVkIHRvLlxuICAgKi9cbiAgb25EZXNjZW5kYW50RGlkVXBkYXRlRGF0YShcbiAgICBkZXNjZW5kYW50OiBGbG93VGV4dCxcbiAgICBwcmV2RGF0YTogc3RyaW5nLFxuICAgIG5ld0RhdGE6IHN0cmluZyxcbiAgKSB7XG4gICAgY29uc3Qgc3RhcnRPZmZzZXQgPSBnZXRTdGFydE9mZnNldE9mRGVzY2VuZGFudChkZXNjZW5kYW50LCB0aGlzKTtcblxuICAgIHRoaXMudGV4dENvbnRlbnRTdG9yYWdlLnRleHRTdG9yYWdlLnJlcGxhY2VDaGFyYWN0ZXJzSW5SYW5nZVdpdGhTdHJpbmcoXG4gICAgICB7IGxvY2F0aW9uOiBzdGFydE9mZnNldCwgbGVuZ3RoOiBwcmV2RGF0YS5sZW5ndGggfSxcbiAgICAgIG5ld0RhdGEsXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXNjZW5kYW50cyBzaG91bGQgY2FsbCB0aGlzIG1ldGhvZCB1cG9uIGFueSBpbnNlcnRpb24gb2YgYW4gSW5saW5lLCBzb1xuICAgKiB0aGF0IHRoaXMgQmxvY2sgaW5zdGFuY2UgY2FuIHJlZmxlY3QgdGhlIG5hdGl2ZSBjaGFuZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0gaW5zZXJ0ZWRJbmxpbmUgVGhlIGlubGluZSB0aGF0IHdhcyBqdXN0IGluc2VydGVkLlxuICAgKi9cbiAgb25EZXNjZW5kYW50RGlkSW5zZXJ0SW5saW5lKGluc2VydGVkSW5saW5lOiBJbmxpbmUpIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkTm9kZSBvZiBpbnNlcnRlZElubGluZS5jaGlsZE5vZGVzKSB7XG4gICAgICBpZiAoaXNUZXh0KGNoaWxkTm9kZSkpIHtcbiAgICAgICAgdGhpcy5vbkRlc2NlbmRhbnREaWRJbnNlcnRUZXh0KGNoaWxkTm9kZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzSW5saW5lKGNoaWxkTm9kZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiRXhwZWN0ZWQgQmxvY2sgdG8gaGF2ZSBvbmx5IGNoaWxkIG5vZGVzIG9mIHR5cGUgSW5saW5lIG9yIFRleHQuXCIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMub25EZXNjZW5kYW50RGlkSW5zZXJ0SW5saW5lKGNoaWxkTm9kZSk7XG4gICAgfVxuICB9XG5cbiAgb25EZXNjZW5kYW50RGlkSW5zZXJ0VGV4dChpbnNlcnRlZFRleHQ6IEZsb3dUZXh0KSB7XG4gICAgY29uc3Qgc3RhcnRPZmZzZXQgPSBnZXRTdGFydE9mZnNldE9mRGVzY2VuZGFudChpbnNlcnRlZFRleHQsIHRoaXMpO1xuICAgIGNvbnN0IGF0dHJpYnV0ZWRTdHJpbmcgPSBjcmVhdGVBdHRyaWJ1dGVkU3RyaW5nKFxuICAgICAgaW5zZXJ0ZWRUZXh0LmRhdGEsXG4gICAgICByZXNvbHZlQXR0cmlidXRlcyhpbnNlcnRlZFRleHQpLFxuICAgICk7XG5cbiAgICB0aGlzLnRleHRDb250ZW50U3RvcmFnZS50ZXh0U3RvcmFnZS5pbnNlcnRBdHRyaWJ1dGVkU3RyaW5nQXRJbmRleChcbiAgICAgIGF0dHJpYnV0ZWRTdHJpbmcsXG4gICAgICBzdGFydE9mZnNldCxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2NlbmRhbnRzIHNob3VsZCBjYWxsIHRoaXMgbWV0aG9kIHVwb24gYW55IGF0dHJpYnV0ZSB1cGRhdGUsIHNvIHRoYXQgdGhpc1xuICAgKiBCbG9jayBpbnN0YW5jZSBjYW4gdXBkYXRlIHRoZSBhdHRyaWJ1dGVzIGFjcm9zcyBhbGwgYWZmZWN0ZWQgcmFuZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0gZGVzY2VuZGFudCBUaGUgZGVzY2VuZGFudCBUZXh0Tm9kZSB0aGF0IHVwZGF0ZWQuXG4gICAqIEBwYXJhbSBwcmV2RGF0YSBUaGUgcHJldmlvdXMgZGF0YSBvZiB0aGF0IFRleHROb2RlLlxuICAgKiBAcGFyYW0gbmV3RGF0YSBUaGUgZGF0YSB0aGF0IFRleHROb2RlIGhhcyBqdXN0IHVwZGF0ZWQgdG8uXG4gICAqL1xuICBvbkRlc2NlbmRhbnREaWRVcGRhdGVBdHRyaWJ1dGVzKGRlc2NlbmRhbnQ6IElubGluZSB8IElubGluZUJsb2NrKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFsbCBkZXNjZW5kYW50cyBpbiB0cmVlIG9yZGVyLCB1cGRhdGluZyBhdHRyaWJ1dGVzIHdpdGhpblxuICAgIC8vIHRoZSBhZmZlY3RlZCByYW5nZS5cbiAgICAvL1xuICAgIC8vIFRoZSBzZWFyY2ggaXMgaW5jbHVzaXZlLCBzbyBiZWdpbnMgd2l0aCB0aGUgZGVzY2VuZGFudCBpdHNlbGYuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRyZWUudHJlZUl0ZXJhdG9yKGRlc2NlbmRhbnQpKSB7XG4gICAgICBpZiAoIWlzSW5saW5lKG5vZGUpICYmICFpc0lubGluZUJsb2NrKG5vZGUpKSB7XG4gICAgICAgIC8vIE9ubHkgYWN0IHVwb24gZGVzY2VuZGFudHMgdGhhdCBtYW5hZ2UgYXR0cmlidXRlcy5cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0YXJ0T2Zmc2V0ID0gZ2V0U3RhcnRPZmZzZXRPZkRlc2NlbmRhbnQobm9kZSwgdGhpcyk7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVzID0gcmVzb2x2ZUF0dHJpYnV0ZXMobm9kZSkgPz8gcmVjeWNsZWRFbXB0eU9iamVjdDtcblxuICAgICAgdGhpcy50ZXh0Q29udGVudFN0b3JhZ2UudGV4dFN0b3JhZ2Uuc2V0QXR0cmlidXRlc1JhbmdlKFxuICAgICAgICBhdHRyaWJ1dGVzIGFzIHVua25vd24gYXMgTlNEaWN0aW9uYXJ5PHN0cmluZywgdW5rbm93bj4sXG4gICAgICAgIHtcbiAgICAgICAgICBsb2NhdGlvbjogc3RhcnRPZmZzZXQsXG4gICAgICAgICAgbGVuZ3RoOiBkZXNjZW5kYW50LnRleHRDb250ZW50Lmxlbmd0aCxcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnNvbGUubG9nKGBbb25EZXNjZW5kYW50RGlkVXBkYXRlQXR0cmlidXRlc11gLCB7XG4gICAgICAgIHN0YXJ0T2Zmc2V0LFxuICAgICAgICBsZW5ndGg6IGRlc2NlbmRhbnQudGV4dENvbnRlbnQubGVuZ3RoLFxuICAgICAgICBhdHRyaWJ1dGVzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc2NlbmRhbnQgSW5saW5lQmxvY2tzIHNob3VsZCBjYWxsIHRoaXMgbWV0aG9kIHVwb24gYW55IHNpemUgdXBkYXRlLCBzb1xuICAgKiB0aGF0IHRoaXMgQmxvY2sgaW5zdGFuY2UgY2FuIHVwZGF0ZSB0aGUgc2l6ZSBvZiB0aGUgY29ycmVzcG9uZGluZ1xuICAgKiBOU1RleHRBdHRhY2htZW50LlxuICAgKlxuICAgKiBJZiB3ZSBldmVyIHN1cHBvcnQgbmVzdGluZyBCbG9ja3MgaW50byBCbG9ja3MsIHRoaXMgd2lsbCBuZWVkIHRvIGFjY2VwdFxuICAgKiB0aG9zZSBhcyB3ZWxsLlxuICAgKi9cbiAgb25EZXNjZW5kYW50RGlkVXBkYXRlU2l6ZShkZXNjZW5kYW50OiBJbmxpbmVCbG9jaykge1xuICAgIGNvbnN0IHN0YXJ0T2Zmc2V0ID0gZ2V0U3RhcnRPZmZzZXRPZkRlc2NlbmRhbnQoZGVzY2VuZGFudCk7XG4gICAgY29uc29sZS5sb2coYG9uRGVzY2VuZGFudERpZFVwZGF0ZVNpemUgc3RhcnRPZmZzZXQ6ICR7c3RhcnRPZmZzZXR9YCk7XG5cbiAgICB0aGlzLnRleHRDb250ZW50U3RvcmFnZS5hdHRyaWJ1dGVkU3RyaW5nLmVudW1lcmF0ZUF0dHJpYnV0ZUluUmFuZ2VPcHRpb25zVXNpbmdCbG9jayhcbiAgICAgIE5TQXR0YWNobWVudEF0dHJpYnV0ZU5hbWUsXG4gICAgICAvLyBUaGlzIGZ1bmN0aW9uIG9ubHkgcnVucyBpZiBsZW5ndGggaXMgYXQgbGVhc3QgMS5cbiAgICAgIHsgbG9jYXRpb246IHN0YXJ0T2Zmc2V0LCBsZW5ndGg6IDEgfSxcbiAgICAgIDAgYXMgTlNBdHRyaWJ1dGVkU3RyaW5nRW51bWVyYXRpb25PcHRpb25zLFxuICAgICAgKFxuICAgICAgICAvKipcbiAgICAgICAgICogSW4gcHJhY3RpY2UsIHRoaXMgd2lsbCBiZSB0aGUgYXR0cmlidXRlLiBJdCdkIG9ubHkgYmUgbnVsbCBpZiB3ZVxuICAgICAgICAgKiBpdGVyYXRlZCBvbnRvIGEgY2hhcmFjdGVyIGxhY2tpbmcgdGhlIGF0dHJpYnV0ZS5cbiAgICAgICAgICovXG4gICAgICAgIGF0dHJpYnV0ZTogTlNPYmplY3QgfCBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogV2hpbGUgYHJhbmdlLmxlbmd0aGAgd2lsbCBiZSBjb25zdGFudCwgYHJhbmdlLmxvY2F0aW9uYCBpbmNyZW1lbnRzIGFzXG4gICAgICAgICAqIHRoZSBmdW5jdGlvbiBlbnVtZXJhdGVzIG92ZXIgdGhlIHN0cmluZy5cbiAgICAgICAgICovXG4gICAgICAgIHJhbmdlOiBOU1JhbmdlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQW4gaW5vdXQgcmVmZXJlbmNlIHRvIGFsbG93IHVzIHRvIHN0b3AgZW51bWVyYXRpb24gZWFybHkuIEknbSBub3RcbiAgICAgICAgICogc3VyZSB3aGF0IHRoZSBOYXRpdmVTY3JpcHQgQVBJIGlzIGZvciB1c2luZyBpdCwgc28gd2UnbGwgYmUgbGVhdmluZ1xuICAgICAgICAgKiBpdCBmb3Igbm93LiBGb3J0dW5hdGVseSwgd2UncmUgb25seSBlbnVtZXJhdGluZyBvbmUgY2hhcmFjdGVyIGFueXdheS5cbiAgICAgICAgICovXG4gICAgICAgIF9zdG9wOiBpbnRlcm9wLlBvaW50ZXIgfCBpbnRlcm9wLlJlZmVyZW5jZTxib29sZWFuPixcbiAgICAgICkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgRW51bWVyYXRpbmcgYXR0cmlidXRlIGF0IHJhbmdlICR7cmFuZ2UubG9jYXRpb259IC8gJHtzdGFydE9mZnNldCArIHJhbmdlLmxlbmd0aCAtIDF9YCxcbiAgICAgICAgICBhdHRyaWJ1dGUsXG4gICAgICAgICk7XG4gICAgICAgIGlmICghKGF0dHJpYnV0ZSBpbnN0YW5jZW9mIE5TVGV4dEF0dGFjaG1lbnQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGF2ZSB0byBzZXQgYm91bmRzIHJhdGhlciB0aGFuIGJvdW5kcy5zaXplLlxuICAgICAgICBhdHRyaWJ1dGUuYm91bmRzID0gQ0dSZWN0TWFrZShcbiAgICAgICAgICAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgZGVzY2VuZGFudC53aWR0aCxcbiAgICAgICAgICBkZXNjZW5kYW50LmhlaWdodCxcbiAgICAgICAgKTtcbiAgICAgICAgLy8gYXR0cmlidXRlLmZyYW1lO1xuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGJvdW5kcyBmb3IgdGhlIGF0dGFjaG1lbnQgb2YgdGhlIGdpdmVuIGRlc2NlbmRhbnQsIG9yIGFsbFxuICAgKiBkZXNjZW5kYW50cyBpZiBubyBkZXNjZW5kYW50IGlzIHBhc3NlZC5cbiAgICovXG4gIG9uRGVzY2VuZGFudERpZFVwZGF0ZUF0dGFjaG1lbnQoZGVzY2VuZGFudD86IElubGluZUJsb2NrKSB7XG4gICAgY29uc3QgZW51bWVyYXRpb25SYW5nZSA9IGRlc2NlbmRhbnRcbiAgICAgID8geyBsb2NhdGlvbjogZ2V0U3RhcnRPZmZzZXRPZkRlc2NlbmRhbnQoZGVzY2VuZGFudCksIGxlbmd0aDogMSB9XG4gICAgICA6IHtcbiAgICAgICAgICBsb2NhdGlvbjogMCxcbiAgICAgICAgICBsZW5ndGg6IHRoaXMudGV4dENvbnRlbnRTdG9yYWdlLmF0dHJpYnV0ZWRTdHJpbmcubGVuZ3RoLFxuICAgICAgICB9O1xuXG4gICAgdGhpcy50ZXh0Q29udGVudFN0b3JhZ2UuYXR0cmlidXRlZFN0cmluZy5lbnVtZXJhdGVBdHRyaWJ1dGVzSW5SYW5nZU9wdGlvbnNVc2luZ0Jsb2NrKFxuICAgICAgZW51bWVyYXRpb25SYW5nZSxcbiAgICAgIDAgYXMgTlNBdHRyaWJ1dGVkU3RyaW5nRW51bWVyYXRpb25PcHRpb25zLFxuICAgICAgKGF0dHJpYnV0ZXMsIHJhbmdlLCBwb2ludGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBhdHRyaWJ1dGVzLnZhbHVlRm9yS2V5KE5TQXR0YWNobWVudEF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICBpZiAoIShhdHRhY2htZW50IGluc3RhbmNlb2YgTlNUZXh0QXR0YWNobWVudCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbmxpbmVCbG9jayA9IChcbiAgICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlRm9yS2V5KFxuICAgICAgICAgICAgY3VzdG9tQXR0cmlidXRlTmFtZXMuaW5saW5lQmxvY2ssXG4gICAgICAgICAgKSBhcyBXZWFrUmVmPElubGluZUJsb2NrPlxuICAgICAgICApLmRlcmVmKCk7XG4gICAgICAgIGlmICghaW5saW5lQmxvY2spIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVbmV4cGVjdGVkLiBTdG9wIHRoZSBzZWFyY2guXG4gICAgICAgIGlmIChkZXNjZW5kYW50ICYmIGlubGluZUJsb2NrICE9PSBkZXNjZW5kYW50KSB7XG4gICAgICAgICAgKHBvaW50ZXIgYXMgaW50ZXJvcC5SZWZlcmVuY2U8Ym9vbGVhbj4pLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdG9wIHRoZSBzZWFyY2guXG4gICAgICAgIChwb2ludGVyIGFzIGludGVyb3AuUmVmZXJlbmNlPGJvb2xlYW4+KS52YWx1ZSA9IHRydWU7XG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBXYWxrcyB1cCB0aGUgRE9NIGFuY2VzdG9ycyAoaW5jbHVkaW5nIHNlbGYpIHRvIHJlc29sdmUgdGhlIGF0dHJpYnV0ZXMgdG9cbiAqIGFwcGx5LlxuICovXG5mdW5jdGlvbiByZXNvbHZlQXR0cmlidXRlcyhub2RlOiBGbG93VGV4dCB8IElubGluZSkge1xuICBsZXQgYXR0cmlidXRlczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCB1bmRlZmluZWQ7XG5cbiAgZm9yIChjb25zdCBhbmNlc3RvciBvZiB0cmVlLmFuY2VzdG9yc0l0ZXJhdG9yKG5vZGUpIGFzIEdlbmVyYXRvcjxcbiAgICBGbG93VGV4dCB8IElubGluZVxuICA+KSB7XG4gICAgLy8gY29uc29sZS5sb2coXG4gICAgLy8gICBgW3Jlc29sdmVBdHRyaWJ1dGVzXSBjbGltYkFuY2VzdG9ycyg8JHtpbmxpbmUubm9kZU5hbWUudG9Mb3dlckNhc2UoKX0+JHtpbmxpbmUudGV4dENvbnRlbnR9PC8ke2lubGluZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpfT4pOiA8JHthbmNlc3Rvci5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpfT4ke2FuY2VzdG9yLnRleHRDb250ZW50fTwvJHthbmNlc3Rvci5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpfT5gLFxuICAgIC8vICk7XG5cbiAgICBpZiAoIWlzRWxlbWVudChhbmNlc3RvcikgfHwgIWFuY2VzdG9yLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIGFuY2VzdG9yLmF0dHJpYnV0ZXMpIHtcbiAgICAgIC8vIEEgY2hpbGQgYWxyZWFkeSBoYXMgdGhlIGF0dHJpYnV0ZSwgc28gZGlzcmVnYXJkIHRoZSBwYXJlbnQncyB2YWx1ZS5cbiAgICAgIGlmIChhdHRyaWJ1dGVzPy5ba2V5XSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgIH1cbiAgICAgIGF0dHJpYnV0ZXNba2V5XSA9IGFuY2VzdG9yLmF0dHJpYnV0ZXNba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXR0cmlidXRlcztcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXR0cmlidXRlZFN0cmluZyhcbiAgdGV4dDogc3RyaW5nLFxuICBhdHRyaWJ1dGVzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4pIHtcbiAgY29uc3QgcGxhY2Vob2xkZXJTdHJpbmcgPSBOU0F0dHJpYnV0ZWRTdHJpbmcuYWxsb2MoKTtcblxuICByZXR1cm4gYXR0cmlidXRlc1xuICAgID8gcGxhY2Vob2xkZXJTdHJpbmcuaW5pdFdpdGhTdHJpbmdBdHRyaWJ1dGVzKFxuICAgICAgICB0ZXh0LFxuICAgICAgICBhdHRyaWJ1dGVzIGFzIHVua25vd24gYXMgTlNEaWN0aW9uYXJ5PHN0cmluZywgdW5rbm93bj4sXG4gICAgICApXG4gICAgOiBwbGFjZWhvbGRlclN0cmluZy5pbml0V2l0aFN0cmluZyh0ZXh0KTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzdGFydE9mZnNldCBvZiB0aGUgZ2l2ZW4gZGVzY2VuZGFudCBieSB3YWxraW5nIGluIHRyZWUgb3JkZXJcbiAqIGNvdW50aW5nIGFsbCB0ZXh0IGxlYWRpbmcgdXAgdG8gaXQuXG4gKlxuICogQHBhcmFtIGRlc2NlbmRhbnQgVGhlIGRlc2NlbmRhbnQgdG8gY291bnQgdGhlIHRleHQgb2Zmc2V0IHVwIHVudGlsLlxuICogQHBhcmFtIHRyYXZlcnNlVW50aWxBbmNlc3RvciBPcHRpb25hbC4gU3BlY2lmaWVzIHRoZSBhbmNlc3RvciB0byBzdG9wXG4gKiAgIHRyYXZlcnNhbCBhdC4gU2libGluZ3MgcHJlY2VkaW5nIHRoZSBhbmNlc3RvciwgYW5kIGFuY2VzdG9ycyBvZiB0aGF0XG4gKiAgIGFuY2VzdG9yLCB3aWxsIG5vdCBjb250cmlidXRlIHRvd2FyZHMgdGhlIHN0YXJ0T2Zmc2V0LiBJbiBvdGhlciB3b3JkcyxcbiAqICAgdGhlIHN0YXJ0T2Zmc2V0IGJlZ2lucyBmcm9tIHRoaXMgbm9kZS5cbiAqXG4gKiAgIEhhdmVuJ3QgeWV0IGRlY2lkZWQgaG93IHRvIGhhbmRsZSBuZXN0ZWQgYmxvY2tzIChpcyBpdCBwb3NzaWJsZSB0byBuZXN0XG4gKiAgIE5TVGV4dFN0b3JhZ2UsIG9yIGRvIHdlIGhhdmUgdG8gbWVyZ2UgdGhlbSwgb3IgaXMgaXQgaW1wb3NzaWJsZSB0b1xuICogICBzdXBwb3J0IGFsdG9nZXRoZXI/KS4gV2hlbiB0aGUgdGltZSBjb21lcywgdGhlIGNvbnN1bWVyIHdpbGwgaGF2ZSB0b1xuICogICB3b3JrIG91dCB3aGV0aGVyIHRvIHN0b3AgdHJhdmVyc2FsIGF0IHRoZSBjbG9zZXN0IEJsb2NrIG9yIHdhbGsgdGhlXG4gKiAgIHdob2xlIHRyZWUuXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiBnZXRTdGFydE9mZnNldE9mRGVzY2VuZGFudChcbiAgZGVzY2VuZGFudDogRmxvd05vZGUsXG4gIHRyYXZlcnNlVW50aWxBbmNlc3Rvcj86IEZsb3dMYXlvdXQsXG4pIHtcbiAgbGV0IHN0YXJ0T2Zmc2V0ID0gMDtcblxuICAvLyBXYWxrIHVwIHRoZSBpbmNsdXNpdmUgYW5jZXN0b3JzIG9mIHRoZSBkZXNjZW5kYW50IChpLmUuIGZpcnN0IHRoZVxuICAvLyBkZXNjZW5kYW50LCB0aGVuIGl0cyBhbmNlc3RvcnMpLiBGb3IgZWFjaCBhbmNlc3RvciB0cmF2ZXJzZWQsIGNvdW50IHRoZVxuICAvLyBwcmVjZWRpbmcgdGV4dCBsZW5ndGguXG4gIC8vXG4gIC8vIEFzaWRlOiBXZSBjb3VsZCBhbHRlcm5hdGl2ZWx5IGltcGxlbWVudCB0aGlzIGJ5IHJ1bm5pbmdcbiAgLy8gYHRyZWUucHJlY2VkaW5nKHByZWNlZGluZ05vZGUsIHsgcm9vdDogdHJhdmVyc2VVbnRpbEFuY2VzdG9yIH0pYCB1bnRpbFxuICAvLyBgcHJlY2VkaW5nTm9kZWAgYmVjb21lcyBudWxsIGZyb20gaGl0dGluZyB0aGUgcm9vdC4gVW5saWtlIHRoaXMgbWV0aG9kLFxuICAvLyBgdHJlZS5wcmVjZWRpbmcoKWAgYnVyaWVzIGludG8gZWxlbWVudHMsIHNvIHdlJ2QgcHJvYmFibHkgZmlsdGVyIG9uXG4gIC8vIFRleHROb2RlcyBhbmQgY29sbGVjdCBgdGV4dE5vZGUuZGF0YWAgcmF0aGVyIHRoYW4ganVzdCBjYWxsaW5nXG4gIC8vIGBub2RlLnRleHRDb250ZW50YCBvbiBhbGwgcHJldmlvdXMgc2libGluZ3MuXG4gIGZvciAoY29uc3QgYW5jZXN0b3Igb2YgdHJlZS5hbmNlc3RvcnNJdGVyYXRvcihkZXNjZW5kYW50KSkge1xuICAgIGlmIChhbmNlc3RvciA9PT0gdHJhdmVyc2VVbnRpbEFuY2VzdG9yKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByZXZTaWJsaW5nIG9mIHRyZWUucHJldmlvdXNTaWJsaW5nc0l0ZXJhdG9yKGFuY2VzdG9yKSkge1xuICAgICAgc3RhcnRPZmZzZXQgKz0gcHJldlNpYmxpbmcudGV4dENvbnRlbnQ/Lmxlbmd0aCA/PyAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdGFydE9mZnNldDtcbn1cbiIsImltcG9ydCB7IG5vZGVOYW1lcywgbm9kZVR5cGVzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgdHlwZSB7IEZsb3dFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudFwiO1xuaW1wb3J0IHR5cGUgeyBGbG93TGF5b3V0IH0gZnJvbSBcIi4vZmxvdy1sYXlvdXRcIjtcbmltcG9ydCB0eXBlIHsgSW5saW5lIH0gZnJvbSBcIi4vaW5saW5lXCI7XG5pbXBvcnQgdHlwZSB7IElubGluZUJsb2NrIH0gZnJvbSBcIi4vaW5saW5lLWJsb2NrXCI7XG5pbXBvcnQgdHlwZSB7IEZsb3dOb2RlIH0gZnJvbSBcIi4vbm9kZVwiO1xuaW1wb3J0IHR5cGUgeyBGbG93VGV4dCB9IGZyb20gXCIuL3RleHRcIjtcbmltcG9ydCB7IHRyZWUgfSBmcm9tIFwiLi90cmVlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0PFQgZXh0ZW5kcyBGbG93Tm9kZT4oXG4gIHNlbGY6IEZsb3dOb2RlLFxuICB0ZXN0OlxuICAgIHwgKChhbmNlc3RvcjogdW5rbm93bikgPT4gYW5jZXN0b3IgaXMgVClcbiAgICB8ICgoYW5jZXN0b3I6IEZsb3dOb2RlKSA9PiBib29sZWFuKSxcbikge1xuICBmb3IgKGNvbnN0IGFuY2VzdG9yIG9mIHRyZWUuYW5jZXN0b3JzSXRlcmF0b3Ioc2VsZikpIHtcbiAgICBpZiAodGVzdChhbmNlc3RvcikpIHtcbiAgICAgIHJldHVybiBhbmNlc3RvciBhcyBUO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24qIGNsaW1iQW5jZXN0b3JzKG5vZGU6IEZsb3dOb2RlKSB7XG4gIGxldCBwYXJlbnROb2RlOiBGbG93Tm9kZSB8IG51bGwgPSBub2RlLnBhcmVudE5vZGU7XG4gIHdoaWxlIChwYXJlbnROb2RlKSB7XG4gICAgeWllbGQgcGFyZW50Tm9kZTtcbiAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiogZm9sbG93aW5nSXRlcmF0b3Iobm9kZTogRmxvd05vZGUpIHtcbiAgbGV0IGZvbGxvd2luZzogRmxvd05vZGUgfCBudWxsID0gdHJlZS5mb2xsb3dpbmcobm9kZSk7XG4gIHdoaWxlIChmb2xsb3dpbmcpIHtcbiAgICB5aWVsZCBmb2xsb3dpbmc7XG4gICAgZm9sbG93aW5nID0gdHJlZS5mb2xsb3dpbmcoZm9sbG93aW5nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbGVtZW50KHZhbHVlOiBGbG93Tm9kZSk6IHZhbHVlIGlzIEZsb3dFbGVtZW50IHtcbiAgcmV0dXJuIHZhbHVlLm5vZGVUeXBlID09PSBub2RlVHlwZXMuRUxFTUVOVF9OT0RFO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzVGV4dCh2YWx1ZTogRmxvd05vZGUpOiB2YWx1ZSBpcyBGbG93VGV4dCB7XG4gIHJldHVybiB2YWx1ZS5ub2RlVHlwZSA9PT0gbm9kZVR5cGVzLlRFWFRfTk9ERTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0lubGluZSh2YWx1ZTogRmxvd05vZGUpOiB2YWx1ZSBpcyBJbmxpbmUge1xuICByZXR1cm4gdmFsdWUubm9kZU5hbWUgPT09IG5vZGVOYW1lcy5JbmxpbmU7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNGbG93TGF5b3V0KHZhbHVlOiBGbG93Tm9kZSk6IHZhbHVlIGlzIEZsb3dMYXlvdXQge1xuICByZXR1cm4gdmFsdWUubm9kZU5hbWUgPT09IG5vZGVOYW1lcy5GbG93TGF5b3V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5saW5lQmxvY2sodmFsdWU6IEZsb3dOb2RlKTogdmFsdWUgaXMgSW5saW5lQmxvY2sge1xuICByZXR1cm4gdmFsdWUubm9kZU5hbWUgPT09IG5vZGVOYW1lcy5JbmxpbmVCbG9jaztcbn1cbiIsImltcG9ydCB7IG5vZGVOYW1lcyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgRmxvd0VsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50XCI7XG5cbi8qKlxuICogQWxsb3dlZCBjaGlsZHJlbjogbm90IHN1cmUgeWV0LlxuICpcbiAqIEEgc3R5bGFibGUgY29udGFpbmVyIHdpdGggaW5saW5lLWJsb2NrIGRpc3BsYXkgbW9kZSwgYmFzZWQgb24gRWxlbWVudCBmcm9tXG4gKiB0aGUgRE9NIHNwZWMuXG4gKiBAc2VlIEVsZW1lbnRcbiAqL1xuZXhwb3J0IGNsYXNzIElubGluZUJsb2NrIGV4dGVuZHMgRmxvd0VsZW1lbnQge1xuICBzdGF0aWMge1xuICAgIHRoaXMucHJvdG90eXBlLm5vZGVOYW1lID0gbm9kZU5hbWVzLklubGluZUJsb2NrO1xuICAgIHRoaXMucHJvdG90eXBlLl93aWR0aCA9IDA7XG4gICAgdGhpcy5wcm90b3R5cGUuX2hlaWdodCA9IDA7XG4gIH1cblxuICAvLyBGb3Igbm93LCBhc3N1bWVzIElubGluZUJsb2NrIGlzIGEgbGVhZiBub2RlLlxuICAvL1xuICAvLyBgTlNBdHRyaWJ1dGVkU3RyaW5nLmF0dHJpYnV0ZWRTdHJpbmdXaXRoQXR0YWNobWVudChhdHRhY2htZW50KWAgcHJvZHVjZXMgYVxuICAvLyBzaW5nbGUtY2hhcmFjdGVyIHN0cmluZyB3aXRoIHRoaXMgY29kZXBvaW50LCBzbyB3ZSByZWZsZWN0IHRoYXQgaGVyZS5cbiAgZ2V0IHRleHRDb250ZW50KCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludCg2NV81MzIpO1xuICB9XG5cbiAgbm9kZU5hbWUhOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfd2lkdGghOiBudW1iZXI7XG4gIGdldCB3aWR0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gIH1cbiAgc2V0IHdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xuICAgIHRoaXMuZmxvd0xheW91dD8ub25EZXNjZW5kYW50RGlkVXBkYXRlU2l6ZSh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hlaWdodCE6IG51bWJlcjtcbiAgZ2V0IGhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICB9XG4gIHNldCBoZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuICAgIHRoaXMuZmxvd0xheW91dD8ub25EZXNjZW5kYW50RGlkVXBkYXRlU2l6ZSh0aGlzKTtcbiAgfVxuXG4gIHNldFNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmZsb3dMYXlvdXQ/Lm9uRGVzY2VuZGFudERpZFVwZGF0ZVNpemUodGhpcyk7XG4gIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gc3VwZXIuYXR0cmlidXRlcztcbiAgfVxuICBzZXQgYXR0cmlidXRlcyh2YWx1ZTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCB1bmRlZmluZWQpIHtcbiAgICBzdXBlci5hdHRyaWJ1dGVzID0gdmFsdWU7XG5cbiAgICB0aGlzLmZsb3dMYXlvdXQ/Lm9uRGVzY2VuZGFudERpZFVwZGF0ZUF0dHJpYnV0ZXModGhpcyk7XG4gIH1cbiAgc2V0QXR0cmlidXRlKGtleTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bikge1xuICAgIHN1cGVyLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcblxuICAgIHRoaXMuZmxvd0xheW91dD8ub25EZXNjZW5kYW50RGlkVXBkYXRlQXR0cmlidXRlcyh0aGlzKTtcbiAgfVxuICBkZWxldGVBdHRyaWJ1dGUoa2V5OiBzdHJpbmcpIHtcbiAgICBzdXBlci5kZWxldGVBdHRyaWJ1dGUoa2V5KTtcblxuICAgIHRoaXMuZmxvd0xheW91dD8ub25EZXNjZW5kYW50RGlkVXBkYXRlQXR0cmlidXRlcyh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9wbGFjZWhvbGRlckltYWdlPzogVUlJbWFnZTtcbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IHBsYWNlaG9sZGVyIGltYWdlIGlzIGEgZ2VuZXJpYyBmaWxlIGljb24uIEl0J3MgaW5jb252ZW5pZW50XG4gICAqIGJlY2F1c2UgaXQgaGFzIGFuIGludHJpbnNpYyBjb250ZW50IHNpemUsIG1lYW5pbmcgdGhhdCBzZXR0aW5nIGl0cyB3aWR0aFxuICAgKiBhbmQgaGVpZ2h0IHRvIDB4MCBkb2Vzbid0IGFjdHVhbGx5IHNpemUgdGhlIGltYWdlIHRvIDB4MCwgd2hpY2ggbWVzc2VzIHVwXG4gICAqIGFsbCBsYXlvdXQgY2FsY3VsYXRpb25zLlxuICAgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0IHBsYWNlaG9sZGVySW1hZ2UoKSB7XG4gICAgaWYgKCF0aGlzLl9wbGFjZWhvbGRlckltYWdlKSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlckltYWdlID0gVUlJbWFnZS5uZXcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVySW1hZ2U7XG4gIH1cblxuICBwcml2YXRlIF9hdHRhY2htZW50PzogQXR0YWNobWVudDtcbiAgZ2V0IGF0dGFjaG1lbnQoKTogQXR0YWNobWVudCB7XG4gICAgaWYgKCF0aGlzLl9hdHRhY2htZW50KSB7XG4gICAgICBjb25zdCBhdHRhY2htZW50ID0gQXR0YWNobWVudC5uZXcoKSBhcyBBdHRhY2htZW50O1xuICAgICAgYXR0YWNobWVudC5hbGxvd3NUZXh0QXR0YWNobWVudFZpZXcgPSB0cnVlO1xuICAgICAgYXR0YWNobWVudC5ib3VuZHMgPSBDR1JlY3RNYWtlKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIHRoaXMuX2F0dGFjaG1lbnQgPSBhdHRhY2htZW50O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYXR0YWNobWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXc/OiBVSVZpZXc7XG4gIGdldCB2aWV3KCk6IFVJVmlldyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXc7XG4gIH1cbiAgc2V0IHZpZXcodmFsdWU6IFVJVmlldyB8IHVuZGVmaW5lZCkge1xuICAgIC8vIE5vIG5lZWQgdG8gY2hhbmdlIHdpZHRoIGFuZCBoZWlnaHQgdG8gMCB3aGVuIHZpZXcgaXMgc2V0IHRvIGB1bmRlZmluZWRgLFxuICAgIC8vIGFzIGBkaXNwbGF5OiBpbmxpbmUtYmxvY2tgIHJlc3BlY3RzIHdpZHRoIGFuZCBoZWlnaHQgcmVnYXJkbGVzcyBvZlxuICAgIC8vIGNvbnRlbnRzLCB1bmxpa2UgYGRpc3BsYXk6IGlubGluZWAgd2hpY2ggaWdub3JlcyB0aGVtIGFsdG9nZXRoZXIuXG4gICAgdGhpcy5fdmlldyA9IHZhbHVlO1xuICAgIHRoaXMuYXR0YWNobWVudC52aWV3VG9Qcm92aWRlID0gdmFsdWU7XG4gICAgdGhpcy5mbG93TGF5b3V0Py5vbkRlc2NlbmRhbnREaWRVcGRhdGVBdHRhY2htZW50KHRoaXMpO1xuICB9XG59XG5cbi8vIEBOYXRpdmVDbGFzc1xuLy8gY2xhc3MgQXR0YWNobWVudFZpZXcgZXh0ZW5kcyBVSVZpZXcge1xuLy8gICBkcmF3UmVjdChfcmVjdDogQ0dSZWN0KTogdm9pZCB7XG4vLyAgICAgY29uc29sZS5sb2coXCJbQXR0YWNobWVudFZpZXcuZHJhd1JlY3RdXCIpO1xuLy8gICAgIFVJQ29sb3Iuc3lzdGVtQmFja2dyb3VuZENvbG9yLnNldCgpO1xuLy8gICAgIFVJUmVjdEZpbGwodGhpcy5ib3VuZHMpO1xuLy8gICAgIGNvbnN0IGZpbGxDb2xvciA9IFVJQ29sb3Iuc3lzdGVtQmx1ZUNvbG9yO1xuLy8gICAgIGZpbGxDb2xvci5zZXQoKTtcbi8vICAgICBjb25zdCBjb3JuZXJSYWRpdXMgPSAxMDtcbi8vICAgICBVSUJlemllclBhdGguYmV6aWVyUGF0aFdpdGhSb3VuZGVkUmVjdENvcm5lclJhZGl1cyhcbi8vICAgICAgIHRoaXMuYm91bmRzLFxuLy8gICAgICAgY29ybmVyUmFkaXVzLFxuLy8gICAgICk7XG4vLyAgICAgY29uc3QgbGFiZWxUZXh0ID0gTlNBdHRyaWJ1dGVkU3RyaW5nLmFsbG9jKCkuaW5pdFdpdGhTdHJpbmcoXCJoZXlhXCIpO1xuLy8gICAgIGNvbnN0IGxhYmVsU2l6ZSA9IGxhYmVsVGV4dC5zaXplKCk7XG4vLyAgICAgY29uc3QgeVBhZGRpbmcgPSAwO1xuLy8gICAgIGxhYmVsVGV4dC5kcmF3QXRQb2ludCh7XG4vLyAgICAgICB4OiB0aGlzLmJvdW5kcy5vcmlnaW4ueCArICh0aGlzLmJvdW5kcy5zaXplLndpZHRoIC0gbGFiZWxTaXplLndpZHRoKSAvIDIsXG4vLyAgICAgICB5OiB0aGlzLmJvdW5kcy5vcmlnaW4ueSArIHlQYWRkaW5nLFxuLy8gICAgIH0pO1xuLy8gICB9XG4vLyB9XG5cbkBOYXRpdmVDbGFzc1xuY2xhc3MgQXR0YWNobWVudFZpZXdQcm92aWRlciBleHRlbmRzIE5TVGV4dEF0dGFjaG1lbnRWaWV3UHJvdmlkZXIge1xuICBwcml2YXRlIF92aWV3VG9Qcm92aWRlPzogVUlWaWV3O1xuICBnZXQgdmlld1RvUHJvdmlkZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld1RvUHJvdmlkZSE7XG4gIH1cbiAgc2V0IHZpZXdUb1Byb3ZpZGUodmlldzogVUlWaWV3KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLl92aWV3VG9Qcm92aWRlID0gdmlldztcbiAgfVxuXG4gIGluaXRXaXRoVGV4dEF0dGFjaG1lbnRQYXJlbnRWaWV3VGV4dExheW91dE1hbmFnZXJMb2NhdGlvbihcbiAgICB0ZXh0QXR0YWNobWVudDogTlNUZXh0QXR0YWNobWVudCxcbiAgICBwYXJlbnRWaWV3OiBVSVZpZXcsXG4gICAgdGV4dExheW91dE1hbmFnZXI6IE5TVGV4dExheW91dE1hbmFnZXIsXG4gICAgbG9jYXRpb246IE5TVGV4dExvY2F0aW9uLFxuICApOiB0aGlzIHtcbiAgICBzdXBlci5pbml0V2l0aFRleHRBdHRhY2htZW50UGFyZW50Vmlld1RleHRMYXlvdXRNYW5hZ2VyTG9jYXRpb24oXG4gICAgICB0ZXh0QXR0YWNobWVudCxcbiAgICAgIHBhcmVudFZpZXcsXG4gICAgICB0ZXh0TGF5b3V0TWFuYWdlcixcbiAgICAgIGxvY2F0aW9uLFxuICAgICk7XG4gICAgdGhpcy50cmFja3NUZXh0QXR0YWNobWVudFZpZXdCb3VuZHMgPSB0cnVlO1xuXG4gICAgY29uc29sZS5sb2coXCJTQU5JVFlcIik7XG4gICAgLy8gRm9yY2UgbG9hZFZpZXcgdG8gYmUgY2FsbGVkIGJ5IGFjY2Vzc2luZyB0aGUgdmlld1xuICAgIC8vIGNvbnNvbGUubG9nKFwidmlld1Byb3ZpZGVyLnZpZXdcIiwgdGhpcy52aWV3KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gLy8gbG9hZFZpZXcgaXMgbmV2ZXIgY2FsbGVkOlxuICAvLyAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83MDQ4MTI3OS90cmFja3N0ZXh0YXR0YWNobWVudHZpZXdib3VuZHMtbm90LXdvcmtpbmdcbiAgLy8gbG9hZFZpZXcoKTogdm9pZCB7XG4gIC8vICAgY29uc29sZS5sb2coXCJbQXR0YWNobWVudFZpZXdQcm92aWRlci5sb2FkVmlld11cIik7XG4gIC8vICAgLy8gY29uc3QgYXR0YWNobWVudFZpZXcgPSBBdHRhY2htZW50Vmlldy5uZXcoKSBhcyBBdHRhY2htZW50VmlldztcbiAgLy8gICAvLyB0aGlzLnZpZXcgPSBhdHRhY2htZW50VmlldztcblxuICAvLyAgIC8vIGNvbnN0IGltZyA9IFVJSW1hZ2Uuc3lzdGVtSW1hZ2VOYW1lZChcImZhY2Uuc21pbGluZ1wiKTtcbiAgLy8gICAvLyBjb25zdCBpbWFnZVZpZXcgPSBVSUltYWdlVmlldy5hbGxvYygpLmluaXRXaXRoSW1hZ2UoaW1nKTtcbiAgLy8gICAvLyB0aGlzLnZpZXcgPSBpbWFnZVZpZXc7XG5cbiAgLy8gICBpZiAodGhpcy52aWV3VG9Qcm92aWRlKSB7XG4gIC8vICAgICB0aGlzLnZpZXcgPSB0aGlzLnZpZXdUb1Byb3ZpZGU7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gdGhpcyBuZXZlciBnZXRzIGNhbGxlZCwgZWl0aGVyLCB3aGljaCBpcyB0aGUgd2hvbGUgcHJvYmxlbS5cbiAgYXR0YWNobWVudEJvdW5kc0ZvckF0dHJpYnV0ZXNMb2NhdGlvblRleHRDb250YWluZXJQcm9wb3NlZExpbmVGcmFnbWVudFBvc2l0aW9uKFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgX2F0dHJpYnV0ZXM6IE5TRGljdGlvbmFyeTxzdHJpbmcsIGFueT4sXG4gICAgX2xvY2F0aW9uOiBOU1RleHRMb2NhdGlvbixcbiAgICBfdGV4dENvbnRhaW5lcjogTlNUZXh0Q29udGFpbmVyLFxuICAgIF9wcm9wb3NlZExpbmVGcmFnbWVudDogQ0dSZWN0LFxuICAgIF9wb3NpdGlvbjogQ0dQb2ludCxcbiAgKTogQ0dSZWN0IHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwiW0F0dGFjaG1lbnRWaWV3UHJvdmlkZXIuYXR0YWNobWVudEJvdW5kc0ZvckF0dHJpYnV0ZXNMb2NhdGlvblRleHRDb250YWluZXJQcm9wb3NlZExpbmVGcmFnbWVudFBvc2l0aW9uXVwiLFxuICAgICAgeyBcInRoaXMudmlld1wiOiB0aGlzLnZpZXcsIFwidGhpcy52aWV3LmJvdW5kc1wiOiB0aGlzLnZpZXcuYm91bmRzIH0sXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy52aWV3Py5ib3VuZHMgPz8gQ0dSZWN0WmVybztcbiAgfVxufVxuXG5ATmF0aXZlQ2xhc3NcbmNsYXNzIEF0dGFjaG1lbnQgZXh0ZW5kcyBOU1RleHRBdHRhY2htZW50IHtcbiAgdmlld1RvUHJvdmlkZT86IFVJVmlldztcbiAgdmlld1Byb3ZpZGVyRm9yUGFyZW50Vmlld0xvY2F0aW9uVGV4dENvbnRhaW5lcihcbiAgICBwYXJlbnRWaWV3OiBVSVZpZXcsXG4gICAgbG9jYXRpb246IE5TVGV4dExvY2F0aW9uLFxuICAgIHRleHRDb250YWluZXI6IE5TVGV4dENvbnRhaW5lcixcbiAgKTogTlNUZXh0QXR0YWNobWVudFZpZXdQcm92aWRlciB7XG4gICAgY29uc3Qgdmlld1Byb3ZpZGVyID1cbiAgICAgIEF0dGFjaG1lbnRWaWV3UHJvdmlkZXIuYWxsb2MoKS5pbml0V2l0aFRleHRBdHRhY2htZW50UGFyZW50Vmlld1RleHRMYXlvdXRNYW5hZ2VyTG9jYXRpb24oXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHBhcmVudFZpZXcsXG4gICAgICAgIHRleHRDb250YWluZXI/LnRleHRMYXlvdXRNYW5hZ2VyLFxuICAgICAgICBsb2NhdGlvbixcbiAgICAgICk7XG5cbiAgICByZXR1cm4gdmlld1Byb3ZpZGVyO1xuICB9XG59XG4iLCJpbXBvcnQgeyBub2RlTmFtZXMgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IEZsb3dFbGVtZW50IH0gZnJvbSBcIi4vZWxlbWVudFwiO1xuaW1wb3J0IHsgaXNJbmxpbmUsIGlzVGV4dCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmltcG9ydCB0eXBlIHsgRmxvd05vZGUgfSBmcm9tIFwiLi9ub2RlXCI7XG5cbi8qKlxuICogQWxsb3dlZCBjaGlsZHJlbjogSW5saW5lLCBGbG93VGV4dC5cbiAqXG4gKiBBIHN0eWxhYmxlIGNvbnRhaW5lciB3aXRoIGlubGluZSBkaXNwbGF5IG1vZGUsIGJhc2VkIG9uIEVsZW1lbnQgZnJvbSB0aGUgRE9NXG4gKiBzcGVjLlxuICogQHNlZSBFbGVtZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBJbmxpbmUgZXh0ZW5kcyBGbG93RWxlbWVudCB7XG4gIHN0YXRpYyB7XG4gICAgdGhpcy5wcm90b3R5cGUubm9kZU5hbWUgPSBub2RlTmFtZXMuSW5saW5lO1xuICB9XG5cbiAgbm9kZU5hbWUhOiBzdHJpbmc7XG5cbiAgYXBwZW5kQ2hpbGQ8VCBleHRlbmRzIEZsb3dOb2RlPihub2RlOiBUKTogVCB7XG4gICAgaWYgKCFpc0lubGluZShub2RlKSAmJiAhaXNUZXh0KG5vZGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4gb25seSBhZGQgSW5saW5lIG9yIFRleHQgdG8gYW4gSW5saW5lLlwiKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBzdXBwb3J0IGFkZGluZyBJbmxpbmVCbG9ja1xuXG4gICAgY29uc3QgYXBwZW5kZWQgPSBzdXBlci5hcHBlbmRDaGlsZChub2RlKTtcblxuICAgIGlmIChpc0lubGluZShub2RlKSkge1xuICAgICAgdGhpcy5mbG93TGF5b3V0Py5vbkRlc2NlbmRhbnREaWRJbnNlcnRJbmxpbmUobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmxvd0xheW91dD8ub25EZXNjZW5kYW50RGlkSW5zZXJ0VGV4dChub2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXBwZW5kZWQ7XG4gIH1cblxuICBnZXQgYXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gc3VwZXIuYXR0cmlidXRlcztcbiAgfVxuICBzZXQgYXR0cmlidXRlcyh2YWx1ZTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCB1bmRlZmluZWQpIHtcbiAgICBzdXBlci5hdHRyaWJ1dGVzID0gdmFsdWU7XG5cbiAgICB0aGlzLmZsb3dMYXlvdXQ/Lm9uRGVzY2VuZGFudERpZFVwZGF0ZUF0dHJpYnV0ZXModGhpcyk7XG4gIH1cbiAgc2V0QXR0cmlidXRlKGtleTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bikge1xuICAgIHN1cGVyLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcblxuICAgIHRoaXMuZmxvd0xheW91dD8ub25EZXNjZW5kYW50RGlkVXBkYXRlQXR0cmlidXRlcyh0aGlzKTtcbiAgfVxuICBkZWxldGVBdHRyaWJ1dGUoa2V5OiBzdHJpbmcpIHtcbiAgICAvLyBEb24ndCBiYWlsIG91dCBldmVuIGlmIHRoaXMgSW5saW5lIGxhY2tlZCB0aGUgYXR0cmlidXRlLCBiZWNhdXNlIHRoZSB3YXlcbiAgICAvLyBhIEZsb3dMYXlvdXQgZGVsZXRlcyBpdHMgb3duIGF0dHJpYnV0ZXMgaXMgdG8gY2FsbCBkZWxldGVBdHRyaWJ1dGUgb25cbiAgICAvLyBhbGwgaXRzIElubGluZXMgYW5kIHRoZW4gaGF2ZSB0aGVtIGNhbGwgYmFjayB1cCB0byB1cGRhdGUgdGhlIEZsb3dMYXlvdXRcbiAgICAvLyBmb3IgdGhlIGdpdmVuIHRleHQgcmFuZ2UgdGhhdCB0aGV5IG1hbmFnZS5cbiAgICBzdXBlci5kZWxldGVBdHRyaWJ1dGUoa2V5KTtcblxuICAgIHRoaXMuZmxvd0xheW91dD8ub25EZXNjZW5kYW50RGlkVXBkYXRlQXR0cmlidXRlcyh0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgdHJlZSB9IGZyb20gXCIuL3RyZWVcIjtcblxuLyoqXG4gKiBUaGUgYmFzZS1sZXZlbCBub2RlIG9mIHRoZSBGbG93TGF5b3V0IHRyZWUsIGJhc2VkIG9uIE5vZGUgZnJvbSB0aGUgRE9NIHNwZWMuXG4gKiBAc2VlIE5vZGVcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZsb3dOb2RlIHtcbiAgZ2V0IGNoaWxkTm9kZXMoKSB7XG4gICAgcmV0dXJuIHRyZWUuY2hpbGRyZW5JdGVyYXRvcih0aGlzKTtcbiAgfVxuICBnZXQgcGFyZW50Tm9kZSgpIHtcbiAgICByZXR1cm4gdHJlZS5wYXJlbnQodGhpcyk7XG4gIH1cbiAgYWJzdHJhY3QgZ2V0IHRleHRDb250ZW50KCk6IHN0cmluZyB8IG51bGw7XG4gIGFic3RyYWN0IGdldCBub2RlVmFsdWUoKTogc3RyaW5nIHwgbnVsbDtcbiAgYWJzdHJhY3Qgbm9kZU5hbWU6IHN0cmluZztcbiAgYWJzdHJhY3Qgbm9kZVR5cGU6IG51bWJlcjtcblxuICBhcHBlbmRDaGlsZDxUIGV4dGVuZHMgRmxvd05vZGU+KG5vZGU6IFQpOiBUIHtcbiAgICAvLyBVbmxpa2UgdGhlIHNhbWUtbmFtZWQgRE9NIG1ldGhvZCwgc3ltYm9sLXRyZWUgd2lsbCB0aHJvdyByYXRoZXIgdGhhblxuICAgIC8vIHJlcGFyZW50IGEgY2hpbGQgd2l0aCBhbiBleGlzdGluZyBwYXJlbnQuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pzZG9tL2pzLXN5bWJvbC10cmVlL2Jsb2IvNzdkYzI4NzcyNDZkOTFmM2I4MmQwZmJjNmFlODBlZjdkNTYxOGI4MC90ZXN0L1N5bWJvbFRyZWUuanMjTDQwMFxuICAgIG5vZGUucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQobm9kZSk7XG5cbiAgICByZXR1cm4gdHJlZS5hcHBlbmRDaGlsZCh0aGlzLCBub2RlKTtcbiAgfVxuICByZW1vdmVDaGlsZDxUIGV4dGVuZHMgRmxvd05vZGU+KGNoaWxkOiBUKTogVCB7XG4gICAgLy8gc3ltYm9sLXRyZWUgZWZmZWN0aXZlbHkgbm8tb3BzIGlmIHRoZSBjaGlsZCBhbHJlYWR5IGxhY2tzIGEgcGFyZW50Tm9kZS5cblxuICAgIHJldHVybiB0cmVlLnJlbW92ZShjaGlsZCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IG5vZGVOYW1lcywgbm9kZVR5cGVzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBjbG9zZXN0LCBpc0Zsb3dMYXlvdXQsIGlzVGV4dCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmltcG9ydCB7IEZsb3dOb2RlIH0gZnJvbSBcIi4vbm9kZVwiO1xuaW1wb3J0IHsgdHJlZSB9IGZyb20gXCIuL3RyZWVcIjtcblxuLyoqXG4gKiBBIGxlYWYgbm9kZSByZXByZXNlbnRpbmcgYSB0ZXh0IGZyYWdtZW50LCBiYXNlZCBvbiBUZXh0IGZyb20gdGhlIERPTSBzcGVjLlxuICogQHNlZSBUZXh0XG4gKi9cbmV4cG9ydCBjbGFzcyBGbG93VGV4dCBleHRlbmRzIEZsb3dOb2RlIHtcbiAgc3RhdGljIHtcbiAgICB0aGlzLnByb3RvdHlwZS5ub2RlTmFtZSA9IG5vZGVOYW1lcy5UZXh0O1xuICAgIHRoaXMucHJvdG90eXBlLm5vZGVUeXBlID0gbm9kZVR5cGVzLlRFWFRfTk9ERTtcbiAgfVxuXG4gIHByaXZhdGUgX2RhdGE6IHN0cmluZztcbiAgY29uc3RydWN0b3IoZGF0YSA9IFwiXCIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSBvcmlnaW5hbCBjaGFyYWN0ZXJzIG9mIHRoZSBhdHRyaWJ1dGVkIHN0cmluZyB3aXRob3V0IGNsZWFyaW5nXG4gICAqIGF0dHJpYnV0ZXMuXG4gICAqL1xuICBzZXQgZGF0YSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcHJldkRhdGEgPSB0aGlzLl9kYXRhO1xuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcblxuICAgIGNvbnN0IGNsb3Nlc3RGbG93TGF5b3V0ID0gY2xvc2VzdCh0aGlzLCBpc0Zsb3dMYXlvdXQpO1xuICAgIGNsb3Nlc3RGbG93TGF5b3V0Py5vbkRlc2NlbmRhbnREaWRVcGRhdGVEYXRhKHRoaXMsIHByZXZEYXRhLCB0aGlzLl9kYXRhKTtcbiAgfVxuXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aDtcbiAgfVxuXG4gIGdldCB3aG9sZVRleHQoKTogc3RyaW5nIHtcbiAgICBsZXQgcHJlY2VkaW5nVGV4dCA9IFwiXCI7XG4gICAgZm9yIChjb25zdCBwcmV2U2libGluZyBvZiB0cmVlLnByZXZpb3VzU2libGluZ3NJdGVyYXRvcih0aGlzKSkge1xuICAgICAgaWYgKCFpc1RleHQocHJldlNpYmxpbmcpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcHJlY2VkaW5nVGV4dCA9IGAke3ByZXZTaWJsaW5nLmRhdGF9JHtwcmVjZWRpbmdUZXh0fWA7XG4gICAgfVxuXG4gICAgbGV0IGZvbGxvd2luZ1RleHQgPSBcIlwiO1xuICAgIGZvciAoY29uc3QgbmV4dFNpYmxpbmcgb2YgdHJlZS5uZXh0U2libGluZ3NJdGVyYXRvcih0aGlzKSkge1xuICAgICAgaWYgKCFpc1RleHQobmV4dFNpYmxpbmcpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZm9sbG93aW5nVGV4dCA9IGAke2ZvbGxvd2luZ1RleHR9JHtuZXh0U2libGluZy5kYXRhfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3ByZWNlZGluZ1RleHR9JHt0aGlzLmRhdGF9JHtmb2xsb3dpbmdUZXh0fWA7XG4gIH1cblxuICBnZXQgdGV4dENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxuXG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgZ2V0IG5vZGVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG4gIG5vZGVOYW1lITogc3RyaW5nO1xuICBub2RlVHlwZSE6IG51bWJlcjtcbn1cbiIsImltcG9ydCAqIGFzIFN5bWJvbFRyZWUgZnJvbSBcInN5bWJvbC10cmVlXCI7XG5cbmltcG9ydCB0eXBlIHsgRmxvd05vZGUgfSBmcm9tIFwiLi9ub2RlXCI7XG5cbi8vIFdlIGNhbiBtYW5hZ2Ugd2l0aCBvbmUgY2VudHJhbCB0cmVlLCBhcyBpdCBoYXMgbm8gc2luZ3VsYXIgcm9vdC4gRWZmZWN0aXZlbHksXG4vLyB0aGUgd2F5IHRvIGV4cHJlc3MgYSBcImNvbm5lY3RlZFwiIHRyZWUgaXMganVzdCB0byBkZXNpZ25hdGUgYSBjZXJ0YWluIG5vZGUgYXNcbi8vIGJlaW5nIGEgUm9vdE5vZGUgKGxpa2UgRG9jdW1lbnQpLCBhbmQgc2F5aW5nIHRoYXQgYSBub2RlIGlzIFwiY29ubmVjdGVkXCIgaWYgaXRcbi8vIGhhcyBhIFJvb3ROb2RlIGFuY2VzdG9yLlxuLy9cbi8vIElmIGEgcGFyZW50IGlzIHJlbW92ZWQgZnJvbSB0aGUgdHJlZSwgaXQgc3RpbGwgbWFpbnRhaW5zIGl0cyBjb25uZWN0aW9ucyB0b1xuLy8gYWxsIGl0cyBjaGlsZHJlbiAoYW5kIHRoZXkgdG8gdGhlaXJzKSwgc28gd2UgY2FuIGV4cHJlc3MgZGlzY29ubmVjdGVkIHRyZWVzLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2pzZG9tL2pzLXN5bWJvbC10cmVlL2Jsb2IvNzdkYzI4NzcyNDZkOTFmM2I4MmQwZmJjNmFlODBlZjdkNTYxOGI4MC90ZXN0L1N5bWJvbFRyZWUuanMjTDM2M1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2pzZG9tL2pzLXN5bWJvbC10cmVlL2Jsb2IvNzdkYzI4NzcyNDZkOTFmM2I4MmQwZmJjNmFlODBlZjdkNTYxOGI4MC9saWIvU3ltYm9sVHJlZS5qcyNMNjQ1XG5leHBvcnQgY29uc3QgdHJlZSA9IG5ldyBTeW1ib2xUcmVlPEZsb3dOb2RlPihcImZsb3cgbGF5b3V0XCIpO1xuIiwiaW1wb3J0IHR5cGUgeyBFdmVudERhdGEsIFBhZ2UgfSBmcm9tIFwiQG5hdGl2ZXNjcmlwdC9jb3JlXCI7XG5cbmltcG9ydCB7IEhlbGxvV29ybGRNb2RlbCB9IGZyb20gXCIuL21haW4tdmlldy1tb2RlbFwiO1xuaW1wb3J0IHsgcnVuQWxsVGVzdFN1aXRlcyB9IGZyb20gXCIuL3Rlc3RcIjtcblxuLy8gQ29yZVRleHQgY2FtZSB3aXRoIG1hY09TIENvY29hOyBUZXh0S2l0IDEgYW5kIFRleHRLaXQgMiBjYW1lIHdpdGggaU9TLlxuLy8gLSBodHRwczovL2dpdGh1Yi5jb20vb2JqY2lvL2lzc3VlLTUtdGV4dGtpdC90cmVlL21hc3Rlci9UZXh0S2l0RGVtb1xuLy8gLSBodHRwczovL25ld3MueWNvbWJpbmF0b3IuY29tL2l0ZW0/aWQ9Mzk2MDMwODdcbi8vICAgLSBodHRwczovL3BhcGVyZWRpdG9yLmFwcC9kZXZcbi8vICAgLSBodHRwczovL3BhcGVyZWRpdG9yLmFwcC9pbnRlcm5hbHNcbi8vICAgLSBodHRwczovL3BhcGVyZWRpdG9yLmFwcC9hcHBsZS1yaWNoLXRleHRcbi8vIC0gaHR0cHM6Ly93d3cub2JqYy5pby9pc3N1ZXMvNS1pb3M3L2dldHRpbmctdG8ta25vdy10ZXh0a2l0L1xuLy8gLSBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vbGlicmFyeS9hcmNoaXZlL2RvY3VtZW50YXRpb24vQ29jb2EvQ29uY2VwdHVhbC9UZXh0TGF5b3V0L1RleHRMYXlvdXQuaHRtbCMvL2FwcGxlX3JlZi9kb2MvdWlkLzEwMDAwMTU4aVxuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xuICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgSGVsbG9Xb3JsZE1vZGVsKCk7XG5cbiAgY29uc3QgY29udGVudCA9IHBhZ2UuY29udGVudDtcblxuICAvLyBPbmNlIHRoZSBuYXRpdmUgdmlldyBmcm9tIENvcmUgaGFzIGJlZW4gcG9wdWxhdGVkLCBpbnNlcnQgb3VyIHZpZXcgaW50byBpdC5cbiAgY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkXCIsICgpID0+IHtcbiAgICBydW5BbGxUZXN0U3VpdGVzKHtcbiAgICAgIHJvb3Q6IGNvbnRlbnQubmF0aXZlVmlldyxcbiAgICAgIHN0YWdlU2l6ZTogQ0dSZWN0TWFrZSgwLCAwLCAzOTQsIDc2MCksXG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJAbmF0aXZlc2NyaXB0L2NvcmVcIjtcblxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGRNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge31cbiIsImltcG9ydCB0eXBlIHsgRmxvd0xheW91dCB9IGZyb20gXCIuLi9kb20vZmxvdy1sYXlvdXRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb250ZXh0IHtcbiAgc3RhZ2VTaXplOiBDR1JlY3Q7XG4gIHJvb3Q6IFVJVmlldztcblxuICByZXNldCgpOiB2b2lkO1xuICBzZXRVcChmbG93TGF5b3V0OiBGbG93TGF5b3V0KTogdm9pZDtcbn1cblxuY29uc3QgdXNlZEJlZm9yZUluaXRNZXNzYWdlID0gXCJDb250ZXh0IGFjY2Vzc2VkIGJlZm9yZSBpbml0aWFsaXphdGlvbi5cIjtcblxuY29uc3QgbGF6eUNvbnRleHQ6IFBhcnRpYWw8Q29udGV4dD4gPSB7fTtcblxuZXhwb3J0IGNvbnN0IGNvbnRleHQ6IENvbnRleHQgPSB7XG4gIGdldCBzdGFnZVNpemUoKTogQ0dSZWN0IHtcbiAgICBpZiAoIWxhenlDb250ZXh0LnN0YWdlU2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHVzZWRCZWZvcmVJbml0TWVzc2FnZSk7XG4gICAgfVxuICAgIHJldHVybiBsYXp5Q29udGV4dC5zdGFnZVNpemU7XG4gIH0sXG4gIGdldCByb290KCk6IFVJVmlldyB7XG4gICAgaWYgKCFsYXp5Q29udGV4dC5yb290KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IodXNlZEJlZm9yZUluaXRNZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIGxhenlDb250ZXh0LnJvb3Q7XG4gIH0sXG4gIHJlc2V0KCkge1xuICAgIGZvciAoY29uc3Qgc3VidmlldyBvZiBjb250ZXh0LnJvb3Quc3Vidmlld3MpIHtcbiAgICAgIHN1YnZpZXc/LnJlbW92ZUZyb21TdXBlcnZpZXcoKTtcbiAgICB9XG4gIH0sXG5cbiAgc2V0VXAoZmxvd0xheW91dDogRmxvd0xheW91dCkge1xuICAgIGlmIChjb250ZXh0LnJvb3Quc3Vidmlld3MuY291bnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJSb290IHN0aWxsIGhhcyBzdWJ2aWV3cy4gTXVzdCBjYWxsIHJlc2V0KCkgYmVmb3JlIHNldFVwKClcIixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29udGV4dC5yb290LmFkZFN1YnZpZXcoZmxvd0xheW91dC50ZXh0Vmlldyk7XG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZVRlc3RDb250ZXh0KFxuICBjb250ZXh0OiBQaWNrPENvbnRleHQsIFwicm9vdFwiIHwgXCJzdGFnZVNpemVcIj4sXG4pIHtcbiAgbGF6eUNvbnRleHQucm9vdCA9IGNvbnRleHQucm9vdDtcbiAgbGF6eUNvbnRleHQuc3RhZ2VTaXplID0gY29udGV4dC5zdGFnZVNpemU7XG59XG4iLCJpbXBvcnQgXCIuL3NldHVwXCI7XG5cbmltcG9ydCB7IGluaXRpYWxpemVUZXN0Q29udGV4dCB9IGZyb20gXCIuL2NvbnRleHRcIjtcbmltcG9ydCB7IHRlc3QgYXMgaW5zZXJ0aW9uVGVzdCB9IGZyb20gXCIuL2luc2VydGlvblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcnVuQWxsVGVzdFN1aXRlcyhcbiAgY29udGV4dDogUGFyYW1ldGVyczx0eXBlb2YgaW5pdGlhbGl6ZVRlc3RDb250ZXh0PlswXSxcbikge1xuICBpbml0aWFsaXplVGVzdENvbnRleHQoY29udGV4dCk7XG4gIGluc2VydGlvblRlc3QucnVuKCk7XG59XG4iLCJpbXBvcnQgeyBzdWl0ZSB9IGZyb20gXCJ1dnVcIjtcbmltcG9ydCAqIGFzIGFzc2VydCBmcm9tIFwidXZ1L2Fzc2VydFwiO1xuXG5pbXBvcnQgeyBGbG93TGF5b3V0IH0gZnJvbSBcIi4uL2RvbS9mbG93LWxheW91dFwiO1xuaW1wb3J0IHsgSW5saW5lIH0gZnJvbSBcIi4uL2RvbS9pbmxpbmVcIjtcbmltcG9ydCB7IEZsb3dUZXh0IH0gZnJvbSBcIi4uL2RvbS90ZXh0XCI7XG5pbXBvcnQgeyBJbmxpbmVCbG9jayB9IGZyb20gXCIuLy4uL2RvbS9pbmxpbmUtYmxvY2tcIjtcbmltcG9ydCB0eXBlIHsgQ29udGV4dCB9IGZyb20gXCIuL2NvbnRleHRcIjtcbmltcG9ydCB7IGNvbnRleHQgfSBmcm9tIFwiLi9jb250ZXh0XCI7XG5cbmV4cG9ydCBjb25zdCB0ZXN0ID0gc3VpdGUoXG4gIFwiaW5zZXJ0aW9uXCIsXG4gIGNvbnRleHQgYXMgQ29udGV4dCAmIHsgZmxvd0xheW91dDogRmxvd0xheW91dCB9LFxuKTtcblxudGVzdC5iZWZvcmUuZWFjaCgoY29udGV4dCkgPT4ge1xuICBjb250ZXh0LnJlc2V0KCk7XG5cbiAgY29uc3QgZmxvd0xheW91dCA9IG5ldyBGbG93TGF5b3V0KCk7XG4gIGNvbnRleHQuZmxvd0xheW91dCA9IGZsb3dMYXlvdXQ7XG4gIGNvbnRleHQuc2V0VXAoZmxvd0xheW91dCk7XG59KTtcblxuLy8gVW5zdHlsZWQgdGVzdHNcblxudGVzdChcImNhbiBhcHBlbmQgRmxvd1RleHRzIGludG8gSW5saW5lc1wiLCAoeyBmbG93TGF5b3V0IH0pID0+IHtcbiAgLy8gQWRkaW5nIGFuIGVtcHR5IElubGluZSBzaG91bGQgbm90IGNoYW5nZSB0aGUgRmxvd0xheW91dCdzIHRleHQgY29udGVudC5cbiAgY29uc3QgaW5saW5lID0gbmV3IElubGluZSgpO1xuICBmbG93TGF5b3V0LmFwcGVuZENoaWxkKGlubGluZSk7XG4gIGFzc2VydC5pcyhmbG93TGF5b3V0LmRlYnVnRGVzY3JpcHRpb24oKSwgXCJcIik7XG5cbiAgLy8gQWRkaW5nIGEgRmxvd1RleHQgaW50byBhbiBhbHJlYWR5LWFkZGVkIElubGluZSBzaG91bGQgdXBkYXRlIHRoZSBGbG93TGF5b3V0LlxuICBpbmxpbmUuYXBwZW5kQ2hpbGQobmV3IEZsb3dUZXh0KFwiYWJjXCIpKTtcbiAgYXNzZXJ0LmlzKGZsb3dMYXlvdXQuZGVidWdEZXNjcmlwdGlvbigpLCBcImFiY1wiKTtcblxuICAvLyBBZGRpbmcgc3Vic2VxdWVudCBGbG93VGV4dHMgaW50byBhIHNvbGl0YXJ5IElubGluZSBzaG91bGQgdXBkYXRlIHRoZSBGbG93TGF5b3V0LlxuICBpbmxpbmUuYXBwZW5kQ2hpbGQobmV3IEZsb3dUZXh0KFwiZGVmXCIpKTtcbiAgYXNzZXJ0LmlzKGZsb3dMYXlvdXQuZGVidWdEZXNjcmlwdGlvbigpLCBcImFiY2RlZlwiKTtcbn0pO1xuXG50ZXN0KFwiY2FuIG5lc3QgSW5saW5lc1wiLCAoeyBmbG93TGF5b3V0IH0pID0+IHtcbiAgLy8gQWRkaW5nIGFuIGVtcHR5IElubGluZSBzaG91bGQgbm90IGNoYW5nZSB0aGUgRmxvd0xheW91dCdzIHRleHQgY29udGVudC5cbiAgY29uc3QgcGFyZW50ID0gbmV3IElubGluZSgpO1xuICBmbG93TGF5b3V0LmFwcGVuZENoaWxkKHBhcmVudCk7XG4gIGFzc2VydC5pcyhmbG93TGF5b3V0LmRlYnVnRGVzY3JpcHRpb24oKSwgXCJcIik7XG5cbiAgLy8gQWRkaW5nIGEgbmVzdGVkIGVtcHR5IElubGluZSBzaG91bGQgbm90IGNoYW5nZSB0aGUgRmxvd0xheW91dCdzIHRleHQgY29udGVudC5cbiAgY29uc3QgY2hpbGQgPSBuZXcgSW5saW5lKCk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gIGFzc2VydC5pcyhmbG93TGF5b3V0LmRlYnVnRGVzY3JpcHRpb24oKSwgXCJcIik7XG5cbiAgLy8gQWRkaW5nIGEgRmxvd1RleHQgaW50byBhIG5lc3RlZCBJbmxpbmUgc2hvdWxkIHVwZGF0ZSB0aGUgRmxvd0xheW91dC5cbiAgY2hpbGQuYXBwZW5kQ2hpbGQobmV3IEZsb3dUZXh0KFwiYWJjXCIpKTtcbiAgYXNzZXJ0LmlzKGZsb3dMYXlvdXQuZGVidWdEZXNjcmlwdGlvbigpLCBcImFiY1wiKTtcblxuICAvLyBBZGRpbmcgc3Vic2VxdWVudCBGbG93VGV4dHMgaW50byBhIG5laWdoYm91cmVkIElubGluZSBzaG91bGQgdXBkYXRlIHRoZVxuICAvLyBGbG93TGF5b3V0LlxuICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3IEZsb3dUZXh0KFwiZGVmXCIpKTtcbiAgYXNzZXJ0LmlzKGZsb3dMYXlvdXQuZGVidWdEZXNjcmlwdGlvbigpLCBcImFiY2RlZlwiKTtcbn0pO1xuXG4vLyBTdHlsZWQgdGVzdHNcblxudGVzdChcImNhbiBzdHlsZSB3aG9sZSBGbG93TGF5b3V0XCIsICh7IGZsb3dMYXlvdXQgfSkgPT4ge1xuICBmbG93TGF5b3V0LnNldEF0dHJpYnV0ZShcbiAgICBOU1VuZGVybGluZVN0eWxlQXR0cmlidXRlTmFtZSxcbiAgICBOU1VuZGVybGluZVN0eWxlLlNpbmdsZSxcbiAgKTtcblxuICAvLyBJbmxpbmVzIHNob3VsZCBjb3JyZWN0bHkgaW5oZXJpdCBzdHlsZSBmcm9tIHRoZSBGbG93TGF5b3V0OlxuXG4gIC8vIOKApiB3aGVuIHRoZSBJbmxpbmUgYWxyZWFkeSBoYXMgRmxvd1RleHQuXG4gIGNvbnN0IGlubGluZSA9IG5ldyBJbmxpbmUoKTtcbiAgaW5saW5lLmFwcGVuZENoaWxkKG5ldyBGbG93VGV4dChcImFiY1wiKSk7XG4gIGZsb3dMYXlvdXQuYXBwZW5kQ2hpbGQoaW5saW5lKTtcbiAgYXNzZXJ0LmlzKGZsb3dMYXlvdXQuZGVidWdEZXNjcmlwdGlvbih7IHN0eWxlczogdHJ1ZSB9KSwgXCJbdTphYmNdXCIpO1xuXG4gIC8vIOKApiB3aGVuIGFkZGluZyBuZXcgRmxvd1RleHRzIHRvIHRoZSBJbmxpbmUuXG4gIGlubGluZS5hcHBlbmRDaGlsZChuZXcgRmxvd1RleHQoXCJkZWZcIikpO1xuICBhc3NlcnQuaXMoZmxvd0xheW91dC5kZWJ1Z0Rlc2NyaXB0aW9uKHsgc3R5bGVzOiB0cnVlIH0pLCBcIlt1OmFiY2RlZl1cIik7XG5cbiAgLy8g4oCmIHdoZW4gdGhlIEZsb3dMYXlvdXQgZGVsZXRlcyBhIHN0eWxlLlxuICBmbG93TGF5b3V0LmRlbGV0ZUF0dHJpYnV0ZShOU1VuZGVybGluZVN0eWxlQXR0cmlidXRlTmFtZSk7XG4gIGFzc2VydC5pcyhmbG93TGF5b3V0LmRlYnVnRGVzY3JpcHRpb24oeyBzdHlsZXM6IHRydWUgfSksIFwiW2FiY2RlZl1cIik7XG59KTtcblxudGVzdChcImNhbiBzdHlsZSBJbmxpbmVzXCIsICh7IGZsb3dMYXlvdXQgfSkgPT4ge1xuICBmbG93TGF5b3V0LnNldEF0dHJpYnV0ZShcbiAgICBOU1VuZGVybGluZVN0eWxlQXR0cmlidXRlTmFtZSxcbiAgICBOU1VuZGVybGluZVN0eWxlLlNpbmdsZSxcbiAgKTtcblxuICAvLyBJbmxpbmVzIHNob3VsZCBjb3JyZWN0bHkgaW5oZXJpdCBzdHlsZSBmcm9tIHRoZSBGbG93TGF5b3V0OlxuXG4gIC8vIOKApiB3aGVuIGFkZGluZyByZWFkeS1zdHlsZWQsIHJlYWR5LXBvcHVsYXRlZCBJbmxpbmVzLlxuICBjb25zdCBpbmxpbmUgPSBuZXcgSW5saW5lKCk7XG4gIGlubGluZS5hcHBlbmRDaGlsZChuZXcgRmxvd1RleHQoXCJhYmNcIikpO1xuICBmbG93TGF5b3V0LmFwcGVuZENoaWxkKGlubGluZSk7XG4gIGlubGluZS5zZXRBdHRyaWJ1dGUoTlNCYWNrZ3JvdW5kQ29sb3JBdHRyaWJ1dGVOYW1lLCBVSUNvbG9yLnllbGxvd0NvbG9yKTtcbiAgYXNzZXJ0LmlzKGZsb3dMYXlvdXQuZGVidWdEZXNjcmlwdGlvbih7IHN0eWxlczogdHJ1ZSB9KSwgXCJbYnU6YWJjXVwiKTtcblxuICAvLyDigKYgd2hlbiBhZGRpbmcgbmV3IEZsb3dUZXh0cyB0byBzdHlsZWQgSW5saW5lcy5cbiAgaW5saW5lLmFwcGVuZENoaWxkKG5ldyBGbG93VGV4dChcImRlZlwiKSk7XG4gIGFzc2VydC5pcyhmbG93TGF5b3V0LmRlYnVnRGVzY3JpcHRpb24oeyBzdHlsZXM6IHRydWUgfSksIFwiW2J1OmFiY2RlZl1cIik7XG5cbiAgLy8g4oCmIHdoZW4gYWRkaW5nIHVuc3R5bGVkLCByZWFkeS1wb3B1bGF0ZWQgSW5saW5lcy5cbiAgY29uc3QgaW5saW5lMiA9IG5ldyBJbmxpbmUoKTtcbiAgaW5saW5lMi5hcHBlbmRDaGlsZChuZXcgRmxvd1RleHQoXCJnaGlcIikpO1xuICBmbG93TGF5b3V0LmFwcGVuZENoaWxkKGlubGluZTIpO1xuICBhc3NlcnQuaXMoXG4gICAgZmxvd0xheW91dC5kZWJ1Z0Rlc2NyaXB0aW9uKHsgc3R5bGVzOiB0cnVlIH0pLFxuICAgIFwiW2J1OmFiY2RlZl1bdTpnaGldXCIsXG4gICk7XG5cbiAgLy8g4oCmIHdoZW4gYWRkaW5nIG5ldyBGbG93VGV4dHMgdG8gdW5zdHlsZWQgSW5saW5lcy5cbiAgaW5saW5lMi5hcHBlbmRDaGlsZChuZXcgRmxvd1RleHQoXCJqa2xcIikpO1xuICBhc3NlcnQuaXMoXG4gICAgZmxvd0xheW91dC5kZWJ1Z0Rlc2NyaXB0aW9uKHsgc3R5bGVzOiB0cnVlIH0pLFxuICAgIFwiW2J1OmFiY2RlZl1bdTpnaGlqa2xdXCIsXG4gICk7XG5cbiAgLy8g4oCmIHdoZW4gdGhlIEZsb3dMYXlvdXQgZGVsZXRlcyBhIHN0eWxlLlxuICBmbG93TGF5b3V0LmRlbGV0ZUF0dHJpYnV0ZShOU1VuZGVybGluZVN0eWxlQXR0cmlidXRlTmFtZSk7XG4gIGFzc2VydC5pcyhcbiAgICBmbG93TGF5b3V0LmRlYnVnRGVzY3JpcHRpb24oeyBzdHlsZXM6IHRydWUgfSksXG4gICAgXCJbYjphYmNkZWZdW2doaWprbF1cIixcbiAgKTtcbn0pO1xuXG50ZXN0KFwiY2FuIHN0eWxlIG5lc3RlZCBJbmxpbmVzXCIsICh7IGZsb3dMYXlvdXQgfSkgPT4ge1xuICBmbG93TGF5b3V0LnNldEF0dHJpYnV0ZShcbiAgICBOU1VuZGVybGluZVN0eWxlQXR0cmlidXRlTmFtZSxcbiAgICBOU1VuZGVybGluZVN0eWxlLlNpbmdsZSxcbiAgKTtcblxuICAvLyBJbmxpbmVzIHNob3VsZCBjb3JyZWN0bHkgaW5oZXJpdCBzdHlsZSBmcm9tIHRoZSBGbG93TGF5b3V0OlxuXG4gIC8vIOKApiB3aGVuIGFkZGluZyByZWFkeS1zdHlsZWQsIHJlYWR5LXBvcHVsYXRlZCBJbmxpbmVzLlxuICBjb25zdCBpbmxpbmUgPSBuZXcgSW5saW5lKCk7XG4gIGlubGluZS5hcHBlbmRDaGlsZChuZXcgRmxvd1RleHQoXCJhYWFcIikpO1xuICBmbG93TGF5b3V0LmFwcGVuZENoaWxkKGlubGluZSk7XG4gIGlubGluZS5zZXRBdHRyaWJ1dGUoTlNCYWNrZ3JvdW5kQ29sb3JBdHRyaWJ1dGVOYW1lLCBVSUNvbG9yLnllbGxvd0NvbG9yKTtcbiAgYXNzZXJ0LmlzKGZsb3dMYXlvdXQuZGVidWdEZXNjcmlwdGlvbih7IHN0eWxlczogdHJ1ZSB9KSwgXCJbYnU6YWFhXVwiKTtcblxuICAvLyDigKYgd2hlbiBuZXN0aW5nIHJlYWR5LXN0eWxlZCwgcmVhZHktcG9wdWxhdGVkIElubGluZXMuXG4gIGNvbnN0IG5lc3RlZCA9IG5ldyBJbmxpbmUoKTtcbiAgbmVzdGVkLmFwcGVuZENoaWxkKG5ldyBGbG93VGV4dChcImJiYlwiKSk7XG4gIGlubGluZS5hcHBlbmRDaGlsZChuZXN0ZWQpO1xuICBuZXN0ZWQuc2V0QXR0cmlidXRlKE5TRm9yZWdyb3VuZENvbG9yQXR0cmlidXRlTmFtZSwgVUlDb2xvci5yZWRDb2xvcik7XG4gIGFzc2VydC5pcyhmbG93TGF5b3V0LmRlYnVnRGVzY3JpcHRpb24oeyBzdHlsZXM6IHRydWUgfSksIFwiW2J1OmFhYV1bYmZ1OmJiYl1cIik7XG5cbiAgLy8g4oCmIHdoZW4gYWRkaW5nIG5ldyBGbG93VGV4dHMgdG8gdW5zdHlsZWQsIG5lc3RlZCBJbmxpbmVzLlxuICBuZXN0ZWQuYXBwZW5kQ2hpbGQobmV3IEZsb3dUZXh0KFwiQkJCXCIpKTtcbiAgYXNzZXJ0LmlzKFxuICAgIGZsb3dMYXlvdXQuZGVidWdEZXNjcmlwdGlvbih7IHN0eWxlczogdHJ1ZSB9KSxcbiAgICBcIltidTphYWFdW2JmdTpiYmJCQkJdXCIsXG4gICk7XG5cbiAgLy8g4oCmIHdoZW4gcmVzdHlsaW5nIG5lc3RlZCBJbmxpbmVzLlxuICBuZXN0ZWQuZGVsZXRlQXR0cmlidXRlKE5TRm9yZWdyb3VuZENvbG9yQXR0cmlidXRlTmFtZSk7XG4gIGFzc2VydC5pcyhmbG93TGF5b3V0LmRlYnVnRGVzY3JpcHRpb24oeyBzdHlsZXM6IHRydWUgfSksIFwiW2J1OmFhYWJiYkJCQl1cIik7XG59KTtcblxudGVzdC5vbmx5KFwiY2FuIHNldCBzaXplIG9mIElubGluZUJsb2Nrc1wiLCAoeyBmbG93TGF5b3V0IH0pID0+IHtcbiAgLy8gTWFrZSB0aGUgdGV4dCBiaWcgZW5vdWdoIHRvIGVhc2lseSB3cmFwIG9udG8gYSBuZXcgbGluZSwgYXQgbGVhc3Qgb24gaVBob25lXG4gIC8vIChpbiBmdXR1cmUsIHdlJ2xsIG1ha2UgYSBtb3JlIHJvYnVzdCBkZXZpY2UtYWdub3N0aWMgdGVzdCwgYnV0IGFzIHdlJ3JlXG4gIC8vIG9ubHkgYXNzZXJ0aW5nIG9uIHNpemUgcmF0aGVyIHRoYW4gb3JpZ2luIHBvaW50IGZvciBub3csIHdlJ3JlIGZpbmUpXG4gIGZsb3dMYXlvdXQuc2V0QXR0cmlidXRlKE5TRm9udEF0dHJpYnV0ZU5hbWUsIFVJRm9udC5zeXN0ZW1Gb250T2ZTaXplKDM2KSk7XG5cbiAgY29uc3QgaW5saW5lMSA9IG5ldyBJbmxpbmUoKTtcbiAgaW5saW5lMS5hcHBlbmRDaGlsZChuZXcgRmxvd1RleHQoXCJhYmMgZGVmIGdoaSBqa2wgbW5vIHBxciBzdHUgdnd4IHl6XCIpKTtcbiAgZmxvd0xheW91dC5hcHBlbmRDaGlsZChpbmxpbmUxKTtcbiAgY29uc3QgdmlldyA9IFVJVmlldy5hbGxvYygpLmluaXRXaXRoRnJhbWUoQ0dSZWN0TWFrZSgwLCAwLCAxMDAsIDEwMCkpO1xuICB2aWV3LmJhY2tncm91bmRDb2xvciA9IFVJQ29sb3IucHVycGxlQ29sb3I7XG5cbiAgY29uc3QgaW5saW5lQmxvY2sgPSBuZXcgSW5saW5lQmxvY2soKTtcbiAgaW5saW5lQmxvY2sudmlldyA9IHZpZXc7XG4gIGNvbnNvbGUubG9nKFxuICAgIGBbdGVzdF0gaW5saW5lQmxvY2suYXR0YWNobWVudC52aWV3VG9Qcm92aWRlYCxcbiAgICBpbmxpbmVCbG9jay5hdHRhY2htZW50LnZpZXdUb1Byb3ZpZGUsXG4gICk7XG4gIGZsb3dMYXlvdXQuYXBwZW5kQ2hpbGQoaW5saW5lQmxvY2spO1xuICBpbmxpbmVCbG9jay5zZXRTaXplKDYwLCA2MCk7XG5cbiAgY29uc3QgaW5saW5lMiA9IG5ldyBJbmxpbmUoKTtcbiAgaW5saW5lMi5hcHBlbmRDaGlsZChcbiAgICBuZXcgRmxvd1RleHQoXCJhYmMgZGVmIGdoaSBqa2wgbW5vIHBxciBzdHUgdnd4IHl6XCIudG9VcHBlckNhc2UoKSksXG4gICk7XG4gIGZsb3dMYXlvdXQuYXBwZW5kQ2hpbGQoaW5saW5lMik7XG5cbiAgLy8gU2hvdWxkIGJlIHNpemVkIGNvcnJlY3RseSBiZWZvcmUgYWRkaW5nIHZpZXdcbiAgLy8gVE9ETzogYXNzZXJ0IG9uIHBvc2l0aW9uIG9uY2Ugd2UgaGF2ZSBhIHJvYnVzdCB3YXkgdG8gZG8gc29cbiAgYXNzZXJ0LmlzKGlubGluZUJsb2NrLmF0dGFjaG1lbnQuYm91bmRzLnNpemUud2lkdGgsIDYwKTtcbiAgYXNzZXJ0LmlzKGlubGluZUJsb2NrLmF0dGFjaG1lbnQuYm91bmRzLnNpemUuaGVpZ2h0LCA2MCk7XG4gIC8vIGlubGluZUJsb2NrLnZpZXcgPSB2aWV3O1xuICAvLyBmbG93TGF5b3V0LnRleHRWaWV3LmFkZFN1YnZpZXcoaW5saW5lQmxvY2sudmlldyk7XG5cbiAgLy8gU2hvdWxkIGJlIHNpemVkIGNvcnJlY3RseSBhZnRlciBhZGRpbmcgdmlldyB0b29cbiAgLy8gVE9ETzogYXNzZXJ0IG9uIHBvc2l0aW9uIG9uY2Ugd2UgaGF2ZSBhIHJvYnVzdCB3YXkgdG8gZG8gc29cbiAgYXNzZXJ0LmlzKGlubGluZUJsb2NrLmF0dGFjaG1lbnQuYm91bmRzLnNpemUud2lkdGgsIDYwKTtcbiAgYXNzZXJ0LmlzKGlubGluZUJsb2NrLmF0dGFjaG1lbnQuYm91bmRzLnNpemUuaGVpZ2h0LCA2MCk7XG4gIGFzc2VydC5pcyh2aWV3LmJvdW5kcy5zaXplLndpZHRoLCA2MCk7XG4gIGFzc2VydC5pcyh2aWV3LmJvdW5kcy5zaXplLmhlaWdodCwgNjApO1xuXG4gIC8vIFNob3VsZCBiZSBzaXplZCBjb3JyZWN0bHkgb24gc3Vic2VxdWVudCBzaXplIHVwZGF0ZXNcblxuICAvLyBGSVhNRTogZ2V0IHRoaXMgdGVzdCB0byBwYXNzLlxuICAvLyBjb25zb2xlLmxvZyhcIk5PV1wiKTtcbiAgLy8gaW5saW5lQmxvY2suc2V0U2l6ZSgyNSwgMjUpO1xuICAvLyBhc3NlcnQuaXMoaW5saW5lQmxvY2suYXR0YWNobWVudC5ib3VuZHMuc2l6ZS53aWR0aCwgMjUpO1xuICAvLyBhc3NlcnQuaXMoaW5saW5lQmxvY2suYXR0YWNobWVudC5ib3VuZHMuc2l6ZS5oZWlnaHQsIDI1KTtcbiAgLy8gYXNzZXJ0LmlzKHZpZXcuYm91bmRzLnNpemUud2lkdGgsIDI1KTtcbiAgLy8gYXNzZXJ0LmlzKHZpZXcuYm91bmRzLnNpemUuaGVpZ2h0LCAyNSk7XG59KTtcbiIsImltcG9ydCAkIGZyb20gXCJrbGV1clwiO1xuXG4vLyBEaXNhYmxlIHRlcm1pbmFsIGNvbG9ycyAodGhleSBhcmVuJ3QgY29taW5nIHRocm91Z2ggY29ycmVjdGx5KS5cbiQuZW5hYmxlZCA9IGZhbHNlO1xuIiwiXG4vKiBYTUwtTkFNRVNQQUNFLUxPQURFUiAqL1xuY29uc3QgX19fWE1MX05BTUVTUEFDRV9MT0FERVJfRVhQT1JUX19fID0gXCI8RnJhbWUgZGVmYXVsdFBhZ2U9XFxcIm1haW4tcGFnZVxcXCI+XFxuPC9GcmFtZT5cXG5cIlxuZXhwb3J0IGRlZmF1bHQgX19fWE1MX05BTUVTUEFDRV9MT0FERVJfRVhQT1JUX19fXG4iLCJcbi8qIFhNTC1OQU1FU1BBQ0UtTE9BREVSICovXG5jb25zdCBfX19YTUxfTkFNRVNQQUNFX0xPQURFUl9FWFBPUlRfX18gPSBcIjxQYWdlIHhtbG5zPVxcXCJodHRwOi8vc2NoZW1hcy5uYXRpdmVzY3JpcHQub3JnL3Rucy54c2RcXFwiIG5hdmlnYXRpbmdUbz1cXFwibmF2aWdhdGluZ1RvXFxcIiBiYWNrZ3JvdW5kQ29sb3I9XFxcImdyYXlcXFwiPlxcbiAgPFN0YWNrTGF5b3V0IGJhY2tncm91bmRDb2xvcj1cXFwid2hpdGVcXFwiIGlvc092ZXJmbG93U2FmZUFyZWE9XFxcImZhbHNlXFxcIj48L1N0YWNrTGF5b3V0PlxcbjwvUGFnZT5cXG5cIlxuZXhwb3J0IGRlZmF1bHQgX19fWE1MX05BTUVTUEFDRV9MT0FERVJfRVhQT1JUX19fXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ+L3BhY2thZ2UuanNvblwiKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=