import React = require('react');
import "./style.css";
import {TOGGLED} from './constants';

interface State {
    isOpen: boolean;
}

export class ToggleUl extends React.PureComponent<{}, State> {
    state = {isOpen: false};

    render() {
        const {isOpen} = this.state;
        const {children} = this.props;
        const setText = (isOpen, children) =>  isOpen
            ? <span className="opened-div">{String.fromCharCode(9745)}</span>
            : <div className="closed-div">{String.fromCharCode(9744)}<span> {children.key} {TOGGLED} </span></div>;

        return <span>
            <div className="toggle" onClick={() => this.setState({isOpen: !isOpen})}>{setText(isOpen,children)}</div>
            <ul className={isOpen ? "" : "hidden-ul"}> {children} </ul>
        </span>
    }

}
