import React from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Row,
  Col,
  Card,
  Button
} from "antd";
import { doUpdate } from "@/action/account";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import residences from "@/config/residences";
import * as notificationUtil from "@/action/common/openNotification";
import { flushAccount } from "../../action/account";

/**
 * 修改账户信息组件
 */

class EditAccountInfo extends React.Component {
  initialState = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { account } = this.props;
        let area_string = "";
        if (values.area) {
          values.area.map((value, key) => {
            if (key === 0) {
              area_string = value;
            } else {
              area_string = area_string + "," + value;
            }
            return 0;
          });
        }
        values.account_id = account.user.account_id;
        values.area = area_string;
        console.log("修改用户数据: ", values);
        const { updateUserInfo } = this.props;
        let reg = new RegExp('"', "g");
        let session_id_to_check = account.session_id.replace(reg, "");
        updateUserInfo(values, session_id_to_check).then(
          msg => {
            notificationUtil.openNotificationWithIcon("success", msg);
            setTimeout(() => {
              const { flushAccount } = this.props;
              flushAccount();
            }, 1000);
          },
          error => {
            notificationUtil.openNotificationWithIcon("error", error);
          }
        );
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.initialState.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("account_password")) {
      callback("两次密码输入不一样，请检查后输入！");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.initialState.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const { account } = this.props;
    if (!account.user) {
      return <Redirect to="/login" />;
    }
    const { getFieldDecorator } = this.props.form;
    let returnArray = [];
    if (account.user && account.user.area) {
      account.user.area.split(",").map((value, key) => {
        returnArray.push(value);
        return 0;
      });
    }

    return (
      <div className="edit_account_info_panel" style={{ padding: "30px" }}>
        <Card
          title="修改信息"
          style={{ width: "100%" }}
          bordered={false}
          hoverable
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={24} type="flex">
              <Col span={12} style={{ display: "block" }}>
                {/* 密码 */}
                <Form.Item label="密码">
                  {getFieldDecorator("account_password", {
                    initialValue: account.user.account_password,
                    rules: [
                      {
                        required: true,
                        message: "请输入密码!"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(<Input type="password" />)}
                </Form.Item>
              </Col>
              <Col span={12} style={{ display: "block" }}>
                {/* 确认密码 */}
                <Form.Item label="确认密码">
                  {getFieldDecorator("account_password_confirm", {
                    rules: [
                      {
                        required: true,
                        message: "请输入确认密码!"
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
              </Col>
              {/** 用户名 */}
              <Col span={12} style={{ display: "block" }}>
                <Form.Item
                  label={
                    <span>
                      用户名&nbsp;
                      <Tooltip title="您想让我们怎么称呼您?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator("name", {
                    initialValue: account.user.name,
                    rules: [
                      {
                        required: true,
                        message: "请输入您的用户名!",
                        whitespace: true
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={12} style={{ display: "block" }}>
                {/* 地区 */}
                <Form.Item label="地区">
                  {getFieldDecorator("area", {
                    initialValue: returnArray,
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "请选择您的地区!"
                      }
                    ]
                  })(
                    <Cascader options={residences} placeholder="点击选择地区" />
                  )}
                </Form.Item>
              </Col>
              <Col span={12} style={{ display: "block" }}>
                {/* 电话号码 */}
                <Form.Item label="电话">
                  {getFieldDecorator("phone_number", {
                    initialValue: this.props.account.user
                      ? this.props.account.user.contacts
                        ? this.props.account.user.contacts.phone_number
                        : null
                      : null,
                    rules: [{ required: true, message: "请填写您的电话号码!" }]
                  })(
                    <Input
                      addonBefore={<span>+86</span>}
                      style={{ width: "100%" }}
                      placeholder="请输入您的电话号码"
                    />
                  )}
                </Form.Item>
              </Col>
              {/* 微信号 */}
              <Col span={12} style={{ display: "block" }}>
                <Form.Item label="微信">
                  {getFieldDecorator("wechat", {
                    initialValue: this.props.account.user
                      ? this.props.account.user.contacts
                        ? this.props.account.user.contacts.wechat
                        : null
                      : null,
                    rules: [{ required: false }]
                  })(<Input style={{ width: "100%" }} placeholder="选填" />)}
                </Form.Item>
              </Col>
              <Col span={12} style={{ display: "block" }}>
                {/* QQ号 */}
                <Form.Item label="QQ">
                  {getFieldDecorator("qq", {
                    initialValue: this.props.account.user
                      ? this.props.account.user.contacts
                        ? this.props.account.user.contacts.qq
                        : null
                      : null,
                    rules: [{ required: false }]
                  })(<Input style={{ width: "100%" }} placeholder="选填" />)}
                </Form.Item>
              </Col>
              <Col span={12} style={{ display: "block" }}>
                {/* 邮箱号 */}
                <Form.Item label="电子邮箱">
                  {getFieldDecorator("email", {
                    initialValue: this.props.account.user.contacts
                      ? this.props.account.user.contacts.email
                      : null,
                    rules: [{ required: false }]
                  })(<Input style={{ width: "100%" }} placeholder="选填" />)}
                </Form.Item>
              </Col>
              <Col offset={18} span={6}>
                <Form.Item /*{...tailFormItemLayout}*/>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Col>
              <Col offset={18} span={6}>
                或<Link to="/"> 返回主页</Link>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: bindActionCreators(doUpdate, dispatch),
  flushAccount: bindActionCreators(flushAccount, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(EditAccountInfo));
