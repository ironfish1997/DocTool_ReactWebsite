import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { doRegister } from "../../action/account";
// import * as notificateUtil from "@/action/common/openNotification";
import { Form, Input, Button, Card, DatePicker, Select } from "antd";
import EditableItemDetails from "./EditableItemDetails";
import moment from "moment";
const Option = Select.Option;

/**
 * {
    id:ObjectId,//订单号
    date:date,//订单日期
    certification_status:boolean,//证照情况
    supply_unit:"",//供货单位
    salesman_name:"",//销售员姓名
    salesman_phone:number,//销售员电话
    medicine_list:[
        ...medicine_record_entity
    ],//订单内药物信息
    extra_meta:{}//其他信息，备用
    }
 */

class EditItemDetailPanel extends Component {
  state = {
    itemRecord: {}
  };
  componentWillMount() {
    const { location } = this.props;
    this.setState({ itemRecord: location.itemRecord });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const { getFieldDecorator } = this.props.form;
    const { itemRecord } = this.state;
    return (
      <div style={{ marginLeft: 5 }}>
        <Card title="订单详情">
          <Form
            /*{...formItemLayout}*/ onSubmit={this.handleSubmit}
            {...formItemLayout}
          >
            {/* 订单日期 */}
            <Form.Item label="订单日期">
              {getFieldDecorator("date", {
                initialValue: itemRecord ? moment(itemRecord.date) : null,
                rules: [
                  {
                    required: true,
                    message: "订单日期不能为空!"
                  }
                ]
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </Form.Item>
            {/* 密码 */}
            <Form.Item label="证照情况">
              {getFieldDecorator("certification_status", {
                initialValue: itemRecord
                  ? itemRecord.certification_status + ""
                  : "",
                rules: [
                  {
                    required: true,
                    message: "请选择证照情况!"
                  }
                ]
              })(
                <Select style={{ width: 200 }} optionFilterProp="children">
                  <Option value={`true`}>有证</Option>
                  <Option value={`false`}>无证</Option>
                </Select>
              )}
            </Form.Item>
            {/* 供货单位 */}
            <Form.Item label="供货单位">
              {getFieldDecorator("supply_unit", {
                initialValue: itemRecord ? itemRecord.supply_unit : "",
                rules: [
                  {
                    required: true,
                    message: "请输入供货单位!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            {/** 销售员姓名 */}
            <Form.Item label="销售员姓名">
              {getFieldDecorator("salesman_name", {
                initialValue: itemRecord ? itemRecord.salesman_name : "",
                rules: [
                  {
                    required: true,
                    message: "请输入销售员姓名!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            {/* 销售员电话 */}
            <Form.Item label="销售员电话">
              {getFieldDecorator("salesman_phone", {
                initialValue: itemRecord ? itemRecord.salesman_phone : "",
                rules: [
                  {
                    type: "number",
                    required: true,
                    message: "请输入销售员电话!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="订单项">
              {getFieldDecorator("medicine_list", {
                initialValue: itemRecord ? itemRecord.medicine_list : "",
                rules: [
                  {
                    required: true,
                    message: "请输入至少一项药物详情!"
                  }
                ]
              })(
                <EditableItemDetails
                  {...this.props}
                  medicineItemDetails={
                    itemRecord ? itemRecord.medicine_list : null
                  }
                />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              {/** 跳回登录页面 */} 或
              <Link to="/app/medicineItems/itemQuery">返回查询页面</Link>
            </Form.Item>
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
  doRegister: bindActionCreators(doRegister, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(EditItemDetailPanel));
