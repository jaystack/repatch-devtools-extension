export default [
  {
    kind: "E",
    path: ["name"],
    lhs: "my object",
    rhs: "updated object"
  },
  {
    kind: "E",
    path: ["details", "with", 2],
    lhs: "elements",
    rhs: "more"
  },
  {
    kind: "A",
    path: ["details", "with"],
    index: 3,
    item: { kind: "N", rhs: "elements" }
  },
  {
    kind: "A",
    path: ["details", "with"],
    index: 4,
    item: { kind: "N", rhs: { than: "before" } }
  }
];