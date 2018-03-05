// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import React from 'react';
import { INTERVIEW_START_INTERVIEW } from './constants';
import { FirstPage } from './../';

export function startInterview() {
  return {
    type: INTERVIEW_START_INTERVIEW,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INTERVIEW_START_INTERVIEW:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        pageContent: state.interviewStages[state.currentIndex + 1]
      };

    default:
      return state;
  }
}
