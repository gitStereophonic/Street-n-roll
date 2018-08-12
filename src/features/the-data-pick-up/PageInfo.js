import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

function generateColors(a = 1, count = 0) {
  const colors = [];
  colors.push(`rgba(255, 99, 132, ${a})`);
  colors.push(`rgba(54, 162, 235, ${a})`);
  colors.push(`rgba(255, 206, 86, ${a})`);
  colors.push(`rgba(75, 192, 192, ${a})`);
  colors.push(`rgba(153, 102, 255, ${a})`);
  colors.push(`rgba(255, 159, 64, ${a})`);

  if (count > 6) {
    for (let i = 0; i < count - 6; i += 1) {
      const r = Math.floor(Math.random() * (255 + 1));
      const g = Math.floor(Math.random() * (255 + 1));
      const b = Math.floor(Math.random() * (255 + 1));
      colors.push(`rgba(${r}, ${g}, ${b}, ${a})`);
    }
  }

  return colors;
}

export class PageInfo extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
      'div',
      { className: 'the-data-pick-up-page-info' },
      React.createElement(
        Slider,
        {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
        React.createElement('div', { className: 'remove-this-shit' }, 'Pizdec'),
        React.createElement('div', { className: 'remove-this-shit' }, 'Pizdec')
      )
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    theDataPickUp: state.theDataPickUp,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageInfo);
