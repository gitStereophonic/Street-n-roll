// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  INTERVIEW_NEXT_PAGE,
} from './constants';

export function nextPage() {
  return {
    type: INTERVIEW_NEXT_PAGE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INTERVIEW_NEXT_PAGE:
      console.log('next page');
      return {
        ...state,
      };

    default:
      return state;
  }
}
