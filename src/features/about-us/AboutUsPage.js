import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class AboutUsPage extends Component {
  static propTypes = {
    aboutUs: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
      'div',
      { className: 'about-us-about-us-page' },
      React.createElement('h3', null, '@CapralPikaChu - Kazimirskaya Olga'),
      React.createElement('h3', null, '@gitStereophonic - Chinkov Sergey')
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsPage);
