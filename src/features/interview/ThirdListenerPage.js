import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class ThirdListenerPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
      'div',
      { className: 'interview-third-listener-page' },
      React.createElement('h1', null, 'Вы мирный житель'),
      React.createElement('img', { className: 'page-head-img', src: '../../images/third_img.jpg', alt: 'page image' }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Насколько интересует Вас уличная музыка и ее исполнители?')
        ),
        'Шли бы все эти дармоеды работать!',
        React.createElement('input', {
          type: 'range',
          name: 'everPlayed',
          min: 0,
          max: 6,
          defaultValue: 3,
          onChange: this.handleEverPlayedOptionChange,
        }),
        'Играют огонь! Каждый раз останавливаюсь'
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Кто такие, на Ваш взгляд, уличные музыканты?')
        ),
        React.createElement(
          'p',
          null,
          'Что это за люди, какими они должны быть, честны ли они, симпатизируете ли Вы им?'
        ),
        React.createElement('input', { id: 'who', onChange: this.handleCityValueChange })
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

export default connect(mapStateToProps, mapDispatchToProps)(ThirdListenerPage);
