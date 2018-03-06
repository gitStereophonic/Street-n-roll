import { expect } from 'chai';

import { INTERVIEW_START_INTERVIEW } from 'src/features/interview/redux/constants';

import { startInterview, reducer } from 'src/features/interview/redux/startInterview';

describe('interview/redux/startInterview', () => {
  it('returns correct action by startInterview', () => {
    expect(startInterview()).to.have.property('type', INTERVIEW_START_INTERVIEW);
  });

  it('handles action type INTERVIEW_START_INTERVIEW correctly', () => {
    const prevState = {
      interviewStages: [12, 434, 59, 44, 252],
      currentIndex: 3,
      pageContent: 44,
    };
    const expectedState = {
      interviewStages: [12, 434, 59, 44, 252],
      currentIndex: 4,
      pageContent: 252,
    };
    const state = reducer(prevState, { type: INTERVIEW_START_INTERVIEW });
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(expectedState); // TODO: replace this line with real case.
  });
});
