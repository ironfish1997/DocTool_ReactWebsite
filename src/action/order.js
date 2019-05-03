import * as type from "./type";
import { httpUtil } from "../utils";
import * as api_path from "../config/api_path";

/**
 * 根据用户身份证号查找药物订单成功
 */
const findOrderByUserIdNumberSuccess = data => ({
  type: type.ORDER_FINDORDERSUCCESS,
  data: data
});

/**
 * 根据用户身份证号查找药物订单失败
 */
// const findOrderByUserIdNumberFailed = error => ({
//   type: type.ORDER_FINDORDERFAILED,
//   error: error
// });

export const findOrderByAccountId = (session_id, account_id) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!session_id || !account_id) {
      console.warn(
        "findOrderByUserIdNumber缺少参数,session_id=%s, account_id=%s",
        session_id,
        account_id
      );
      return reject(null);
    }
    let params = {
      account_id: account_id
    };
    let headers = {
      session_id
    };
    httpUtil(api_path.orderItem_url, params, null, headers, "GET").then(
      response =>
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("find order failed===>", response_json.msg);
            return reject(null);
          } else {
            console.log("find order success!===>", response_json.msg);
            dispatch(findOrderByUserIdNumberSuccess(response_json.data));
            return resolve(response_json.data);
          }
        })
    );
  });
};
