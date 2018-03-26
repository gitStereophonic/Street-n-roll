import $ from 'jquery';
import {
  INTERVIEW_SEND_INTERVIEW_DATA_BEGIN,
  INTERVIEW_SEND_INTERVIEW_DATA_SUCCESS,
  INTERVIEW_SEND_INTERVIEW_DATA_FAILURE,
  INTERVIEW_SEND_INTERVIEW_DATA_DISMISS_ERROR,
} from './constants';

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
      const theWay = content[2].everPlayed === 'yep';
      const data = {
        dataBase: 'answersStart',
        answersStart: {},
        answersTable: {}
      };

      data.answersStart = {
        city: content[1].city,
        age: content[1].age,
        gender: content[1].gender,
        edu: content[1].edu,
        eduOther: content[1].eduOther,
        job: content[1].job,
        everPlayed: theWay ? 1 : 0,
        thanks: content[content.length - 1].thanks,
        help: content[content.length - 1].help
      };

      if (theWay) {
        console.log('misician');
        data.dataBase = 'answersMusician';

        const concat = (array) => {
          let strOut = array[0];
          for (let i = 1; i < array.length; i += 1) {
            strOut += ',';
            strOut += array[i];
          }

          return strOut;
        };

        const table = {
          hobbie: content[7].hobbie,
          hobbieOther: content[7].hobbieOther,
          rather: content[7].rather,
          ratherExact: content[7].ratherExact,
          why: content[8].why,
          community: content[9].community,
          communityExact: content[9].communityExact,
          official: content[10].official,
          officialOther: content[10].officialOther,
          wocom: content[10].wocom,
          howjoin: content[10].howjoin,
          cookies: content[10].cookies,
          meetings: content[11].meetings,
          meetingsExact: content[11].meetingsExact,
          reasons: content[12].reasons,
          where: content[12].where,
          whywhere: content[12].whywhere,
          meetingtime: concat(content[12].meetingtime),
          place: content[13].place,
          descplace: content[13].descplace,
          time: content[13].time,
          whatplay: content[14].whatplay,
          whythisplay: content[14].whythisplay,
          placeplay: content[14].placeplay,
          howcome: content[15].howcome,
          howleave: content[15].howleave,
          firstmoney: content[15].firstmoney,
          talk: content[15].talk,
          jargon: content[16].jargon,
          specsigns: content[16].specsigns,
          idmarks: content[16].idmarks,
          forwhat: concat(content[16].forwhat),
          forwhatOther: content[16].forwhatOther,
          celebrations: content[17].celebrations,
          howceleb: content[17].howceleb,
          competition: content[18].competition,
          relations: content[18].relations,
          whobest: content[18].whobest,
          events: content[19].events,
          reactions: content[19].reactions,
          story: content[19].story,
          identity: content[20].identity
        };

        data.answersTable = table;
      } else {
        console.log('listener');
        data.dataBase = 'answersListener';

        const table = {
          interest: content[3].interest,
          who: content[3].who,
          money: content[3].money,
          songs: content[4].songs,
          sign: content[5].sign,
          traditions: content[5].traditions,
          experience: content[6].experience
        };

        data.answersTable = table;
      }

      const doRequest = $.ajax({
        type: 'POST',
        url: '/send',
        data: JSON.stringify(data),
        processData: false,
        contentType: 'application/json',
        success: (data, state) => {
          if (data) {
            console.log('successfull');
            console.log(state);
            console.log(data);
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
  const clearFeedBack = (error) => {
    const commonPanel = $('.common-user-feed-back');
    const successPanel = $('.successfull-feedback');
    const errorPanel = $('.error-feedback');
    commonPanel.removeClass('successfull-panel');
    commonPanel.removeClass('error-panel');
    commonPanel.removeClass('error-panel-out');
    successPanel.addClass('hide-object');
    errorPanel.addClass('hide-object');
    if (error) {
      commonPanel.addClass('error-panel');
      errorPanel.removeClass('hide-object');
    } else {
      commonPanel.addClass('successfull-panel');
      successPanel.removeClass('hide-object');
    }
  };

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
      clearFeedBack(false);
      return {
        ...state,
        sendInterviewDataPending: false,
        sendInterviewDataError: null,
      };

    case INTERVIEW_SEND_INTERVIEW_DATA_FAILURE:
      // The request is failed
      clearFeedBack(true);
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
