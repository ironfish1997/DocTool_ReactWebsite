import { httpUtil } from "../utils";
import * as api_path from "../config/api_path";
import * as types from "./type";

export const doUpdateTreatmentSuccess = data => ({
  type: types.TREATMENT_UPDATETREATMENT_SUCCESS,
  data: data
});

export const doUpdateTreatmentFailed = error => ({
  type: types.TREATMENT_UPDATETREATMENT_SUCCESS,
  error: error
});

export const doAddTreatmentSuccess = data => ({
  type: types.TREATMENT_ADDTREATMENT_SUCCESS,
  data: data
});

export const doAddTreatmentFailed = error => ({
  type: types.TREATMENT_ADDTREATMENT_FAILED,
  error: error
});

export const getTreatmentByPatientIdSuccess = data => ({
  type: types.TREATMENT_GETTREATMENTBYPATIENTID_SUCCESS,
  data: data
});

export const getTreatmentByPatientIdFailed = error => ({
  type: types.TREATMENT_GETTREATMENTBYPATIENTID_FAILED,
  error: error
});

export const deleteTreatmentSuccess = data => ({
  type: types.TREATMENT_DELETETREATMENT_SUCCESS,
  data: data
});

export const deleteTreatmentFailed = error => ({
  type: types.TREATMENT_DELETETREATMENT_FAILED,
  error: error
});

export const getTreatmentsByPatientIdNumber = (
  session_id,
  patient_id_number
) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!session_id || !patient_id_number) {
      return reject("信息不足");
    }
    let headers = {
      session_id
    };
    let params = {
      patient_id_number
    };
    httpUtil(api_path.getTreatmentByPatientId, params, null, headers, "GET")
      .then(response =>
        response.json().then(response_json => {
          if (response_json.rtn === 0) {
            console.log("获取就诊记录成功");
            dispatch(getTreatmentByPatientIdSuccess(response_json.data));
            return resolve(response_json.data);
          } else {
            console.log("获取就诊记录失败");
            dispatch(getTreatmentByPatientIdFailed(response_json.msg));
            return reject("获取就诊记录失败");
          }
        })
      )
      .catch(error => {
        console.log("获取就诊记录失败:", error);
        dispatch(getTreatmentByPatientIdFailed(error));
        return reject("获取就诊记录失败");
      });
  });
};

/**
 * 更新就诊信息
 */
export const doUpdateTreatmentRecord = (
  session_id,
  treatmentRecord
) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!session_id || !treatmentRecord) {
      console.log("更新就诊记录失败");
      return reject("更新就诊记录失败");
    }
    let body = treatmentRecord;
    let headers = {
      session_id: session_id
    };
    httpUtil(api_path.treatment_url, null, body, headers, "PUT")
      .then(response =>
        response.json().then(response_json => {
          //如果更新就诊记录的接口返回的rtn为0,则成功更改
          if (response_json.rtn === 0) {
            console.log("成功更改就诊信息");
            dispatch(doUpdateTreatmentSuccess(response_json.data));
            return resolve("更新就诊信息成功");
          } else {
            console.log("更新就诊信息失败");
            dispatch(doUpdateTreatmentFailed(response_json.msg));
            return reject("更新就诊信息失败");
          }
        })
      )
      .catch(error => {
        console.error("更新就诊信息失败：", error);
        dispatch(doUpdateTreatmentFailed(error));
        return reject("更新就诊信息失败");
      });
  });
};

export const doAddTreatmentRecord = (
  session_id,
  treatmentRecord
) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!session_id || !treatmentRecord) {
      console.log("新增就诊信息失败");
      return reject("新增就诊信息失败");
    }
    let body = treatmentRecord;
    let headers = {
      session_id: session_id
    };
    httpUtil(api_path.treatment_url, null, body, headers, "POST").then(
      response =>
        response
          .json()
          .then(response_json => {
            if (response_json.rtn !== 0) {
              console.log("新增就诊信息失败");
              dispatch(doAddTreatmentFailed(response_json.msg));
              return reject("新增就诊信息失败");
            }
            dispatch(doAddTreatmentSuccess(response_json.data));
            console.log("新增就诊信息成功");
            return resolve("新增就诊信息成功");
          })
          .catch(error => {
            console.log("新增就诊信息失败");
            dispatch(doAddTreatmentFailed(null));
            return reject("新增就诊信息失败");
          })
    );
  });
};

export const doDeleteTreatment = (session_id, treatment_id) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!session_id || !treatment_id) {
      console.log("信息不足");
      return reject("删除病人失败");
    }
    let params = {
      treatment_id
    };
    let headers = {
      session_id
    };
    httpUtil(api_path.treatment_url, params, null, headers, "DELETE")
      .then(response =>
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.warn("删除病人信息失败:", response_json.msg);
            dispatch(deleteTreatmentSuccess(response_json.msg));
            return reject("删除病人信息失败");
          }
          console.log("删除病人信息成功!");
          dispatch(deleteTreatmentSuccess(response_json.data));
          return resolve("删除病人信息成功");
        })
      )
      .catch(error => {
        console.log("删除病人信息失败:", error);
        return reject(null);
      });
  });
};
