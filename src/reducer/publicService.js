import * as types from "../action/type";

const initState = {
  unReviewPatients: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.PUBLIC_SPPATIENT_GETUNREVIEW_SUCCESS:
      return {
        ...state,
        unReviewPatients: action.data
      };
    default:
      return state;
  }
};