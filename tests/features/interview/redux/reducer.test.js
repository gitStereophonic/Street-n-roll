import { expect } from 'chai';
import reducer from 'src/features/interview/redux/reducer';

describe('interview/redux/reducer', () => {
  it('does nothing if no matched action', () => {
    const prevState = {
      interviewStages: [0, 33, 435, 36],
      currentIndex: 2,
      pageContent: 2,
    };
    const state = reducer(
      prevState,
      { type: '__UNKNOWN_ACTION_TYPE__' }
    );
    expect(state).to.equal(prevState);
  });

  // TODO: add global reducer test if needed.
});
