import React = require('react');
import * as ReactDOM from "react-dom";
import DeepDiff from 'deep-diff';
import getDiff from './components/DiffViewer/getDiff';
import getHtml from './components/DiffViewer/getHtml';
import {ToggleUl} from './components';

const { lhs, rhs } = require('../static/mocks/data');

function buildHtml(lhs, rhs) {
    const patch = DeepDiff.diff(lhs, rhs);
    const breaking = false;
    const {diff, map} = getDiff(patch);
    return getHtml(diff, map, breaking);

}

// export default ({patch: patch, breaking: breaking}) => {
//   const { diff, map } = getDiff(patch);
//     const __html = getHtml(diff, map, breaking);
//     return <pre dangerouslySetInnerHTML={{__html}}/>;
// };

export const App: React.StatelessComponent<{}> = () => {
    return (
        <div className="container-fluid">
            <ToggleUl diff={buildHtml(lhs, rhs)}/>
        </div>
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
