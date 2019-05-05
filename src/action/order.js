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

const addNewOrderSuccess = data => ({
  type: type.ORDER_ADDNEWORDERSUCCESS,
  data: data
});

const updateOrderSuccess = data => ({
  type: type.ORDER_UPDATEORDERSUCCESS,
  data: data
});

const deleteOrderSuccess = data => ({
  type: type.ORDER_DELETEORDERSUCCESS,
  data: data
});
/**
 * 根据账户查找药物订单
 */
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

export const doNewOrder = (session_id, orderEntity) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!session_id || !orderEntity) {
      return reject(null);
    }
    var headers = {
      session_id
    };
    var body = orderEntity;
    httpUtil(api_path.orderItem_url, null, body, headers, "POST").then(
      response =>
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("add order failed===>", response_json.msg);
            return reject(null);
          } else {
            console.log("add order success!===>", response_json.msg);
            dispatch(addNewOrderSuccess(response_json.data));
            return resolve(response_json.data);
          }
        })
    );
  });
};

export const doUpdateOrder = (session_id, orderEntity) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!session_id || !orderEntity) {
      return reject(null);
    }
    var headers = {
      session_id
    };
    var body = orderEntity;
    httpUtil(api_path.orderItem_url, null, body, headers, "PUT").then(
      response =>
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("update order failed===>", response_json.msg);
            return reject(null);
          } else {
            console.log("update order success!===>", response_json.msg);
            dispatch(updateOrderSuccess(response_json.data));
            return resolve(response_json.data);
          }
        })
    );
  });
};

export const doDeleteOrder = (session_id, order_id) => dispatch => {
  return new Promise((resolve, reject) => {
    if (!session_id || !order_id) {
      return reject(null);
    }
    var headers = {
      session_id
    };
    var params = {
      id: order_id
    };
    httpUtil(api_path.orderItem_url, params, null, headers, "DELETE").then(
      response =>
        response.json().then(response_json => {
          if (response_json.rtn !== 0) {
            console.error("delete order failed===>", response_json.msg);
            return reject(null);
          } else {
            console.log("delete order success!===>", response_json.msg);
            dispatch(deleteOrderSuccess(response_json.data));
            return resolve(response_json.data);
          }
        })
    );
  });
};
