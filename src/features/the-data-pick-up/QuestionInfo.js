import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
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

export class QuestionInfo extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.createOthers = this.createOthers.bind(this);
  }

  createOthers() {
    const { currentStat } = this.props.theDataPickUp;
    const result = [];
    const other = [];

    if (currentStat.what.extraTitle) {
      if (!currentStat.data.otherList) return null;

      for (let i = 0; i < currentStat.data.otherList.length; i += 1) {
        other.push(React.createElement('p', { className: 'answer-from-all', key: `other ${i}` }, currentStat.data.otherList[i]));
      }

      result.push(React.createElement('h1', {key: 'otherTitle'}, currentStat.what.extraTitle));
      result.push(
        React.createElement(
          InfiniteScroll,
          {
            key: 'otherScroll',
            dataLength: other.length,
            loader: React.createElement('h4', null, 'Loading...'),
            height: 650,
            endMessage: React.createElement(
              'p',
              {
                className: 'endline',
              },
              React.createElement('b', null, '--^--')
            ),
          },
          other
        )
      );
    }

    return result;
  }

  render() {
    const { currentStat } = this.props.theDataPickUp;

    let showChart;
    if (currentStat.id < 0) {
      showChart = React.createElement('p', { className: 'no-info' }, 'No info');
    } else if (currentStat.data.singleValue) {
      showChart = React.createElement(
        'div',
        { className: 'single-data' },
        React.createElement('h1', null, currentStat.what.title),
        React.createElement('h1', { className: 'single-value' }, currentStat.data.singleValue)
      );
    } else {
      switch (currentStat.what.chartType) {
        case 'line':
          break;
        case 'bar':
          break;
        case 'radar':
          break;
        case 'polar area':
          break;
        case 'pie':
          if (currentStat.data.chartPie) {
            const dataCh = {
              labels: currentStat.data.chartPie.labels,
              datasets: [
                {
                  data: currentStat.data.chartPie.values,
                  backgroundColor: generateColors(0.2, currentStat.data.chartPie.labels.length),
                  borderColor: generateColors(1, currentStat.data.chartPie.labels.length),
                  borderWidth: 3,
                },
              ],
            };

            showChart = React.createElement(
              'div',
              { className: 'chart-pie' },
              React.createElement('h1', null, currentStat.what.title),
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
              }),
              this.createOthers()
            );
          }
          break;
        case 'bubble':
          break;
        case 'list':
          if (currentStat.data.chartList) {
            const dataCh = [];
            for (let i = 0; i < currentStat.data.chartList.list.length; i += 1) {
              dataCh.push(
                React.createElement('p', { className: 'answer-from-all', key: i }, currentStat.data.chartList.list[i])
              );
            }
            showChart = React.createElement(
              'div',
              { className: 'chart-list' },
              React.createElement('h1', null, currentStat.what.title),
              React.createElement(
                InfiniteScroll,
                {
                  dataLength: dataCh.length,
                  loader: React.createElement('h4', null, 'Loading...'),
                  height: 950,
                  endMessage: React.createElement(
                    'p',
                    {
                      className: 'endline',
                    },
                    React.createElement('b', null, '--^--')
                  ),
                },
                dataCh
              )
            );
          }
          break;
        case 'count':
          break;
        default:
          break;
      }
    }

    return React.createElement('div', { className: 'the-data-pick-up-question-info' }, showChart);
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
)(QuestionInfo);
