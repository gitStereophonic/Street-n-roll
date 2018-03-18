import { expect } from 'chai';

import { INTERVIEW_PREV_PAGE } from 'src/features/interview/redux/constants';

import { prevPage, reducer } from 'src/features/interview/redux/prevPage';

describe('interview/redux/prevPage', () => {
  it('returns correct action by prevPage', () => {
    expect(prevPage()).to.have.property('type', INTERVIEW_PREV_PAGE);
  });

  it('handles action type INTERVIEW_PREV_PAGE correctly', () => {
    const prevState = {
      interviewStages: [0, 33, 435, 36],
      checkPoints: [{}, {}, {}],
      secondFields: { everPlayed: '' },
      currentIndex: 2,
      pageContent: 2,
      keyValues: [
        { yep: 1, nope: 2, back: 0 },
        { yep: 2, nope: 0, back: 0 },
        { yep: 3, nope: -1, back: 1 },
        { yep: 3, nope: 0, back: 2 },
      ],
    };
    const expectedState = {
      interviewStages: [0, 33, 435, 36],
      checkPoints: [{}, {}, { everPlayed: '' }],
      secondFields: { everPlayed: '' },
      currentIndex: 1,
      pageContent: 33,
      keyValues: [
        { yep: 1, nope: 2, back: 0 },
        { yep: 2, nope: 0, back: 0 },
        { yep: 3, nope: -1, back: 1 },
        { yep: 3, nope: 0, back: 2 },
      ],
    };
    const state = reducer(prevState, { type: INTERVIEW_PREV_PAGE });
    expect(state).to.not.equal(prevState);
    expect(state).to.deep.equal(expectedState);
  });
});
