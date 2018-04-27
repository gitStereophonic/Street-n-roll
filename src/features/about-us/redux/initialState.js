// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  feedBackPage: {
    thanks: '',
    help: '',
  },
  sendFeedbackPending: false,
  sendFeedbackError: null,
};

export default initialState;
