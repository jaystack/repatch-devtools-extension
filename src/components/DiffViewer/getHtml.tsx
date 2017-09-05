import React = require('react');
import {Change, Diff, DiffMap} from '../../types';
import {ToggleUl} from './toggleUl';

export default function getHtml(diff: Diff, map: DiffMap, breaking: boolean): string[] {
    return renderChange(diff, map);
}

function renderChange(change: Change, diffMap: DiffMap): any {
    switch (change.kind) {
        case 'N':
            return typeof change.rhs !== 'object'
                ? <span className="newValue">{change.rhs}</span>
                : render(change, diffMap);
        case 'E':
            return typeof change.lhs !== 'object' && change.rhs !== 'object'
                ? <span><span className="oldValue">{change.lhs}</span>=><span className="newValue">{change.rhs}</span></span>
                : render(change, diffMap);
        case 'D':
            return typeof change.lhs !== 'object'
                ? <span><span className="oldValue">{change.lhs}</span></span>
                : render(change, diffMap);
        default:
            return render(change, diffMap);
    }
}

function render(value: any, diffMap: DiffMap): any {
    switch (typeof value) {
        case 'boolean':
            return <span className="newValue">{value.toString()}</span>;
        case 'number':
            return <span className="newValue">{value.toString()}</span>;
        case 'string':
            return <span className="newValue">{value}</span>;
        case 'object':
            return (
                Object.entries(value).map(([key, value]) => {
                    if (key !== 'path' && key !== 'kind') {
                        console.log("key", key);
                        return  key !== 'lhs' && key !== 'rhs'
                            ? (<ToggleUl key={key.toString()}><li key={key.toString()}>{key}: &#123; {render(value, diffMap)} &#125;</li></ToggleUl>)
                            : render(value, diffMap);
                    } else {
                        return '';
                    }
                })
            );
        case 'symbol': {
            return renderChange(diffMap.get(value), diffMap);
        }
    }
}
