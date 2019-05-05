import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { doNewOrder, doUpdateOrder } from "@/action/order";
import * as notificationUtil from "@/action/common/openNotification";
import { Form, Input, Button, Card, DatePicker, Select, message } from "antd";
import EditableItemDetails from "./EditableItemDetails";
import moment from "moment";
import "moment/locale/zh-cn";
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
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { itemRecord, isUpdate } = location;
    let itemState = itemRecord ? JSON.parse(JSON.stringify(itemRecord)) : [];
    this.state = {
      itemRecord: itemState,
      isUpdate: isUpdate ? true : false
    };
  }

  handleSubmit = e => {
    const { doNewOrder, doUpdateOrder } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("get form data:", values);
      if (!err) {
        values.date = values.date.valueOf();
        let medicine_list = [];
        Object.keys(values).forEach(key => {
          //应该放进哪一个对象里
          let medicine_list_index = (key + "").match(/[0-9]+/g);
          if (medicine_list_index && medicine_list_index >= 0) {
            let medicine_list_key = (key + "").replace(/[0-9]+/g, "");
            let medicine_list_value = values[key];
            if (medicine_list_key === "expire_date") {
              medicine_list_value = values[key].valueOf();
            }
            if (!medicine_list[medicine_list_index]) {
              medicine_list[medicine_list_index] = {};
            }
            medicine_list[medicine_list_index][
              medicine_list_key
            ] = medicine_list_value;
            delete values[key];
          }
        });
        values.medicine_list = medicine_list;
        // console.log(values);
        //如果是更新数据，则请求更新病人的接口
        if (!this.state.isUpdate) {
          message.loading("正在处理数据，请稍候", 0);
          doNewOrder(
            localStorage.getItem("session_id").replace(/"/g, ""),
            values
          )
            .then(msg => {
              message.destroy();
              notificationUtil.openNotificationWithIcon(
                "success",
                "成功新增订单记录"
              );
              this.props.history.goBack();
            })
            .catch(e => {
              message.destroy();
              notificationUtil.openNotificationWithIcon(
                "error",
                "新增订单记录失败，请稍后重试"
              );
            });
        } else {
          message.loading("正在处理数据，请稍候", 0);
          doUpdateOrder(
            localStorage.getItem("session_id").replace(/"/g, ""),
            values
          )
            .then(msg => {
              message.destroy();
              notificationUtil.openNotificationWithIcon(
                "success",
                "成功更新订单记录"
              );
              this.props.history.goBack();
            })
            .catch(e => {
              message.destroy();
              notificationUtil.openNotificationWithIcon(
                "error",
                "更新订单记录失败，请稍后重试"
              );
            });
        }
      }
    });
  };

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
            {this.state.isUpdate ? (
              <Form.Item label="订单编号">
                {getFieldDecorator("id", {
                  initialValue: itemRecord ? itemRecord.id : null,
                  rules: [
                    {
                      required: true,
                      message: "请填写订单编号"
                    }
                  ]
                })(<Input readOnly="readonly" />)}
              </Form.Item>
            ) : null}
            <Form.Item label="订购账户">
              {getFieldDecorator("account_id", {
                initialValue: itemRecord.account_id
                  ? itemRecord.account_id
                  : this.props.account.account_id,
                rules: [
                  {
                    required: true,
                    message: "请填写订购账户"
                  }
                ]
              })(<Input readOnly="readOnly" />)}
            </Form.Item>
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
                initialValue: itemRecord.certification_status
                  ? itemRecord.certification_status + ""
                  : `true`,
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
                    required: false,
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
  ...state,
  account: state.account.user
});

const mapDispatchToProps = dispatch => ({
  doUpdateOrder: bindActionCreators(doUpdateOrder, dispatch),
  doNewOrder: bindActionCreators(doNewOrder, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(EditItemDetailPanel));
