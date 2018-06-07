import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class UserInfo extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.createTheUserAnswer = this.createTheUserAnswer.bind(this);
  }

  createTheUserAnswer(field, text) {
    return React.createElement(
      'p',
      { className: 'answer', key: field },
      React.createElement('span', { className: 'answer-label' }, `${field}: `),
      React.createElement('span', { className: 'answer-text' }, text)
    );
  }

  render() {
    const { currentUser } = this.props.theDataPickUp;

    let showChart;
    const aStart = [
      React.createElement('h1', { key: 'header' }, ' Общие вопросы:'),
      this.createTheUserAnswer('Id', currentUser.aStart.id),
      this.createTheUserAnswer('Город', currentUser.aStart.city),
      this.createTheUserAnswer('Возраст', currentUser.aStart.age),
      this.createTheUserAnswer('Пол', currentUser.aStart.gender),
      this.createTheUserAnswer(
        'Образование',
        currentUser.aStart.edu === 'other' ? `Другое: ${currentUser.aStart.eduOther}` : currentUser.aStart.edu
      ),
      this.createTheUserAnswer('Род деятельности', currentUser.aStart.job),
      this.createTheUserAnswer('Играл ли', currentUser.aStart.everPlayed ? 'Да' : 'Нет (пидор)'),
    ];

    if (currentUser.aStart.id < 0) {
      showChart = React.createElement('p', { className: 'no-info' }, 'No info');
    } else if (currentUser.aStart.everPlayed) {
      const createCommunity = (rly = false) => {
        if (!rly) return null;

        const official =
          currentUser.aMain.official === 'Другое: '
            ? `Другое: ${currentUser.aMain.officialOther}`
            : currentUser.aMain.official;
        const community = [
          this.createTheUserAnswer('Официальное', official),
          this.createTheUserAnswer('Может ли не состоять', currentUser.aMain.wocom),
          this.createTheUserAnswer('Как вступить', currentUser.aMain.howjoin),
          this.createTheUserAnswer('Какие плюшки с этого', currentUser.aMain.cookies),
        ];

        return community;
      };

      const createMeetings = (rly = false) => {
        if (!rly) return null;

        const meetingTimeArray = currentUser.aMain.meetingtime.split(',').filter(item => item !== '');
        const message = meetingTimeArray.reduce((sum, current) => `${sum}, ${current}`);

        const meetings = [
          this.createTheUserAnswer('По каким поводам', currentUser.aMain.reasons),
          this.createTheUserAnswer('Где', currentUser.aMain.where),
          this.createTheUserAnswer('Почему именно там', currentUser.aMain.whywhere),
          this.createTheUserAnswer('Когда', message),
        ];

        return meetings;
      };

      const createJargon = () => {
        const other = currentUser.aMain.forwhatOther === '' ? '-' : currentUser.aMain.forwhatOther;
        const forWhatArray = currentUser.aMain.forwhat
          .split(',')
          .filter(item => item !== '')
          .map(item => (item === 'Другое: ' ? `${item}${other}` : item));
        const message = forWhatArray.reduce((sum, current) => `${sum}, ${current}`);

        const jargon = [
          this.createTheUserAnswer('Жаргон', currentUser.aMain.jargon),
          this.createTheUserAnswer('Условные знаки', currentUser.aMain.specsigns),
          this.createTheUserAnswer('Опознавательные знаки', currentUser.aMain.idmarks),
          this.createTheUserAnswer('Для чего это нужно', message),
        ];

        return jargon;
      };

      const createProblems = () => {
        const problemsArray = [];
        if (currentUser.aMain.problemsExact === 'Другое: ') {
          const other = currentUser.aMain.problemsOther === '' ? 'Другое: -' : currentUser.aMain.problemsOther;
          problemsArray.push(this.createTheUserAnswer('Проблемы'), other);
        } else {
          problemsArray.push(this.createTheUserAnswer('Проблемы', currentUser.aMain.problemsExact));
        }

        if (currentUser.aMain.problems) {
          problemsArray.push(
            this.createTheUserAnswer('Как относятся конкуренты друг к другу', currentUser.aMain.relations)
          );
          problemsArray.push(this.createTheUserAnswer('Как решается, кто лучше', currentUser.aMain.whobest));
        } else {
          problemsArray.push(this.createTheUserAnswer('Опишите случай', currentUser.aMain.problemdesc));
          problemsArray.push(this.createTheUserAnswer('Как обычно решаете', currentUser.aMain.solution));
        }

        return problemsArray;
      };

      const scrollList = [
        this.createTheUserAnswer(
          'Основное занятие или хобби',
          currentUser.aMain.hobbie === 'Другое: '
            ? `Другое: ${currentUser.aMain.hobbieOther}`
            : currentUser.aMain.hobbie
        ),
        this.createTheUserAnswer('Как давно', currentUser.aMain.howlong),
        this.createTheUserAnswer('Как часто', currentUser.aMain.ratherExact),
        currentUser.aMain.rather === 'nope'
          ? this.createTheUserAnswer('Почему прекратили', currentUser.aMain.why)
          : null,
        this.createTheUserAnswer('Есть ли сообщество', currentUser.aMain.communityExact),
        createCommunity(currentUser.aMain.community),
        this.createTheUserAnswer('Встречи в свободное время', currentUser.aMain.meetingsExact),
        createMeetings(currentUser.aMain.meetings),
        this.createTheUserAnswer('Как выбирается место', currentUser.aMain.place),
        this.createTheUserAnswer('Каким оно должно быть', currentUser.aMain.descplace),
        this.createTheUserAnswer('Когда лучше играть и почему', currentUser.aMain.time),
        this.createTheUserAnswer('Что играете', currentUser.aMain.whatplay),
        this.createTheUserAnswer('Принцип формирования репертуара', currentUser.aMain.whythisplay),
        this.createTheUserAnswer('Зависит ли от места', currentUser.aMain.placeplay),
        this.createTheUserAnswer('Как приходите на место', currentUser.aMain.howcome),
        this.createTheUserAnswer('Как ходите', currentUser.aMain.howleave),
        this.createTheUserAnswer('Как принимаете первые деньги', currentUser.aMain.firstmoney),
        this.createTheUserAnswer('Как общаетесь с людьми', currentUser.aMain.talk),
        this.createTheUserAnswer('Талисманы или приметы', currentUser.aMain.mascot),
        this.createTheUserAnswer('Опишите их', currentUser.aMain.mascotdesc),
        createJargon(),
        this.createTheUserAnswer('Есть ли прозвище', currentUser.aMain.names),
        this.createTheUserAnswer('Какое', currentUser.aMain.nameslist),
        this.createTheUserAnswer('Есть ли праздники', currentUser.aMain.celebrations),
        this.createTheUserAnswer('Какие', currentUser.aMain.whatceleb),
        createProblems(),
        this.createTheUserAnswer('События', currentUser.aMain.events),
        this.createTheUserAnswer('Реакция', currentUser.aMain.reactions),
        this.createTheUserAnswer('Конкретный случай', currentUser.aMain.story),
        this.createTheUserAnswer('Чем отличаются музыканты в Вашем городе', currentUser.aMain.identity),
      ];
      showChart = React.createElement(
        'div',
        { className: 'musinfo' },
        aStart,
        React.createElement('h1', null, 'Вопросы уличному музыканту:'),
        React.createElement(
          InfiniteScroll,
          {
            dataLength: scrollList.length,
            loader: React.createElement('h4', null, 'Loading...'),
            height: 650,
            endMessage: React.createElement('p', { className: 'endline' }, React.createElement('b', null, '--^--')),
          },
          scrollList
        )
      );
    } else {
      const scrollList = [
        this.createTheUserAnswer('Интерес', currentUser.aMain.interest),
        this.createTheUserAnswer('Кто такие музыканты', currentUser.aMain.who),
        this.createTheUserAnswer('Даете ли деньги и почему', currentUser.aMain.money),
        this.createTheUserAnswer('Какие песни слышали', currentUser.aMain.songs),
        this.createTheUserAnswer('Приметы и поверья', currentUser.aMain.sign),
        this.createTheUserAnswer('Известны ли Вам обычаи', currentUser.aMain.traditions),
        this.createTheUserAnswer('Личный опыт', currentUser.aMain.experience),
      ];
      showChart = React.createElement(
        'div',
        { className: 'lisinfo' },
        aStart,
        React.createElement('h1', null, 'Вопросы простому прохожему:'),
        React.createElement(
          InfiniteScroll,
          {
            dataLength: scrollList.length,
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
          scrollList
        )
      );
    }

    return React.createElement('div', { className: 'the-data-pick-up-user-info' }, showChart);
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
)(UserInfo);
