import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { bindActionCreators } from "redux";
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
    // console.log(v);
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
        <SiderMenu
          menus={routes.menus}
          onClick={this.menuClick}
          inlineCollapsed
          mode="inline"
          onOpenChange={this.openMenu}
          account={this.props.account}
        />
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SiderCustom));
