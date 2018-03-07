// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { INTERVIEW_PREVI_PAGE } from './constants';

export function previPage() {
  return {
    type: INTERVIEW_PREVI_PAGE,
  };
}

export function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case INTERVIEW_PREVI_PAGE:
      console.log('emit prev');
      return {
        ...state,
      };

    default:
      return state;
  }
}
