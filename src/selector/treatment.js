/**
 * 拿到原始的就诊记录
 */
export const getTreatments = state => {
  let treatments = state.treatment.data;
  let treatmentsArr = [];
  for (let k of Object.keys(treatments)) {
    treatmentsArr.push(...treatments[k]);
  }
  return treatmentsArr;
};

/**
 * 把就诊记录中的时间戳转换成当地时间字符串
 */
export const getTreatmentsWhichTimestampConvertToDatastr = state => {
  let treatments = state.treatment.data;
  let treatmentsArr = [];
  for (let k of Object.keys(treatments)) {
    for (let v in treatments[k]) {
      treatments[k][v].start_time = new Date(
        treatments[k][v].start_time
      ).toLocaleDateString();
      treatments[k][v].end_time = new Date(
        treatments[k][v].end_time
      ).toLocaleDateString();
    }
    treatmentsArr.push(...treatments[k]);
  }
  return treatmentsArr;
};

/**
 * 筛选特定身份证号的就诊记录
 */
export const filterSearchIdNumber = (treatmentArr, id_number) => {
  var result = treatmentArr.filter(
    treatment => treatment.patient_id_number === id_number
  );
  // console.log("filterSearchIdNumber:", result);
  return result;
};
