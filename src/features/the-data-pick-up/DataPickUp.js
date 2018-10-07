import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DataPickUp extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.props.theDataPickUp.currentComponent = this.props.theDataPickUp.components.users;
  }

  start() {
    this.props.actions.getData();
    $('.sidebar').addClass('hidden');
    $('.page-container').addClass('toLeft');
    $('.the-data-pick-up-data-pick-up').addClass('the-data-pick-up-data-pick-up-start');
    $('.startPickUp').addClass('esc');
    $('#mainField').addClass('mainField-start');
  }

  render() {
    const { currentComponent } = this.props.theDataPickUp;

    return React.createElement(
      'div',
      { className: 'the-data-pick-up-data-pick-up' },
      React.createElement(
        'header',
        { className: 'app-header' },
        React.createElement('h1', { className: 'app-title' }, "Welcome to Street'n'roll data pick up service")
      ),
      React.createElement('button', { className: 'startPickUp', onClick: this.start }, 'HEY BRO'),
      React.createElement('div', { id: 'mainField' }, currentComponent)
    );
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
)(DataPickUp);
