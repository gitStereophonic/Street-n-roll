import { expect } from 'chai';

import {
  INTERVIEW_START_INTERVIEW,
} from 'src/features/interview/redux/constants';

import {
  startInterview,
  reducer,
} from 'src/features/interview/redux/startInterview';

describe('interview/redux/startInterview', () => {
  it('returns correct action by startInterview', () => {
    expect(startInterview()).to.have.property('type', INTERVIEW_START_INTERVIEW);
  });

  it('handles action type INTERVIEW_START_INTERVIEW correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: INTERVIEW_START_INTERVIEW }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
