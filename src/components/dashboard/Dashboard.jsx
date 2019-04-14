import React from "react";
import ReactEcharts from "echarts-for-react";
import { Row, Col, Card, Icon, List, Button } from "antd";
import "./dashboard.less";
import * as api_path from "@/config/api_path";
import { httpUtil } from "@/utils";
// import EchartsViews from './EchartsViews';
// import EchartsProjects from './EchartsProjects';
import MessageSpan from "./MessageSpan";
import { option } from "./echartConfig";

class Dashboard extends React.Component {
  state = {
    unReviewPatients: [],
    options: { ...option }
  };
  componentDidMount() {
    httpUtil(
      "https://cors-anywhere.herokuapp.com/" +
        api_path.baidu_ip_location +
        "?ak=Xg7MiihznjiP5LZPy6ncVcVp5LqXNrZy",
      null,
      null,
      "GET"
    ).then(response => {
      response.json().then(response => {
        // console.log(response);
        let x = response.content.point.x;
        let y = response.content.point.y;
        this.setState({
          options: {
            ...this.state.options,
            bmap: {
              ...this.state.options.bmap,
              center: [parseFloat(x) / 100000, parseFloat(y) / 100000]
            }
          }
        });
      });
    });
    this.setState({
      unReviewPatients: [
        {
          id: "5cac33389d00e58416436e78",
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
          id_number: "430989889283928392"
        }
      ]
    });
  }
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
      <div className="main">
        <Row gutter={10} type="flex">
          <Col md={16}>
            <div className="gutter-box">
              <Card bordered={false} id="echart">
                <ReactEcharts option={this.state.options} />
              </Card>
            </div>
          </Col>
          <Col md={8}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <Icon type="heart" className="text-2x text-danger" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">患者档案数量</div>
                    <h2>238</h2>
                  </div>
                </div>
              </Card>
            </div>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <Icon type="mail" className="text-2x text-success" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">短信剩余条数</div>
                    <h2>4000</h2>
                  </div>
                </div>
              </Card>
            </div>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clear y-center">
                  <div className="pull-left mr-m">
                    <Icon type="user" className="text-2x text-success" />
                  </div>
                  <div className="clear">
                    <div className="text-muted">本月就诊人数</div>
                    <h2>130</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={16}>
            <div className="gutter-box">
              <Card bordered={false} className={"no-padding"}>
                {/* <EchartsProjects /> */}
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={10} type="flex">
          <Col className="gutter-row" md={16}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pb-m">
                  <h3>消息栏</h3>
                </div>
                <span className="card-tool">
                  <Icon type="sync" />
                </span>
                <ul className="list-group no-border">
                  <li className="list-group-item">
                    <MessageSpan msgValue={"需要发通知"} />
                  </li>
                  <li className="list-group-item">
                    <MessageSpan msgValue={"需要发通知"} />
                  </li>
                  <li className="list-group-item">
                    <MessageSpan msgValue={"需要发通知"} />
                  </li>
                  <li className="list-group-item">
                    <MessageSpan msgValue={"需要发通知"} />
                  </li>
                </ul>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={8}>
            <div className="gutter-box">
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
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
