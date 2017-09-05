import React = require('react');
import "./style.css";

interface State {
    isOpen: boolean;
}

export class ToggleUl extends React.PureComponent<{}, State> {
    state = {isOpen: true};

    render() {
        const {isOpen} = this.state;
        const {children} = this.props;

        return <div>
            <span className="toggle" onClick={() => this.setState({isOpen: !isOpen})}>{isOpen ? '-' : '+'}</span>
            <ul className={isOpen ? "" : "hidden-ul"}> {children} </ul>
        </div>
    }

}
