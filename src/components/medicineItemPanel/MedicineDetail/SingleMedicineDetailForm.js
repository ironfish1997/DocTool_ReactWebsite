import React, { Component } from "react";
import { Form, Input, DatePicker, Button } from "antd";
import moment from "moment";

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
    return (
      <div>
        <Button onClick={()=>{this.props.deleteMedicineDetail(this.props.recordKey)}}>
          删除本项纪录
        </Button>
        <Form.Item label="药物名称">
          {getFieldDecorator(`medicine_name_${this.props.recordKey}`, {
            initialValue: medicineDetail.medicine_name,
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
          {getFieldDecorator(`produce_company_${this.props.recordKey}`, {
            initialValue: medicineDetail.produce_company,
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
          {getFieldDecorator(`approval_number_${this.props.recordKey}`, {
            initialValue: medicineDetail.approval_number,
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
          {getFieldDecorator(`size_${this.props.recordKey}`, {
            initialValue: medicineDetail.size,
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
          {getFieldDecorator(`formulation_${this.props.recordKey}`, {
            initialValue: medicineDetail.formulation,
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
          {getFieldDecorator(`batch_number_${this.props.recordKey}`, {
            initialValue: medicineDetail.batch_number,
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
          {getFieldDecorator(`unit_price_${this.props.recordKey}`, {
            initialValue: medicineDetail.unit_price,
            rules: [
              {
                required: true,
                message: "单价不能为空!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="单位">
          {getFieldDecorator(`unit_${this.props.recordKey}`, {
            initialValue: medicineDetail.unit,
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
          {getFieldDecorator(`count_${this.props.recordKey}`, {
            initialValue: medicineDetail.count,
            rules: [
              {
                required: true,
                message: "数量不能为空!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="过期日期">
          {getFieldDecorator(`expire_date_${this.props.recordKey}`, {
            initialValue: moment(medicineDetail.expire_date),
            rules: [
              {
                required: true,
                message: "过期日期不能为空!"
              }
            ]
          })(<DatePicker showTime format="YYYY-MM-DD" />)}
        </Form.Item>
      </div>
    );
  }
}

export default MedicineDetailForm;
