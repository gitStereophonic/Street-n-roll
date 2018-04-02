import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class PersonalDataProcessingPolicy extends Component {
  static propTypes = {
    aboutUs: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return React.createElement(
      'div',
      { className: 'about-us-personal-data-processing-policy' },
      React.createElement(
        'div',
        { className: 'policy-text' },
        React.createElement('h1', null, 'Политика обработки персональных данных'),
        React.createElement(
          'p',
          null,
          'Настоящий документ (далее «Политика») описывает условия обработки персональных данных, передаваемых вами в качестве субъекта персональных данных (далее «Субъект ПД») в адрес [название компании] в качестве оператора персональных данных (далее «Оператор ПД»). Положения Политики действуют только при посещении Субъектом ПД интернет-сайта Оператора ПД [адрес сайта]'
        )
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDataProcessingPolicy);
