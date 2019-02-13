import { expect } from 'chai';

import { INTERVIEW_RESET_INTERVIEW } from 'src/features/interview/redux/constants';

import { resetInterview, reducer } from 'src/features/interview/redux/resetInterview';

describe('interview/redux/resetInterview', () => {
  it('returns correct action by resetInterview', () => {
    expect(resetInterview()).to.have.property('type', INTERVIEW_RESET_INTERVIEW);
  });

  it('handles action type INTERVIEW_RESET_INTERVIEW correctly', () => {
    const prevState = {
      interviewStages: [0, 1, 2],
      currentIndex: 0,
      pageContent: 1,
      firstFields: { city: 'werg', age: 'erwg', gender: 'werg', edu: 'wegr', eduOther: 'weg', job: 'ewg' },
      secondFields: { everPlayed: '1' },
      thirdFields: { interest: 3, who: '1', money: '1' },
      fourthFields: { songs: '1' },
      fifthFields: { sign: '1', traditions: '1' },
      sixthFields: { experience: '1' },
      seventhFields: { hobbie: '1', hobbieOther: '1', rather: '1', ratherExact: '1' },
      eighthFields: { why: '1' },
      ninethFields: { community: '1', communityExact: '1' },
      tenthFields: { official: '1', officialOther: '1', wocom: '1', howjoin: '1', cookies: '1' },
      eleventhFields: { meetings: '', meetingsExact: '' },
      twelfthFields: { reasons: '1', where: '1', whywhere: '1', meetingtime: ['1', '2', '3', '4', '5'] },
      thirteenthFields: { place: '1', descplace: '1', time: '1' },
      fourteenthFields: { whatplay: '1', whythisplay: '1', placeplay: '1' },
      fifteenthFields: { howcome: '1', howleave: '1', firstmoney: '', talk: '' },
      sixteenthFields: { jargon: '1', specsigns: '1', idmarks: '1', forwhat: ['1', '2', '3'], forwhatOther: '' },
      seventeenthFields: { celebrations: '1', howceleb: '1' },
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
      currentKeyValue: 'qwerty',
    };

    const newState = {
      interviewStages: [0, 1, 2],
      currentIndex: 0,
      pageContent: 0,
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

    const state = reducer(prevState, { type: INTERVIEW_RESET_INTERVIEW });
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(newState); // TODO: replace this line with real case.
  });
});
