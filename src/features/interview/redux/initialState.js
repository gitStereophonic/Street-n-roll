// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.

import React from 'react';
import { StartPage, FirstPage } from './../';

const initialState = {
  interviewStages: [React.createElement(StartPage), React.createElement(FirstPage)],
  currentIndex: 0,
  pageContent: React.createElement(StartPage),
};

export default initialState;
