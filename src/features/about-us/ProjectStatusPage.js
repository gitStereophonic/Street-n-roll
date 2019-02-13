import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class ProjectStatusPage extends Component {
  static propTypes = {
    // aboutUs: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
      'div',
      { className: 'about-us-project-status-page' },
      React.createElement('img', {
        src: '../../images/not_found.png',
        alt: 'Page not implemented',
      }),
      React.createElement('p', null, 'Страница ещё на стадии разработки! Приносим свои извинения')
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    aboutUs: state.aboutUs,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStatusPage);
