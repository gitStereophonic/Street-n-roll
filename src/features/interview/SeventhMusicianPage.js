import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SeventhMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
      'div',
      { className: 'interview-seventh-musician-page' },
      'Page Content: interview/SeventhMusicianPage'
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

export default connect(mapStateToProps, mapDispatchToProps)(SeventhMusicianPage);
