import * as types from "../action/type";

const initState = {
  patients: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.PATIENT_ADDPATIENT_SUCCESS:
      //把新增的病人记录放进store里面
      return { ...state, patients: [...state.patients, action.data] };
    case types.PATIENT_FINDALL_SUCCESS:
      return { ...state, patients: action.data };
    case types.PATIENT_DELETEONEPATIENT_SUCCESS:
      state.patients.map((v, k) => {
        if (action.data.id && v.id && v.id === action.data.id) {
          state.patients.splice(k, 1);
        }
        return null;
      });
      return state;
    default:
      return state;
  }
};
