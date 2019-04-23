import * as types from "../action/type";
import JsonUtils from "@/utils/JsonUtils";

const initState = {
  data: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.TREATMENT_ADDTREATMENT_SUCCESS: {
      let patient_id = action.data.patient_id_number;
      let treatmentsMap = JsonUtils.objToStrMap(state.data);
      if (!(patient_id in treatmentsMap)) {
        treatmentsMap.set(patient_id, []);
      }
      let isExist = 0;
      treatmentsMap.get(patient_id).map((v, k) => {
        if (v.id === action.data.id) {
          let arrTemp = JSON.parse(
            JSON.stringify(treatmentsMap.get(patient_id))
          );
          arrTemp[k] = action.data;
          treatmentsMap.set(patient_id, arrTemp);
          arrTemp = null;
          isExist = 1;
        }
        return null;
      });
      //如果数组里没有这个记录，则把这个记录添加到数组里
      if (isExist === 0) {
        let arrTemp = JSON.parse(JSON.stringify(treatmentsMap.get(patient_id)));
        arrTemp.push(action.data);
        treatmentsMap.set(patient_id, arrTemp);
        arrTemp = null;
        isExist = 1;
      }
      state.data = JsonUtils.strMapToObj(treatmentsMap);
      return state;
    }
    case types.TREATMENT_GETTREATMENTBYPATIENTID_SUCCESS: {
      let patient_id = null;
      if (action.data !== null && action.data[0] != null) {
        patient_id = action.data[0].patient_id_number;
      }
      //如果没有传过来数据，则直接返回原state
      if (!patient_id) {
        return state;
      }
      let treatmentsMap = JsonUtils.objToStrMap(state.data);
      if (!(patient_id in treatmentsMap)) {
        treatmentsMap.set(patient_id, []);
      }
      treatmentsMap.set(patient_id, [
        ...treatmentsMap.get(patient_id),
        ...action.data
      ]);
      state.data = JsonUtils.strMapToObj(treatmentsMap);
      // console.log(state);
      return JSON.parse(JSON.stringify(state));
    }
    case types.TREATMENT_DELETETREATMENT_SUCCESS: {
      //因为后端接口规定不管是否找到id对应的就诊记录，都会返回true，所以可能data为空
      let treatment_id = action.data ? action.data.id : null;
      if (treatment_id === null) {
        return state;
      }
      let treatmentsMap = JsonUtils.objToStrMap(state.data);
      treatmentsMap.get(action.data.patient_id_number).map((v, k) => {
        //从state中剔除删除的就诊记录
        if (treatment_id === v.id) {
          treatmentsMap.get(action.data.patient_id_number).splice(k, 1);
        }
        return null;
      });
      return { ...state, data: JsonUtils.strMapToObj(treatmentsMap) };
    }
    case types.TREATMENT_UPDATETREATMENT_SUCCESS: {
      let treatment_id = action.data ? action.data.id : null;
      let treatmentsMap = JsonUtils.objToStrMap(state.data);
      treatmentsMap.get(action.data.patient_id_number).map((v, k) => {
        //从state中替换删除的就诊记录
        if (treatment_id === v.id) {
          let treatmentArr = treatmentsMap.get(action.data.patient_id_number);
          treatmentArr[k] = action.data;
          treatmentsMap.set(action.data.patient_id_number, treatmentArr);
        }
        return null;
      });
      return { ...state, data: JsonUtils.strMapToObj(treatmentsMap) };
    }
    default:
      return state;
  }
};
