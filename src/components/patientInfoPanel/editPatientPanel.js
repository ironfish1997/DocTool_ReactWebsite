import React from "react";
import { Form, Input, Row, Col, Card, Button, Cascader, message } from "antd";
import { doAddPatient, doUpdatePatient } from "@/action/patient";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import residences from "@/config/residences";
import * as notificationUtil from "@/action/common/openNotification";

/**
 * 处理病人个人信息
 */

class EditPatientPanel extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { patient, isUpdate } = location;
    let patientState = patient
      ? JSON.parse(JSON.stringify(patient))
      : { contacts: {} };
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      patient: patientState,
      isUpdate: isUpdate ? true : false
    };
  }

  handleSubmit = e => {
    const { doAddPatient, doUpdatePatient } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let areaString = "";
        values.area.map((v, k) => {
          areaString = areaString + "," + v;
          return null;
        });
        values.area = areaString.substring(1);
        //特殊病症可能是数组也可能是字符串，故如果是字符串需要转换成数组
        if (values.special_disease&&!Array.isArray(values.special_disease)) {
          values.special_disease = values.special_disease.split(/,|，/);
        }
        //如果是更新数据，则请求更新病人的接口
        if (this.state.isUpdate) {
          message.loading("正在处理数据，请稍候", 0);
          doUpdatePatient(localStorage.getItem("session_id"), values)
            .then(msg => {
              message.destroy();
              notificationUtil.openNotificationWithIcon("success", msg);
              this.props.history.goBack();
            })
            .catch(e => {
              message.destroy();
              notificationUtil.openNotificationWithIcon("error", e);
            });
        } else {
          message.loading("正在处理数据，请稍候", 0);
          doAddPatient(localStorage.getItem("session_id"), values)
            .then(msg => {
              message.destroy();
              notificationUtil.openNotificationWithIcon("success", msg);
              this.props.history.goBack();
            })
            .catch(e => {
              message.destroy();
              notificationUtil.openNotificationWithIcon("error", e);
            });
        }
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
    const { patient } = this.state;
    const { getFieldDecorator } = this.props.form;
    let returnArray = [];
    if (patient && patient.area) {
      patient.area.split(",").map((value, key) => {
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
            {/* 病人编号 */}
            {this.state.isUpdate ? (
              <Form.Item label="病人编号">
                {getFieldDecorator("id", {
                  initialValue: patient.id,
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(<Input readOnly />)}
              </Form.Item>
            ) : null}
            {/* 病人姓名 */}
            <Form.Item label="病人姓名">
              {getFieldDecorator("name", {
                initialValue: patient.name,
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
                initialValue: patient.id_number,
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
                initialValue: returnArray,
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
              {getFieldDecorator("contacts.phone_number", {
                initialValue: patient.contacts.phone_number,
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
              {getFieldDecorator("contacts.wechat", {
                initialValue: patient.contacts.wechat,
                rules: [{ required: false }]
              })(<Input style={{ width: "100%" }} placeholder="选填" />)}
            </Form.Item>
            {/* QQ号 */}
            <Form.Item label="QQ">
              {getFieldDecorator("contacts.qq", {
                initialValue: patient.contacts.qq,
                rules: [{ required: false }]
              })(<Input style={{ width: "100%" }} placeholder="选填" />)}
            </Form.Item>
            {/* 邮箱号 */}
            <Form.Item label="电子邮箱">
              {getFieldDecorator("contacts.email", {
                initialValue: patient.contacts.email,
                rules: [{ required: false }]
              })(<Input style={{ width: "100%" }} placeholder="选填" />)}
            </Form.Item>
            {/** 特殊病症 */}
            <Form.Item label="特殊病症">
              {getFieldDecorator("special_disease", {
                initialValue: patient.special_disease,
                rules: [
                  {
                    required: false
                  }
                ]
              })(<Input placeholder="多个病症请以逗号分隔开" />)}
            </Form.Item>
            {/* 备注 */}
            <Form.Item label="备注">
              {getFieldDecorator("extra_meta", {
                initialValue: patient.extra_meta,
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
  doAddPatient: bindActionCreators(doAddPatient, dispatch),
  doUpdatePatient: bindActionCreators(doUpdatePatient, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(EditPatientPanel));
