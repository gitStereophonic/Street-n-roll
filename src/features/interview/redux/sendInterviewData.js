import $ from 'jquery';
import {
  INTERVIEW_SEND_INTERVIEW_DATA_BEGIN,
  INTERVIEW_SEND_INTERVIEW_DATA_SUCCESS,
  INTERVIEW_SEND_INTERVIEW_DATA_FAILURE,
  INTERVIEW_SEND_INTERVIEW_DATA_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function sendInterviewData(content) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: INTERVIEW_SEND_INTERVIEW_DATA_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      // const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();

      console.log('ASYNC');
      const doRequest = $.ajax({
        type: 'POST',
        url: '/send',
        data: JSON.stringify(content),
        processData: false,
        contentType: 'application/json',
        success: (data) => {
          console.log('successfull');
          console.log(data);
          console.log(content);
        }
      });
      doRequest.then(
        (res) => {
          dispatch({
            type: INTERVIEW_SEND_INTERVIEW_DATA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: INTERVIEW_SEND_INTERVIEW_DATA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSendInterviewDataError() {
  return {
    type: INTERVIEW_SEND_INTERVIEW_DATA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INTERVIEW_SEND_INTERVIEW_DATA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        sendInterviewDataPending: true,
        sendInterviewDataError: null,
      };

    case INTERVIEW_SEND_INTERVIEW_DATA_SUCCESS:
      // The request is success
      return {
        ...state,
        sendInterviewDataPending: false,
        sendInterviewDataError: null,
      };

    case INTERVIEW_SEND_INTERVIEW_DATA_FAILURE:
      // The request is failed
      return {
        ...state,
        sendInterviewDataPending: false,
        sendInterviewDataError: action.data.error,
      };

    case INTERVIEW_SEND_INTERVIEW_DATA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        sendInterviewDataError: null,
      };

    default:
      return state;
  }
}
