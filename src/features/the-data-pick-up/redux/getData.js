import $ from 'jquery';
import {
  THE_DATA_PICK_UP_GET_DATA_BEGIN,
  THE_DATA_PICK_UP_GET_DATA_SUCCESS,
  THE_DATA_PICK_UP_GET_DATA_FAILURE,
  THE_DATA_PICK_UP_GET_DATA_DISMISS_ERROR,
} from './constants';

export function getData(args = {}) {
  return (dispatch) => {
    dispatch({
      type: THE_DATA_PICK_UP_GET_DATA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = $.ajax({
        type: 'GET',
        url: '/getData',
        processData: false,
        contebtType: 'application/json',
        success: (data, state) => {
          console.log('successful | zoibis');
          console.log(data);
        },
        error: (xhr, textStatus) => {
          console.log(xhr.statusText);
          console.log(textStatus);
        }
      });


      doRequest.then(
        (res) => {
          dispatch({
            type: THE_DATA_PICK_UP_GET_DATA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: THE_DATA_PICK_UP_GET_DATA_FAILURE,
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
    type: THE_DATA_PICK_UP_GET_DATA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case THE_DATA_PICK_UP_GET_DATA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getDataPending: true,
        getDataError: null,
      };

    case THE_DATA_PICK_UP_GET_DATA_SUCCESS:
      // The request is success
      return {
        ...state,
        getDataPending: false,
        getDataError: null,
      };

    case THE_DATA_PICK_UP_GET_DATA_FAILURE:
      // The request is failed
      return {
        ...state,
        getDataPending: false,
        getDataError: action.data.error,
      };

    case THE_DATA_PICK_UP_GET_DATA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getDataError: null,
      };

    default:
      return state;
  }
}
