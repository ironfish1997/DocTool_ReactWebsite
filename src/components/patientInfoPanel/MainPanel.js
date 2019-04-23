import React, { Component } from "react";
import { Layout, Menu, Icon, PageHeader } from "antd";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import TreatmentSearchPanel from "./TreatmentSearchPanel";
import PatientDocPanel from "./PatientDocPanel";
import EditTreatmentPanel from "./editTreatmentPanel";
import EditPatientPanel from "./editPatientPanel";
const { Sider, Content } = Layout;

class PatientMainPanel extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <PageHeader
          title={`病人信息管理`}
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
        <Layout className="patientInfoPanel">
          <Sider style={{ marginTop: "-5px", padding: "0", opacity: "0.9" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              theme="dark"
              style={{ height: "100%", borderRight: 0 }}
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
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <Switch>
                <Route
                  path={`${match.path}/editTreatmentRecord`}
                  component={EditTreatmentPanel}
                />
                <Route
                  path={`${match.path}/editPatientPanel`}
                  component={EditPatientPanel}
                />
                <Route
                  path={`${match.path}/treatmentInfoManage`}
                  component={TreatmentSearchPanel}
                />
                <Route
                  path={`${match.path}/patientDocumentManage`}
                  component={PatientDocPanel}
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
)(PatientMainPanel);
