import React from "react";
import ReactEcharts from "echarts-for-react";
import { Row, Col, Card, Icon, List, Button } from "antd";
import "./dashboard.less";
import * as api_path from "@/config/api_path";
import { httpUtil } from "@/utils";
import { connect } from "react-redux";
// import EchartsViews from './EchartsViews';
// import EchartsProjects from './EchartsProjects';
import MessageSpan from "../common/MessageSpan";
import { option } from "./echartConfig";
import { doGetUnreviewSpecialPatients } from "@/action/publicService";
import indexedDBUtilBuilder from "@/utils/indexDBUtil";
import { bindActionCreators } from "redux";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const indexedDBUtil = new indexedDBUtilBuilder("patients", null);
    this.state = {
      unReviewPatients: [],
      options: { ...option },
      indexedDBUtil: indexedDBUtil,
      drawerVisible: false
    };
  }
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
    if (!this.props.account) {
      setTimeout(
        () =>
          this.props.doGetUnreviewSpecialPatients(
            localStorage.getItem("session_id"),
            this.props.account.area
          ),
        2000
      );
    } else {
      this.props.doGetUnreviewSpecialPatients(
        localStorage.getItem("session_id"),
        this.props.account.area
      );
    }
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
                <List
                  dataSource={this.props.permanentNotifications}
                  renderItem={item => (
                    <List.Item>
                      <MessageSpan msgValue={item} />
                    </List.Item>
                  )}
                />
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
                  dataSource={this.props.unReviewPatients}
                  renderItem={item => {
                    return (
                      <List.Item key={item.id}>
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

const mapStateToProps = state => ({
  permanentNotifications: state.notification.permanentNotifications,
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
)(Dashboard);
