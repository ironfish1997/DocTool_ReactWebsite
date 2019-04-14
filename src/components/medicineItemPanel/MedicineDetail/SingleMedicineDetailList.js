import React, { Component } from "react";
import { List } from "antd";

/**
 * 展示订单内药物详情
 */
class SingleMedicineDetailList extends Component {
  render() {
    const { medicineInfo } = this.props;
    return (
      <List bordered style={{ marginTop: "5px" ,width:"600px" }}>
        <List.Item>
          <span>药物名称:{" "}</span> {medicineInfo.medicine_name}
          {}
        </List.Item>
        <List.Item>
          <span>生产厂家名称:{" "} </span> {medicineInfo.produce_company}
        </List.Item>
        <List.Item>
          <span>批注文号:{" "} </span> {medicineInfo.approval_number}
        </List.Item>
        <List.Item>
          <span>药物规格:{" "} </span> {medicineInfo.size}
        </List.Item>
        <List.Item>
          <span>剂型: {" "}</span> {medicineInfo.formulation}
        </List.Item>
        <List.Item>
          <span>批号:{" "} </span> {medicineInfo.batch_number}
        </List.Item>
        <List.Item>
          <span>单价: {" "}</span> {medicineInfo.unit_price}
        </List.Item>
        <List.Item>
          <span>单位: {" "}</span> {medicineInfo.unit}
        </List.Item>
        <List.Item>
          <span>数量:{" "} </span> {medicineInfo.count}
        </List.Item>
        <List.Item>
          <span>有效期: {" "}</span> {medicineInfo.expire_date}
        </List.Item>
      </List>
    );
  }
}

export default SingleMedicineDetailList;
