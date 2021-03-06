import React, { Component } from "react";
import {
  Layout,
  Select,
  Row,
  Col,
  Divider,
  DatePicker,
  Button,
  PageHeader,
  List,
  Typography
} from "antd";
// import { Switch, Route, Link } from "react-router-dom";
import { Card } from "antd";
import "./index.less";
const { Sider, Content } = Layout;
const Option = Select.Option;
const { Paragraph, Text } = Typography;

class PublicHealthNotificationPanel extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    name: "xxx",
    time: "2019-04-13 14:00:00",
    template: `%{name} 你好，最近有国家基本医疗活动,开始时间是%{time}，麻烦在这个时间之后来医疗点参加`,
    //TODO patients应该是当前正在就诊的病人
    patients: [
      {
        id: "5cac33389d00e58416436e78",
        name: "张三",
        area: "china,hunan,changde,lixian",
        contacts: {
          wechat: null,
          qq: null,
          phone_number: "19898989898",
          email: null
        },
        extra_meta: null,
        special_disease: null,
        id_number: "123456"
      },
      {
        id: "5cac33489d00e58416436e79",
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
        id_number: "123456789"
      }
    ],
    //短信发送状态信息，需要自己处理
    sms_status: [
      {
        target_phone_number: "18587390092",
        code: "OK"
      },
      {
        target_phone_number: "13308998232",
        code: "OK"
      },
      {
        target_phone_number: "13788293829",
        code: "SEND TIMEOUT"
      },
      {
        target_phone_number: "18587390092",
        code: "OK"
      },
      {
        target_phone_number: "13308998232",
        code: "OK"
      },
      {
        target_phone_number: "13788293829",
        code: "SEND TIMEOUT"
      }
    ]
  };

  /**
   * 根据快捷选项选择相应的收信人
   * @param {string} value 选择参数
   */
  selectTargetPatients = value => {
    console.log(`selected ${value}`);
  };

  /**
   * 选择相应的短信模板
   * @param {string} value
   */
  selectTargetTemplate = value => {};

  /**
   * 存储归期
   */
  saveReturnTime = (data, dataString) => {
    console.log(dataString);
  };

  render() {
    let options = [];
    this.state.patients.map((v, k) => {
      options.push(<Option key={v.name}>{v.name}</Option>);
      return null;
    });
    return (
      <Layout className="emergencyNotificationPanel">
        <PageHeader
          title={`公共通知`}
          bordered
          extra={
            [
              //   <Button key="3" type="primary">
              //     <Link to="/app/treatment/patientInfo/editPatientPanle">
              //       新增记录
              //     </Link>
              //   </Button>
            ]
          }
          style={{ marginBottom: "5px" }}
        />
        <Layout>
          <Sider
            className="left_sider"
            width={300}
            style={{ backgroundColor: "inherit" }}
          >
            <Card
              hoverable
              className="left_top_patient_selector"
              title="选择收信人"
              size="small"
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="请选择需要发送消息的病人"
                defaultValue={[]}
                //   onChange={this.handleChange.bind(this)}
              >
                {options}
              </Select>
              <Divider />
              <Row gutter={24} type="flex">
                <Col span={20} offset={2}>
                  <span>快捷选择：</span>
                  <Select
                    defaultValue="无"
                    style={{ width: "100%" }}
                    onChange={this.selectTargetPatients.bind(this)}
                  >
                    <Option value="patientNow">所有辖区内居民</Option>
                  </Select>
                </Col>
              </Row>
            </Card>
            <Card
              hoverable
              className="left_bottom_patient_selector"
              title="选择模板"
              size="small"
            >
              <Row gutter={24} type="flex">
                <Col span={20} offset={2}>
                  <Select
                    defaultValue="无"
                    style={{ width: "100%" }}
                    onChange={this.selectTargetTemplate.bind(this)}
                  >
                    <Option key="template1" value="template1">
                      模板一
                    </Option>
                    <Option key="template2" value="template2">
                      模板二
                    </Option>
                  </Select>
                </Col>
              </Row>
            </Card>
            <Card
              hoverable
              className="left_bottom_patient_selector"
              title="选择服务开始时间"
              size="small"
            >
              <Row gutter={24} type="flex">
                <Col span={20} offset={2}>
                  <DatePicker
                    showTime
                    placeholder="请选择服务开始时间"
                    onChange={this.saveReturnTime.bind(this)}
                    onOk={this.saveReturnTime.bind(this)}
                  />
                </Col>
              </Row>
            </Card>
            <Button
              type="primary"
              icon="mail"
              block
              style={{}}
              className="left_bottom_btn"
            >
              发送通知
            </Button>
          </Sider>
          <Content>
            <Card
              className="right_top_show_panel"
              hoverable
              title="预览"
              type={`inner`}
            >
              <Typography>
                <Text strong>收信人:</Text>
                {this.state.patients.map((v, k) => {
                  return (
                    <Text underline key={k}>
                      {v.name}&nbsp;
                    </Text>
                  );
                })}
              </Typography>
              <Typography>
                <Text strong>内容:</Text>
                <Paragraph>
                  {this.state.template
                    .replace("%{name}", this.state.name)
                    .replace("%{time}", this.state.time)}
                </Paragraph>
              </Typography>
            </Card>
            {/* 显示短信发送状态消息 */}
            <Card className="right_top_show_panel" hoverable type={`inner`}>
              <List
                dataSource={this.state.sms_status}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text mark>
                      {item.code === "OK" ? "成功" : "失败"}
                    </Typography.Text>{" "}
                    发送短信到{item.target_phone_number}
                  </List.Item>
                )}
              />
            </Card>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default PublicHealthNotificationPanel;
