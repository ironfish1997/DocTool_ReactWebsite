/**
 * 路由组件出口文件
 */
import Loadable from "react-loadable";
import Loading from "./widget/Loading";
import BasicTable from "./tables/BasicTables";
import AdvancedTable from "./tables/AdvancedTables";
import AsynchronousTable from "./tables/AsynchronousTable";
import Icons from "./ui/Icons";
import Buttons from "./ui/Buttons";
import Spins from "./ui/Spins";
import Modals from "./ui/Modals";
import Notifications from "./ui/Notifications";
import Tabs from "./ui/Tabs";
import Banners from "./ui/banners";
import Drags from "./ui/Draggable";
import Dashboard from "./dashboard/Dashboard";
import Gallery from "./ui/Gallery";
import MapUi from "./ui/map";
import QueryParams from "./extension/QueryParams";
import EditAccountInfo from "./editAccountInfo/index";
import PatientInfoPanel from "./patientInfoPanel/MainPanel";

const WysiwygBundle = Loadable({
  // 按需加载富文本配置
  loader: () => import("./ui/Wysiwyg"),
  loading: Loading
});

export {
  BasicTable,
  AdvancedTable,
  AsynchronousTable,
  Icons,
  Buttons,
  Spins,
  Modals,
  Notifications,
  Tabs,
  Banners,
  Drags,
  Dashboard,
  Gallery,
  WysiwygBundle,
  MapUi,
  QueryParams,
  EditAccountInfo,
  PatientInfoPanel
};
