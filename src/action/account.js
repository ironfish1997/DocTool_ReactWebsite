import * as type from "./type";
import { httpUtil } from "../utils";
import * as api_path from "../config/api_path";

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

export const updateSuccess = data => ({
  type: type.ACCOUNT_UPDATE_SUCCESS,
  data: data
});
/**
 * 验证当前session_id是否已过期，如果过期，返回失败数据；如果未过期，保存用户数据到store
 * @param {string} session_id
 */
export const checkLogin = (session_id = "") => dispatch => {
  return new Promise((resolve, reject) => {
    console.log("checkLogin,session_id:", session_id);
    const requestHeader = {
      session_id: session_id
    };
    return httpUtil(
      api_path.check_login_url,
      null,
      null,
      requestHeader,
      "POST"
    ).then(
      response => {
        response.json().then(response_json => {
          if (response_json.rtn === 0) {
            let returnData = {};
            try {
              returnData = response_json.data;
            } catch (error) {
              returnData = {};
            }
            dispatch(logincheckSuccess(returnData));
            resolve("check ok");
          } else {
            dispatch(logincheckFailed(response_json.msg));
            reject("check failed");
          }
        });
      },
      error => {
        console.log("logining request error");
        dispatch(logincheckFailed(error));
        reject("check failed");
      }
    );
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
    httpUtil(
      api_path.login_url,
      null,
      requestParams,
      requestHeader,
      "POST"
    ).then(
      response => {
        response.json().then(response_json => {
          if (response_json.rtn === 0) {
            dispatch(loginSuccess(response_json.data));
            return resolve("登录成功");
          } else {
            //如果是账号密码有误，则返回码是-10030
            let msg = "登录失败";
            if (response_json.rtn === -10030) {
              msg = "密码或账号有误";
            }
            dispatch(loginFailed(response_json.msg));
            return reject(msg);
          }
        });
      },
      error => {
        dispatch(loginFailed(error));
        return reject("登录失败");
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
      return reject("lack of information");
    }
    let account = {
      account_id: data.account_id,
      account_password: data.account_password,
      name: data.name,
      area: data.area,
      account_permission: ["doctor_auth"],
      contacts: {
        wechat: data.wechat,
        qq: data.qq,
        phone_number: data.phone_number,
        email: data.email
      }
    };
    console.log("account==>", account);
    httpUtil(api_path.account_url, null, account, null, "POST").then(
      response => {
        response.json().then(response_json => {
          if (response_json.rtn === 0) {
            dispatch(registerSuccess(response_json.data));
            resolve("注册成功");
          } else {
            //如果是账号密码有误，则返回码是-10030
            let msg = "注册失败";
            if (response_json.rtn === -10034) {
              msg = "账号已经被注册";
            }
            dispatch(registerFailed(response_json.msg));
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

/**
 * 更新用户对象
 * @param {object} updated_info
 * @param {string} session_id
 */
export const doUpdate = (updated_info, session_id) => dispatch => {
  return new Promise((resolve, reject) => {
    //如果未传入原始用户和修改后的用户信息或session_id，直接返回
    if (updated_info === null || session_id === null) {
      return reject("缺少信息");
    }
    let account = {
      account_id: updated_info.account_id,
      account_password: updated_info.account_password,
      name: updated_info.name,
      area: updated_info.area,
      contacts: {
        wechat: updated_info.wechat,
        qq: updated_info.qq,
        phone_number: updated_info.phone_number,
        email: updated_info.email
      }
    };
    //输出数据
    console.log("修改账户，需要修改的信息为==>", updated_info);
    let header = {
      session_id: session_id
    };
    httpUtil(api_path.account_url, null, account, header, "PUT").then(
      response => {
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("update user info failed===>", response_json.msg);
            return reject("修改信息失败");
          } else {
            console.log("update user info success!===>", response_json.msg);
            dispatch(updateSuccess(response_json.data));
            return resolve("修改信息成功");
          }
        });
      },
      error => {
        console.log("update user info failed!===>", error);
        return resolve("修改信息失败");
      }
    );
  });
};

/**
 * 注销账户
 */
export const logout = () => {
  flushAccount();
};

/**
 * 获得所有用户账户信息
 */
export const getAllUsers = session_id => {
  return new Promise((resolve, reject) => {
    if (!session_id) {
      console.error("getAllUsers:session_id为空");
      return reject(null);
    }
    let headers = {
      session_id
    };
    httpUtil(api_path.findAllAccount_url, null, null, headers, "GET")
      .then(response =>
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("get all users info failed===>", response_json.msg);
            return reject(null);
          } else {
            console.log("get all users info success!===>", response_json.msg);
            return resolve(response_json.data);
          }
        })
      )
      .catch(error => {
        console.error("get all users info failed===>", error);
        return reject(null);
      });
  });
};

export const frozeAccount = (session_id, account_id) => {
  return new Promise((resolve, reject) => {
    if (!session_id || !account_id) {
      console.error(
        "frozeAccount缺少数据:session_id=%s,account_id=%s",
        session_id,
        account_id
      );
      return reject(null);
    }
    let headers = {
      session_id
    };
    let params = {
      account_id
    };
    httpUtil(api_path.frozeAccount_url, params, null, headers, "GET")
      .then(response =>
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("frozeAccount failed===>", response_json.msg);
            return reject(null);
          } else {
            console.log("frozeAccount success!===>", response_json.msg);
            return resolve(response_json.data);
          }
        })
      )
      .catch(error => {
        console.error("frozeAccount failed===>", error);
        return reject(null);
      });
  });
};

export const unFrozeAccount = (session_id, account_id) => {
  return new Promise((resolve, reject) => {
    if (!session_id || !account_id) {
      console.error(
        "unFrozeAccount缺少数据:session_id=%s,account_id=%s",
        session_id,
        account_id
      );
      return reject(null);
    }
    let headers = {
      session_id
    };
    let params = {
      account_id
    };
    httpUtil(api_path.unFrozeAccount_url, params, null, headers, "GET")
      .then(response =>
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("unFrozeAccount failed===>", response_json.msg);
            return reject(null);
          } else {
            console.log("unFrozeAccount success!===>", response_json.msg);
            return resolve(response_json.data);
          }
        })
      )
      .catch(error => {
        console.error("frozeAccount failed===>", error);
        return reject(null);
      });
  });
};

export const deleteAccount = (session_id, account_id) => {
  return new Promise((resolve, reject) => {
    if (!session_id || !account_id) {
      console.error(
        "deleteAccount缺少数据:session_id=%s,account_id=%s",
        session_id,
        account_id
      );
      return reject(null);
    }
    let headers = {
      session_id
    };
    let params = {
      account_id
    };
    httpUtil(api_path.account_url, params, null, headers, "DELETE")
      .then(response =>
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("delete account failed===>", response_json.msg);
            return reject(null);
          } else {
            console.log("delete account success!===>", response_json.msg);
            return resolve(response_json.data);
          }
        })
      )
      .catch(error => {
        console.error("delete account failed===>", error);
        return reject(null);
      });
  });
};
