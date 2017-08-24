import 'mocha';
import * as assert from 'assert';
import getDiff from './getDiff';
const patch = require('../../../static/mocks/patch');

describe('getDiff', () => {
  it('should return with delta', () => {
    const delta = getDiff(patch);
    assert(delta);
  });
});
