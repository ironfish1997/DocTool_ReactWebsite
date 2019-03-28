import { notification } from 'antd';

export const openTempNotification = (msg) => {
    notification.open({
        message: "提示",
        description: msg,
        duration:2
    });
};

/**
 * 
 * 弹出提醒框
 * @param {string} type success、info、warning、error
 */
export const openNotificationWithIcon = (type,msg) => {
    notification[type]({
        message: '提示',
        description: msg,
        duration:3
    });
};