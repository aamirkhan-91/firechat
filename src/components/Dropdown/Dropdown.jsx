import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import handleClickOutside from 'react-onclickoutside';

import './Dropdown.scss';
import Aux from '../../hoc/Auxillary';

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
            <Aux>
                <i onClick={this.dropdownClickHandler} onBlur={this.dropdownClickHandler} className={classes}></i>
                <CSSTransition
                    classNames='dropdown'
                    mountOnEnter
                    unmountOnExit
                    appear
                    timeout={250}
                    in={this.state.show}>
                    <div className='dropdown'>
                        {this.props.children}
                    </div>
                </CSSTransition>
            </Aux>
        );
    }
}

export default handleClickOutside(Dropdown);