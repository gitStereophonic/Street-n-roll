import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TwentyThirdMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="interview-twenty-third-musician-page">
        Page Content: interview/TwentyThirdMusicianPage
      </div>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwentyThirdMusicianPage);
