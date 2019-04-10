import React, { Component } from "react";
import { Row, Col, Input, PageHeader, Button, Table, Divider } from "antd";
import { Link } from "react-router-dom";
import "./index.less";
const Search = Input.Search;

class TreatmentSearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  redirectToEditPanel = record => {
    const { history } = this.props;
    history.push({
      pathname: "/app/treatment/patientInfo/editTreatmentRecord",
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
    const dataSource = [
      {
        key: "1",
        id: "ax43556fh893hsdjksj",
        patient_id_number: "43098928839289238",
        disease_name: "感冒",
        start_time: "2017-7-21",
        end_time: "2017-7-23",
        medicines_record: "吃了感冒灵,氨苄西林，感觉好了很多了"
      },
      {
        key: "2",
        id: "sdilsajdlsalfkssss",
        patient_id_number: "430989288999289238",
        disease_name: "发烧",
        start_time: "2018-7-21",
        end_time: "2018-8-23",
        medicines_record: "吃了退烧药"
      }
    ];

    const columns = [
      {
        title: "就诊记录编号",
        dataIndex: "id",
        key: "id",
        width: 200,
        fixed: "left"
      },
      {
        title: "病症名称",
        dataIndex: "disease_name",
        key: "disease_name",
        width: 150
      },
      {
        title: "病人身份证号",
        dataIndex: "patient_id_number",
        key: "patient_id_number",
        width: 200
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

    return (
      <div style={{ paddingLeft: "10px" }}>
        <PageHeader
          title="就诊记录管理"
          bordered
          extra={[
            <Button key="4" icon="sync">
              刷新
            </Button>,
            <Button key="3" type="primary">
              <Link to="/app/treatment/patientInfo/editTreatmentRecord">
                新增记录
              </Link>
            </Button>
          ]}
          style={{ marginBottom: "5px" }}
        />
        <Row gutter={24} style={{ margin: "0px" }}>
          <Col span={7} style={{ padding: "0px" }}>
            <Search
              placeholder="输入病人身份证号搜索就诊记录"
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
            scroll={{ x: 1500, y: 300 }}
          />
        </Row>
      </div>
    );
  }
}

export default TreatmentSearchPanel;
