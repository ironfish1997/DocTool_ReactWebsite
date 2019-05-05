import React, { Component } from "react";
import { Button } from "antd";
import MedicineDetailForm from "./MedicineDetail/SingleMedicineDetailForm";
// const Panel = Collapse.Panel;
/**
 *
 */
class EditableItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicineItemDetails: props.medicineItemDetails
        ? props.medicineItemDetails
        : []
    };
  }

  /**
   * 通过index删除掉药物订单详情
   */
  deleteMedicineDetail = recordKey => {
    this.state.medicineItemDetails.splice(recordKey, 1);
    this.setState({
      ...this.state,
      medicineItemDetails: this.state.medicineItemDetails
    });
  };
  render() {
    return (
      <div>
        <Button
          onClick={() => {
            let medicineItemDetailsCopy = this.state.medicineItemDetails;
            medicineItemDetailsCopy.push({});
            this.setState({
              ...this.state,
              medicineItemDetails: medicineItemDetailsCopy
            });
          }}
        >
          新增
        </Button>
        {/* <Panel header={v.medicine_name} key={k}> */}
        <MedicineDetailForm
          medicineDetail={this.state.medicineItemDetails}
          recordKey="id"
          {...this.props}
          deleteMedicineDetail={this.deleteMedicineDetail.bind(this)}
        />
        {/* </Panel> */}
      </div>
    );
  }
}

export default EditableItemDetails;
