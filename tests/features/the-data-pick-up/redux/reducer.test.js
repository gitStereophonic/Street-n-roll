import { expect } from 'chai';
import reducer from 'src/features/the-data-pick-up/redux/reducer';

describe('the-data-pick-up/redux/reducer', () => {
  it('does nothing if no matched action', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: '__UNKNOWN_ACTION_TYPE__' }
    );
    expect(state).to.equal(prevState);
  });

  // TODO: add global reducer test if needed.
});
