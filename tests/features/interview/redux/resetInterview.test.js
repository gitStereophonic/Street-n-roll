import { expect } from 'chai';

import {
  INTERVIEW_RESET_INTERVIEW,
} from 'src/features/interview/redux/constants';

import {
  resetInterview,
  reducer,
} from 'src/features/interview/redux/resetInterview';

describe('interview/redux/resetInterview', () => {
  it('returns correct action by resetInterview', () => {
    expect(resetInterview()).to.have.property('type', INTERVIEW_RESET_INTERVIEW);
  });

  it('handles action type INTERVIEW_RESET_INTERVIEW correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: INTERVIEW_RESET_INTERVIEW }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
