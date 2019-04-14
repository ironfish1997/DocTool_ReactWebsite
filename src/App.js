import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";
import SiderCustom from "./components/SiderCustom";
import HeaderCustom from "./components/HeaderCustom";
import { MedicineItemPanel } from "./components/medicineItemPanel";
import {
  PatientInfoPanel,
  EmergencyNotificationPanel,
  PublicHealthNotificationPanel,
  SpecialDiseaseReviewPanel,
  DoReviewPanel
} from "./components";
import HomePanel from "./components/dashboard/Dashboard";
import { Layout /* notification, Icon */ } from "antd";
import editAccountInfo from "./components/editAccountInfo/index";
import { withLoginAuth } from "./HOC/withLoginAuth";

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      collapsed: true
    };
  }

  _setTitle = ({ title }) => {
    if (this.state.title === title) return;
    this.setState({ title });
  };

  render() {
    const { title } = this.state;
    const { match } = this.props;
    return (
      <DocumentTitle title={title}>
        <Layout>
          <HeaderCustom
            toggle={this.toggle}
            collapsed={this.state.collapsed}
            user={this.props.account.user}
          />
          {/* <ThemePicker /> */}
          <Layout style={{ flexDirection: "colomn" }} hasSider>
            <SiderCustom collapsed={this.state.collapsed} />
            <Layout>
              <Content style={{ overflow: "initial", flex: "1 1 0" }}>
                <Switch>
                  <Route
                    path={`${match.path}/treatment/patientInfo`}
                    component={PatientInfoPanel}
                  />
                  <Route
                    path={`${match.path}/treatment/notification`}
                    component={EmergencyNotificationPanel}
                  />
                  <Route
                    path={`${match.path}/publicHealth/notification`}
                    component={PublicHealthNotificationPanel}
                  />
                  <Route
                    path={`${match.path}/publicHealth/specialDisease`}
                    component={SpecialDiseaseReviewPanel}
                  />
                  <Route
                    path={`${match.path}/publicHealth/doReview`}
                    component={DoReviewPanel}
                  />
                  <Route
                    path={`${match.path}/medicineItems`}
                    component={MedicineItemPanel}
                  />
                  <Route path={`${match.path}/main`} component={HomePanel} />
                  <Route
                    path={`${match.path}/editAccountInfo`}
                    component={editAccountInfo}
                  />
                  <Route render={() => <Redirect to="/404" />} />
                </Switch>
              </Content>
              {/* <Footer
                style={{
                  textAlign: "center",
                  background: "#22075e",
                  color: "white"
                }}
              >
                DocTool System ©{new Date().getFullYear()} Created by
                1481980097@qq.com
              </Footer> */}
            </Layout>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default withLoginAuth(App);
