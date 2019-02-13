import React from 'react';
import { StatByUsers, StatByQuestions } from './../';

const chartTypes = {
  line: 'line',
  bar: 'bar',
  radar: 'radar',
  polar: 'polar area',
  pie: 'pie',
  bubble: 'bubble',
  list: 'list',
  count: 'count',
};

const initialState = {
  components: {
    users: React.createElement('div', { className: 'usersStat' }, React.createElement(StatByUsers)),
    sum: React.createElement('div', { className: 'summaryStat' }, React.createElement(StatByQuestions)),
  },
  currentComponent: React.createElement('div', { className: 'usersStat' }, React.createElement(StatByUsers)),
  startData: [],
  currentUser: {
    aStart: {
      id: -1,
    },
    aMain: {},
  },
  currentStat: {
    id: -1,
    what: {},
    data: {},
  },
  questions: [
    {
      dbName: 'id',
      title: 'Всего ответило человек',
      chartType: chartTypes.count,
    },
    {
      dbName: 'city',
      title: 'Города',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'age',
      title: 'Возраст',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'gender',
      title: 'Пол',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'edu',
      title: 'Образование',
      extraField: 'eduOther',
      extraTitle: 'Другое:',
      chartType: chartTypes.pie,
      extraChart: chartTypes.list,
    },
    {
      dbName: 'job',
      title: 'Род занятий',
      chartType: chartTypes.list,
    },
    {
      dbName: 'everPlayed',
      title: 'Играли ли когда-нибудь на улице',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'interest',
      title: 'Интерес к уличной музыке',
      chartType: chartTypes.radar,
    },
    {
      dbName: 'who',
      title: 'Кто такие на Ваш взгляд уличные музыканты',
      chartType: chartTypes.list,
    },
    {
      dbName: 'money',
      title: 'Даете ли деньги и почему',
      extraTitle: 'Грубый анализ ответов:',
      chartType: chartTypes.list,
      extraChart: chartTypes.bar,
    },
    {
      dbName: 'songs',
      title: 'Репертуар',
      chartType: chartTypes.list,
    },
    {
      dbName: 'sign',
      title: 'Приметы и поверья',
      chartType: chartTypes.list,
    },
    {
      dbName: 'traditions',
      title: 'Знаете ли обычаи',
      chartType: chartTypes.list,
    },
    {
      dbName: 'experience',
      title: 'Личный опыт',
      chartType: chartTypes.list,
    },
    {
      dbName: 'hobbie',
      title: 'Основное занятие или хобби',
      extraField: 'hobbieOther',
      extraTitle: 'Другое:',
      chartType: chartTypes.pie,
      extraChart: chartTypes.list,
    },
    {
      dbName: 'howlong',
      title: 'Как давно?',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'rather',
      title: 'Как часто?',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'why',
      title: 'Почему прекратили?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'community',
      title: 'Есть ли сообщество?',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'official',
      title: 'Официальное?',
      extraField: 'oficcialOther',
      extraTitle: 'Другое:',
      chartType: chartTypes.pie,
      extraChart: chartTypes.list,
    },
    {
      dbName: 'wocom',
      title: 'Может ли не состоять?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'howjoin',
      title: 'Как вступить?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'cookies',
      title: 'Какие плюшки с этого?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'meetings',
      title: 'Встречаетесь в свободное время?',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'reasons',
      title: 'По каким поводам?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'where',
      title: 'Где?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'whywhere',
      title: 'Почему именно там?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'meetingtime',
      title: 'Когда?',
      chartType: chartTypes.radar,
    },
    {
      dbName: 'place',
      title: 'Как выбирается место?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'descplace',
      title: 'Каким оно должно быть?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'time',
      title: 'Когда лучше играть и почему?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'whatplay',
      title: 'Что играете?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'whythisplay',
      title: 'Принцип формирования репертуара',
      chartType: chartTypes.list,
    },
    {
      dbName: 'placeplay',
      title: 'Зависит ли от места?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'howcome',
      title: 'Как приходите на место?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'howleave',
      title: 'Как уходите?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'firstmoney',
      title: 'Как принимаете первые деньги?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'talk',
      title: 'Как общаетесь с людьми?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'mascot',
      title: 'Есть талисманы или приметы?',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'mascotdesc',
      title: 'Опишите свои талисманы или приметы',
      chartType: chartTypes.list,
    },
    {
      dbName: 'jargon',
      title: 'Жаргон',
      chartType: chartTypes.list,
    },
    {
      dbName: 'specsigns',
      title: 'Условные знаки',
      chartType: chartTypes.list,
    },
    {
      dbName: 'idmarks',
      title: 'Опознавательные знаки',
      chartType: chartTypes.list,
    },
    {
      dbName: 'forwhat',
      title: 'Для чего это нужно?',
      extraField: 'forwhatOther',
      extraTitle: 'Другое:',
      chartType: chartTypes.radar,
      extraChart: chartTypes.list,
    },
    {
      dbName: 'names',
      title: 'Есть ли у Вас прозвище?',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'nameslist',
      title: 'Если есть, то какое?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'celebrations',
      title: 'Есть ли праздники?',
      chartType: chartTypes.pie,
    },
    {
      dbName: 'whatceleb',
      title: 'Какие праздники?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'problems',
      title: 'С какими проблемами сталкивались?',
      extraField: 'problemsOther',
      extraTitle: 'Другое:',
      chartType: chartTypes.radar,
      extraChart: chartTypes.list,
    },
    {
      dbName: 'relations',
      title: 'Как относятся конкуренты друг к другу?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'whobest',
      title: 'Как решается, кто лучше?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'problemdesc',
      title: 'Опишите случай',
      chartType: chartTypes.list,
    },
    {
      dbName: 'solution',
      title: 'Как обычно решаете?',
      chartType: chartTypes.list,
    },
    {
      dbName: 'events',
      title: 'События',
      chartType: chartTypes.list,
    },
    {
      dbName: 'reactions',
      title: 'Реакция на события',
      chartType: chartTypes.list,
    },
    {
      dbName: 'story',
      title: 'Конкретный случай',
      chartType: chartTypes.list,
    },
    {
      dbName: 'identity',
      title: 'Чем отличаются музыканты в Вашем городе?',
      chartType: chartTypes.list,
    },
  ],
  currentPage: {
    id: -1,
  },
  pagesCount: 0,

  getDataPending: false,
  getDataError: null,
  getUserInfoPending: false,
  getUserInfoError: null,
  getStatInfoPending: false,
  getStatInfoError: null,
  getAllInfoPending: false,
  getAllInfoError: null,
  getPageInfoPending: false,
  getPageInfoError: null,
};

export default initialState;
