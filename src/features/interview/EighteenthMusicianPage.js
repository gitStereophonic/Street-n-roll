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
    this.checkRequired();
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      700
    );

    this.handleCompetitionValueChanged = this.handleCompetitionValueChanged.bind(this);
    this.handleRelationsValueChanged = this.handleRelationsValueChanged.bind(this);
    this.handleWhoBestValueChanged = this.handleWhoBestValueChanged.bind(this);
    this.checkRequired = this.checkRequired.bind(this);
  }

  checkRequired() {
    if (this.props.interview.currentIndex !== 18) return;
    let green = this.props.interview.eighteenthFields.competition !== '';

    // TODO: Remove this at every page when release
    if (this.props.interview.backDoor) green = true;

    const btn = $('.next-btn').last();
    if (green) btn.removeClass('btn-disable');
    else btn.addClass('btn-disable');
  }

  handleCompetitionValueChanged(changeEvent) {
    this.props.interview.eighteenthFields.competition = changeEvent.target.value;
    this.checkRequired();
  }

  handleRelationsValueChanged(changeEvent) {
    this.props.interview.eighteenthFields.relations = changeEvent.target.value;
    this.checkRequired();
  }

  handleWhoBestValueChanged(changeEvent) {
    this.props.interview.eighteenthFields.whobest = changeEvent.target.value;
    this.checkRequired();
  }

  render() {
    return React.createElement(
      'div',
      { className: 'interview-eighteenth-musician-page' },
      React.createElement('h1', null, 'Конкуренция'),
      React.createElement('img', {
        className: 'page-head-img',
        src: '../../images/eighteenth_img.png',
        alt: 'page image',
      }),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Есть ли в среде музыкантов конкуренция?'),
          React.createElement('h3', { className: 'must-fill' }, ' *')
        ),
        React.createElement('input', { id: 'competition', onChange: this.handleCompetitionValueChanged })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Как относятся друг к другу конкуренты?')
        ),
        React.createElement('textarea', { id: 'relations', onChange: this.handleRelationsValueChanged })
      ),
      React.createElement(
        'div',
        { className: 'qstn' },
        React.createElement(
          'span',
          null,
          React.createElement('h3', null, 'Как решается, кто лучше?')
        ),
        React.createElement('textarea', { id: 'whobest', onChange: this.handleWhoBestValueChanged })
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
