// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { INTERVIEW_RESET_INTERVIEW } from './constants';

export function resetInterview() {
  return {
    type: INTERVIEW_RESET_INTERVIEW,
  };
}

export function reducer(state, action) {
  console.log('reset called');
  switch (action.type) {
    case INTERVIEW_RESET_INTERVIEW:
      return {
        ...state,
        currentIndex: 0,
        pageContent: state.interviewStages[0],
        firstFields: { city: '', age: '', gender: '', edu: '', eduOther: '', job: '' },
        secondFields: { everPlayed: '' },
        thirdFields: { interest: 3, who: '', money: '' },
        fourthFields: { songs: '' },
        fifthFields: { sign: '', traditions: '' },
        sixthFields: { experience: '' },
        seventhFields: { hobbie: '', hobbieOther: '', rather: '', ratherExact: '' },
        eighthFields: { why: '' },
        ninethFields: { community: '', communityExact: '' },
        tenthFields: { official: '', officialOther: '', wocom: '', howjoin: '', cookies: '' },
        eleventhFields: { meetings: '', meetingsExact: '' },
        twelfthFields: { reasons: '', where: '', whywhere: '', meetingtime: ['', '', '', '', ''] },
        thirteenthFields: { place: '', descplace: '', time: '' },
        fourteenthFields: { whatplay: '', whythisplay: '', placeplay: '' },
        fifteenthFields: { howcome: '', howleave: '', firstmoney: '', talk: '' },
        sixteenthFields: { jargon: '', specsigns: '', idmarks: '', forwhat: ['', '', ''], forwhatOther: '' },
        seventeenthFields: { celebrations: '', howceleb: '' },
        eighteenthFields: { competition: '', relations: '', whobest: '' },
        nineteenthFields: { events: '', reactions: '', story: '' },
        twentiethFields: { identity: '' },
        twentyFirstFields: { thanks: '', help: '' },
        checkPoints: [
          {},
          { city: '', age: '', gender: '', edu: '', eduOther: '', job: '' },
          { everPlayed: '' },
          { interest: '', who: '', money: '' },
          { songs: '' },
          { sign: '', traditions: '' },
          { experience: '' },
          { hobbie: '', hobbieOther: '', rather: '', ratherExact: '' },
          { why: '' },
          { community: '', communityExact: '' },
          { official: '', officialOther: '', wocom: '', howjoin: '', cookies: '' },
          { meetings: '', meetingsExact: '' },
          { reasons: '', where: '', whywhere: '', meetingtime: ['', '', '', '', ''] },
          { place: '', descplace: '', time: '' },
          { whatplay: '', whythisplay: '', placeplay: '' },
          { howcome: '', howleave: '', firstmoney: '', talk: '' },
          { jargon: '', specsigns: '', idmarks: '', forwhat: ['', '', ''], forwhatOther: '' },
          { celebrations: '', howceleb: '' },
          { competition: '', relations: '', whobest: '' },
          { events: '', reactions: '', story: '' },
          { identity: '' },
          { thanks: '', help: '' },
        ],
        currentKeyValue: '',
      };

    default:
      return state;
  }
}
