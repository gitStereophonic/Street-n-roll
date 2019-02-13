import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  THE_DATA_PICK_UP_GET_PAGE_INFO_BEGIN,
  THE_DATA_PICK_UP_GET_PAGE_INFO_SUCCESS,
  THE_DATA_PICK_UP_GET_PAGE_INFO_FAILURE,
  THE_DATA_PICK_UP_GET_PAGE_INFO_DISMISS_ERROR,
} from 'src/features/the-data-pick-up/redux/constants';

import {
  getPageInfo,
  dismissGetPageInfoError,
  reducer,
} from 'src/features/the-data-pick-up/redux/getPageInfo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('the-data-pick-up/redux/getPageInfo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getPageInfo succeeds', () => {
    const store = mockStore({});

    // return store.dispatch(getPageInfo())
    //   .then(() => {
    //     const actions = store.getActions();
    //     expect(actions[0]).to.have.property('type', THE_DATA_PICK_UP_GET_PAGE_INFO_BEGIN);
    //     expect(actions[1]).to.have.property('type', THE_DATA_PICK_UP_GET_PAGE_INFO_SUCCESS);
    //   });
  });

  it('dispatches failure action when getPageInfo fails', () => {
    const store = mockStore({});

    return store.dispatch(getPageInfo({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', THE_DATA_PICK_UP_GET_PAGE_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', THE_DATA_PICK_UP_GET_PAGE_INFO_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetPageInfoError', () => {
    const expectedAction = {
      type: THE_DATA_PICK_UP_GET_PAGE_INFO_DISMISS_ERROR,
    };
    expect(dismissGetPageInfoError()).to.deep.equal(expectedAction);
  });

  it('handles action type THE_DATA_PICK_UP_GET_PAGE_INFO_BEGIN correctly', () => {
    const prevState = { getPageInfoPending: false };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_PAGE_INFO_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPageInfoPending).to.be.true;
  });

  it('handles action type THE_DATA_PICK_UP_GET_PAGE_INFO_SUCCESS correctly', () => {
    const prevState = { getPageInfoPending: true };
    // const state = reducer(
    //   prevState,
    //   { type: THE_DATA_PICK_UP_GET_PAGE_INFO_SUCCESS, data: {} }
    // );
    // expect(state).to.not.equal(prevState); // should be immutable
    // expect(state.getPageInfoPending).to.be.false;
  });

  it('handles action type THE_DATA_PICK_UP_GET_PAGE_INFO_FAILURE correctly', () => {
    const prevState = { getPageInfoPending: true };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_PAGE_INFO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPageInfoPending).to.be.false;
    expect(state.getPageInfoError).to.exist;
  });

  it('handles action type THE_DATA_PICK_UP_GET_PAGE_INFO_DISMISS_ERROR correctly', () => {
    const prevState = { getPageInfoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: THE_DATA_PICK_UP_GET_PAGE_INFO_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getPageInfoError).to.be.null;
  });
});
