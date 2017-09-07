import React = require('react');
import {Change, Diff, DiffMap} from '../../types';
import {ToggleUl} from './toggleUl';

const setValue = (value: string, style: string) => <span><span className={style}>{value}</span></span>;
const openBrace = (value, diffMap) => (typeof value === 'object') || (typeof value === 'symbol' && typeof diffMap.get(value).rhs === 'object') ? '{' : '';
const closeBrace = (value, diffMap) => (typeof value === 'object') || (typeof value === 'symbol' && typeof diffMap.get(value).rhs === 'object') ? '}' : '';

export default function getHtml(diff: Diff, map: DiffMap, breaking: boolean): string[] {
    return renderChange(diff, map);
}

function renderChange(change: Change, diffMap: DiffMap): any {
    switch (change.kind) {
        case 'N':
            return typeof change.rhs !== 'object'
                ? setValue(change.rhs, 'newValue')
                : setValue(render(change, diffMap), 'newValue');
        case 'E':
            return typeof change.lhs !== 'object' && change.rhs !== 'object'
                ? <span>{setValue(change.lhs, 'oldValue')} => {setValue(change.rhs, 'newValue')}</span>
                : setValue(render(change, diffMap), 'oldValue');
        case 'D': {
            return typeof change.lhs !== 'object'
                ? setValue(change.lhs, 'oldValue')
                : setValue(render(change, diffMap), 'oldValue');
        }
        default:
            return render(change, diffMap);
    }
}

function render(value: any, diffMap: DiffMap): any {
    switch (typeof value) {
        case 'boolean':
            return value.toString();
        case 'number':
            return value.toString();
        case 'string': {
            return value;
        }
        case 'object':
            return (
                Object.entries(value).map(([key, value]) => {
                    if (key !== 'path' && key !== 'kind') {
                        return (key === 'lhs' || key === 'rhs')
                            ? render(value, diffMap)
                            : (<ToggleUl key={key.toString()}>
                                <li key={key.toString()}>{render(key, diffMap)}: {openBrace(value, diffMap)} {render(value, diffMap)} {closeBrace(value, diffMap)} </li>
                            </ToggleUl>);
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
