import React from 'react';
import { StatByUsers } from './../';

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
    sum: React.createElement('div', { className: 'summaryStat' }, React.createElement('h1', null, 'ALL BTCHS!')),
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
  ],

  getDataPending: false,
  getDataError: null,
  getUserInfoPending: false,
  getUserInfoError: null,
  getStatInfoPending: false,
  getStatInfoError: null,
};

export default initialState;
