import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Row, Col, Card, Button, Cascader } from "antd";
import { doUpdate } from "@/action/account";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import residences from "@/config/residences";
// import * as notificationUtil from "@/action/common/openNotification";
import { flushAccount } from "../../action/account";

/**
 * 处理病人个人信息
 */

class EditPatientPanel extends React.Component {
  initialState = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // const { account } = this.props;
        // let area_string = "";
        // if (values.area) {
        //   values.area.map((value, key) => {
        //     if (key === 0) {
        //       area_string = value;
        //     } else {
        //       area_string = area_string + "," + value;
        //     }
        //     return 0;
        //   });
        // }
        // values.account_id = account.user.account_id;
        // values.area = area_string;
        // console.log("修改用户数据: ", values);
        // const { updateUserInfo } = this.props;
        // let reg = new RegExp('"', "g");
        // let session_id_to_check = account.session_id.replace(reg, "");
        // updateUserInfo(values, session_id_to_check).then(
        //   msg => {
        //     notificationUtil.openNotificationWithIcon("success", msg);
        //     setTimeout(() => {
        //       const { flushAccount } = this.props;
        //       flushAccount();
        //     }, 1000);
        //   },
        //   error => {
        //     notificationUtil.openNotificationWithIcon("error", error);
        //   }
        // );
      }
    });
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
      <div className="edit_treatment_panel" style={{ paddingLeft: "5px" }}>
        <Card
          title="病人档案"
          style={{ width: "100%" }}
          bordered={false}
          hoverable
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            {/* 病人姓名 */}
            <Form.Item label="病人姓名">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "请填写病人姓名"
                  }
                ]
              })(<Input placeholder="张三" />)}
            </Form.Item>
            {/* 病人身份证号 */}
            <Form.Item label="病人身份证号">
              {getFieldDecorator("id_number", {
                rules: [
                  {
                    required: true,
                    message: "请填写病人身份证号!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            {/** 地区 */}
            <Form.Item label="地区">
              {getFieldDecorator("area", {
                rules: [
                  {
                    type: "array",
                    required: true,
                    message: "请选择地区!"
                  }
                ]
              })(<Cascader options={residences} placeholder="点击选择地区" />)}
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
            {/** 特殊病症 */}
            <Form.Item label="特殊病症">
              {getFieldDecorator("special_disease", {
                rules: [
                  {
                    required: false
                  }
                ]
              })(<Input placeholder="选填" />)}
            </Form.Item>
            {/* 备注 */}
            <Form.Item label="备注">
              {getFieldDecorator("extra_meta", {
                rules: [{ required: false }]
              })(<Input style={{ width: "100%" }} placeholder="选填" />)}
            </Form.Item>
            <Row type="flex">
              <Col offset={18} span={6}>
                <Form.Item /*{...tailFormItemLayout}*/>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Col>
              <Col offset={18} span={6}>
                或
                <Link to="/app/treatment/patientInfo/patientDocumentManage">
                  {" "}
                  返回
                </Link>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: bindActionCreators(doUpdate, dispatch),
  flushAccount: bindActionCreators(flushAccount, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(EditPatientPanel));
