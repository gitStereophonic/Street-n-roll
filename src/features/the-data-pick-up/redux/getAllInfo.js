import $ from 'jquery';
import {
  THE_DATA_PICK_UP_GET_ALL_INFO_BEGIN,
  THE_DATA_PICK_UP_GET_ALL_INFO_SUCCESS,
  THE_DATA_PICK_UP_GET_ALL_INFO_FAILURE,
  THE_DATA_PICK_UP_GET_ALL_INFO_DISMISS_ERROR,
} from './constants';

export function getAllInfo() {
  return (dispatch = null) => {
    dispatch({
      type: THE_DATA_PICK_UP_GET_ALL_INFO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = $.ajax({
        url: '/getpages',
        type: 'GET',
        success: (response = null) => {
          if (!response) {
            console.log("Error! I've got the invalid data from DB. Halp!");
          } else {
            const data = JSON.parse(response);
            if (!data) {
              console.log("Error! I can't parse response. Halp!");
            }
          }
        },
        error: (response = null) => {
          console.log('Error! Problems with request. Halp!');
          console.log(response);
        },
      });

      doRequest.then(
        (res = null) => {
          dispatch({
            type: THE_DATA_PICK_UP_GET_ALL_INFO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err = null) => {
          dispatch({
            type: THE_DATA_PICK_UP_GET_ALL_INFO_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });

    return promise;
  };
}

export function dismissGetAllInfoError() {
  return {
    type: THE_DATA_PICK_UP_GET_ALL_INFO_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case THE_DATA_PICK_UP_GET_ALL_INFO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getAllInfoPending: true,
        getAllInfoError: null,
      };

    case THE_DATA_PICK_UP_GET_ALL_INFO_SUCCESS:
      // The request is success
      return {
        ...state,
        pagesCount: JSON.parse(action.data),
        getAllInfoPending: false,
        getAllInfoError: null,
      };

    case THE_DATA_PICK_UP_GET_ALL_INFO_FAILURE:
      // The request is failed
      return {
        ...state,
        getAllInfoPending: false,
        getAllInfoError: action.data.error,
      };

    case THE_DATA_PICK_UP_GET_ALL_INFO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getAllInfoError: null,
      };

    default:
      return state;
  }
}
