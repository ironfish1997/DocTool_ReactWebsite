import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import SiderCustom from "./components/SiderCustom";
import HeaderCustom from "./components/HeaderCustom";
import { PatientMainPanel }from "./components/patientInfoPanel";
import HomePanel from "./components/dashboard/Dashboard";
import { Layout /* notification, Icon */ } from "antd";
import editAccountInfo from "./components/editAccountInfo/index";
// import { Redirect } from "react-router-dom";
// import { setMobile } from "./action/programStatus";
import { checkLogin } from "./action/account";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { ThemePicker } from "./components/widget";
import * as notificationUtil from "./action/common/openNotification";

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      collapsed: true,
      checked: false
    };
  }

  componentWillMount() {
    if (
      !this.props.account ||
      !this.props.account.session_id ||
      !this.props.account.user ||
      !this.props.account.user.userName
    ) {
      // console.log("CRoter:", this.props);
      const { account, checkLogin, history } = this.props;
      let reg = new RegExp('"', "g");
      let session_id_to_check;
      if (account) {
        session_id_to_check = account.session_id;
      }
      if (!session_id_to_check) {
        session_id_to_check = localStorage.getItem("session_id");
        if (!session_id_to_check || session_id_to_check.length === 0) {
          console.log("用户未登录!!!");
          notificationUtil.openNotificationWithIcon("warning", "您还未登录！");
          history.push("/login");
          return;
        }
      }
      session_id_to_check = session_id_to_check.replace(reg, "");
      console.log("当前检查session_id:", session_id_to_check);
      this.setState({
        checked: true
      });
      checkLogin(session_id_to_check);
    }
  }

  // toggle = () => {
  //   this.setState({
  //     collapsed: false
  //   });
  // };

  _setTitle = ({ title }) => {
    if (this.state.title === title) return;
    this.setState({ title });
  };

  render() {
    const { title } = this.state;
    const { match } = this.props;
    return (
      <DocumentTitle title={title}>
        <Layout>
          <SiderCustom collapsed={this.state.collapsed} />
          {/* <ThemePicker /> */}
          <Layout style={{ flexDirection: "colomn" }}>
            <HeaderCustom
              toggle={this.toggle}
              collapsed={this.state.collapsed}
              user={this.props.account.user}
            />
            <Content style={{ overflow: "initial", flex: "1 1 0" }}>
              <Switch>
                <Route
                  path={`${match.path}/treatment`}
                  component={PatientMainPanel}
                />
                <Route path={`${match.path}/main`} component={HomePanel} />
                <Route
                  path={`${match.path}/editAccountInfo`}
                  component={editAccountInfo}
                />
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </Content>
            {/* <Footer style={{ textAlign: "center" }}>
              DocTool System ©{new Date().getFullYear()} Created by
              1481980097@qq.com
            </Footer> */}
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  checkLogin: bindActionCreators(checkLogin, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
