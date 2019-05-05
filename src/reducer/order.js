import * as types from "../action/type";

const initState = {
  items: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.ORDER_FINDORDERSUCCESS:
      //把查到的订单信息放进store里面
      return { ...state, items: action.data };
    case types.ORDER_ADDNEWORDERSUCCESS:
      return { ...state, items: [...state.items, action.data] };
    case types.ORDER_DELETEORDERSUCCESS:
      return {
        ...state,
        items: state.items.filter(v => {
          return v.id !== action.data.id;
        })
      };
    default:
      return state;
  }
};
