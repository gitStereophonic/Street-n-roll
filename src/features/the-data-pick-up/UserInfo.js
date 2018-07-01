import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class UserInfo extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.createTheUserAnswer = this.createTheUserAnswer.bind(this);
  }

  createTheUserAnswer(field, text, id) {
    const { questions, currentStat } = this.props.theDataPickUp;
    const { getStatInfo } = this.props.actions;

    return React.createElement(
      'p',
      { className: 'answer', key: field },
      React.createElement(
        'a',
        {
          className: 'answer-label',
          onClick: () => {
            getStatInfo({ questionId: id, what: questions[id] });
            currentStat.what = questions[id];
            currentStat.id = id;
          },
        },
        `${field}: `
      ),
      React.createElement('span', { className: 'answer-text' }, text)
    );
  }

  render() {
    const { currentUser } = this.props.theDataPickUp;

    let showChart;
    const aStart = [
      React.createElement('h1', { key: 'header' }, ' Общие вопросы:'),
      this.createTheUserAnswer('Id', currentUser.aStart.id, 0),
      this.createTheUserAnswer('Город', currentUser.aStart.city, 1),
      this.createTheUserAnswer('Возраст', currentUser.aStart.age, 2),
      this.createTheUserAnswer('Пол', currentUser.aStart.gender, 3),
      this.createTheUserAnswer(
        'Образование',
        currentUser.aStart.edu === 'other' ? `Другое: ${currentUser.aStart.eduOther}` : currentUser.aStart.edu,
        4
      ),
      this.createTheUserAnswer('Род деятельности', currentUser.aStart.job, 5),
      this.createTheUserAnswer('Играл ли', currentUser.aStart.everPlayed ? 'Да' : 'Нет', 6),
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
          this.createTheUserAnswer('Официальное', official, 19),
          this.createTheUserAnswer('Может ли не состоять', currentUser.aMain.wocom, 20),
          this.createTheUserAnswer('Как вступить', currentUser.aMain.howjoin, 21),
          this.createTheUserAnswer('Какие плюшки с этого', currentUser.aMain.cookies, 22),
        ];

        return community;
      };

      const createMeetings = (rly = false) => {
        if (!rly) return null;

        const meetingTimeArray = currentUser.aMain.meetingtime.split(',').filter(item => item !== '');
        const message = meetingTimeArray.reduce((sum, current) => `${sum}, ${current}`);

        const meetings = [
          this.createTheUserAnswer('По каким поводам', currentUser.aMain.reasons, 24),
          this.createTheUserAnswer('Где', currentUser.aMain.where, 25),
          this.createTheUserAnswer('Почему именно там', currentUser.aMain.whywhere, 26),
          this.createTheUserAnswer('Когда', message, 27),
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
          this.createTheUserAnswer('Жаргон', currentUser.aMain.jargon, 40),
          this.createTheUserAnswer('Условные знаки', currentUser.aMain.specsigns, 41),
          this.createTheUserAnswer('Опознавательные знаки', currentUser.aMain.idmarks, 42),
          this.createTheUserAnswer('Для чего это нужно', message, 43),
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
            : currentUser.aMain.hobbie,
          14
        ),
        this.createTheUserAnswer('Как давно', currentUser.aMain.howlong, 15),
        this.createTheUserAnswer('Как часто', currentUser.aMain.ratherExact, 16),
        currentUser.aMain.rather === false
          ? this.createTheUserAnswer('Почему прекратили', currentUser.aMain.why, 17)
          : null,
        this.createTheUserAnswer('Есть ли сообщество', currentUser.aMain.communityExact, 18),
        createCommunity(currentUser.aMain.community),
        this.createTheUserAnswer('Встречи в свободное время', currentUser.aMain.meetingsExact, 23),
        createMeetings(currentUser.aMain.meetings),
        this.createTheUserAnswer('Как выбирается место', currentUser.aMain.place, 28),
        this.createTheUserAnswer('Каким оно должно быть', currentUser.aMain.descplace, 29),
        this.createTheUserAnswer('Когда лучше играть и почему', currentUser.aMain.time, 30),
        this.createTheUserAnswer('Что играете', currentUser.aMain.whatplay, 31),
        this.createTheUserAnswer('Принцип формирования репертуара', currentUser.aMain.whythisplay, 32),
        this.createTheUserAnswer('Зависит ли от места', currentUser.aMain.placeplay, 33),
        this.createTheUserAnswer('Как приходите на место', currentUser.aMain.howcome, 34),
        this.createTheUserAnswer('Как уходите', currentUser.aMain.howleave, 35),
        this.createTheUserAnswer('Как принимаете первые деньги', currentUser.aMain.firstmoney, 36),
        this.createTheUserAnswer('Как общаетесь с людьми', currentUser.aMain.talk, 37),
        this.createTheUserAnswer('Талисманы или приметы', currentUser.aMain.mascot, 38),
        this.createTheUserAnswer('Опишите их', currentUser.aMain.mascotdesc, 39),
        createJargon(),
        this.createTheUserAnswer('Есть ли прозвище', currentUser.aMain.names, 44),
        this.createTheUserAnswer('Какое', currentUser.aMain.nameslist, 45),
        this.createTheUserAnswer('Есть ли праздники', currentUser.aMain.celebrations, 46),
        this.createTheUserAnswer('Какие', currentUser.aMain.whatceleb, 47),
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
        this.createTheUserAnswer('Интерес', currentUser.aMain.interest, 7),
        this.createTheUserAnswer('Кто такие музыканты', currentUser.aMain.who, 8),
        this.createTheUserAnswer('Даете ли деньги и почему', currentUser.aMain.money, 9),
        this.createTheUserAnswer('Какие песни слышали', currentUser.aMain.songs, 10),
        this.createTheUserAnswer('Приметы и поверья', currentUser.aMain.sign, 11),
        this.createTheUserAnswer('Известны ли Вам обычаи', currentUser.aMain.traditions, 12),
        this.createTheUserAnswer('Личный опыт', currentUser.aMain.experience, 13),
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
