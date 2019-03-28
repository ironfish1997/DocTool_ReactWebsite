import { PROGRAM_SETMOBILE } from "../action/type";

export default (state = {}, action) => {
  switch (action.type) {
    case PROGRAM_SETMOBILE:
      if (action.isMobile) {
        console.log("当前显示设备为移动设备，启动自适应");
      }
      return {
        ...state,
        isMobile: action.isMobile
      };
    default:
      return state;
  }
};
