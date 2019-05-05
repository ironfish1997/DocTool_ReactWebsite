//===账户相关action==============================================

export const ACCOUNT_LOGIN_SUCCESS = "ACCOUNT_LOGIN_SUCCESS";
export const ACCOUNT_LOGIN_FAILED = "ACCOUNT_LOGIN_FAILED";

export const ACCOUNT_LOGINCHECK_SUCCESS = "ACCOUNT_LOGINCHECK_SUCCESS";
export const ACCOUNT_LOGINCHECK_FAILED = "ACCOUNT_LOGINCHECK_FAILED";

export const ACCOUNT_LOGOUT = "ACCOUNT_LOGOUT";

export const FLUSH_ACCOUNT = "FLUSH_ACCOUNT";

export const ACCOUNT_REGISTER_SUCCESS = "ACCOUNT_REGISTER_SUCCESS";
export const ACCOUNT_REGISTER_FAILED = "ACCOUNT_REGISTER_FAILED";

export const ACCOUNT_UPDATE_SUCCESS = "ACCOUNT_UPDATE_SUCCESS";

//===病人相关action=============================================
export const PATIENT_ADDPATIENT_FAILED = "PATIENT_ADDPATIENT_FAILED";
export const PATIENT_ADDPATIENT_SUCCESS = "PATIENT_ADDPATIENT_SUCCESS";
export const PATIENT_UPDATE_FAILED = "PATIENT_UPDATE_FAILED";
export const PATIENT_UPDATE_SUCCESS = "PATIENT_UPDATE_SUCCESS";
export const PATIENT_FINDALL_FAILED = "PATIENT_FINDALL_FAILED";
export const PATIENT_FINDALL_SUCCESS = "PATIENT_FINDALL_SUCCESS";
export const PATIENT_DELETEONEPATIENT_FAILED =
  "PATIENT_DELETEONEPATIENT_FAILED";
export const PATIENT_DELETEONEPATIENT_SUCCESS =
  "PATIENT_DELETEONEPATIENT_SUCCESS";
export const TREATMENT_DELETETREATMENT_SUCCESS =
  "TREATMENT_DELETETREATMENT_SUCCESS";
export const TREATMENT_DELETETREATMENT_FAILED =
  "TREATMENT_DELETETREATMENT_FAILED";

//===就诊记录相关action=========================================
export const TREATMENT_ADDTREATMENT_SUCCESS = "TREATMENT_ADDTREATMENT_SUCCESS";
export const TREATMENT_ADDTREATMENT_FAILED = "TREATMENT_ADDTREATMENT_FAILED";
export const TREATMENT_UPDATETREATMENT_SUCCESS =
  "TREATMENT_UPDATETREATMENT_SUCCESS";
export const TREATMENT_UPDATETREATMENT_FAILED =
  "TREATMENT_UPDATETREATMENT_FAILED";
export const TREATMENT_GETTREATMENTBYPATIENTID_SUCCESS =
  "TREATMENT_GETTREATMENTBYPATIENTID_SUCCESS";
export const TREATMENT_GETTREATMENTBYPATIENTID_FAILED =
  "TREATMENT_GETTREATMENTBYPATIENTID_FAILED";

//===药物订单相关action=========================================
export const ORDER_FINDORDERFAILED = "ORDER_FINDORDERFAILED";
export const ORDER_FINDORDERSUCCESS = "ORDER_FINDORDERSUCCESS";
export const ORDER_ADDNEWORDERSUCCESS = "ORDER_ADDNEWORDERSUCCESS";
export const ORDER_ADDNEWORDERFAILED = "ORDER_ADDNEWORERFAILED";
export const ORDER_UPDATEORDERSUCCESS = "ORDER_UPDATEORDERSUCCESS";
export const ORDER_UPDATEORDERFAILED = "ORDER_UPDATEORDERFAILED";
export const ORDER_DELETEORDERSUCCESS = "ORDER_DELETEORDERSUCCESS";
export const ORDER_DELETEORDERFAILED = "ORDER_DELETEORDERFAILED";

//===通知获取相关action=========================================
export const NOTIFICATION_GETTEMP_SUCCESS = "NOTIFICATION_GETTEMP_SUCCESS";
export const NOTIFICATION_GETTEMP_FAILED = "NOTIFICATION_GETTEMP_FAILED";
export const NOTIFICATION_GETPERM_SUCCESS = "NOTIFICATION_GETPERM_SUCCESS";
export const NOTIFICATION_GETPERM_FAILED = "NOTIFICATION_GETPERM_FAILED";
export const NOTIFICATION_DELETETEMP = "NOTIFICATION_DELETETEMP";

//===公共服务相关action=========================================
export const PUBLIC_SPPATIENT_GETUNREVIEW_SUCCESS =
  "SPPATIENT_GETUNREVIEW_SUCCESS";
export const PUBLIC_SPPATIENT_GETUNREVIEW_FAILED =
  "SPPATIENT_GETUNREVIEW_FAILED";

//===程序状态相关action=========================================

export const PROGRAM_SETMOBILE = "PROGRAM_SETMOBILE";
