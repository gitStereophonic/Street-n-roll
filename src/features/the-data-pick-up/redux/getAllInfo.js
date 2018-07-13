import {
  THE_DATA_PICK_UP_GET_ALL_INFO_BEGIN,
  THE_DATA_PICK_UP_GET_ALL_INFO_SUCCESS,
  THE_DATA_PICK_UP_GET_ALL_INFO_FAILURE,
  THE_DATA_PICK_UP_GET_ALL_INFO_DISMISS_ERROR,
} from './constants';

export function getAllInfo(args = {}) {
  return (dispatch) => {
    dispatch({
      type: THE_DATA_PICK_UP_GET_ALL_INFO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: THE_DATA_PICK_UP_GET_ALL_INFO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: THE_DATA_PICK_UP_GET_ALL_INFO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
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
