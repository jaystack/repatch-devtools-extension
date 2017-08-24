import diff = require('deep-diff');
import getDiff from './components/DiffViewer/getDiff';
const { lhs, rhs } = require('../static/mocks/data');
const patch = diff.diff(lhs, rhs);
const result = getDiff(patch);

console.log('==========> result', result.diff, result.map);
