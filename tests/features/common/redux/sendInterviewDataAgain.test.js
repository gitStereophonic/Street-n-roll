import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  COMMON_SEND_INTERVIEW_DATA_AGAIN_BEGIN,
  COMMON_SEND_INTERVIEW_DATA_AGAIN_SUCCESS,
  COMMON_SEND_INTERVIEW_DATA_AGAIN_FAILURE,
  COMMON_SEND_INTERVIEW_DATA_AGAIN_DISMISS_ERROR,
} from 'src/features/common/redux/constants';

import {
  sendInterviewDataAgain,
  dismissSendInterviewDataAgainError,
  reducer,
} from 'src/features/common/redux/sendInterviewDataAgain';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/sendInterviewDataAgain', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when sendInterviewDataAgain succeeds', () => {
    const store = mockStore({});

    return store.dispatch(sendInterviewDataAgain())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_SEND_INTERVIEW_DATA_AGAIN_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_SEND_INTERVIEW_DATA_AGAIN_SUCCESS);
      });
  });

  it('dispatches failure action when sendInterviewDataAgain fails', () => {
    const store = mockStore({});

    return store.dispatch(sendInterviewDataAgain({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_SEND_INTERVIEW_DATA_AGAIN_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_SEND_INTERVIEW_DATA_AGAIN_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissSendInterviewDataAgainError', () => {
    const expectedAction = {
      type: COMMON_SEND_INTERVIEW_DATA_AGAIN_DISMISS_ERROR,
    };
    expect(dismissSendInterviewDataAgainError()).to.deep.equal(expectedAction);
  });

  it('handles action type COMMON_SEND_INTERVIEW_DATA_AGAIN_BEGIN correctly', () => {
    const prevState = { sendInterviewDataAgainPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_SEND_INTERVIEW_DATA_AGAIN_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendInterviewDataAgainPending).to.be.true;
  });

  it('handles action type COMMON_SEND_INTERVIEW_DATA_AGAIN_SUCCESS correctly', () => {
    const prevState = { sendInterviewDataAgainPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SEND_INTERVIEW_DATA_AGAIN_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendInterviewDataAgainPending).to.be.false;
  });

  it('handles action type COMMON_SEND_INTERVIEW_DATA_AGAIN_FAILURE correctly', () => {
    const prevState = { sendInterviewDataAgainPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SEND_INTERVIEW_DATA_AGAIN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendInterviewDataAgainPending).to.be.false;
    expect(state.sendInterviewDataAgainError).to.exist;
  });

  it('handles action type COMMON_SEND_INTERVIEW_DATA_AGAIN_DISMISS_ERROR correctly', () => {
    const prevState = { sendInterviewDataAgainError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_SEND_INTERVIEW_DATA_AGAIN_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendInterviewDataAgainError).to.be.null;
  });
});
