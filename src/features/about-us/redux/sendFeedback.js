import $ from 'jquery';
import {
  ABOUT_US_SEND_FEEDBACK_BEGIN,
  ABOUT_US_SEND_FEEDBACK_SUCCESS,
  ABOUT_US_SEND_FEEDBACK_FAILURE,
  ABOUT_US_SEND_FEEDBACK_DISMISS_ERROR,
} from './constants';

export function sendFeedback(info) {
  return (dispatch) => {
    dispatch({
      type: ABOUT_US_SEND_FEEDBACK_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = $.ajax({
        type: 'POST',
        url: '/sendFeedback',
        data: JSON.stringify(info),
        processData: false,
        contentType: 'application/json',
        success: (data, state) => {
          if (data) {
            console.log('Send feedback: successfull');
            console.log(state);
          }
        },
        error: (xhr, textStatus) => {
          console.log(xhr.statusText);
          console.log(textStatus);
        }
      });

      doRequest.then(
        (res) => {
          dispatch({
            type: ABOUT_US_SEND_FEEDBACK_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: ABOUT_US_SEND_FEEDBACK_FAILURE,
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
export function dismissSendFeedbackError() {
  return {
    type: ABOUT_US_SEND_FEEDBACK_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ABOUT_US_SEND_FEEDBACK_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        sendFeedbackPending: true,
        sendFeedbackError: null,
      };

    case ABOUT_US_SEND_FEEDBACK_SUCCESS:
      // The request is success
      return {
        ...state,
        sendFeedbackPending: false,
        sendFeedbackError: null,
      };

    case ABOUT_US_SEND_FEEDBACK_FAILURE:
      // The request is failed
      return {
        ...state,
        sendFeedbackPending: false,
        sendFeedbackError: action.data.error,
      };

    case ABOUT_US_SEND_FEEDBACK_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        sendFeedbackError: null,
      };

    default:
      return state;
  }
}
