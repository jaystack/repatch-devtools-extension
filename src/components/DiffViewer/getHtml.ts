import { Diff, DiffMap } from '../../types';

const ARROW = ' => ';
let htmlData = '';

export default function getHtml(diff: Diff, map: DiffMap, breaking: boolean): string {
  for (const [ key, val ] of Object.entries(diff)) {
    if (typeof(val) !== 'object') {
      const changeObj = map.get(val);
      htmlData = htmlData.concat(`<ul><li>${key}: <strike>${changeObj.lhs}</strike>${ARROW}<strong>${changeObj.rhs}</strong></li></ul>`);
    } else {
      htmlData = htmlData.concat('<ul><li>' + key + '</li>');
      traverse(val, diff, map);
    }
  }

  return htmlData;
}


function traverse(o, diff, map) {
  if (Object.keys(o).length === 1) {
    htmlData = htmlData.concat('<ul>');
    for (const [ key, item ] of Object.entries(o)) {
      if (typeof item !== 'object') {
        const changeObj = map.get(item);
        htmlData = htmlData.concat('<li>' + key + ': ' + getValue(changeObj) + '</li>');
        htmlData = htmlData.concat('</ul>');
      } else {
        htmlData = htmlData.concat('<li>' + key + ' {</li>');
        traverse(item, diff, map);
        htmlData = htmlData.concat('} </ul>');
      }
    }

  }

  else if (Object.keys(o).length > 1) {
    for (const [ key, item ] of Object.entries(o)) {
      if (typeof item !== 'object') {
        const changeObj = map.get(item);
        htmlData = htmlData.concat('<ul><li>' + key + ': ' + getValue(changeObj) + '</li></ul>');
      } else {
        traverse(item, diff, map);
      }
    }
    htmlData = htmlData.concat('} </ul>');
  }
}

function getValue(changeObj) {
  const changeVal = typeof changeObj.rhs === 'object' ? `<pre>${JSON.stringify(changeObj.rhs)}</pre>` : changeObj.rhs;
  return `<strike>${changeObj.lhs}</strike>${ARROW}<strong>${changeVal}</strong>`;
}

