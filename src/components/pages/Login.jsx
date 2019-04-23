/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { doLogin, checkLogin } from "@/action/account";
import { PwaInstaller } from "../widget";
import { Redirect, Link } from "react-router-dom";
import * as notificationUtil from "@/action/common/openNotification";

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const { doLogin } = this.props;
        doLogin(values.userName, values.password, values.remember)
          .then(msg => {
            notificationUtil.openNotificationWithIcon("success", msg);
          })
          .catch(e => {
            notificationUtil.openNotificationWithIcon("error", e);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      location: { state }
    } = this.props;
    if (localStorage.getItem("session_id")) {
      if (state && state.from) {
        return <Redirect to={state.from} />;
      }
      return <Redirect to="/" />;
    }
    return (
      <div className="login">
        <div className="login-form">
          <div className="login-logo">
            <span>多途医疗系统</span>
            <PwaInstaller />
          </div>
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: "300px" }}>
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "请输入用户名!" }]
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码!" }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>记住我(10天内免登陆)</Checkbox>)}
              <span
                className="login-form-forgot"
                href=""
                style={{ float: "right" }}
              >
                忘记密码
              </span>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                登录
              </Button>
              或 <Link to="/register">现在注册!</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToPorps = state => {
  let session_id = null;
  try {
    session_id = state.account.session_id;
  } catch (e) {
    session_id = null;
  }
  return {
    ...state,
    session_id
  };
};

const mapDispatchToProps = dispatch => ({
  doLogin: bindActionCreators(doLogin, dispatch),
  checkLogin: bindActionCreators(checkLogin, dispatch)
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(Form.create()(Login));
