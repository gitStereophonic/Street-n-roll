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
  switch (action.type) {
    case INTERVIEW_PREV_PAGE:
      return {
        ...state,
        currentIndex: state.currentIndex > 0 ? state.currentIndex - 1 : state.currentIndex,
        pageContent:
          state.currentIndex > 0
            ? state.interviewStages[state.currentIndex - 1]
            : state.interviewStages[state.currentIndex],
      };

    default:
      return state;
  }
}
