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

  const cP = state.checkPoints;
  switch (state.currentIndex) {
    case 1:
      cP[state.currentIndex] = state.firstFields;
      break;
    case 2:
      cP[state.currentIndex] = state.secondFields;
      break;
    case 3:
      cP[state.currentIndex] = state.thirdFields;
      break;
    case 4:
      cP[state.currentIndex] = state.fourthFields;
      break;
    case 5:
      cP[state.currentIndex] = state.fifthFields;
      break;
    case 6:
      cP[state.currentIndex] = state.sixthFields;
      break;
    case 7:
      cP[state.currentIndex] = state.seventhFields;
      break;
    case 8:
      cP[state.currentIndex] = state.eighthFields;
      break;
    case 9:
      cP[state.currentIndex] = state.ninethFields;
      break;
    case 10:
      cP[state.currentIndex] = state.tenthFields;
      break;
    case 11:
      cP[state.currentIndex] = state.eleventhFields;
      break;
    case 12:
      cP[state.currentIndex] = state.twelfthFields;
      break;
    case 13:
      cP[state.currentIndex] = state.thirteenthFields;
      break;
    case 14:
      cP[state.currentIndex] = state.fourteenthFields;
      break;
    case 15:
      cP[state.currentIndex] = state.fifteenthFields;
      break;
    case 16:
      cP[state.currentIndex] = state.sixteenthFields;
      break;
    case 17:
      cP[state.currentIndex] = state.seventeenthFields;
      break;
    case 18:
      cP[state.currentIndex] = state.eighteenthFields;
      break;
    case 19:
      cP[state.currentIndex] = state.nineteenthFields;
      break;
    case 20:
      cP[state.currentIndex] = state.twentiethFields;
      break;
    case 21:
      cP[state.currentIndex] = state.twentyFirstFields;
      break;
    case 22:
      cP[state.currentIndex] = state.twentySecondFields;
      break;
    case 23:
      cP[state.currentIndex] = state.twentyThirdFields;
      break;
    case 24:
      cP[state.currentIndex] = state.twentyFourthFields;
      break;
    default:
      break;
  }

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
