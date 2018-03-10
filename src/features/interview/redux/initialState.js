// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.

import React from 'react';
import { StartPage, FirstPage, SecondPage, ThirdListenerPage } from './../';

const initialState = {
  interviewStages: [
    React.createElement(StartPage),
    React.createElement(FirstPage),
    React.createElement(SecondPage),
    React.createElement(ThirdListenerPage),
  ],
  currentIndex: 0,
  pageContent: React.createElement(StartPage),
  firstFields: { city: '', age: '', gender: '', edu: '', job: '' },
  secondFields: { everPlayed: '' },
  keyValues: [
    { yep: 1, nope: -1, back: -1 },
    { yep: 2, nope: -1, back: 0 },
    { yep: 6, nope: 3, back: 1 },
    { yep: 4, nope: -1, back: 2 },
    { yep: 5, nope: -1, back: 3 },
  ],
  currentKeyValue: '',
};

export default initialState;
