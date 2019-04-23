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
  //   Select,
  //   Row,
  //   Col,
  //   Divider,
  //   DatePicker,
  //   Button,
  PageHeader
  //   Icon,
} from "antd";
// import { Switch, Route, Link } from "react-router-dom";
import "./index.less";
const { Sider, Content } = Layout;
const Search = Input.Search;
// const Option = Select.Option;
// const { Paragraph, Text } = Typography;

class SpecialDiseaseReviewPanel extends Component {
  state = {
    unReviewPatients: [
      {
        name: "张三多",
        area: "china,hunan,changde,lixian",
        contacts: {
          wechat: null,
          qq: null,
          phone_number: "19898989898",
          email: null
        },
        extra_meta: null,
        special_disease: null,
        id_number: "439982039203920392"
      },
      {
        name: "李四",
        area: "china,hunan,changde,lixian",
        contacts: {
          wechat: null,
          qq: null,
          phone_number: "1982392131231",
          email: null
        },
        extra_meta: null,
        special_disease: null,
        id_number: "430989889283928392"
      }
    ],
    patientReviewRecords: [
      {
        key: "1",
        patient_id_number: "43098928839289238",
        disease_name: "感冒",
        review_time: "2017-7-21",
        medicines_record: "吃了感冒灵,氨苄西林，感觉好了很多了"
      },
      {
        key: "2",
        patient_id_number: "430989288999289238",
        disease_name: "发烧",
        review_time: "2018-7-21",
        medicines_record: "吃了退烧药"
      },
      {
        key: "3",
        patient_id_number: "43098928839289238",
        disease_name: "感冒",
        review_time: "2017-7-21",
        medicines_record: "吃了感冒灵,氨苄西林，感觉好了很多了"
      },
      {
        key: "4",
        patient_id_number: "430989288999289238",
        disease_name: "发烧",
        review_time: "2018-7-21",
        medicines_record: "吃了退烧药"
      },
      {
        key: "5",
        patient_id_number: "43098928839289238",
        disease_name: "感冒",
        review_time: "2017-7-21",
        medicines_record: "吃了感冒灵,氨苄西林，感觉好了很多了"
      },
      {
        key: "6",
        patient_id_number: "430989288999289238",
        disease_name: "发烧",
        review_time: "2018-7-21",
        medicines_record: "吃了退烧药"
      },
      {
        key: "7",
        patient_id_number: "43098928839289238",
        disease_name: "感冒",
        review_time: "2017-7-21",
        medicines_record: "吃了感冒灵,氨苄西林，感觉好了很多了"
      },
      {
        key: "8",
        patient_id_number: "430989288999289238",
        disease_name: "发烧",
        review_time: "2018-7-21",
        medicines_record: "吃了退烧药"
      },
      {
        key: "9",
        patient_id_number: "43098928839289238",
        disease_name: "感冒",
        review_time: "2017-7-21",
        medicines_record: "吃了感冒灵,氨苄西林，感觉好了很多了"
      },
      {
        key: "10",
        patient_id_number: "430989288999289238",
        disease_name: "发烧",
        review_time: "2018-7-21",
        medicines_record: "吃了退烧药"
      },
      {
        key: "11",
        patient_id_number: "43098928839289238",
        disease_name: "感冒",
        review_time: "2017-7-21",
        medicines_record: "吃了感冒灵,氨苄西林，感觉好了很多了"
      },
      {
        key: "12",
        patient_id_number: "430989288999289238",
        disease_name: "发烧",
        review_time: "2018-7-21",
        medicines_record: "吃了退烧药"
      }
    ],
    columns: [
      {
        title: "复查记录编号",
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
      }
    ]
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

  render() {
    return (
      <Layout className="specialDiseaseReviewPanel">
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
                dataSource={this.state.unReviewPatients}
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
                    onSearch={value => console.log(value)}
                    enterButton
                  />
                </Col>
              </Row>
              <Table
                bordered
                columns={this.state.columns}
                dataSource={this.state.patientReviewRecords}
                scroll={{ x: 1350, y: 600 }}
              />
            </Card>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SpecialDiseaseReviewPanel;
