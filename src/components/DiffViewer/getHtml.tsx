import React = require('react');
import "./style.css";
import {Change, Diff, DiffMap} from '../../types';

interface State {
    isOpen: boolean;
}

export class ToggleUl extends React.PureComponent<{ }, State> {
    state = {isOpen: true};
    render() {
        const {isOpen} = this.state;
        return <div>
            <button onClick={() => this.setState({isOpen: !isOpen})}>^</button>
            <ul className={isOpen ? "" : "hidden-ul"}>{this.props.children}</ul>
        </div>

    }
}

export default function getHtml(diff: Diff, map: DiffMap, breaking: boolean): string[] {
    return renderChange(diff, map);
}

function renderChange(change: Change, diffMap: DiffMap): any {
    return render(change, diffMap);
}

function render(value: any, diffMap: DiffMap): any {
    switch (typeof value) {
        case 'boolean':
            return value.toString();
        case 'number':
            return value.toString();
        case 'string':
            return value;
        case 'object':
            return (
                <ToggleUl>{Object.entries(value).map(([key, value]) =>
                    (<li key={key.toString()}>{key}: ({render(value, diffMap)})</li>)
                )}</ToggleUl>
            );
        case 'symbol':
            return renderChange(diffMap.get(value), diffMap)
    }
}
