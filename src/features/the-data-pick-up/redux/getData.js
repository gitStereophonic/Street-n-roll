import $ from 'jquery';
import {
  THE_DATA_PICK_UP_GET_DATA_BEGIN,
  THE_DATA_PICK_UP_GET_DATA_SUCCESS,
  THE_DATA_PICK_UP_GET_DATA_FAILURE,
  THE_DATA_PICK_UP_GET_DATA_DISMISS_ERROR,
} from './constants';

export function getData(args = { id: -1 }) {
  return (dispatch) => {
    dispatch({
      type: THE_DATA_PICK_UP_GET_DATA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = $.ajax({
        url: `/getstatdata/${args.id}`,
        type: 'GET',
        success: (response, status) => {
          console.log('successful | zoibis');
          if (!response || !JSON.parse(response)) {
            console.log('Error! I\'ve got the invalid data from DB. Halp!');
          }
          const data = JSON.parse(response);
          console.log(data);
          console.log(data.id);
          console.log(status);
        },
        error: (response) => {
          console.log('error | huevo');
          console.log(response);
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
