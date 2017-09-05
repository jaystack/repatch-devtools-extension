import React = require('react');
import * as ReactDOM from "react-dom";
import DeepDiff from 'deep-diff';
import getDiff from './components/DiffViewer/getDiff';
import getHtml from './components/DiffViewer/getHtml';

const { lhs, rhs } = require('../static/mocks/data');

function buildHtml(lhs, rhs) {
    const patch = DeepDiff.diff(lhs, rhs);
    const breaking = false;
    const {diff, map} = getDiff(patch);
    return getHtml(diff, map, breaking);
}

export const App: React.StatelessComponent<{}> = () => {
    return (
        <div className="container-fluid">
            {buildHtml(lhs, rhs)}
        </div>
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
