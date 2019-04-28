import { httpUtil } from "../utils";
import * as api_path from "../config/api_path";
import * as types from "./type";

/**
 * 获取当前所有未复查的特殊病症患者成功
 */
const getUnreviewSpecialPatientsSuccess = data => ({
  type: types.PUBLIC_SPPATIENT_GETUNREVIEW_SUCCESS,
  data: data
});

/**
 * 获取当前所有未复查的特殊病症患者失败
 */
const getUnreviewSpecialPatientsFailed = error => ({
  type: types.PUBLIC_SPPATIENT_GETUNREVIEW_FAILED,
  error: error
});

export const doGetUnreviewSpecialPatients = (session_id, area) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!area || !session_id) {
      console.error("获取为复查病人信息失败,传入地址为空");
      return reject("获取为复查病人信息失败");
    }
    let params = {
      area
    };
    let headers = {
      session_id
    };
    httpUtil(
      api_path.getUnreviewSpecialPatients_url,
      params,
      null,
      headers,
      "GET"
    )
      .then(response =>
        response.json().then(response_json => {
          if (response_json.rtn === 0) {
            dispatch(getUnreviewSpecialPatientsSuccess(response_json.data));
            return resolve("获取未复查病人成功");
          } else {
            dispatch(getUnreviewSpecialPatientsFailed(response_json.msg));
            return reject("获取未复查病人失败");
          }
        })
      )
      .catch(error => {
        dispatch(getUnreviewSpecialPatientsFailed(error));
        return reject("获取未复查病人失败");
      });
  });
};

export const doGetReviewRow = (session_id, id_number) => {
  return new Promise((resolve, reject) => {
    if (!session_id || !id_number) {
      console.error("doGetReviewRow:信息不足");
      return reject(null);
    }
    let params = {
      id_number
    };
    let headers = {
      session_id
    };
    httpUtil(api_path.getReviewRow_url, params, null, headers, "GET")
      .then(response =>
        response
          .json()
          .then(response_json => {
            if (response_json.rtn === 0) {
              console.log("doGetReviewRow成功!");
              return resolve(response_json.data);
            } else {
              return reject(null);
            }
          })
          .catch(error => {
            console.error("doGetReviewRow失败:", error);
            return reject(null);
          })
      )
      .catch(error => {
        console.error("doGetReviewRow失败:", error);
        return reject(null);
      });
  });
};

export const doSaveReviewRow = (session_id, treatment) => {
  return new Promise((resolve, reject) => {
    if (!session_id || !treatment) {
      console.error("doSaveReviewRow:信息不足");
      return reject(null);
    }
    let headers = {
      session_id
    };
    httpUtil(api_path.saveReviewRow_url, null, treatment, headers, "POST")
      .then(response =>
        response
          .json()
          .then(response_json => {
            if (response_json.rtn === 0) {
              console.log("doSaveReviewRow!");
              return resolve(response_json.data);
            } else {
              return reject(null);
            }
          })
          .catch(error => {
            console.error("doSaveReviewRow失败:", error);
            return reject(null);
          })
      )
      .catch(error => {
        console.error("doSaveReviewRow失败:", error);
        return reject(null);
      });
  });
};

export const doDeleteReviewRow = (session_id, treatment_id) => {
  return new Promise((resolve, reject) => {});
};
