import * as types from "../action/type";

const initState = {
  session_id: localStorage.getItem("session_id"),
  isLoading: false,
  user: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.ACCOUNT_LOGIN_SUCCESS:
      localStorage.setItem(
        "session_id",
        JSON.stringify(action.data.session_id)
      );
      return {
        ...state,
        session_id: action.data.session_id,
        checked: true,
        isLoading: false
      };
    case types.ACCOUNT_LOGIN_FAILED:
      localStorage.setItem("session_id", "");
      return { ...state, user: {}, checked: false, isLoading: false };
    case types.ACCOUNT_LOGINCHECK_SUCCESS:
      return { ...state, user: action.data, checked: true, isLoading: false };
    case types.ACCOUNT_LOGINCHECK_FAILED:
      localStorage.setItem("session_id", "");
      return { ...state, user: {}, checked: false, isLoading: false };
    case types.FLUSH_ACCOUNT:
      localStorage.clear();
      return { checked: false, isLoading: false };
    case types.ACCOUNT_REGISTER_SUCCESS:
      return { ...state, isLoading: false };
    case types.ACCOUNT_REGISTER_FAILED:
      return { ...state, isLoading: false };
    case types.ACCOUNT_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.data,
        isLoading: false
      };
    default:
      return state;
  }
};
