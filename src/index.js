import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import { AppContainer } from "react-hot-loader";
import Page from "./Page";
import "./style/lib/animate.css";
import "./style/antd/index.less";
import "./style/index.less";
import "./style/theme.less";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const sagaMiddleware = createSagaMiddleware();
// redux 注入操作
const middleware = [thunk];
const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
);
// sagaMiddleware.run
console.log("Initial state：", store.getState());

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <LocaleProvider locale={zh_CN}>
        <Page store={store} />
      </LocaleProvider>
    </Provider>
  </AppContainer>,
  document.getElementById("root")
);
