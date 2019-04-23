import React, { Component } from "react";
import {
  Row,
  Col,
  Input,
  PageHeader,
  Button,
  Table,
  Divider,
  Modal
} from "antd";
import { Link } from "react-router-dom";
import "./index.less";
import { bindActionCreators } from "redux";
import { findAllPatients, deleteOnePatients } from "@/action/patient";
import { connect } from "react-redux";
import * as notificationUtil from "@/action/common/openNotification";
import { getPatients } from "@/selector/patient";
const Search = Input.Search;

class PatientDocPanel extends Component {
  state = {
    visible: false,
    targetPatient: {}
  };
  componentDidMount() {
    const { findAllPatients } = this.props;
    let session_id = localStorage.getItem("session_id");
    findAllPatients(session_id)
      .then(response => {
        console.log("获取所有病人记录成功");
      })
      .catch(error => {
        console.log("获取所有病人信息失败");
      });
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
    this.props
      .deleteOnePatients(
        localStorage.getItem("session_id"),
        this.state.targetPatient.id
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

  redirectToEditPanel = (record, isUpdate) => {
    const { history } = this.props;
    history.push({
      pathname: "/app/treatment/patientInfo/editPatientPanel",
      patient: record,
      isUpdate: isUpdate
    });
  };

  render() {
    const columns = [
      {
        title: "病人编号",
        dataIndex: "id",
        key: "id",
        width: 250,
        fixed: "left"
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: 100,
        fixed: "left"
      },
      {
        title: "病人身份证号",
        dataIndex: "id_number",
        key: "id_number",
        width: 200
      },
      {
        title: "地区",
        dataIndex: "area",
        key: "area",
        width: 220
      },
      {
        title: "联系电话",
        dataIndex: "contacts.phone_number",
        key: "phone_number",
        width: 150
      },
      { title: "微信", dataIndex: "wechat", key: "wechat", width: 150 },
      {
        title: "QQ",
        dataIndex: "contacts.qq",
        key: "qq",
        width: 150
      },
      {
        title: "电子邮件",
        dataIndex: "contacts.email",
        key: "email",
        width: 220
      },
      {
        title: "特殊病症",
        dataIndex: "special_disease",
        key: "special_disease",
        width: 200
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
                    targetPatient: record,
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
        <PageHeader
          bordered
          extra={[
            <Button key="3" type="primary">
              <Link to="/app/treatment/patientInfo/editPatientPanel">
                新增记录
              </Link>
            </Button>
          ]}
          style={{ marginBottom: "5px" }}
        />
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>你确定要删除{this.state.targetPatient.name}吗</p>
        </Modal>
        <Row gutter={24} style={{ margin: "0px" }} type="flex">
          <Col span={7} style={{ padding: "0px" }}>
            <Search
              placeholder="输入病人身份证号搜索病人信息"
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        </Row>
        <Row gutter={24} style={{ margin: "0px", paddingTop: "5px" }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.props.patients}
            rowKey="id"
            scroll={{ x: 2000, y: 300 }}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patients: getPatients(state)
});

const mapDispatchToProps = dispatch => ({
  findAllPatients: bindActionCreators(findAllPatients, dispatch),
  deleteOnePatients: bindActionCreators(deleteOnePatients, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDocPanel);
