import $ from 'jquery';
import {
  HOME_GET_DATA_BEGIN,
  HOME_GET_DATA_SUCCESS,
  HOME_GET_DATA_FAILURE,
  HOME_GET_DATA_DISMISS_ERROR,
} from './constants';

export function getData(args = {}) {
  return (dispatch) => {
    dispatch({
      type: HOME_GET_DATA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = $.ajax({
        type: 'GET',
        url: '/getData',
        processData: false,
        contebtType: 'application/json',
        success: (data, state) => {
          console.log('successful | zoibis');
        },
        error: (xhr, textStatus) => {
          console.log(xhr.statusText);
          console.log(textStatus);
        }
      });


      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_GET_DATA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_GET_DATA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetDataError() {
  return {
    type: HOME_GET_DATA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_DATA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getDataPending: true,
        getDataError: null,
      };

    case HOME_GET_DATA_SUCCESS:
      // The request is success
      return {
        ...state,
        getDataPending: false,
        getDataError: null,
      };

    case HOME_GET_DATA_FAILURE:
      // The request is failed
      return {
        ...state,
        getDataPending: false,
        getDataError: action.data.error,
      };

    case HOME_GET_DATA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getDataError: null,
      };

    default:
      return state;
  }
}
