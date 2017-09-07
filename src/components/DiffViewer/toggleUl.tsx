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
            ? String.fromCharCode(9745)
            : <div className="closed-div">{String.fromCharCode(9744)}<span className="closed-ul"> {children.key} {TOGGLED} </span></div>;

        return <div>
            <div className="toggle" onClick={() => this.setState({isOpen: !isOpen})}>{setText(isOpen,children)}</div>
            <ul className={isOpen ? "" : "hidden-ul"}> {children} </ul>
        </div>
    }

}
