import { Card } from "antd";
import EditItemDetailPanel from "./EditItemDetailPanel";
import ShowItemDetailPanel from "./ShowItemDetailPanel";
import React, { Component } from "react";

/**
 * {
    id:"",//药物信息编号（订单号+药物编号）
    medicine_name:"",//药物名称
    produce_company:"",//生产厂家名称
    approval_number:"",//批注文号
    size:"",//药物规格
    formulation:"",//剂型
    batch_number:"",//批号
    unit_price:"",//单价
    unit:"",//单位
    count:number,//数量
    expire_date:"yyyy-MM-dd"//有效期
}

 */
/**
 * 展示订单详情，如果需要编辑则渲染编辑视图，如果需要展示则渲染展示视图
 */
class MedicineDetailPanel extends Component {
  render() {
    let sub = [];
    //如果是编辑订单,则渲染编辑视图
    if (this.props.location.isEdit) {
      sub.push(
        <EditItemDetailPanel {...this.props} key={`editItemDetailPanel`} />
      );
    } else {
      sub.push(
        <ShowItemDetailPanel {...this.props} key={`shotItemDetailPanel`} />
      );
    }
    return (
      <div>
        <Card title="药物详情" style={{ marginLeft: "5px" }}>
          {sub}
        </Card>
      </div>
    );
  }
}

export default MedicineDetailPanel;
