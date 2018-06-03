import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class EighteenthMusicianPage extends Component {
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

    this.handleRelationsValueChanged = this.handleRelationsValueChanged.bind(this);
    this.handleWhoBestValueChanged = this.handleWhoBestValueChanged.bind(this);
  }

  handleRelationsValueChanged(changeEvent) {
    this.props.interview.eighteenthFields.relations = changeEvent.target.value;
  }

  handleWhoBestValueChanged(changeEvent) {
    this.props.interview.eighteenthFields.whobest = changeEvent.target.value;
  }

  render() {
    const { checkPoints, currentIndex } = this.props.interview;

    return React.createElement(
      'div',
      { className: 'interview-eighteenth-musician-page' },
      React.createElement('h1', null, 'Конкуренция'),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Как относятся друг к другу конкуренты?')),
        React.createElement('textarea', {
          id: 'relations',
          onChange: this.handleRelationsValueChanged,
          defaultValue: checkPoints[currentIndex].relations,
        })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement('span', null, React.createElement('h3', null, 'Как решается, кто лучше?')),
        React.createElement('textarea', {
          id: 'whobest',
          onChange: this.handleWhoBestValueChanged,
          defaultValue: checkPoints[currentIndex].whobest,
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

export default connect(mapStateToProps, mapDispatchToProps)(EighteenthMusicianPage);
