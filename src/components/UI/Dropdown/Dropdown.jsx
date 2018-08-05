import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import handleClickOutside from 'react-onclickoutside';

import './Dropdown.scss';

class Dropdown extends Component {

    state = {
        show: false
    }

    dropdownClickHandler = () => {
        this.setState({
            show: !this.state.show
        });
    }

    handleClickOutside = () => {
        this.setState({
            show: false
        });
    }

    render() {
        let classes = 'fa ' + this.props.iconName;

        return (
            <div onClick={this.dropdownClickHandler} className="icon">
                <i className={classes} />
                <CSSTransition classNames="dropdown" mountOnEnter unmountOnExit appear timeout={250} in={this.state.show}>
                    <div className="dropdown">{this.props.children}</div>
                </CSSTransition>
            </div>
        );
    }
}

export default handleClickOutside(Dropdown);