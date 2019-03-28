import React, { Component } from "react";
import Routes from "./routes";
import DocumentTitle from "react-document-title";
import SiderCustom from "./components/SiderCustom";
import HeaderCustom from "./components/HeaderCustom";
import { Layout /* notification, Icon */ } from "antd";
import { Redirect } from "react-router-dom";
import { setMobile } from "./action/programStatus";
import { checkLogin } from "./action/account";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { ThemePicker } from "./components/widget";
import * as notificationUtil from "./action/common/openNotification";

const { Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      collapsed: false
    };
  }
  componentWillMount() {
    this.getClientWidth();
    window.onresize = () => {
      console.log("屏幕变化了");
      this.getClientWidth();
    };
  }

  componentDidMount() {
    // const openNotification = () => {
    //   localStorage.setItem("isFirst", true);
    // };
    // const isFirst = JSON.parse(localStorage.getItem("isFirst"));
    // !isFirst && openNotification();
  }

  componentWillUnmount(){
    
  }


  getClientWidth = () => {
    // 获取当前浏览器宽度并设置responsive管理响应式
    const { setMobile } = this.props;
    const clientWidth = window.innerWidth;
    setMobile(clientWidth);
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  _setTitle = ({ title }) => {
    if (this.state.title === title) return;
    this.setState({ title });
  };

  render() {
    if (!this.state.checkedLogin) {
      // console.log("CRoter:", this.props);
      const isLogin = this.props.account.isLogin;
      if (!isLogin) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: this.props.location } }}
          />
        );
      }
      const { account, checkLogin, history } = this.props;
      let reg = new RegExp('"', "g");
      let session_id_to_check;
      if (!account) {
        session_id_to_check = account.session_id;
      }
      if (!session_id_to_check) {
        session_id_to_check = localStorage.getItem("session_id");
        if (!session_id_to_check || session_id_to_check.length === 0) {
          console.log("用户未登录!!!");
          notificationUtil.openNotificationWithIcon("warning", "您还未登录！");
          setTimeout(() => {
            history.push("/login");
          }, 1000);
          return;
        }
      }
      session_id_to_check = session_id_to_check.replace(reg, "");
      console.log("当前检查session_id:", session_id_to_check);
      checkLogin(session_id_to_check);
      if (!this.props.account.isLogin) return <Redirect to="/login" />;
      this.setState({
        checkedLogin: true
      });
    }
    const { title } = this.state;
    const { account, programStatus } = this.props;
    return (
      <DocumentTitle title={title}>
        <Layout>
          {!programStatus.isMobile && (
            <SiderCustom collapsed={this.state.collapsed} />
          )}
          {/* <ThemePicker /> */}
          <Layout style={{ flexDirection: "colomn" }}>
            <HeaderCustom
              toggle={this.toggle}
              collapsed={this.state.collapsed}
              user={account || {}}
            />
            <Content
              style={{ margin: "0 16px", overflow: "initial", flex: "1 1 0" }}
            >
              <Routes
                account={this.state.account}
                onRouterChange={this._setTitle}
              />
            </Content>
            <Footer style={{ textAlign: "center" }}>
              React-Admin ©{new Date().getFullYear()} Created by
              865470087@qq.com
            </Footer>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => {
  const { programStatus, account } = state;
  return {
    programStatus,
    account
  };
};
const mapDispatchToProps = dispatch => ({
  setMobile: bindActionCreators(setMobile, dispatch),
  checkLogin: bindActionCreators(checkLogin, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
