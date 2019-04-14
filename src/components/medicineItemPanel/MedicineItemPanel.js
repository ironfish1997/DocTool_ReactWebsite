import React, { Component } from "react";
import {
  PageHeader,
  // Button,
  Layout,
  Menu
  // Input,
  // Icon
} from "antd";
import { Link, Switch, Route } from "react-router-dom";
import MedicineQueryPanel from "./MedicineQueryPanel";
import MedicineDetailPanel from "./MedicineDetailPanel";
import "./index.less";
import { connect } from "react-redux";
const { Sider, Content } = Layout;

class MedicineItemPanel extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <PageHeader
          title="药物订单管理"
          bordered
          style={{ marginBottom: "5px" }}
        />
        <Layout>
          <Sider style={{ marginTop: "-5px", padding: "0", opacity: "0.9" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              theme="dark"
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to={`${match.url}/itemQuery`}>订单查询</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <Switch>
                <Route
                  exact
                  path={`${match.path}/detail`}
                  component={MedicineDetailPanel}
                />
                <Route
                  path={`${match.path}/itemQuery`}
                  component={MedicineQueryPanel}
                />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  // updateUserInfo: bindActionCreators(doUpdate, dispatch),
  // flushAccount: bindActionCreators(flushAccount, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicineItemPanel);
