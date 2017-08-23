import diff = require('deep-diff');
import {lhs, rhs} from '../../../test/mocks/data';
import getDiff from './patchToDiff';

const patch = diff.diff(lhs, rhs);
const result = getDiff(patch);

console.log('==========> result', result);