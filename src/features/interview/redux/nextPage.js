// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { INTERVIEW_NEXT_PAGE } from './constants';

export function nextPage() {
  return {
    type: INTERVIEW_NEXT_PAGE,
  };
}

export function reducer(state, action) {
  const newIndex = state.currentIndex + 1 < state.interviewStages.length ? state.currentIndex + 1 : state.currentIndex;

  switch (action.type) {
    case INTERVIEW_NEXT_PAGE:
      console.log('emited next');
      return {
        ...state,
        currentIndex: newIndex,
        pageContent: state.interviewStages[newIndex],
      };

    default:
      return state;
  }
}
