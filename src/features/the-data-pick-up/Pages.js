import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Pages extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { getData } = this.props.actions;
    const { components, allPagesData } = this.props.theDataPickUp;
    const pagesToRender = [];
    console.log(allPagesData);
    if (allPagesData.pages) {
      for (let i = 0; i < allPagesData.pages.length; i += 1) {
        pagesToRender.push(
          React.createElement(
            'p',
            {
              className: 'pageP',
              key: `pages${i}`,
              onClick: () => {
                console.log(i + 1);
              },
            },
            `Page #${i + 1}`
          )
        );
      }
    }

    return React.createElement(
      'div',
      { className: 'the-data-pick-up-pages' },
      React.createElement(
        'p',
        {
          className: 'statPanel',
          onClick: () => {
            this.props.theDataPickUp.currentComponent = components.users;
            getData();
          },
        },
        'Respondents'
      ),
      pagesToRender
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
)(Pages);
