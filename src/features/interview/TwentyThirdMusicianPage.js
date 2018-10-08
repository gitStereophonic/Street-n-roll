import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class TwentyThirdMusicianPage extends Component {
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

    this.handleProblemDescValueChanged = this.handleProblemDescValueChanged.bind(this);
    this.handleSolutionValueChanged = this.handleSolutionValueChanged.bind(this);
  }

  handleProblemDescValueChanged(changeEvent) {
    this.props.interview.twentyThirdFields.problemdesc = changeEvent.target.value;
  }

  handleSolutionValueChanged(changeEvent) {
    this.props.interview.twentyThirdFields.solution = changeEvent.target.value;
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-twenty-third-musician-page' },
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Опишите конкретный случай')),
        React.createElement('textarea', {
          id: 'problemdesc',
          onChange: this.handleProblemDescValueChanged,
          defaultValue: checkPoints[currentIndex].problemdesc,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Как вы обычно решаете эту(и) проблему(ы)?')),
        React.createElement('textarea', {
          id: 'solution',
          onChange: this.handleSolutionValueChanged,
          defaultValue: checkPoints[currentIndex].solution,
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

export default connect(mapStateToProps, mapDispatchToProps)(TwentyThirdMusicianPage);
