import { expect } from 'chai';

import { INTERVIEW_FINISH_INTERVIEW } from 'src/features/interview/redux/constants';

import { finishInterview, reducer } from 'src/features/interview/redux/finishInterview';

describe('interview/redux/finishInterview', () => {
  it('returns correct action by finishInterview', () => {
    expect(finishInterview()).to.have.property('type', INTERVIEW_FINISH_INTERVIEW);
  });

  it('handles action type INTERVIEW_FINISH_INTERVIEW correctly', () => {
    const prevState = {
      lastPage: 12,
      currentIndex: 12,
      interviewStages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      pageContent: 12,
    };
    const newState = {
      lastPage: 12,
      currentIndex: 13,
      interviewStages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      pageContent: 13,
    };
    const state = reducer(prevState, { type: INTERVIEW_FINISH_INTERVIEW });
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(newState); // TODO: replace this line with real case.
  });
});
