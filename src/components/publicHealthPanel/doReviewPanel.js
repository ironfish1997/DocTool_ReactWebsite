import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  Input,
  Row,
  Col,
  Card,
  Button,
  DatePicker,
  Select,
  message
} from "antd";
import { connect } from "react-redux";
import { doSaveReviewRow } from "@/action/publicService";
import * as notificationUtil from "@/action/common/openNotification";
const { Option } = Select;
const { TextArea } = Input;

/**
 * 处理病人就诊记录信息
 */

class DoReviewPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      reviewDiseases: ["高血压", "糖尿病"],
      patientInfo:
        this.props.location.patientInfo !== null
          ? this.props.location.patientInfo
          : {}
    };
  }

  /**
   * 处理提交表单逻辑
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.review_time = values.review_time.valueOf();
        let session_id = localStorage.getItem("session_id");
        message.loading("正在处理数据，请稍候", 0);
        doSaveReviewRow(session_id, values)
          .then(data => {
            message.destroy();
            notificationUtil.openNotificationWithIcon("success", "保存成功");
            let { history } = this.props;
            history.goBack();
          })
          .catch(error => {
            message.destroy();
            notificationUtil.openNotificationWithIcon("error", "保存失败");
          });
      }
    });
  };

  render() {
    //构建病症选项
    let options = [];
    this.state.reviewDiseases.map((v, k) => {
      options.push(<Option key={v}>{v}</Option>);
      return null;
    });
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
    return (
      <div className="do_review_panel" style={{ paddingLeft: "5px" }}>
        <Card
          title="复查记录"
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
                    message: "请选择病症名称"
                  }
                ]
              })(
                <Select
                  style={{ width: "32%" }}
                  onChange={this.handleCurrencyChange}
                >
                  {options}
                </Select>
              )}
            </Form.Item>
            {/* </Col> */}
            {/* <Col span={12} style={{ display: "block" }}> */}
            {/* 病人身份证号 */}
            <Form.Item label="病人身份证号">
              {getFieldDecorator("patient_id_number", {
                initialValue: this.state.patientInfo
                  ? this.state.patientInfo.id_number
                  : "",
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
            <Form.Item label="复查日期">
              {getFieldDecorator("review_time", {
                rules: [
                  {
                    required: true
                  }
                ]
              })(<DatePicker placeholder="请选择复查时间" />)}
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
            <Row>
              <Col offset={18} span={6}>
                <Form.Item /*{...tailFormItemLayout}*/>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Col>
              <Col offset={18} span={6}>
                或
                <span
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  {" "}
                  返回
                </span>
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

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(DoReviewPanel));
