import React, { Component } from "react";
import { Menu, Icon, Layout, Avatar, Drawer, Badge, List } from "antd";
import screenfull from "screenfull";
import { flushAccount } from "../action/account";
// import { queryString } from "../utils";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  connectWebSocket,
  disconnectWebSocket,
  doDeleteTempNotification
} from "@/action/notification";
import * as notificationUtil from "@/action/common/openNotification";
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      drawerVisible: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("session_id")) {
      this.props.connectWebSocket(localStorage.getItem("session_id"));
    }
  }

  screenFull = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }
  };

  showDrawer = () => {
    this.setState({
      drawerVisible: true
    });
  };

  onClose = () => {
    this.setState({
      drawerVisible: false
    });
  };

  logout = () => {
    const { flushAccount, history } = this.props;
    flushAccount();
    history.push("/login");
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    return (
      <Header className="custom-theme header">
        {/* <Icon
          className="header__trigger custom-trigger"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.props.toggle}
        /> */}
        <Menu mode="horizontal" style={{ lineHeight: "64px", float: "left" }}>
          <Menu.Item>
            <div className="logo" style={{ lineHeight: "100%", width: "50px" }}>
              <img
                alt="logo"
                src={process.env.PUBLIC_URL + "/images/icons/doc-icon.png"}
                height="100%"
                width="100%"
                style={{
                  marginLeft: "-20px"
                }}
              />
            </div>
          </Menu.Item>
        </Menu>
        <Menu mode="horizontal" style={{ lineHeight: "64px", float: "right" }}>
          <Menu.Item key="full" onClick={this.screenFull}>
            <Icon type="arrows-alt" onClick={this.screenFull} />
          </Menu.Item>
          <Menu.Item key="1">
            <Badge
              dot
              style={{ display: this.props.isNewNoti ? "block" : "none" }}
            >
              <Icon type="notification" onClick={this.showDrawer} />
            </Badge>
          </Menu.Item>
          <SubMenu
            title={
              <span className="avatar">
                <Avatar
                  style={{
                    backgroundColor: this.state.color,
                    verticalAlign: "middle"
                  }}
                  size="large"
                >
                  {this.props.user ? this.props.user.name : ""}
                </Avatar>
              </span>
            }
          >
            <MenuItemGroup title="用户中心">
              <Menu.Item key="setting:2">
                <Link to="/app/editAccountInfo">个人信息</Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={this.logout}>
                <span>退出登录</span>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
        <Drawer
          title="消息"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.drawerVisible}
          width={`400px`}
          size={`middle`}
          itemLayout="horizontal"
        >
          <List
            dataSource={this.props.tempNotifications}
            itemLayout="horizontal"
            renderItem={item => (
              <List.Item
                actions={[
                  <Icon
                    type="close"
                    onClick={() => {
                      this.props
                        .doDeleteTempNotification(item)
                        .then(response => {
                          notificationUtil.openNotificationWithIcon(
                            "success",
                            response
                          );
                        })
                        .catch(error => {
                          notificationUtil.openNotificationWithIcon(
                            "error",
                            "删除消息失败,请稍后再试"
                          );
                        });
                    }}
                  />
                ]}
              >
                <div>{item}</div>
              </List.Item>
            )}
          />
        </Drawer>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  permanentNotifications: state.notification.permanentNotifications,
  tempNotifications: state.notification.tempNotifications
});

const mapDispatchToProps = dispatch => ({
  flushAccount: bindActionCreators(flushAccount, dispatch),
  connectWebSocket: bindActionCreators(connectWebSocket, dispatch),
  disconnectWebSocket: bindActionCreators(disconnectWebSocket, dispatch),
  doDeleteTempNotification: bindActionCreators(
    doDeleteTempNotification,
    dispatch
  )
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderCustom)
);
