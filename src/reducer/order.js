import * as types from "../action/type";

const initState = {
  items: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.ORDER_FINDORDERSUCCESS:
      //把查到的订单信息放进store里面
      return { ...state, items: action.data };
    default:
      return state;
  }
};
