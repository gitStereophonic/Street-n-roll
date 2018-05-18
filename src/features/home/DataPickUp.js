import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import * as actions from './redux/actions';

export class DataPickUp extends Component {
  static propTypes = {
    // home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { getData } = this.props.actions;

    const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return React.createElement(
      'div',
      { className: 'home-data-pick-up' },
      React.createElement(
        'header',
        { className: 'app-header' },
        React.createElement('h1', { className: 'app-title' }, "Welcome to Street'n'roll data pick up service for Olga")
      ),
      React.createElement(
        'div',
        { className: 'chart' },
        React.createElement(Doughnut, {
          data: data,
          options: {
            animation: {
              animateScale: true,
            },
            legend: {
              display: true,
            },
            tooltips: {
              position: 'nearest',
            },
            onMouseOver: getData,
          },
        })
      )
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPickUp);
