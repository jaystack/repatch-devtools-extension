import diff = require('deep-diff');
const { lhs, rhs } = require('../../../../static/mocks/data');
import getDiff from './getDiff';

const patch = diff.diff(lhs, rhs);
const result = getDiff(patch);

console.log('==========> result', result.diff, result.map);

/* 
- diff
- map
- breaking 
*/
