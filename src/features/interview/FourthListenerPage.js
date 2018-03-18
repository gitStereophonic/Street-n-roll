import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class FourthListenerPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      700
    );

    this.handleSongsValueChanged = this.handleSongsValueChanged.bind(this);
  }

  handleSongsValueChanged(changeEvent) {
    this.props.interview.fourthFields.songs = changeEvent.target.value;
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-fourth-listener-page' },
      React.createElement('h1', null, 'Репертуар'),
      React.createElement('img', { className: 'page-head-img', src: '../../images/fourth_img.jpg', alt: 'page image' }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Какие песни Вам доводилось слышать в исполнении менестрелей?')
        ),
        React.createElement('p', null, 'Какие из них Вам нравятся или не нравятся?'),
        React.createElement('textarea', {
          id: 'songs',
          onChange: this.handleSongsValueChanged,
          defaultValue: checkPoints[currentIndex].songs,
        })
      )
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    interview: state.interview,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FourthListenerPage);
