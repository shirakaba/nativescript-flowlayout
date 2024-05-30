// This lonely file pays its rent by resolving circular dependencies.

export const nodeTypes = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  PARAGRAPH_MARKER: 13,
} as const;

export const nodeNames = {
  Block: "BLOCK",
  Inline: "INLINE",
  InlineBlock: "INLINEBLOCK",
  ParagraphMarker: "#paragraphmarker",
  Text: "#text",
} as const;
