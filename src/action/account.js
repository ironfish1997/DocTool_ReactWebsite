import * as type from "./type";
import { httpUtil } from "../utils";
import { login_url, check_login_url, account_url } from "../config/api_path";

/**
 * client端账号登录失败
 * @param {*} data
 */
const loginSuccess = data => ({
  type: type.ACCOUNT_LOGIN_SUCCESS,
  data: data
});

/**
 * client端账号登录失败
 * @param {string} username
 * @param {string} password
 */
const loginFailed = error => ({
  type: type.ACCOUNT_LOGIN_FAILED,
  error: error
});

// /**
//  * client注销登录
//  * @param {string} session_id
//  */
// const logout = session_id => ({
//   type: type.ACCOUNT_LOGOUT,
//   session_id: session_id
// });

/**
 * client检查登录状态成功
 * @param {string} data
 */
const logincheckSuccess = data => ({
  type: type.ACCOUNT_LOGINCHECK_SUCCESS,
  data: data
});

/**
 * client检查登录状态失败
 * @param {*} error
 */
const logincheckFailed = error => ({
  type: type.ACCOUNT_LOGINCHECK_FAILED,
  error: error
});

/**
 * client端请求清空登录user信息
 * @param {*} session_id
 */
export const flushAccount = () => dispatch => {
  dispatch({
    type: type.FLUSH_ACCOUNT
  });
};

export const registerSuccess = data => ({
  type: type.ACCOUNT_REGISTER_SUCCESS,
  data: data
});

export const registerFailed = error => ({
  type: type.ACCOUNT_REGISTER_FAILED,
  error: error
});

export const checkLogin = (session_id = "") => dispatch => {
  console.log("checkLogin,session_id:", session_id);
  const requestHeader = {
    session_id: session_id
  };
  return new Promise((resolve, reject) => {
    httpUtil(check_login_url, null, requestHeader, "POST").then(response => {
      response.json().then(data => {
        if (data.rtn === 0) {
          let returnData = {};
          try {
            returnData = data;
          } catch (error) {
            returnData = {};
          }
          dispatch(logincheckSuccess(returnData));
          resolve();
        } else {
          dispatch(logincheckFailed(data));
          reject();
        }
      });
    });
  });
};

/**
 * 登录账号
 * @param {string} account_id
 * @param {string} account_password
 * @param {boolean} remember
 */
export const doLogin = (account_id, account_password, remember) => dispatch => {
  console.log("dologin：", account_id);
  const requestParams = {
    account_id: account_id,
    account_password: account_password
  };
  const requestHeader = {
    remember: remember
  };
  return new Promise((resolve, reject) => {
    httpUtil(login_url, requestParams, requestHeader, "POST").then(
      response => {
        response.json().then(data => {
          if (data.rtn === 0) {
            dispatch(loginSuccess(data));
            resolve("登录成功");
          } else {
            //如果是账号密码有误，则返回码是-10030
            let msg = "登录失败";
            if (data.rtn === -10030) {
              msg = "密码或账号有误";
            }
            dispatch(loginFailed(data));
            reject(msg);
          }
        });
      },
      error => {
        dispatch(loginFailed(error));
        reject("登录失败");
      }
    );
  });
};

/**
 * 注册账号
 * @param {form} data
 */
export const doRegister = data => dispatch => {
  return new Promise((resolve, reject) => {
    if (
      !data ||
      data.account_id === null ||
      data.account_password === null ||
      data.name === null ||
      data.area.length === 0
    ) {
      reject("lack of information");
      return;
    }
    let area = "";
    data.area.map(x => {
      area = area + x;
      return 0;
    });
    let account = {
      account_id: data.account_id,
      account_password: data.account_password,
      name: data.name,
      area: area,
      account_permission: [
        //发送公共通知
        "common_notification",
        //登录账户
        "login_account",
        //新增病人信息
        "add_patient",
        //更新病人信息
        "update_patient",
        //删除病人信息
        "delete_patient",
        //查询病人信息
        "query_patient",
        //新增辖区居民
        "add_resident",
        //更新辖区居民
        "update_resident",
        //删除辖区居民
        "delete_resident",
        //查询辖区居民
        "query_resident",
        //新增药物订单记录
        "add_item",
        //更新药物订单记录
        "update_item",
        //删除药物订单记录
        "delete_item"
      ],
      contacts: {
        wechat: data.wechat,
        qq: data.qq,
        phone_number: data.phone_number,
        email: data.email
      }
    };
    console.log("account==>", account);
    httpUtil(account_url, account, null, "POST").then(
      response => {
        response.json().then(data => {
          if (data.rtn === 0) {
            dispatch(registerSuccess(data));
            resolve("注册成功");
          } else {
            //如果是账号密码有误，则返回码是-10030
            let msg = "注册失败";
            if (data.rtn === -10034) {
              msg = "账号已经被注册";
            }
            dispatch(registerFailed(data));
            reject(msg);
          }
        });
      },
      error => {
        dispatch(registerFailed(error));
        reject(error);
      }
    );
  });
};

export const logout = () => {
  flushAccount();
};
