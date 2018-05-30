import $ from 'jquery';
import {
  THE_DATA_PICK_UP_GET_USER_INFO_BEGIN,
  THE_DATA_PICK_UP_GET_USER_INFO_SUCCESS,
  THE_DATA_PICK_UP_GET_USER_INFO_FAILURE,
  THE_DATA_PICK_UP_GET_USER_INFO_DISMISS_ERROR,
} from './constants';

export function getUserInfo(args = { id: 0 }) {
  return (dispatch) => {
    dispatch({
      type: THE_DATA_PICK_UP_GET_USER_INFO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = $.ajax({
        url: `/getstatdata/${args.id}`,
        type: 'GET',
        success: (response) => {
          if (!response) {
            console.log('Error! I\'ve got the invalid data from DB. Halp!');
          } else {
            const data = JSON.parse(response);
            if (!data) {
              console.log('Error! I can\'t parse response. Halp!');
            }
          }
        },
        error: (response) => {
          console.log('Error! Problems with request. Halp!');
          console.log(response);
        }
      });


      doRequest.then(
        (res) => {
          dispatch({
            type: THE_DATA_PICK_UP_GET_USER_INFO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: THE_DATA_PICK_UP_GET_USER_INFO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetUserInfoError() {
  return {
    type: THE_DATA_PICK_UP_GET_USER_INFO_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  const dataP = action.data;

  switch (action.type) {
    case THE_DATA_PICK_UP_GET_USER_INFO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getUserInfoPending: true,
        getUserInfoError: null,
      };

    case THE_DATA_PICK_UP_GET_USER_INFO_SUCCESS:
      // The request is success
      return {
        ...state,
        currentUser: JSON.parse(dataP).aStart.id,
        getUserInfoPending: false,
        getUserInfoError: null,
      };

    case THE_DATA_PICK_UP_GET_USER_INFO_FAILURE:
      // The request is failed
      return {
        ...state,
        getUserInfoPending: false,
        getUserInfoError: action.data.error,
      };

    case THE_DATA_PICK_UP_GET_USER_INFO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getUserInfoError: null,
      };

    default:
      return state;
  }
}
