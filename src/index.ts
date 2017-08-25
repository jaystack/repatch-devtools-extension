import diff = require('deep-diff');
import getDiff from './components/DiffViewer/getDiff';
import getHtml from './components/DiffViewer/getHtml';

const { lhs, rhs } = require('../static/mocks/data');
const patch = diff.diff(lhs, rhs);
const breaking = false;

function buildHtml({ patch, breaking }) {
  const { diff, map } = getDiff(patch);
  return getHtml(diff, map, breaking);
}

const html = buildHtml({ patch, breaking });
console.log(html);