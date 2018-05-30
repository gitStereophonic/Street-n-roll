import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  THE_DATA_PICK_UP_GET_USER_INFO_BEGIN,
  THE_DATA_PICK_UP_GET_USER_INFO_SUCCESS,
  THE_DATA_PICK_UP_GET_USER_INFO_FAILURE,
  THE_DATA_PICK_UP_GET_USER_INFO_DISMISS_ERROR,
} from 'src/features/the-data-pick-up/redux/constants';

import {
  getUserInfo,
  dismissGetUserInfoError,
  reducer,
} from 'src/features/the-data-pick-up/redux/getUserInfo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('the-data-pick-up/redux/getUserInfo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getUserInfo succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getUserInfo())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', THE_DATA_PICK_UP_GET_USER_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', THE_DATA_PICK_UP_GET_USER_INFO_SUCCESS);
      });
  });

  it('dispatches failure action when getUserInfo fails', () => {
    const store = mockStore({});

    return store.dispatch(getUserInfo({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', THE_DATA_PICK_UP_GET_USER_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', THE_DATA_PICK_UP_GET_USER_INFO_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetUserInfoError', () => {
    const expectedAction = {
      type: THE_DATA_PICK_UP_GET_USER_INFO_DISMISS_ERROR,
    };
    expect(dismissGetUserInfoError()).to.deep.equal(expectedAction);
  });

  it('handles action type THE_DATA_PICK_UP_GET_USER_INFO_BEGIN correctly', () => {
    const prevState = { getUserInfoPending: false };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_USER_INFO_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUserInfoPending).to.be.true;
  });

  it('handles action type THE_DATA_PICK_UP_GET_USER_INFO_SUCCESS correctly', () => {
    const prevState = { getUserInfoPending: true };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_USER_INFO_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUserInfoPending).to.be.false;
  });

  it('handles action type THE_DATA_PICK_UP_GET_USER_INFO_FAILURE correctly', () => {
    const prevState = { getUserInfoPending: true };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_USER_INFO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUserInfoPending).to.be.false;
    expect(state.getUserInfoError).to.exist;
  });

  it('handles action type THE_DATA_PICK_UP_GET_USER_INFO_DISMISS_ERROR correctly', () => {
    const prevState = { getUserInfoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_USER_INFO_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUserInfoError).to.be.null;
  });
});
