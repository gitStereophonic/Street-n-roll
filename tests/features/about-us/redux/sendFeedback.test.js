import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  ABOUT_US_SEND_FEEDBACK_BEGIN,
  ABOUT_US_SEND_FEEDBACK_SUCCESS,
  ABOUT_US_SEND_FEEDBACK_FAILURE,
  ABOUT_US_SEND_FEEDBACK_DISMISS_ERROR,
} from 'src/features/about-us/redux/constants';

import {
  sendFeedback,
  dismissSendFeedbackError,
  reducer,
} from 'src/features/about-us/redux/sendFeedback';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('about-us/redux/sendFeedback', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when sendFeedback succeeds', () => {
    const store = mockStore({});

    return store.dispatch(sendFeedback())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ABOUT_US_SEND_FEEDBACK_BEGIN);
        expect(actions[1]).to.have.property('type', ABOUT_US_SEND_FEEDBACK_SUCCESS);
      });
  });

  it('dispatches failure action when sendFeedback fails', () => {
    const store = mockStore({});

    return store.dispatch(sendFeedback({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', ABOUT_US_SEND_FEEDBACK_BEGIN);
        expect(actions[1]).to.have.property('type', ABOUT_US_SEND_FEEDBACK_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissSendFeedbackError', () => {
    const expectedAction = {
      type: ABOUT_US_SEND_FEEDBACK_DISMISS_ERROR,
    };
    expect(dismissSendFeedbackError()).to.deep.equal(expectedAction);
  });

  it('handles action type ABOUT_US_SEND_FEEDBACK_BEGIN correctly', () => {
    const prevState = { sendFeedbackPending: false };
    const state = reducer(
      prevState,
      { type: ABOUT_US_SEND_FEEDBACK_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendFeedbackPending).to.be.true;
  });

  it('handles action type ABOUT_US_SEND_FEEDBACK_SUCCESS correctly', () => {
    const prevState = { sendFeedbackPending: true };
    const state = reducer(
      prevState,
      { type: ABOUT_US_SEND_FEEDBACK_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendFeedbackPending).to.be.false;
  });

  it('handles action type ABOUT_US_SEND_FEEDBACK_FAILURE correctly', () => {
    const prevState = { sendFeedbackPending: true };
    const state = reducer(
      prevState,
      { type: ABOUT_US_SEND_FEEDBACK_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendFeedbackPending).to.be.false;
    expect(state.sendFeedbackError).to.exist;
  });

  it('handles action type ABOUT_US_SEND_FEEDBACK_DISMISS_ERROR correctly', () => {
    const prevState = { sendFeedbackError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ABOUT_US_SEND_FEEDBACK_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.sendFeedbackError).to.be.null;
  });
});
