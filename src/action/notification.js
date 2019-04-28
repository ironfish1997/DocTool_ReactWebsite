import * as type from "./type";
import * as api_path from "../config/api_path";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import * as notificationUtil from "@/action/common/openNotification";

/**
 * 获取临时消息成功
 */
const getTempNotificationSuccess = data => ({
  type: type.NOTIFICATION_GETTEMP_SUCCESS,
  data: data
});

/**
 * 获取临时消息失败
 */
// const getTempNotificationFailed = error => ({
//   type: type.NOTIFICATION_GETTEMP_FAILED,
//   error: error
// });

/**
 * 获取永久消息成功
 */
const getPermNotificationSuccess = data => ({
  type: type.NOTIFICATION_GETPERM_SUCCESS,
  data: data
});

const deleteTempNotification = data => ({
  type: type.NOTIFICATION_DELETETEMP,
  data: data
});

/**
 * 获取永久消息失败
 */
// const getPermNotificationFailed = error => ({
//   type: type.NOTIFICATION_GETPERM_FAILED,
//   error: error
// });

var stompClient = null;

export const connectWebSocket = session_id => dispatch => {
  var socket = new SockJS(
    api_path.notification_websocket_url +
      "/session_id=" +
      session_id.replace(/"/g, "")
  );
  stompClient = Stomp.over(socket);
  stompClient.reconnect_delay = 5000;
  stompClient.connect({}, frame => {
    console.log("Websocket Connected:" + frame);
    //注册接收临时消息
    stompClient.subscribe("/user/topic/tempNotifications", response => {
      dispatch(getTempNotificationSuccess(JSON.parse(response.body).msg));
      notificationUtil.openNotificationWithIcon(
        "warning",
        "您收到一条新提醒，请及时查看"
      );
    });
    //注册接收永久消息
    stompClient.subscribe("/user/topic/permanentNotifications", response => {
      dispatch(getPermNotificationSuccess(JSON.parse(response.body).msg));
      notificationUtil.openNotificationWithIcon(
        "warning",
        "您收到一条新提醒，请及时查看"
      );
    });
  });
};

export const disconnectWebSocket = () => {
  if (stompClient != null) {
    stompClient.disconnect();
  }
  console.log("WebSocket Disconnected");
};

export const doDeleteTempNotification = item => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(deleteTempNotification(item));
    resolve("删除消息成功");
  });
};
