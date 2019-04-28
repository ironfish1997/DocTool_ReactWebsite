/**
 * Created by 叶子 on 2017/7/30.
 */
import { combineReducers } from "redux";
import account from "./account";
import patient from "./patient";
import programStatus from "./programStatus";
import treatment from "./treatment";
import notification from "./notification";
import publicService from "./publicService";

export default combineReducers({
  account,
  programStatus,
  patient,
  treatment,
  notification,
  publicService
});
