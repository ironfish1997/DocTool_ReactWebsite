import React from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Card, Timeline, Icon } from "antd";
import style from "./index.module.less";

class EditAccountInfo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("修改用户数据: ", values);
        const { updateUserInfo } = this.props;
        //TODO:更新用户数据,没做完，先狗住
        updateUserInfo(account_info);
      }
    });
  };
  render() {
    const { account } = this.props;
    if (!account) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="edit_account_info_panel">
        <span>
          <h2>账号:</h2>
          <p>{this.props.account.account_id}</p>
        </span>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator("", {
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
            })(<Checkbox>记住我</Checkbox>)}
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
          </FormItem>
        </Form>
      </div>
    );
  }
}
