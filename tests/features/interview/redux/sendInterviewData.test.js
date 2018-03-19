import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  INTERVIEW_SEND_INTERVIEW_DATA_BEGIN,
  INTERVIEW_SEND_INTERVIEW_DATA_SUCCESS,
  INTERVIEW_SEND_INTERVIEW_DATA_FAILURE,
  INTERVIEW_SEND_INTERVIEW_DATA_DISMISS_ERROR,
} from 'src/features/interview/redux/constants';

import {
  sendInterviewData,
  dismissSendInterviewDataError,
  reducer,
} from 'src/features/interview/redux/sendInterviewData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('interview/redux/sendInterviewData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when sendInterviewData succeeds', () => {
    const store = mockStore({});

    return store.dispatch(sendInterviewData())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', INTERVIEW_SEND_INTERVIEW_DATA_BEGIN);
        expect(actions[1]).to.have.property('type', INTERVIEW_SEND_INTERVIEW_DATA_SUCCESS);
      });
  });

  it('dispatches failure action when sendInterviewData fails', () => {
    const store = mockStore({});

    return store.dispatch(sendInterviewData({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', INTERVIEW_SEND_INTERVIEW_DATA_BEGIN);
        expect(actions[1]).to.have.property('type', INTERVIEW_SEND_INTERVIEW_DATA_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissSendInterviewDataError', () => {
    const expectedAction = {
      type: INTERVIEW_SEND_INTERVIEW_DATA_DISMISS_ERROR,
    };
    expect(dismissSendInterviewDataError()).to.deep.equal(expectedAction);
  });

  it('handles action type INTERVIEW_SEND_INTERVIEW_DATA_BEGIN correctly', () => {
    const prevState = { sendInterviewDataPending: false };
    const state = reducer(
      prevState,
      { type: INTERVIEW_SEND_INTERVIEW_DATA_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendInterviewDataPending).to.be.true;
  });

  it('handles action type INTERVIEW_SEND_INTERVIEW_DATA_SUCCESS correctly', () => {
    const prevState = { sendInterviewDataPending: true };
    const state = reducer(
      prevState,
      { type: INTERVIEW_SEND_INTERVIEW_DATA_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendInterviewDataPending).to.be.false;
  });

  it('handles action type INTERVIEW_SEND_INTERVIEW_DATA_FAILURE correctly', () => {
    const prevState = { sendInterviewDataPending: true };
    const state = reducer(
      prevState,
      { type: INTERVIEW_SEND_INTERVIEW_DATA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendInterviewDataPending).to.be.false;
    expect(state.sendInterviewDataError).to.exist;
  });

  it('handles action type INTERVIEW_SEND_INTERVIEW_DATA_DISMISS_ERROR correctly', () => {
    const prevState = { sendInterviewDataError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: INTERVIEW_SEND_INTERVIEW_DATA_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendInterviewDataError).to.be.null;
  });
});
