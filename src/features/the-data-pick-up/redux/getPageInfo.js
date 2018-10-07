import $ from 'jquery';
import {
  THE_DATA_PICK_UP_GET_PAGE_INFO_BEGIN,
  THE_DATA_PICK_UP_GET_PAGE_INFO_SUCCESS,
  THE_DATA_PICK_UP_GET_PAGE_INFO_FAILURE,
  THE_DATA_PICK_UP_GET_PAGE_INFO_DISMISS_ERROR,
} from './constants';

export function getPageInfo(args = { pageNum: 0 }) {
  return (dispatch) => {
    dispatch({
      type: THE_DATA_PICK_UP_GET_PAGE_INFO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = $.ajax({
        url: `/getstatbypages/${args.pageNum}`,
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
        (res) => {
          dispatch({
            type: THE_DATA_PICK_UP_GET_PAGE_INFO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: THE_DATA_PICK_UP_GET_PAGE_INFO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetPageInfoError() {
  return {
    type: THE_DATA_PICK_UP_GET_PAGE_INFO_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case THE_DATA_PICK_UP_GET_PAGE_INFO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getPageInfoPending: true,
        getPageInfoError: null,
      };

    case THE_DATA_PICK_UP_GET_PAGE_INFO_SUCCESS:
      // The request is success
      return {
        ...state,
        currentPage: JSON.parse(action.data),
        getPageInfoPending: false,
        getPageInfoError: null,
      };

    case THE_DATA_PICK_UP_GET_PAGE_INFO_FAILURE:
      // The request is failed
      return {
        ...state,
        getPageInfoPending: false,
        getPageInfoError: action.data.error,
      };

    case THE_DATA_PICK_UP_GET_PAGE_INFO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getPageInfoError: null,
      };

    default:
      return state;
  }
}
