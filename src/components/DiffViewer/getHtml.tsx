import React = require('react');
import * as ReactDOM from "react-dom";
// import "../style.css";
import {Change, Diff, DiffMap} from '../../types';

function getText(diff) {
    return <div>{diff}</div>
}

interface State {
    isOpen: boolean;
}

export class ToggleUl extends React.PureComponent<{ diff }, State> {
    // constructor(props) {
    //     super(props);
    //     this.state = {isOpen: };
    // }
    state = {isOpen: true};

    render() {
        const {children} = this.props;
        const {isOpen} = this.state;
        // return getText(diff);
        return <div>
                <button>^</button>
            <ul className={isOpen ? "" : "hidden-ul"}>
            {children}
            </ul>
            </div>

    }
}

// export default class ToggleUl extends React.PureComponent {
//
//     state = {isOpen: true};
//
//     render() {
//         const {isOpen} = this.state;
//         const {children} = this.props;
//         return <div>
//                 <button>^</button>
//             <ul className={isOpen ? "" : "hidden-ul"}>
//             {children}
//             </ul>
//             </div>
//     }
// }

export default function getHtml(diff: Diff, map: DiffMap, breaking: boolean): string {
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
            return <ul>Object.entries(value).map(([key, value]) => <li>key: render(value, diffMap)</li>)</ul>;
        case 'symbol':
            return renderChange(diffMap.get(value), diffMap)
    }
}
