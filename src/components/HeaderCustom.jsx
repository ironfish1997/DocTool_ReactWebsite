import React, { Component } from "react";
import { Menu, Icon, Layout, Avatar } from "antd";
import screenfull from "screenfull";
import { flushAccount } from "../action/account";
// import { queryString } from "../utils";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { PwaInstaller } from "./widget";
import { bindActionCreators } from "redux";
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  screenFull = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }
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
        <Menu mode="horizontal" style={{ lineHeight: "64px", float: "right" }}>
          <Menu.Item key="pwa">
            <PwaInstaller />
          </Menu.Item>
          <Menu.Item key="full" onClick={this.screenFull}>
            <Icon type="arrows-alt" onClick={this.screenFull} />
          </Menu.Item>
          {/* <Menu.Item key="1">
            <Badge dot>
              <Icon type="notification" />
            </Badge>
          </Menu.Item> */}
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
      </Header>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  flushAccount: bindActionCreators(flushAccount, dispatch)
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(HeaderCustom)
);
