import React, { Component } from "react";
import {
  Layout,
  Calendar,
  Card,
  Table,
  List,
  Row,
  Col,
  Input,
  Button,
  PageHeader,
  // Divider,
  Modal
} from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  doGetUnreviewSpecialPatients,
  doGetReviewRow,
  doDeleteReviewRow
} from "@/action/publicService";
import * as notificationUtil from "@/action/common/openNotification";
// import { Switch, Route, Link } from "react-router-dom";
import "./index.less";
import moment from "moment";
const { Sider, Content } = Layout;
const Search = Input.Search;

class SpecialDiseaseReviewPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientReviewRecords: [],
      targetReviewRow: {},
      visible: false
    };
  }

  componentDidMount() {
    if (!this.props.account) {
      setTimeout(
        () =>
          this.props.doGetUnreviewSpecialPatients(
            localStorage.getItem("session_id"),
            this.props.account.area
          ),
        5000
      );
    } else {
      this.props.doGetUnreviewSpecialPatients(
        localStorage.getItem("session_id"),
        this.props.account.area
      );
    }
  }

  handleOk = e => {
    this.setState({
      visible: false
    });
    doDeleteReviewRow(
      localStorage.getItem("session_id"),
      this.state.targetReviewRow.id
    )
      .then(msg => {
        this.setState({
          patientReviewRecords: this.state.patientReviewRecords.filter(v => {
            return v.id !== this.state.targetReviewRow.id;
          })
        });
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

  /**
   * 跳转到复查编辑页面
   */
  onReviewBtnClick = patientInfo => {
    const { history } = this.props;
    history.push({
      pathname: "/app/publicHealth/doReview",
      patientInfo: patientInfo
    });
  };

  searchReviewRow = patient_id_number => {
    doGetReviewRow(localStorage.getItem("session_id"), patient_id_number)
      .then(data => {
        notificationUtil.openNotificationWithIcon("success", "查询成功");
        data.map((v, k) => {
          v.review_time = moment(v.review_time)
            .toDate()
            .toLocaleDateString();
          return null;
        });
        console.log(data);
        this.setState({
          patientReviewRecords: data
        });
      })
      .catch(error => {
        notificationUtil.openNotificationWithIcon("error", "查询失败");
        this.setState({
          patientReviewRecords: []
        });
      });
  };

  columns = [
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
      title: "复查时间",
      dataIndex: "review_time",
      key: "review_time",
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
            {/* <span onClick={() => this.redirectToEditPanel(record, true)}>
              编辑
            </span>
            <Divider type="vertical" /> */}
            <span
              onClick={() => {
                this.setState({
                  targetReviewRow: record,
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

  render() {
    return (
      <Layout className="specialDiseaseReviewPanel">
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>你确定要删除{this.state.targetReviewRow.name}吗</p>
        </Modal>
        <PageHeader title={`特殊病症复查`} bordered extra={[]} />
        <Layout>
          <Sider
            className="left_sider"
            width={320}
            style={{ backgroundColor: "inherit" }}
          >
            <Card hoverable className="left_top_calendar" size="small">
              <Calendar fullscreen={false} />
            </Card>
            <Card
              hoverable
              className="left_bottom_calendar"
              size="small"
              title="本月未复查患者清单"
            >
              <List
                dataSource={this.props.unReviewPatients}
                renderItem={item => {
                  return (
                    <List.Item>
                      {item.id_number} {item.name}
                      <Button
                        type="primary"
                        onClick={() => this.onReviewBtnClick(item)}
                        style={{ float: "right" }}
                      >
                        复查
                      </Button>
                    </List.Item>
                  );
                }}
              />
            </Card>
          </Sider>
          <Content>
            <Card
              className="right_top_show_panel"
              hoverable
              title="病人复查记录"
              type={`inner`}
            >
              <Row gutter={24} style={{ margin: "0px" }}>
                <Col span={7} style={{ padding: "0px" }}>
                  <Search
                    placeholder="输入病人身份证号搜索记录"
                    onSearch={value => this.searchReviewRow(value)}
                    enterButton
                  />
                </Col>
              </Row>
              <Table
                bordered
                rowKey="id"
                columns={this.columns}
                dataSource={this.state.patientReviewRecords}
                scroll={{ x: 1250, y: 600 }}
              />
            </Card>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  unReviewPatients: state.publicService.unReviewPatients,
  account: state.account.user
});

const mapDispatchToProps = dispatch => ({
  doGetUnreviewSpecialPatients: bindActionCreators(
    doGetUnreviewSpecialPatients,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialDiseaseReviewPanel);
