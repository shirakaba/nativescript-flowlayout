// This lonely file pays its rent by resolving circular dependencies.

export const nodeTypes = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
} as const;

export const nodeNames = {
  FlowLayout: "COORDINATOR",
  Inline: "INLINE",
  InlineBlock: "INLINEBLOCK",
  Text: "#text",
} as const;
