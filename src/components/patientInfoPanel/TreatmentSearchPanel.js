import React, { Component } from "react";
import { Row, Col, Input, Button, Table, Divider, Modal } from "antd";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  getTreatmentsByPatientIdNumber,
  doDeleteTreatment
} from "@/action/treatment";
import { connect } from "react-redux";
import * as notificationUtil from "@/action/common/openNotification";
import {
  getTreatmentsWhichTimestampConvertToDatastr,
  filterSearchIdNumber
} from "@/selector/treatment";
import "./index.less";
const Search = Input.Search;

class TreatmentSearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      targetTreatment: {},
      searchIdNumber: null
    };
  }
  redirectToEditPanel = (record, isUpdate) => {
    const { history } = this.props;
    history.push({
      pathname: "/app/treatment/patientInfo/editTreatmentRecord",
      treatmentRecord: record,
      isUpdate: isUpdate
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
    this.props
      .deleteTreatment(
        localStorage.getItem("session_id"),
        this.state.targetTreatment.id
      )
      .then(msg => {
        notificationUtil.openNotificationWithIcon("success", msg);
      })
      .catch(error => {
        notificationUtil.openNotificationWithIcon("warning", error);
      });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  redirectToPanel = (record, isEdit) => {
    const { history } = this.props;
    let redirectDate = {};
    if (record) {
      this.state.items.map((v, k) => {
        if (v.id === record.id) {
          redirectDate = v;
        }
        return null;
      });
    }
    console.log(record);
    history.push({
      pathname: "/app/medicineItems/detail",
      itemRecord: redirectDate,
      isEdit: isEdit
    });
  };

  searchTreatment = value => {
    this.setState({
      searchIdNumber: value
    });
    // console.log(filterSearchIdNumber(this.props.treatmentRecords, value));
    if (
      filterSearchIdNumber(this.props.treatmentRecords, value) != null &&
      filterSearchIdNumber(this.props.treatmentRecords, value)[0] != null
    ) {
      notificationUtil.openNotificationWithIcon("success", "查询成功");
      return;
    }
    this.props
      .getTreatmentsByPatientIdNumber(localStorage.getItem("session_id"), value)
      .then(data => {
        notificationUtil.openNotificationWithIcon("success", "查询成功");
      })
      .catch(error => {
        notificationUtil.openNotificationWithIcon(
          "warning",
          "查询失败，请稍后再试"
        );
      });
  };

  render() {
    const columns = [
      {
        title: "就诊记录编号",
        dataIndex: "id",
        key: "id",
        width: 300,
        fixed: "left"
      },
      {
        title: "病症名称",
        dataIndex: "disease_name",
        key: "disease_name",
        width: 250
      },
      {
        title: "病人身份证号",
        dataIndex: "patient_id_number",
        key: "patient_id_number",
        width: 250
      },
      {
        title: "就诊开始时间",
        dataIndex: "start_time",
        key: "start_time",
        width: 150
      },
      {
        title: "就诊结束时间",
        dataIndex: "end_time",
        key: "end_time",
        width: 150
      },
      {
        title: "用药记录",
        dataIndex: "medicines_record",
        key: "medicines_record",
        width: 300
      },
      {
        title: "备注",
        dataIndex: "extra_meta",
        key: "extra_meta",
        width: 200
      },
      {
        title: "操作",
        key: "action",
        width: 150,
        render: (text, record) => {
          return (
            <span>
              <span onClick={() => this.redirectToEditPanel(record, true)}>
                编辑
              </span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  this.setState({
                    targetTreatment: record,
                    visible: true
                  });
                }}
              >
                删除
              </span>
            </span>
          );
        }
      }
    ];

    return (
      <div style={{ paddingLeft: "5px" }}>
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>你确定要删除{this.state.targetTreatment.name}吗</p>
        </Modal>
        <Row gutter={24} style={{ margin: "0px" }}>
          <Col span={7} style={{ padding: "0px" }}>
            <Search
              placeholder="输入病人身份证号搜索就诊记录"
              onSearch={value => this.searchTreatment(value)}
              enterButton
            />
          </Col>
          <Col span={7} offset={1} style={{ padding: "0px" }}>
            <Button key="3" type="primary">
              <Link to="/app/treatment/patientInfo/editTreatmentRecord">
                新增记录
              </Link>
            </Button>
          </Col>
        </Row>
        <Row gutter={24} style={{ margin: "0px", paddingTop: "5px" }}>
          <Table
            bordered
            columns={columns}
            dataSource={filterSearchIdNumber(
              this.props.treatmentRecords,
              this.state.searchIdNumber
            )}
            scroll={{ x: 1750, y: 300 }}
            rowKey="id"
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  treatmentRecords: getTreatmentsWhichTimestampConvertToDatastr(state)
});

const mapDispatchToProps = dispatch => ({
  getTreatmentsByPatientIdNumber: bindActionCreators(
    getTreatmentsByPatientIdNumber,
    dispatch
  ),
  deleteTreatment: bindActionCreators(doDeleteTreatment, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreatmentSearchPanel);
