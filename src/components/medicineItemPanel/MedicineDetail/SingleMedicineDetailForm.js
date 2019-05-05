import React, { Component } from "react";
import { Form, Input, DatePicker, Button, Collapse, InputNumber } from "antd";
import moment from "moment";
const Panel = Collapse.Panel;

class MedicineDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { medicineDetail } = this.state;
    const subMedItem = medicineDetail.map((v, k) => {
      return (
        <Panel header={v.medicine_name} key={k}>
          <Button
            onClick={() => {
              this.props.deleteMedicineDetail(this.props.recordKey);
            }}
          >
            删除本项纪录
          </Button>
          <Form.Item label="药物名称">
            {getFieldDecorator(`${k}medicine_name`, {
              initialValue: v.medicine_name,
              rules: [
                {
                  type: "string",
                  required: true,
                  message: "药物名称不能为空!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="生产厂家名称">
            {getFieldDecorator(`${k}produce_company`, {
              initialValue: v.produce_company,
              rules: [
                {
                  type: "string",
                  required: true,
                  message: "生产厂家不能为空!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="批准文号">
            {getFieldDecorator(`${k}approval_number`, {
              initialValue: v.approval_number,
              rules: [
                {
                  type: "string",
                  required: true,
                  message: "批准文号不能为空!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="药物规格">
            {getFieldDecorator(`${k}size`, {
              initialValue: v.size,
              rules: [
                {
                  type: "string",
                  required: true,
                  message: "药物规格不能为空!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="剂型">
            {getFieldDecorator(`${k}formulation`, {
              initialValue: v.formulation,
              rules: [
                {
                  type: "string",
                  required: true,
                  message: "剂型不能为空!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="批号">
            {getFieldDecorator(`${k}batch_number`, {
              initialValue: v.batch_number,
              rules: [
                {
                  type: "string",
                  required: true,
                  message: "批号不能为空!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="单价">
            {getFieldDecorator(`${k}unit_price`, {
              initialValue: v.unit_price,
              rules: [
                {
                  required: true,
                  message: "单价不能为空!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="单位">
            {getFieldDecorator(`${k}unit`, {
              initialValue: v.unit,
              rules: [
                {
                  type: "string",
                  required: true,
                  message: "单位不能为空!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="数量">
            {getFieldDecorator(`${k}count`, {
              initialValue: v.count,
              rules: [
                {
                  required: true,
                  message: "数量不能为空!"
                }
              ]
            })(<InputNumber min={0} />)}
          </Form.Item>
          <Form.Item label="过期日期">
            {getFieldDecorator(`${k}expire_date`, {
              initialValue: moment(v.expire_date),
              rules: [
                {
                  required: true,
                  message: "过期日期不能为空!"
                }
              ]
            })(<DatePicker showTime format="YYYY-MM-DD" />)}
          </Form.Item>
        </Panel>
      );
    });
    return <Collapse defaultActiveKey={["1"]}>{subMedItem}</Collapse>;
  }
}

export default MedicineDetailForm;
