import { expect } from 'chai';

import {
  INTERVIEW_FINISH_INTERVIEW,
} from 'src/features/interview/redux/constants';

import {
  finishInterview,
  reducer,
} from 'src/features/interview/redux/finishInterview';

describe('interview/redux/finishInterview', () => {
  it('returns correct action by finishInterview', () => {
    expect(finishInterview()).to.have.property('type', INTERVIEW_FINISH_INTERVIEW);
  });

  it('handles action type INTERVIEW_FINISH_INTERVIEW correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: INTERVIEW_FINISH_INTERVIEW }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
