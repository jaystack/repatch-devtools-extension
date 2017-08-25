import { Diff, DiffMap } from '../../types';

export default function getHtml(diff: Diff, map: DiffMap, breaking: boolean): string {
  const ARROW = ' => ';
  const TAGS = { ul: 'ul', cul: 'cul', li: 'li', div: 'div', strike: 'strike', strong: 'strong', pre: 'pre' };

  let htmlData = '';
  let multilevelData = '';

  function htmlTagger(tag, data) {
    switch (tag) {
      case TAGS.ul:
        return `<ul>` + data;
      case TAGS.cul:
        return `</ul>`;
      case TAGS.li:
        return `<li>` + data + `</li>`;
      case TAGS.div:
        return `<div>` + data + `</div>`;
      case TAGS.strike:
        return `<span><strike>` + data + `</strike></span>`;
      case TAGS.strong:
        return `<span><strong>` + data + `</strong></span>`;
      case TAGS.pre:
        return `<pre>` + data + `</pre>`;
      default:
        return;
    }
  }

  for (const val of Object.values(diff)) {
    if (typeof(val) !== 'object') {
      const changeObj = map.get(val);
      htmlData = htmlData.concat(
        htmlTagger(TAGS.div, htmlTagger(TAGS.strike, changeObj.lhs) + ARROW + htmlTagger(TAGS.strong, changeObj.rhs))
      );
    } else {
      function traverse(o) {
        for (const item of Object.values(o)) {
          if (!!item && typeof(item) === 'object') {
            traverse(item);
          } else {
            multilevelData = '';

            //path entries
            const changeObj = map.get(item);
            changeObj.path.map((elm) => {
              return !!elm ? multilevelData = multilevelData.concat(htmlTagger(TAGS.ul, htmlTagger(TAGS.li, elm + ' {'))) : '';
            });

            //object/string value handle
            const changeVal = typeof changeObj.rhs === 'object'
              ? htmlTagger(TAGS.pre, JSON.stringify(changeObj.rhs))
              : changeObj.rhs;

            //value changes
            multilevelData = multilevelData.concat(
              htmlTagger(TAGS.ul, htmlTagger(TAGS.li, htmlTagger(TAGS.strike, changeObj.lhs) + ARROW + htmlTagger(TAGS.strong, changeVal)))
            );
            multilevelData = multilevelData.concat(htmlTagger(TAGS.cul, multilevelData));

            //ul closing
            changeObj.path.map((elm) => {
              return !!elm ? multilevelData = multilevelData.concat(' }' + htmlTagger(TAGS.cul, multilevelData)) : '';
            });

            // htmlData = htmlData.concat(htmlTagger(TAGS.ul, multilevelData));
            htmlData = htmlData.concat(multilevelData);
          }
        }
      }

      traverse(val);
    }
  }

  return htmlData;
}
