import React from 'react';
import {
  StartPage,
  FirstPage,
  SecondPage,
  ThirdListenerPage,
  FourthListenerPage,
  FifthListenerPage,
  SixthListenerPage,
  SeventhMusicianPage,
  EighthMusicianPage,
  NinethMusicianPage,
  TenthMusicianPage,
  EleventhMusicianPage,
  TwelfthMusicianPage,
  ThirteenthMusicianPage,
  FourteenthMusicianPage,
  FifteenthMusicianPage,
  SixteenthMusicianPage,
  SeventeenthMusicianPage,
  EighteenthMusicianPage,
  NineteenthMusicianPage,
  TwentiethMusicianPage,
  TwentyFirstMusicianPage,
  TwentySecondMusicianPage,
  TwentyThirdMusicianPage,
  TwentyFourthPage,
  FinishPage,
} from './../';

const initialState = {
  interviewStages: [
    React.createElement(StartPage),
    React.createElement(FirstPage),
    React.createElement(SecondPage),
    React.createElement(ThirdListenerPage),
    React.createElement(FourthListenerPage),
    React.createElement(FifthListenerPage),
    React.createElement(SixthListenerPage),
    React.createElement(SeventhMusicianPage),
    React.createElement(EighthMusicianPage),
    React.createElement(NinethMusicianPage),
    React.createElement(TenthMusicianPage),
    React.createElement(EleventhMusicianPage),
    React.createElement(TwelfthMusicianPage),
    React.createElement(ThirteenthMusicianPage),
    React.createElement(FourteenthMusicianPage),
    React.createElement(FifteenthMusicianPage),
    React.createElement(SixteenthMusicianPage),
    React.createElement(SeventeenthMusicianPage),
    React.createElement(EighteenthMusicianPage),
    React.createElement(NineteenthMusicianPage),
    React.createElement(TwentiethMusicianPage),
    React.createElement(TwentyFirstMusicianPage),
    React.createElement(TwentySecondMusicianPage),
    React.createElement(TwentyThirdMusicianPage),
    React.createElement(TwentyFourthPage),
    React.createElement(FinishPage),
  ],
  currentIndex: 0,
  pageContent: React.createElement(StartPage),
  firstFields: { city: '', age: '', gender: '', edu: '', eduOther: '', job: '' },
  secondFields: { everPlayed: '' },
  thirdFields: { interest: 3, who: '', money: '' },
  fourthFields: { songs: '' },
  fifthFields: { sign: '', traditions: '' },
  sixthFields: { experience: '' },
  seventhFields: { hobbie: '', hobbieOther: '', howlong: '', rather: '', ratherExact: '' },
  eighthFields: { why: '' },
  ninethFields: { community: '', communityExact: '' },
  tenthFields: { official: '', officialOther: '', wocom: '', howjoin: '', cookies: '' },
  eleventhFields: { meetings: '', meetingsExact: '' },
  twelfthFields: { reasons: '', where: '', whywhere: '', meetingtime: ['', '', '', '', ''] },
  thirteenthFields: { place: '', descplace: '', time: '' },
  fourteenthFields: { whatplay: '', whythisplay: '', placeplay: '' },
  fifteenthFields: { howcome: '', howleave: '', firstmoney: '', talk: '', mascot: '', mascotdesc: '' },
  sixteenthFields: { jargon: '', specsigns: '', idmarks: '', forwhat: ['', '', ''], forwhatOther: '' },
  seventeenthFields: { celebrations: '', whatceleb: '' },
  eighteenthFields: { relations: '', whobest: '' },
  nineteenthFields: { events: '', reactions: '', story: '' },
  twentiethFields: { identity: '' },
  twentyFirstFields: { names: '', nameslist: '' },
  twentySecondFields: { problems: '', problemsExact: '', problemsOther: '' },
  twentyThirdFields: { problemdesc: '', solution: '' },
  twentyFourthFields: { thanks: '', help: '' },
  checkPoints: [
    {},
    { city: '', age: '', gender: '', edu: '', eduOther: '', job: '' },
    { everPlayed: '' },
    { interest: '', who: '', money: '' },
    { songs: '' },
    { sign: '', traditions: '' },
    { experience: '' },
    { hobbie: '', hobbieOther: '', howlong: '', rather: '', ratherExact: '' },
    { why: '' },
    { community: '', communityExact: '' },
    { official: '', officialOther: '', wocom: '', howjoin: '', cookies: '' },
    { meetings: '', meetingsExact: '' },
    { reasons: '', where: '', whywhere: '', meetingtime: ['', '', '', '', ''] },
    { place: '', descplace: '', time: '' },
    { whatplay: '', whythisplay: '', placeplay: '' },
    { howcome: '', howleave: '', firstmoney: '', talk: '', mascot: '', mascotdesc: '' },
    { jargon: '', specsigns: '', idmarks: '', forwhat: ['', '', ''], forwhatOther: '' },
    { celebrations: '', whatceleb: '' },
    { competition: '', relations: '', whobest: '' },
    { events: '', reactions: '', story: '' },
    { identity: '' },
    { names: '', nameslist: '' },
    { problems: '', problemsExact: '', problemsOther: '' },
    { problemdesc: '', solution: '' },
    { thanks: '', help: '' },
  ],
  keyValues: [
    { yep: 1, nope: -1, back: -1 }, // 0
    { yep: 2, nope: -1, back: 0 }, // 1
    { yep: 7, nope: 3, back: 1 }, // 2
    { yep: 4, nope: -1, back: 2 }, // 3
    { yep: 5, nope: -1, back: 3 }, // 4
    { yep: 6, nope: -1, back: 4 }, // 5
    { yep: 24, nope: -1, back: 5 }, // 6
    { yep: 9, nope: 8, back: 2 }, // 7
    { yep: 9, nope: -1, back: 7 }, // 8
    { yep: 10, nope: 11, back: 7 }, // 9
    { yep: 11, nope: -1, back: 9 }, // 10
    { yep: 12, nope: 13, back: 9 }, // 11
    { yep: 13, nope: -1, back: 11 }, // 12
    { yep: 14, nope: -1, back: 11 }, // 13
    { yep: 15, nope: -1, back: 13 }, // 14
    { yep: 16, nope: -1, back: 14 }, // 15
    { yep: 21, nope: -1, back: 15 }, // 16
    { yep: 22, nope: -1, back: 21 }, // 17 праздник
    { yep: 19, nope: -1, back: 22 }, // 18 конкуренция
    { yep: 20, nope: -1, back: 22 }, // 19
    { yep: 24, nope: -1, back: 19 }, // 20
    { yep: 17, nope: -1, back: 16 }, // 21 клички
    { yep: 18, nope: 23, back: 17 }, // 22 проблемы
    { yep: 19, nope: -1, back: 22 }, // 23 опишите проблему
    { yep: 24, nope: -1, back: 20 }, // 24 страница отправки
    { yep: 25, nope: 25, back: 25 },
  ],
  currentKeyValue: '',
  lastPage: 24,
  lasts: {
    yeplast: 20,
    nopelast: 6,
  },
  backDoor: false,
  sendInterviewDataPending: false,
  sendInterviewDataError: null,
};

export default initialState;
