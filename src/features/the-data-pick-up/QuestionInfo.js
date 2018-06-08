import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class QuestionInfo extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
  };

  render() {
    const { currentStat } = this.props.theDataPickUp;

    let showChart;
    if (currentStat.id < 0) {
      showChart = React.createElement('p', { className: 'no-info' }, 'No info');
    }

    if (currentStat.data.singleValue) {
      showChart = React.createElement(
        'div',
        { className: 'single-data' },
        React.createElement('h1', null, currentStat.what.title),
        React.createElement('h1', { className: 'single-value' }, currentStat.data.singleValue)
      );
    }

    return React.createElement('div', { className: 'the-data-pick-up-question-info' }, showChart);
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
)(QuestionInfo);
