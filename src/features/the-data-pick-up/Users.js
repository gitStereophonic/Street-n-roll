import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Users extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { getUserInfo, getAllInfo } = this.props.actions;
    const { startData, components } = this.props.theDataPickUp;
    const usersToRender = [];
    for (let i = 0; i < startData.length; i += 1) {
      const everPlayed = startData[i].everPlayed === 1 ? 'player' : 'non-player';
      usersToRender.push(
        React.createElement(
          'p',
          {
            className: `userPanel ${everPlayed}`,
            key: startData[i].id,
            onClick: () => {
              getUserInfo({ id: startData[i].id });
            },
          },
          `${startData[i].id} : ${startData[i].city} : ${startData[i].age}`
        )
      );
    }

    return React.createElement(
      'div',
      { className: 'the-data-pick-up-users' },
      React.createElement(
        'p',
        {
          className: 'statPanel',
          onClick: () => {
            this.props.theDataPickUp.currentComponent = components.sum;
            getAllInfo();
          },
        },
        'Summary'
      ),
      usersToRender
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
)(Users);
