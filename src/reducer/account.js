import * as types from "../action/type";

const initState = {
  session_id: localStorage.getItem("session_id")
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.ACCOUNT_LOGIN_SUCCESS:
      console.log("login_success==>", action.data.msg);
      localStorage.setItem(
        "session_id",
        JSON.stringify(action.data.data.session_id)
      );
      return {
        ...state,
        session_id: action.data.data.session_id,
        isLogin: true
      };
    case types.ACCOUNT_LOGIN_FAILED:
      console.log("login_Failed==>", action.error.msg);
      localStorage.setItem("session_id", "");
      return { ...state, user: {}, isLogin: false };
    case types.ACCOUNT_LOGINCHECK_SUCCESS:
      console.log("login check success==> ", action.data.msg);
      return { ...state, user: action.data.data, isLogin: true };
    case types.ACCOUNT_LOGINCHECK_FAILED:
      console.log("login check failed==>", action.error.msg);
      return { ...state, user: {}, isLogin: false };
    case types.FLUSH_ACCOUNT:
      console.log("flush account!");
      localStorage.clear();
      return { isLogin: false };
    case types.ACCOUNT_REGISTER_SUCCESS:
      console.log("register success==>", action.data.msg);
      return state;
    case types.ACCOUNT_REGISTER_FAILED:
      console.log("register failed==>", action.error.msg);
      return state;
    default:
      return state;
  }
};
