import React = require('react');
import {Change, Diff, DiffMap} from '../../types';
import {ToggleUl} from './toggleUl';
import {OLD_VALUE, NEW_VALUE, OPEN_TAG, CLOSE_TAG} from './constants';

const setValue = (value: string, style: string) => <span><span className={style}>{value}</span></span>;
const openBrace = (value, diffMap) => (typeof value === 'object') || (typeof value === 'symbol' && typeof diffMap.get(value).rhs === 'object') ? OPEN_TAG : '';
const closeBrace = (value, diffMap) => (typeof value === 'object') || (typeof value === 'symbol' && typeof diffMap.get(value).rhs === 'object') ? CLOSE_TAG : '';

export default function getHtml(diff: Diff, map: DiffMap, breaking: boolean): string[] {
    return renderChange(diff, map);
}

function renderChange(change: Change, diffMap: DiffMap): any {
    switch (change.kind) {
        case 'N':
            return typeof change.rhs !== 'object'
                ? setValue(change.rhs, NEW_VALUE)
                : setValue(render(change, diffMap), NEW_VALUE);
        case 'E':
            return typeof change.lhs !== 'object' && change.rhs !== 'object'
                ? <span>{setValue(change.lhs, OLD_VALUE)} => {setValue(change.rhs, NEW_VALUE)}</span>
                : setValue(render(change, diffMap), OLD_VALUE);
        case 'D': {
            return typeof change.lhs !== 'object'
                ? setValue(change.lhs, OLD_VALUE)
                : setValue(render(change, diffMap), OLD_VALUE);
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
