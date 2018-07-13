import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  THE_DATA_PICK_UP_GET_ALL_INFO_BEGIN,
  THE_DATA_PICK_UP_GET_ALL_INFO_SUCCESS,
  THE_DATA_PICK_UP_GET_ALL_INFO_FAILURE,
  THE_DATA_PICK_UP_GET_ALL_INFO_DISMISS_ERROR,
} from 'src/features/the-data-pick-up/redux/constants';

import {
  getAllInfo,
  dismissGetAllInfoError,
  reducer,
} from 'src/features/the-data-pick-up/redux/getAllInfo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('the-data-pick-up/redux/getAllInfo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAllInfo succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAllInfo())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', THE_DATA_PICK_UP_GET_ALL_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', THE_DATA_PICK_UP_GET_ALL_INFO_SUCCESS);
      });
  });

  it('dispatches failure action when getAllInfo fails', () => {
    const store = mockStore({});

    return store.dispatch(getAllInfo({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', THE_DATA_PICK_UP_GET_ALL_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', THE_DATA_PICK_UP_GET_ALL_INFO_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetAllInfoError', () => {
    const expectedAction = {
      type: THE_DATA_PICK_UP_GET_ALL_INFO_DISMISS_ERROR,
    };
    expect(dismissGetAllInfoError()).to.deep.equal(expectedAction);
  });

  it('handles action type THE_DATA_PICK_UP_GET_ALL_INFO_BEGIN correctly', () => {
    const prevState = { getAllInfoPending: false };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_ALL_INFO_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAllInfoPending).to.be.true;
  });

  it('handles action type THE_DATA_PICK_UP_GET_ALL_INFO_SUCCESS correctly', () => {
    const prevState = { getAllInfoPending: true };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_ALL_INFO_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAllInfoPending).to.be.false;
  });

  it('handles action type THE_DATA_PICK_UP_GET_ALL_INFO_FAILURE correctly', () => {
    const prevState = { getAllInfoPending: true };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_ALL_INFO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAllInfoPending).to.be.false;
    expect(state.getAllInfoError).to.exist;
  });

  it('handles action type THE_DATA_PICK_UP_GET_ALL_INFO_DISMISS_ERROR correctly', () => {
    const prevState = { getAllInfoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_ALL_INFO_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAllInfoError).to.be.null;
  });
});
