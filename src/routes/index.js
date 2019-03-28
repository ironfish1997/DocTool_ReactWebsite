/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
// import { connect } from "react-redux";
import AllComponents from "../components";
import routesConfig from "./config";
import queryString from "query-string";

export default class CRouter extends Component {
  render() {
    const { onRouterChange } = this.props;
    return (
      <Switch>
        {Object.keys(routesConfig).map(key =>
          routesConfig[key].map(r => {
            const route = r => {
              const Component = AllComponents[r.component];
              return (
                <Route
                  key={r.route || r.key}
                  exact
                  path={r.route || r.key}
                  render={props => {
                    const reg = /\?\S*/g;
                    // 匹配?及其以后字符串
                    const queryParams = window.location.hash.match(reg);
                    // 去除?的参数
                    const { params } = props.match;
                    Object.keys(params).forEach(key => {
                      params[key] = params[key] && params[key].replace(reg, "");
                    });
                    props.match.params = { ...params };
                    const merge = {
                      ...props,
                      query: queryParams
                        ? queryString.parse(queryParams[0])
                        : {}
                    };
                    //回传route配置
                    onRouterChange && onRouterChange(r);
                    // console.log("merge: ", merge);
                    return <Component {...merge} />;
                  }}
                />
              );
            };
            return r.component ? route(r) : r.subs.map(r => route(r));
          })
        )}

        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    );
  }
}

// const mapStateToProps = (state, props) => ({
//   ...state
// });

// export default connect(mapStateToProps)(CRouter);
