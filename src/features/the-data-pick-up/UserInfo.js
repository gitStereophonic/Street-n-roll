import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class UserInfo extends Component {
  static propTypes = {
    theDataPickUp: PropTypes.object.isRequired,
    // actions: PropTypes.object.isRequired,
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

      showChart = React.createElement(
        'div',
        { className: 'musinfo' },
        aStart,
        React.createElement('h1', null, 'Вопросы уличному музыканту:'),
        this.createTheUserAnswer(
          'Основное занятие или хобби',
          currentUser.aMain.hobbie === 'Другое: '
            ? `Другое: ${currentUser.aMain.hobbieOther}`
            : currentUser.aMain.hobbie
        ),
        this.createTheUserAnswer('Как часто', currentUser.aMain.ratherExact),
        currentUser.aMain.rather === 'nope'
          ? this.createTheUserAnswer('Почему прекратили', currentUser.aMain.why)
          : null,
        this.createTheUserAnswer('Есть ли сообщество', currentUser.aMain.communityExact),
        createCommunity(currentUser.aMain.community === 'yep'),
        this.createTheUserAnswer('Встречи в свободное время', currentUser.aMain.meetingsExact),
        createMeetings(currentUser.aMain.meetings === 'yep')
      );
    } else {
      showChart = React.createElement(
        'div',
        { className: 'lisinfo' },
        aStart,
        React.createElement('h1', null, 'Вопросы простому прохожему:'),
        this.createTheUserAnswer('Интерес', currentUser.aMain.interest),
        this.createTheUserAnswer('Кто такие музыканты', currentUser.aMain.who),
        this.createTheUserAnswer('Даете ли деньги и почему', currentUser.aMain.money),
        this.createTheUserAnswer('Какие песни слышали', currentUser.aMain.songs),
        this.createTheUserAnswer('Приметы и поверья', currentUser.aMain.sign),
        this.createTheUserAnswer('Известны ли Вам обычаи', currentUser.aMain.traditions),
        this.createTheUserAnswer('Личный опыт', currentUser.aMain.experience)
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
