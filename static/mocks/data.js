// module.exports.lhs = {
//   name: 'my object',
//   description: "it's an object!",
//   details: {
//     it: 'has',
//     an: 'array',
//     with: [{ a: { b: { c: 1 } } }, 'few', 'elements']
//   }
// };
//
// module.exports.rhs = {
//   name: 'updated object',
//   description: "it's an object!",
//   details: {
//     it: 'has',
//     an: 'array',
//     with: [{ a: { b: { c: 2 } } }, 'few', 'more', 'elements', { than: 'before' }]
//   }
// };
//
// module.exports.lhs = {
//   "title": "1Nest eggs",
//   "body":  "2Making your money work...",
//   "tags":  [ "3cash", "4shares" ],
//   "comments": [
//     {
//       "name":    "1John Smith",
//       "comment": "1Great article",
//       "age":     128,
//       "stars":   14,
//       "date":    "2014-09-02"
//     },
//     {
//       "name":    "1Alice White",
//       "comment": "1More like this please",
//       "age":     131,
//       "stars":   51,
//       "date":    "2014-11-22"
//     }
//   ]
// };
//
module.exports.rhs = {
  "title": "Nest eggs",
  "body":  "Making your money work...",
  "tags":  [ "cash", "shares" ],
  "comments": [
    {
      "name":    "John Smith",
      "comment": "Great article",
      "age":     28,
      "stars":   4,
      "date":    "2014-09-01"
    },
    {
      "name":    "Alice White",
      "comment": "More like this please",
      "age":     31,
      "stars":   5,
      "date":    "2014-10-22"
    }
  ]
};

module.exports.lhs = {
  name: "my object",
  description: "it's an object!",
  details: {
    it: "has",
    an: "array",
    with: [{a: {b: {c: 1}}}, "few", "elements"],
    desc: "old data",
    desc3: [{a: {b: {c: 2}}}, "few"]
  },
  desc8: '1234567',
  desc4: [{a: {b: {c: 2}}}, "few"],
  desc9: [{a: {b: {c: 2}}}, "few"]
};

module.exports.rhs = {
  name: "updated object",
  description: "it's an object!",
  asd: "asdasd",
  details: {
    it: "has",
    an: "array",
    with: [{a: {b: {c: 2}}}, "few", "more", "elements", {than: "before"}],
    desc: "new data!",
    desc3: [{a: {b: {c: 2}}}, "few", "more", "elements", {than: {before: "before", after: "something"}}]
  },
  desc4: [{s: {d: {f: 7}}}, "123", "asd", "blabla", {new: "obj", newest: {a: {b: {c: 2}}}}],
  desc9: [{a: {b: {c: 2}}}]
};

