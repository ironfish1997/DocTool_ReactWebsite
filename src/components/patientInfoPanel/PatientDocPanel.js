import React, { Component } from "react";
import { Row, Col, Input, PageHeader, Button, Table, Divider } from "antd";
import { Link } from "react-router-dom";
import "./index.less";
const Search = Input.Search;

class PatientDocPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  redirectToEditPanel = record => {
    const { history } = this.props;
    history.push({
      pathname: "/app/treatment/patientInfo/editPatientPanle",
      treatmentRecord: record
    });
    // return (
    //   <Redirect
    //     to="/app/treatment/patientInfo/editTreatmentRecord"
    //     treatmentRecord={record}
    //   />
    // );
  };

  render() {
    const columns = [
      {
        title: "病人编号",
        dataIndex: "id",
        key: "id",
        width: 200,
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
              <span onClick={() => this.redirectToEditPanel(record)}>编辑</span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  return null;
                }}
              >
                删除
              </span>
            </span>
          );
        }
      }
    ];
    const dataSource = [
      {
        key: "1",
        id: "ax43556fh893hsdjksj",
        name: "张三",
        id_number: "430909090909090",
        area: "china,hunan,changde,lixian",
        contacts: {
          qq: "14989893820",
          wechat: "18787878787",
          phone_number: "187878787787",
          email: "1878293892@qq.com"
        },
        special_disease: ["糖尿病", "高血压"],
        extra_meta: "正常"
      }
    ];

    return (
      <div style={{ paddingLeft: "10px" }}>
        <PageHeader
          title="病人档案管理"
          bordered
          extra={[
            <Button key="3" type="primary">
              <Link to="/app/treatment/patientInfo/editPatientPanle">
                新增记录
              </Link>
            </Button>
          ]}
          style={{ marginBottom: "5px" }}
        />
        <Row gutter={24} style={{ margin: "0px" }}>
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
            dataSource={dataSource}
            scroll={{ x: 2000, y: 300 }}
          />
        </Row>
      </div>
    );
  }
}

export default PatientDocPanel;
