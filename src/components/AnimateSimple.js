import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAnimationTiming } from '../index';
import animationClasses from '../animateClasses.json';

class AnimateSimple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animating: Boolean(props.type),
    };
  }

  componentDidMount() {
    const { type } = this.props;

    if (type) {
      this.setAnimating(type);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { animating } = this.state;

    if (nextProps.type && !animating) {
      this.setAnimating(this.props.type);
    }
  }

  setAnimating(animation) {
    this.setState({ animating: true });
    setTimeout(() => this.setState({ animating: false }), getAnimationTiming(animation));
  }

  render() {
    const { type } = this.props;
    const { animating } = this.state;

    return (
      <div className={animating ? `animated ${type}` : ''}>
        {this.props.children}
      </div>
    );
  }
}

AnimateSimple.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(animationClasses),
  // forceAnimation: PropTypes.bool,
};

AnimateSimple.defaultProps = {
  type: 'bounce',
};

export default AnimateSimple;
