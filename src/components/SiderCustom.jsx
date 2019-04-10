/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from "react";
import { Layout } from "antd";
import { withRouter } from "react-router-dom";
import routes from "../routes/config";
import SiderMenu from "./SiderMenu";
const { Sider } = Layout;

class SiderCustom extends Component {
  static setMenuOpen = props => {
    const { pathname } = props.location;
    return {
      openKey: pathname.substr(0, pathname.lastIndexOf("/")),
      selectedKey: pathname
    };
  };

  static onCollapse = collapsed => {
    console.log(collapsed);
    return {
      collapsed,
      // firstHide: collapsed,
      mode: collapsed ? "vertical" : "inline"
    };
  };
  state = {
    collapsed: true,
    mode: "inline",
    openKey: "",
    selectedKey: "",
    firstHide: true // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
  };
  componentDidMount() {
    const state = SiderCustom.setMenuOpen(this.props);
    this.setState(state);
  }

  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });
  };

  openMenu = v => {
    console.log(v);
    this.setState({
      openKey: v[v.length - 1],
      firstHide: false
    });
  };

  render() {
    return (
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsed={this.state.collapsed}
        style={{ overflowY: "auto" }}
        onMouseEnter={() => {
          this.setState({ collapsed: false });
        }}
        onMouseLeave={() => {
          this.setState({ collapsed: true });
        }}
      >
        <div className="logo">
          <img
            alt="logo"
            src={process.env.PUBLIC_URL + "/images/icons/doc-icon.png"}
            width="100%"
            height="100%"
          />
        </div>
        <SiderMenu
          menus={routes.menus}
          onClick={this.menuClick}
          inlineCollapsed
          mode="inline"
          onOpenChange={this.openMenu}
        />
        <style>
          {`
                    #nprogress .spinner{
                        left: "70px";
                        right: 0 !important;
                    }
                    `}
        </style>
      </Sider>
    );
  }
}

export default withRouter(SiderCustom);
