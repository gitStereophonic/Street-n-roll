import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  THE_DATA_PICK_UP_GET_STAT_INFO_BEGIN,
  THE_DATA_PICK_UP_GET_STAT_INFO_SUCCESS,
  THE_DATA_PICK_UP_GET_STAT_INFO_FAILURE,
  THE_DATA_PICK_UP_GET_STAT_INFO_DISMISS_ERROR,
} from 'src/features/the-data-pick-up/redux/constants';

import {
  getStatInfo,
  dismissGetStatInfoError,
  reducer,
} from 'src/features/the-data-pick-up/redux/getStatInfo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('the-data-pick-up/redux/getStatInfo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getStatInfo succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getStatInfo())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', THE_DATA_PICK_UP_GET_STAT_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', THE_DATA_PICK_UP_GET_STAT_INFO_SUCCESS);
      });
  });

  it('dispatches failure action when getStatInfo fails', () => {
    const store = mockStore({});

    return store.dispatch(getStatInfo({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', THE_DATA_PICK_UP_GET_STAT_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', THE_DATA_PICK_UP_GET_STAT_INFO_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetStatInfoError', () => {
    const expectedAction = {
      type: THE_DATA_PICK_UP_GET_STAT_INFO_DISMISS_ERROR,
    };
    expect(dismissGetStatInfoError()).to.deep.equal(expectedAction);
  });

  it('handles action type THE_DATA_PICK_UP_GET_STAT_INFO_BEGIN correctly', () => {
    const prevState = { getStatInfoPending: false };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_STAT_INFO_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getStatInfoPending).to.be.true;
  });

  it('handles action type THE_DATA_PICK_UP_GET_STAT_INFO_SUCCESS correctly', () => {
    const prevState = { getStatInfoPending: true };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_STAT_INFO_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getStatInfoPending).to.be.false;
  });

  it('handles action type THE_DATA_PICK_UP_GET_STAT_INFO_FAILURE correctly', () => {
    const prevState = { getStatInfoPending: true };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_STAT_INFO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getStatInfoPending).to.be.false;
    expect(state.getStatInfoError).to.exist;
  });

  it('handles action type THE_DATA_PICK_UP_GET_STAT_INFO_DISMISS_ERROR correctly', () => {
    const prevState = { getStatInfoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_STAT_INFO_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getStatInfoError).to.be.null;
  });
});
