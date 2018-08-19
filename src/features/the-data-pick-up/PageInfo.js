import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Doughnut, /* Radar, HorizontalBar */ } from 'react-chartjs-2';
import * as actions from './redux/actions';

function generateColors(a = 1, count = 0) {
  const colors = [];
  colors.push(`rgba(255, 99, 132, ${a})`);
  colors.push(`rgba(54, 162, 235, ${a})`);
  colors.push(`rgba(255, 206, 86, ${a})`);
  colors.push(`rgba(75, 192, 192, ${a})`);
  colors.push(`rgba(153, 102, 255, ${a})`);
  colors.push(`rgba(255, 159, 64, ${a})`);

  if (count > 6) {
    for (let i = 0; i < count - 6; i += 1) {
      const r = Math.floor(Math.random() * (255 + 1));
      const g = Math.floor(Math.random() * (255 + 1));
      const b = Math.floor(Math.random() * (255 + 1));
      colors.push(`rgba(${r}, ${g}, ${b}, ${a})`);
    }
  }

  return colors;
}

export class PageInfo extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
  };

  render() {
    const { currentPage } = this.props.theDataPickUp;

    console.log(`CurrentPage->Id: ${currentPage.id}`);

    let showChart;
    if (currentPage.id < 0) {
      showChart = React.createElement('p', { className: 'no-info' }, 'No info');
    } else {
      showChart = [];
      for (let i = 0; i < currentPage.questions.length; i += 1) {
        const question = currentPage.questions[i];
        let dataCh = null;
        switch (question.qDataType) {
          case 'pie':
            dataCh = {
              labels: question.qData.labels,
              datasets: [
                {
                  data: question.qData.values,
                  backgroundColor: generateColors(0.2, question.qData.labels.length),
                  borderColor: generateColors(1, question.qData.labels.length),
                  borderWidth: 3,
                },
              ],
            };
            showChart.push(
              React.createElement(
                'div',
                {
                  className: 'chart-radar',
                  key: `page-${currentPage.id}-chart-${i}`
                },
                React.createElement('h1', null, question.qText),
                React.createElement(Doughnut, {
                  data: dataCh,
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
                  },
                })
              )
            );
            break;
          default:
            break;
        }
      }
    }

    return React.createElement(
      'div',
      { className: 'the-data-pick-up-page-info' },
      React.createElement(
        Slider,
        {
          id: 'the-slider',
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          width: '100%',
          height: '100%'
        },
        showChart
      )
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
)(PageInfo);
