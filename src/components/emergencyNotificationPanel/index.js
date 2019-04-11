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
  Icon,
  Typography
} from "antd";
// import { Switch, Route, Link } from "react-router-dom";
import { Card } from "antd";
import "./index.less";
const { Sider, Content } = Layout;
const Option = Select.Option;
const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

class EmergencyNotificationPanel extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    returnTimeStr: "2019-04-13 14:00:00",
    template:"${name} 你好，今天我有事外出了，诊所不开门, 我会在${time}回来，麻烦在这个时间之后过来吧，不好意思",
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
          title={`特殊情况通知`}
          backIcon={<Icon type="arrow-left" />}
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
              <Row gutter={24}>
                <Col span={20} offset={2}>
                  <span>快捷选择：</span>
                  <Select
                    defaultValue="无"
                    style={{ width: "100%" }}
                    onChange={this.selectTargetPatients.bind(this)}
                  >
                    <Option value="patientNow">所有正在就诊的病人</Option>
                    <Option value="allPatient">所有病人</Option>
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
              <Row gutter={24}>
                <Col span={20} offset={2}>
                  <Select
                    defaultValue="无"
                    style={{ width: "100%" }}
                    onChange={this.selectTargetTemplate.bind(this)}
                  >
                    <Option key="patientNow" value="patientNow">模板一</Option>
                    <Option key="allPatient" value="allPatient">模板二</Option>
                  </Select>
                </Col>
              </Row>
            </Card>
            <Card
            hoverable
              className="left_bottom_patient_selector"
              title="选择归期"
              size="small"
            >
              <Row gutter={24}>
                <Col span={20} offset={2}>
                  <DatePicker
                    showTime
                    placeholder="请选择归期"
                    onChange={this.saveReturnTime.bind(this)}
                    onOk={this.saveReturnTime.bind(this)}
                  />
                </Col>
              </Row>
            </Card>
            <Button type="primary" icon="mail" block style={{  }} className="left_bottom_btn">
              发送通知
            </Button>
          </Sider>
          <Content>
            <Card
              className="right_top_show_panel"
              hoverable
              title="预览"
            //   cover={
            //     <PageHeader
            //         title={``}
            //         bordered/>
            //   }
              hoverable
              type={`inner`}
            >
                <Typography>
                    <Text strong>收信人:</Text>
                    {
                        this.state.patients.map((v,k)=>{
                            return (<Text underline key={k}>{v.name}&nbsp;</Text>)
                    })}
                </Typography>
                <Typography>
                    <Text strong>内容:</Text>
                    <Paragraph>
                        {
                            this.state.template.replace("${name}","xxx").replace("${time}",this.state.returnTimeStr)
                        }
                    </Paragraph>
                </Typography>
            </Card>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default EmergencyNotificationPanel;
