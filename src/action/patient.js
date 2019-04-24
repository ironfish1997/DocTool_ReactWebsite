import * as type from "./type";
import { httpUtil } from "../utils";
import * as api_path from "../config/api_path";

/**
 * 新增病人成功
 * @param {patient} data
 */
const addPatientSuccess = data => ({
  type: type.PATIENT_ADDPATIENT_SUCCESS,
  data: data
});

/**
 * 新增病人失败
 * @param {*} error
 */
const addPatientFailed = error => ({
  type: type.PATIENT_ADDPATIENT_FAILED,
  error: error
});

const updatePatientFailed = error => ({
  type: type.PATIENT_UPDATE_FAILED,
  error: error
});

const updatePatientSuccess = data => ({
  type: type.PATIENT_UPDATE_SUCCESS,
  data: data
});

const findAllPatientsFailed = error => ({
  type: type.PATIENT_FINDALL_FAILED,
  error: error
});

const findAllPatientsSuccess = data => ({
  type: type.PATIENT_FINDALL_SUCCESS,
  data: data
});

const deleteOnePatientSuccess = data => ({
  type: type.PATIENT_DELETEONEPATIENT_SUCCESS,
  data: data
});

const deleteOnePatientFailed = error => ({
  type: type.PATIENT_DELETEONEPATIENT_FAILED,
  error: error
});

/**
 * 新增病人
 * @param {string} session_id
 * @param {*} patient
 */
export const doAddPatient = (session_id, patient) => dispatch => {
  return new Promise((resolve, reject) => {
    if (patient === null) {
      return reject("缺少必要的信息");
    }
    //输出数据
    console.log("新增病人，病人信息为==>", patient);
    let header = {
      session_id: session_id
    };
    httpUtil(api_path.patient_url, null, patient, header, "POST")
      .then(
        response => {
          response.json().then(response_json => {
            if (response_json.rtn !== 0) {
              console.error("update user info failed===>", response_json.msg);
              dispatch(addPatientFailed(response_json.msg));
              return reject("新增病人失败");
            } else {
              console.log("update user info success!===>", response_json.msg);
              dispatch(addPatientSuccess(response_json.data));
              return resolve("新增病人成功");
            }
          });
        },
        error => {
          console.log("新增病人失败!===>", error);
          return reject("新增病人失败");
        }
      )
      .catch(error => {
        console.log("新增病人失败!===>", error);
        return reject("新增病人失败");
      });
  });
};

/**
 * 修改病人信息
 * @param {string} session_id
 * @param {*} patient
 */
export const doUpdatePatient = (session_id, patient) => dispatch => {
  return new Promise((resolve, reject) => {
    if (patient === null) {
      return reject("缺少必要的信息");
    }
    //输出数据
    console.log("更新病人，病人信息为==>", patient);
    let header = {
      session_id: session_id
    };
    httpUtil(api_path.patient_url, null, patient, header, "PUT").then(
      response => {
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("update user info failed===>", response_json.msg);
            dispatch(updatePatientFailed(response_json.msg));
            return reject("更新病人失败");
          }
          console.log("update user info success!===>", response_json.msg);
          dispatch(updatePatientSuccess(response_json.data));
          return resolve("更新病人成功");
        });
      },
      error => {
        console.log("更新病人失败!===>", error);
        return reject("更新病人失败");
      }
    );
  });
};

/**
 * 查找所有病人信息
 * @param {*} session_id
 */
export const findAllPatients = session_id => dispatch => {
  return new Promise((resolve, reject) => {
    if (!session_id) {
      console.log("session_id为空");
      return reject("session_id为空");
    }
    let header = {
      session_id: session_id
    };
    httpUtil(api_path.getAllPatient_url, null, null, header, "GET").then(
      response => {
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("find all patients failed,", response_json.msg);
            dispatch(findAllPatientsFailed(response_json.msg));
            return reject("获取全部病人信息失败");
          }
          console.log("update user info success!===>", response_json.msg);
          dispatch(findAllPatientsSuccess(response_json.data));
          return resolve("获取全部病人信息成功");
        });
      }
    );
  });
};

export const deleteOnePatients = (session_id, patient_id) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!session_id || !patient_id) {
      console.log("删除病人信息不足");
      return reject("删除病人失败");
    }
    let header = {
      session_id: session_id
    };
    let param = {
      patient_id: patient_id
    };
    httpUtil(api_path.patient_url, param, null, header, "DELETE").then(
      response => {
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("delete patient failed,", response_json.msg);
            dispatch(deleteOnePatientFailed(response_json.msg));
            return reject("删除病人失败");
          }
          console.log("delete patient success!===>", response_json.msg);
          dispatch(deleteOnePatientSuccess(response_json.data));
          return resolve("删除病人成功");
        });
      }
    );
  });
};
