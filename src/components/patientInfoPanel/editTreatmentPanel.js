import React from "react";
import { Form, Input, Row, Col, Card, Button, DatePicker, message } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as notificationUtil from "@/action/common/openNotification";
import moment from "moment";
import {
  doUpdateTreatmentRecord,
  doAddTreatmentRecord
} from "@/action/treatment";
const { TextArea } = Input;

/**
 * 处理病人就诊记录信息
 */

class EditTreatmentPanel extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { treatmentRecord, isUpdate } = location;
    let treatmentRecordState = treatmentRecord
      ? JSON.parse(JSON.stringify(treatmentRecord))
      : {};
    this.state = {
      confirmDirty: false,
      autoCompleteResult: true,
      treatmentRecord: treatmentRecordState ? treatmentRecordState : [],
      isUpdate: isUpdate ? true : false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //如果是更新数据，则请求更新病人的接口
        values.start_time = values.start_time.valueOf();
        values.end_time = values.end_time.valueOf();
        if (this.state.isUpdate) {
          message.loading("正在处理数据，请稍候", 0);
          this.props
            .doUpdateTreatmentRecord(localStorage.getItem("session_id"), values)
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
          this.props
            .doAddTreatmentRecord(localStorage.getItem("session_id"), values)
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="edit_treatment_panel" style={{ paddingLeft: "5px" }}>
        <Card
          title="就诊记录"
          style={{ width: "100%" }}
          bordered={false}
          hoverable
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            {this.state.isUpdate ? (
              <Form.Item label="记录编号">
                {getFieldDecorator("id", {
                  initialValue: this.state.treatmentRecord.id,
                  rules: [
                    {
                      required: true,
                      message: "请填写病症名称"
                    }
                  ]
                })(<Input placeholder="比如感冒、发烧" readOnly="readonly" />)}
              </Form.Item>
            ) : null}
            {/* 病症名称 */}
            <Form.Item label="病症名称">
              {getFieldDecorator("disease_name", {
                initialValue: this.state.treatmentRecord.disease_name,
                rules: [
                  {
                    required: true,
                    message: "请填写病症名称"
                  }
                ]
              })(<Input placeholder="比如感冒、发烧" />)}
            </Form.Item>
            {/* 病人身份证号 */}
            <Form.Item label="病人身份证号">
              {getFieldDecorator("patient_id_number", {
                initialValue: this.state.treatmentRecord.patient_id_number,
                rules: [
                  {
                    required: true,
                    message: "请填写病人身份证号!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            {/** 就诊开始日期 */}
            <Form.Item label="就诊开始日期">
              {getFieldDecorator("start_time", {
                initialValue: this.state.treatmentRecord.start_time
                  ? moment(this.state.treatmentRecord.start_time, "YYYY-MM-DD")
                  : null,
                rules: [
                  {
                    required: true,
                    message: "请填写就诊开始日期!"
                  }
                ]
              })(<DatePicker placeholder="请选择就诊开始时间" />)}
            </Form.Item>
            {/** 就诊结束日期 */}
            <Form.Item label="就诊结束日期">
              {getFieldDecorator("end_time", {
                initialValue: this.state.treatmentRecord.end_time
                  ? moment(this.state.treatmentRecord.end_time, "YYYY-MM-DD")
                  : null,
                rules: [
                  {
                    required: true,
                    message: "请填写就诊结束日期!"
                  }
                ]
              })(<DatePicker placeholder="请选择就诊结束时间" />)}
            </Form.Item>
            {/* 备注 */}
            <Form.Item label="备注">
              {getFieldDecorator("extra_meta", {
                initialValue: this.state.treatmentRecord.extra_meta,
                rules: [{ required: false }]
              })(<Input style={{ width: "100%" }} placeholder="选填" />)}
            </Form.Item>
            {/* 用药记录 */}
            <Form.Item label="用药记录" style={{ marginLeft: "0px" }}>
              {getFieldDecorator("medicines_record", {
                initialValue: this.state.treatmentRecord.medicines_record,
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
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  doUpdateTreatmentRecord: bindActionCreators(
    doUpdateTreatmentRecord,
    dispatch
  ),
  doAddTreatmentRecord: bindActionCreators(doAddTreatmentRecord, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(EditTreatmentPanel));
