import { Diff, DiffMap } from '../../types';

const ARROW = ' => ';
export default function getHtml(diff: Diff, map: DiffMap, breaking: boolean): string[] {
  const htmlData = [];
  mappedObjToHtml(diff, map, htmlData);
  return htmlData;
}

function mappedObjToHtml(value, map, htmlData) {
  for (const [ key, item ] of Object.entries(value)) {
    switch (typeof item) {
      case 'number':
        htmlData.push('<ul><li>' + key + ': ' + item.toString() + '</li></ul>');
        break;
      case 'boolean':
        htmlData.push('<ul><li>' + key + ': ' + item.toString() + '</li></ul>');
        break;
      case 'string':
        htmlData.push('<ul><li>' + key + ': ' + item + '</li></ul>');
        break;
      case 'symbol':
        htmlData.push('<ul><li>' + key + ': ' + getValue(map.get(item), map, htmlData) + '</li></ul>');
        break;
      case 'object': {
        htmlData.push(`<ul><li>${key} {`);
        mappedObjToHtml(item, map, htmlData);
        htmlData.push('} </li></ul>');
        break;
      }
    }
  }
}

function getValue(value, map, htmlData) {
  const newVal = typeof value.rhs === 'object'
    ? mappedObjToHtml(value.rhs, map, htmlData)
    : value.rhs;

  const oldVal = typeof value.lhs === 'object'
    ? mappedObjToHtml(value.lhs, map, htmlData)
    : value.lhs;

  return `<strike>${oldVal}</strike>${ARROW}<strong>${newVal}</strong>`;
}



// export default function getHtml(diff: Diff, map: DiffMap, breaking: boolean): string {
//   return renderChange(diff, map);
// }
//
// function renderChange(change, diffMap) {
//   return render(change, diffMap);
// }
//
// function render(value, diffMap) {
//   switch (typeof value) {
//     case 'boolean':
//       return value.toString();
//     case 'number':
//       return value.toString();
//     case 'string':
//       return value;
//     case 'object':
//       return '<ul>' + Object.entries(value).map(([ key, value ]) => '<li>' + key + ': ' + render(value, diffMap) + '</li>') + '</ul>';
//     case 'symbol':
//       return renderChange(diffMap.get(value), diffMap)
//   }
// }