import React from 'react';

const initialState = {
  components: {
    users: React.createElement('div', { className: 'usersStat' }, React.createElement('h1', null, 'SUP BITCH!')),
    sum: React.createElement('div', { className: 'summaryStat' }, React.createElement('h1', null, 'ALL BTCHS!')),
  },
  currentComponent: React.createElement(
    'div',
    { className: 'usersStat' },
    React.createElement('h1', null, 'SUP BITCH!')
  ),

  getDataPending: false,
  getDataError: null,
};

export default initialState;
