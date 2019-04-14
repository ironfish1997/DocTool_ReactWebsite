import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Row, Col, Card, Button, DatePicker } from "antd";
import { doUpdate } from "@/action/account";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import * as notificationUtil from "@/action/common/openNotification";
import { flushAccount } from "../../action/account";
const { TextArea } = Input;

/**
 * 处理病人就诊记录信息
 */

class EditTreatmentPanel extends React.Component {
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
          title="就诊记录"
          style={{ width: "100%" }}
          bordered={false}
          hoverable
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            {/* <Row gutter={24}> */}
            {/* <Col span={12} style={{ display: "block" }}> */}
            {/* 病症名称 */}
            <Form.Item label="病症名称">
              {getFieldDecorator("disease_name", {
                rules: [
                  {
                    required: true,
                    message: "请填写病症名称"
                  }
                ]
              })(<Input placeholder="比如感冒、发烧" />)}
            </Form.Item>
            {/* </Col> */}
            {/* <Col span={12} style={{ display: "block" }}> */}
            {/* 病人身份证号 */}
            <Form.Item label="病人身份证号">
              {getFieldDecorator("patient_id_number", {
                rules: [
                  {
                    required: true,
                    message: "请填写病人身份证号!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            {/* </Col> */}
            {/** 就诊开始日期 */}
            {/* <Col span={12} style={{ display: "block" }}> */}
            <Form.Item label="就诊开始日期">
              {getFieldDecorator("start_time", {
                rules: [
                  {
                    required: true,
                    message: "请填写就诊开始日期!"
                  }
                ]
              })(<DatePicker placeholder="请选择就诊开始时间" />)}
            </Form.Item>
            {/* </Col> */}
            {/** 就诊结束日期 */}
            {/* <Col span={12} style={{ display: "block" }}> */}
            <Form.Item label="就诊结束日期">
              {getFieldDecorator("end_time", {
                rules: [
                  {
                    required: true,
                    message: "请填写就诊结束日期!"
                  }
                ]
              })(<DatePicker placeholder="请选择就诊结束时间" />)}
            </Form.Item>
            {/* </Col> */}
            {/* 备注 */}
            {/* <Col span={12} style={{ display: "block" }}> */}
            <Form.Item label="备注">
              {getFieldDecorator("extra_meta", {
                rules: [{ required: false }]
              })(<Input style={{ width: "100%" }} placeholder="选填" />)}
            </Form.Item>
            {/* </Col> */}
            {/* </Row> */}
            {/* 用药记录 */}
            <Form.Item label="用药记录" style={{ marginLeft: "0px" }}>
              {getFieldDecorator("medicines_record", {
                rules: [{ required: true, message: "请填写用药记录!" }]
              })(
                <TextArea
                  style={{ resize: "none" }}
                  rows="10"
                  cols="50"
                  placeholder="请填写用药记录，比如用了什么药，剂量等"
                />
              )}
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
                <Link to="/app/treatment/patientInfo/treatmentInfoManage">
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
)(Form.create()(EditTreatmentPanel));
