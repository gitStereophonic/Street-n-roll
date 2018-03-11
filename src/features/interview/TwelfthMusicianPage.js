import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as actions from './redux/actions';

export class TwelfthMusicianPage extends Component {
  static propTypes = {
    interview: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.cheackRequired();

    this.handleReasonsValueChanged = this.handleReasonsValueChanged.bind(this);
    this.handleWhereValueChanged = this.handleWhereValueChanged.bind(this);
    this.handleWhyWhereValueChanged = this.handleWhyWhereValueChanged.bind(this);
    this.cheackRequired = this.cheackRequired.bind(this);
  }

  cheackRequired() {
    if (this.props.interview.currentIndex !== 12) return;
    let green = this.props.interview.twelfthFields.reasons !== '' && this.props.interview.twelfthFields.where !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleReasonsValueChanged(changeEvent) {
    this.props.interview.twelfthFields.reasons = changeEvent.target.value;
    this.cheackRequired();
  }

  handleWhereValueChanged(changeEvent) {
    this.props.interview.twelfthFields.where = changeEvent.target.value;
    this.cheackRequired();
  }

  handleWhyWhereValueChanged(changeEvent) {
    this.props.interview.twelfthFields.whywhere = changeEvent.target.value;
    this.cheackRequired();
  }

  render() {
    return React.createElement(
      'div',
      { className: 'interview-twelfth-musician-page' },
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'По каким поводам?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', { id: 'reasons', onChange: this.handleReasonsValueChanged })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Где?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', { id: 'where', onChange: this.handleWhereValueChanged })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Почему именно там?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('textarea', { id: 'whywhere', onChange: this.handleWhyWhereValueChanged })
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

export default connect(mapStateToProps, mapDispatchToProps)(TwelfthMusicianPage);
