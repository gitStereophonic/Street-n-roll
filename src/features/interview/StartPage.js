import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class StartPage extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      700
    );
  }

  render() {
    const { startInterview } = this.props.actions;
    return React.createElement(
      'div',
      { className: 'interview-start-page' },
      React.createElement('img', { className: 'start-img', src: './../../images/start_img.png', alt: 'start' }),
      React.createElement('h1', null, 'Опрос: уличные музыканты'),
      React.createElement('p', null, 'Приготовьтесь, это будет долго...'),
      React.createElement('button', { id: 'start-btn', onClick: startInterview }, 'Начать')
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

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
