// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { INTERVIEW_FINISH_INTERVIEW } from './constants';

export function finishInterview() {
  return {
    type: INTERVIEW_FINISH_INTERVIEW,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INTERVIEW_FINISH_INTERVIEW:
      return {
        ...state,
        currentIndex: state.lastPage + 1,
        pageContent: state.interviewStages[state.lastPage + 1],
      };

    default:
      return state;
  }
}
