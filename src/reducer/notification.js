import * as types from "../action/type";

const initState = {
  permanentNotifications: [],
  tempNotifications: [],
  isNewNoti: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.NOTIFICATION_GETTEMP_SUCCESS:
      return {
        ...state,
        tempNotifications: [...state.tempNotifications, action.data],
        isNewNoti: true
      };
    case types.NOTIFICATION_GETPERM_SUCCESS:
      return {
        ...state,
        permanentNotifications: [...state.permanentNotifications, action.data],
        isNewNoti: true
      };
    case types.NOTIFICATION_DELETETEMP:
      state.tempNotifications.map((v, k) => {
        if (action.data === v) {
          state.tempNotifications.splice(k, 1);
        }
        return null;
      });
      return { ...state };
    default:
      return { ...state, isNewNoti: false };
  }
};
