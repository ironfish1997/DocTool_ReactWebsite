import React, { Component } from "react";
import * as notificationUtil from "@/action/common/openNotification";
import { checkLogin } from "@/action/account";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export const withLoginAuth = WrappedComponent => {
  const wrapperClass = class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
        collapsed: true,
        checked: this.props.checked
      };
    }

    componentDidMount() {
      if (!this.state.checked) {
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
            notificationUtil.openNotificationWithIcon(
              "warning",
              "您还未登录！"
            );
            history.push("/login");
            return;
          }
        }
        session_id_to_check = session_id_to_check.replace(reg, "");
        console.log("当前检查session_id:", session_id_to_check);
        this.setState({
          checked: true
        });
        checkLogin(session_id_to_check).then(
          data => {
            console.log("检查成功");
            return;
          },
          error => {
            console.log(error);
            notificationUtil.openNotificationWithIcon(
              "warning",
              "您还未登录！"
            );
            history.push("/login");
            return;
          }
        );
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  const mapStateToProps = state => ({
    checked: state.checked,
    account: state.account
  });

  const mapDispatchToProps = dispatch => ({
    checkLogin: bindActionCreators(checkLogin, dispatch)
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(wrapperClass);
};
