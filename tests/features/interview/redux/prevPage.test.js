import { expect } from 'chai';

import {
  INTERVIEW_PREV_PAGE,
} from 'src/features/interview/redux/constants';

import {
  prevPage,
  reducer,
} from 'src/features/interview/redux/prevPage';

describe('interview/redux/prevPage', () => {
  it('returns correct action by prevPage', () => {
    expect(prevPage()).to.have.property('type', INTERVIEW_PREV_PAGE);
  });

  it('handles action type INTERVIEW_PREV_PAGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: INTERVIEW_PREV_PAGE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
