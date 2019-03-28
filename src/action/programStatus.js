import { PROGRAM_SETMOBILE } from "./type";

/**
 * 设置是否是在移动设备上显示
 * @param {int} clientWidth
 */
export const setMobile = clientWidth => dispatch =>
  dispatch({
    type: PROGRAM_SETMOBILE,
    isMobile: clientWidth <= 992
  });
