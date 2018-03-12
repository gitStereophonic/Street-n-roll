import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class SixthListenerPage extends Component {
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

    this.handleExperienceValueChanged = this.handleExperienceValueChanged.bind(this);
  }

  handleExperienceValueChanged(changeEvent) {
    this.props.interview.sixthFields.experience = changeEvent.target.value;
  }

  render() {
    return React.createElement(
      'div',
      { className: 'interview-sixth-listener-page' },
      React.createElement('h1', null, 'Личный опыт'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement(
            'h3',
            null,
            'Были ли в Вашей жизни примечательные случаи, связанные с уличными музыкантами?'
          )
        ),
        React.createElement(
          'p',
          null,
          'Расскажите о них'
        ),
        React.createElement('textarea', { id: 'experience', onChange: this.handleExperienceValueChanged })
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

export default connect(mapStateToProps, mapDispatchToProps)(SixthListenerPage);
