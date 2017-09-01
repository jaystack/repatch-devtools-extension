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

html.map((value, key) => {
  console.log(value);
});

// console.log(html);
// console.log(JSON.stringify(html));

// const a = html.map((value, key) => {
//   console.log(JSON.stringify(value));
// });

// const b = [ [ "E", [ "name" ], "my object", "updated object" ], [ [ [ [ [ [ "E", [ "details", "with", "0", "a", "b", "c" ], "1", "2" ] ] ] ], [ "E", [ "details", "with", "2" ], "elements", "more" ], [ "N", [ "details", "with", "3" ], "elements" ], [ "N", [ "details", "with", "4" ], [ "before" ] ] ], [ "E", [ "details", "desc" ], "old data", "new data!" ], [ [ "N", [ "details", "desc3", "2" ], "more" ], [ "N", [ "details", "desc3", "3" ], "elements" ], [ "N", [ "details", "desc3", "4" ], [ "before" ] ] ] ], [ [ [ "D", [ "desc4", "0", "a" ], [ [ "2" ] ] ], [ "N", [ "desc4", "0", "s" ], [ [ "7" ] ] ] ], [ "E", [ "desc4", "1" ], "few", "123" ], [ "N", [ "desc4", "2" ], "asd" ], [ "N", [ "desc4", "3" ], "blabla" ], [ "N", [ "desc4", "4" ], [ "obj", [ [ [ "2" ] ] ] ] ], [ "N", [ "desc4", "5" ], "few" ] ], [ "N", [ "asd" ], "asdasd" ] ];