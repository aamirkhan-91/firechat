import './Dropdown.scss';

import { Component } from 'react';
import handleClickOutside from 'react-onclickoutside';
import { CSSTransition } from 'react-transition-group';

class Dropdown extends Component {
  state = {
    show: false,
  };

  dropdownClickHandler = () => {
    const { show } = this.state;

    this.setState({
      show: !show,
    });
  };

  handleClickOutside = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { iconName, children } = this.props;
    const { show } = this.state;

    const classes = `fa ${iconName}`;

    return (
      <div onClick={this.dropdownClickHandler} className='icon'>
        <i className={classes} />
        <CSSTransition
          classNames='dropdown'
          mountOnEnter
          unmountOnExit
          appear
          timeout={250}
          in={show}
        >
          <div className='dropdown'>{children}</div>
        </CSSTransition>
      </div>
    );
  }
}

export default handleClickOutside(Dropdown);
