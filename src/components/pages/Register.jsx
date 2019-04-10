import React from "React";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { bindActionCreators } from "redux";
import { doRegister } from "../../action/account";
import * as notificateUtil from "@/action/common/openNotification";
import { PwaInstaller } from "../widget";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Checkbox,
  Button,
  Card
} from "antd";
import residences from "@/config/residences";

class RegistrationForm extends React.Component {
  initialState = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //提交表单
        console.log("Register Received values of form: ", values);
        const { doRegister, history } = this.props;
        let area_string = "";
        if(values.area){
          values.area.map((value,key)=>{
            if(key===0){
              area_string = value;
            }else{
              area_string = area_string + "," + value;
            }
            return 0;
          })
        }
        values.area = area_string;
        doRegister(values)
          .then(msg => {
            notificateUtil.openNotificationWithIcon("success", msg);
            history.push("/");
          })
          .catch(e => {
            notificateUtil.openNotificationWithIcon("error", e);
          });
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
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="register">
        <PwaInstaller />
        <div className="register-form">
          <div className="background">
            <Card title="个人注册">
              <Form /*{...formItemLayout}*/ onSubmit={this.handleSubmit}>
                {/* 账号 */}
                <Form.Item label="身份证号（账号）">
                  {getFieldDecorator("account_id", {
                    rules: [
                      {
                        type: "string",
                        required: true,
                        message: "账号不能为空!"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                {/* 密码 */}
                <Form.Item label="密码">
                  {getFieldDecorator("account_password", {
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
                {/** 用户名 */}
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
                    rules: [
                      {
                        required: true,
                        message: "请输入您的用户名!",
                        whitespace: true
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                {/* 地区 */}
                <Form.Item label="地区">
                  {getFieldDecorator("area", {
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
                {/* 电话号码 */}
                <Form.Item label="电话">
                  {getFieldDecorator("phone_number", {
                    rules: [{ required: true, message: "请填写您的电话号码!" }]
                  })(
                    <Input
                      addonBefore={<span>+86</span>}
                      style={{ width: "100%" }}
                      placeholder="请输入您的电话号码"
                    />
                  )}
                </Form.Item>
                {/* 微信号 */}
                <Form.Item label="微信">
                  {getFieldDecorator("wechat", {
                    rules: [{ required: false }]
                  })(<Input style={{ width: "100%" }} placeholder="选填" />)}
                </Form.Item>
                {/* QQ号 */}
                <Form.Item label="QQ">
                  {getFieldDecorator("qq", {
                    rules: [{ required: false }]
                  })(<Input style={{ width: "100%" }} placeholder="选填" />)}
                </Form.Item>
                {/* 邮箱号 */}
                <Form.Item label="电子邮箱">
                  {getFieldDecorator("email", {
                    rules: [{ required: false }]
                  })(<Input style={{ width: "100%" }} placeholder="选填" />)}
                </Form.Item>
                <Form.Item /*{...tailFormItemLayout}*/>
                  {getFieldDecorator("agreement", {
                    valuePropName: "checked",
                    rules: [
                      {
                        required: true,
                        message: "您必须同意本系统的使用协议!"
                      }
                    ]
                  })(
                    <Checkbox>
                      我已经阅读并同意{" "}
                      <a href="/agreement" target="view_window">
                        系统协议
                      </a>
                    </Checkbox>
                  )}
                </Form.Item>
                <Form.Item /*{...tailFormItemLayout}*/>
                  <Button type="primary" htmlType="submit">
                    注册
                  </Button>
                </Form.Item>
              </Form>
              {/** 跳回登录页面 */}
              或<Link to="/login"> 返回登录页面</Link>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToPorps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  doRegister: bindActionCreators(doRegister, dispatch)
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(Form.create()(RegistrationForm));
