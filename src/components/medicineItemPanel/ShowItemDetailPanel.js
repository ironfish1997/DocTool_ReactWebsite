import React, { Component } from "react";
import SingleMedicineDetailList from "./MedicineDetail/SingleMedicineDetailList";
import { List, Button, Divider } from "antd";

class ShowItemDetailPanel extends Component {
  /**
   * 返回订单搜索页面
   */
  returnToQueryPanel() {
    const { history } = this.props;
    history.push({
      pathname: "/app/medicineItems/itemQuery"
    });
  }
  /**
   * 重定向到编辑页面（isEdit需要设置成true）
   */
  redirectToEditPanel = (record, isEdit) => {
    const { history } = this.props;
    history.push({
      pathname: "/app/medicineItems/detail",
      itemRecord: record,
      isEdit: isEdit,
      isUpdate: true
    });
  };
  render() {
    const { itemRecord } = this.props.location;
    if (!itemRecord) {
      return <div>暂无数据</div>;
    }
    const { medicine_list } = itemRecord;
    let subListItems = [];
    medicine_list.map((v, k) => {
      subListItems.push(<SingleMedicineDetailList medicineInfo={v} key={k} />);
      return null;
    });

    return (
      <div>
        <div>
          <Button onClick={() => this.redirectToEditPanel(itemRecord, true)}>
            编辑
          </Button>
          <Button onClick={() => this.returnToQueryPanel()}>返回</Button>
        </div>
        <Divider />
        <List>
          <List.Item>
            <span>订单号: </span>
            {itemRecord.id}
          </List.Item>
          <List.Item>
            <span>订单日期: </span>
            {new Date(itemRecord.date).toLocaleString()}
          </List.Item>
          <List.Item>
            <span>证照情况: </span>
            {itemRecord.certification_status ? "有证" : "无证"}
          </List.Item>
          <List.Item>
            <span>供货单位: </span>
            {itemRecord.supply_unit}
          </List.Item>
          <List.Item>
            <span>销售员姓名: </span>
            {itemRecord.salesman_name}
          </List.Item>
          <List.Item>
            <span>销售员电话: </span>
            {itemRecord.salesman_phone}
          </List.Item>
          <List.Item>
            <span>药物详情: </span>
            <div>{subListItems}</div>
          </List.Item>
          <List.Item>
            <span>其他信息: </span>
            <div>{subListItems.extra_meta}</div>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default ShowItemDetailPanel;
