import { expect } from 'chai';

import {
  INTERVIEW_NEXT_PAGE,
} from 'src/features/interview/redux/constants';

import {
  nextPage,
  reducer,
} from 'src/features/interview/redux/nextPage';

describe('interview/redux/nextPage', () => {
  it('returns correct action by nextPage', () => {
    expect(nextPage()).to.have.property('type', INTERVIEW_NEXT_PAGE);
  });

  it('handles action type INTERVIEW_NEXT_PAGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: INTERVIEW_NEXT_PAGE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
