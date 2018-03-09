// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { INTERVIEW_PREV_PAGE } from './constants';

export function prevPage() {
  return {
    type: INTERVIEW_PREV_PAGE,
  };
}

export function reducer(state, action) {
  const newIndex = state.keyValues[state.currentIndex].back;

  switch (action.type) {
    case INTERVIEW_PREV_PAGE:
      return {
        ...state,
        currentIndex: newIndex,
        pageContent: state.interviewStages[newIndex],
      };

    default:
      return state;
  }
}
