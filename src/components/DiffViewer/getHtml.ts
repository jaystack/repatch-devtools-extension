import { Diff, DiffMap } from '../../types';

export default function getHtml(diff: Diff, map: DiffMap, breaking: boolean): string {
  const ARROW = ' => ';
  const TAGS = { ul: 'ul', li: 'li', div: 'div', strike: 'strike', pre: 'pre' };

  let htmlData = '';
  let multilevelData = '';

  function htmlTagger(tag, data) {
    switch (tag) {
      case TAGS.ul:
        return '<ul>' + data + '</ul>';
      case TAGS.li:
        return '<li>' + data + '</li>';
      case TAGS.div:
        return '<div>' + data + '</div>';
      case TAGS.strike:
        return '<strike>' + data + '</strike>';
      case TAGS.pre:
        return '<pre>' + data + '</pre>';
      default:
        return;
    }
  }

  for (const val of Object.values(diff)) {
    if (typeof(val) !== 'object') {
      const changeObj = map.get(val);
      let change = htmlTagger(TAGS.strike, changeObj.lhs) + ARROW + changeObj.rhs;
      change = htmlTagger(TAGS.div, change);
      htmlData = htmlData.concat(change);
    } else {
      function traverse(o) {
        for (const item of Object.values(o)) {
          if (!!item && typeof(item) === 'object') {
            traverse(item);
          } else {
            const changeObj = map.get(item);
            changeObj.path.map((elm) => {
              return !!elm ? multilevelData = multilevelData.concat(htmlTagger(TAGS.li, elm)) : '';
            });
            const changeVal = typeof changeObj.rhs === 'object' ? htmlTagger(TAGS.pre,
              JSON.stringify(changeObj.rhs)
            ) : changeObj.rhs;
            let change = htmlTagger(TAGS.strike, changeObj.lhs) + ARROW + changeVal;
            multilevelData = multilevelData.concat(htmlTagger(TAGS.li, change));
            htmlData = htmlData.concat(htmlTagger(TAGS.ul, multilevelData));
            multilevelData = '';
          }
        }
      }

      traverse(val);
    }
  }

  return htmlData;
}