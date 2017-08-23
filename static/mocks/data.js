module.exports.lhs = {
  name: 'my object',
  description: "it's an object!",
  details: {
    it: 'has',
    an: 'array',
    with: [{ a: { b: { c: 1 } } }, 'few', 'elements']
  }
};

module.exports.rhs = {
  name: 'updated object',
  description: "it's an object!",
  details: {
    it: 'has',
    an: 'array',
    with: [{ a: { b: { c: 2 } } }, 'few', 'more', 'elements', { than: 'before' }]
  }
};
