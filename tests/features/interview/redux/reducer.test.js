import { expect } from 'chai';
import reducer from 'src/features/interview/redux/reducer';

describe('interview/redux/reducer', () => {
  it('does nothing if no matched action', () => {
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
    const state = reducer(
      prevState,
      { type: '__UNKNOWN_ACTION_TYPE__' }
    );
    expect(state).to.equal(prevState);
  });

  // TODO: add global reducer test if needed.
});
