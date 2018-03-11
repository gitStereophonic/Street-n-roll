// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.

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
  ],
  currentIndex: 0,
  pageContent: React.createElement(StartPage),
  firstFields: { city: '', age: '', gender: '', edu: '', job: '' },
  secondFields: { everPlayed: '' },
  thirdFields: { interest: '', who: '', money: '' },
  fourthFields: { songs: '' },
  fifthFields: { sign: '', traditions: '' },
  sixthFields: { experience: '' },
  seventhFields: { hobbie: '', rather: '' },
  eighthFields: { why: '' },
  ninethFields: { community: '' },
  tenthFields: { official: '', wocom: '', howjoin: '', cookies: '' },
  eleventhFields: { meetings: '' },
  twelfthFields: { reasons: '', where: '', whywhere: '' },
  keyValues: [
    { yep: 1, nope: -1, back: -1 },
    { yep: 2, nope: -1, back: 0 },
    { yep: 7, nope: 3, back: 1 },
    { yep: 4, nope: -1, back: 2 },
    { yep: 5, nope: -1, back: 3 },
    { yep: 6, nope: -1, back: 4 },
    { yep: 21, nope: -1, back: 5 },
    { yep: 9, nope: 8, back: 2 },
    { yep: 9, nope: -1, back: 7 },
    { yep: 10, nope: 11, back: 7 },
    { yep: 11, nope: -1, back: 9 },
    { yep: 12, nope: 13, back: 10 },
    { yep: 13, nope: -1, back: 11 },
  ],
  currentKeyValue: '',
  backDoor: true,
};

export default initialState;
