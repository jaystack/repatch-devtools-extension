import React = require('react');
import getDiff from './getDiff';
import getHtml from './getHtml';

export default ({ patch, breaking }) => {
  const { diff, map } = getDiff(patch);
  const __html = getHtml(diff, map, breaking);
  return <pre dangerouslySetInnerHTML={{ __html }} />;
};
