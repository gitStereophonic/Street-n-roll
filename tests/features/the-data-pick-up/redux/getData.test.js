import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  THE_DATA_PICK_UP_GET_DATA_BEGIN,
  THE_DATA_PICK_UP_GET_DATA_SUCCESS,
  THE_DATA_PICK_UP_GET_DATA_FAILURE,
  THE_DATA_PICK_UP_GET_DATA_DISMISS_ERROR,
} from 'src/features/the-data-pick-up/redux/constants';

import {
  getData,
  dismissGetDataError,
  reducer,
} from 'src/features/the-data-pick-up/redux/getData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('the-data-pick-up/redux/getData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // it('dispatches success action when getData succeeds', () => {
  //   const store = mockStore({});

  //   return store.dispatch(getData())
  //     .then(() => {
  //       const actions = store.getActions();
  //       expect(actions[0]).to.have.property('type', THE_DATA_PICK_UP_GET_DATA_BEGIN);
  //       expect(actions[1]).to.have.property('type', THE_DATA_PICK_UP_GET_DATA_SUCCESS);
  //     });
  // });

  it('dispatches failure action when getData fails', () => {
    const store = mockStore({});

    return store.dispatch(getData({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', THE_DATA_PICK_UP_GET_DATA_BEGIN);
        expect(actions[1]).to.have.property('type', THE_DATA_PICK_UP_GET_DATA_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetDataError', () => {
    const expectedAction = {
      type: THE_DATA_PICK_UP_GET_DATA_DISMISS_ERROR,
    };
    expect(dismissGetDataError()).to.deep.equal(expectedAction);
  });

  it('handles action type THE_DATA_PICK_UP_GET_DATA_BEGIN correctly', () => {
    const prevState = { getDataPending: false };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_DATA_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getDataPending).to.be.true;
  });

  // it('handles action type THE_DATA_PICK_UP_GET_DATA_SUCCESS correctly', () => {
  //   const prevState = { getDataPending: true };
  //   const state = reducer(
  //     prevState,
  //     { type: THE_DATA_PICK_UP_GET_DATA_SUCCESS, data: {} }
  //   );
  //   expect(state).to.not.equal(prevState); // should be immutable
  //   expect(state.getDataPending).to.be.false;
  // });

  it('handles action type THE_DATA_PICK_UP_GET_DATA_FAILURE correctly', () => {
    const prevState = { getDataPending: true };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_DATA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getDataPending).to.be.false;
    expect(state.getDataError).to.exist;
  });

  it('handles action type THE_DATA_PICK_UP_GET_DATA_DISMISS_ERROR correctly', () => {
    const prevState = { getDataError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_DATA_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getDataError).to.be.null;
  });
});
