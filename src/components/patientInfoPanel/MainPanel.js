import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import TreatmentSearchPanel from "./TreatmentSearchPanel";
import PatientDocPanel from "./PatientDocPanel";
import EditTreatmentPanel from "./editTreatmentPanel";
import EditPatientPanel from "./editPatientPanel";
const { SubMenu } = Menu;
const { Sider, Content } = Layout;

class PatientMainPanel extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout className="patientInfoPanel">
        <Sider style={{ margin: "0", padding: "0", opacity: "0.8" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            theme="dark"
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  病人信息管理
                </span>
              }
            >
              <Menu.Item key="1">
                <Link to="/app/treatment/patientInfo/patientDocumentManage">
                  病人建档
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/app/treatment/patientInfo/treatmentInfoManage">
                  就诊记录管理
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <Switch>
              <Route
                exact
                path={`${match.path}/patientInfo/editTreatmentRecord`}
                component={EditTreatmentPanel}
              />
              <Route
                exact
                path={`${match.path}/patientInfo/editPatientPanle`}
                component={EditPatientPanel}
              />
              <Route
                exact
                path={`${match.path}/patientInfo/treatmentInfoManage`}
                component={TreatmentSearchPanel}
              />
              <Route
                exact
                path={`${match.path}/patientInfo/patientDocumentManage`}
                component={PatientDocPanel}
              />
            </Switch>
          </Content>
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
)(PatientMainPanel);
