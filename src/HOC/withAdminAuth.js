import PropTypes from "prop-types";
import React, { Component } from "react";
import { Card } from "antd";
import { connect } from "react-redux";
export let withAdminAuth = ComposedComponent => {
  class wrapperClass extends Component {
    static propTypes = {
      account: PropTypes.object.isRequired
    };

    isAdmin = account => {
      if (
        account &&
        account.account_permission &&
        account.account_permission.indexOf("admin_auth") >= 0
      ) {
        console.info("账户拥有管理员权限");
        return true;
      } else {
        console.warn("账户无管理员权限");
        return false;
      }
    };

    render() {
      if (this.isAdmin(this.props.account)) {
        return <ComposedComponent {...this.props} />;
      } else {
        return (
          <Card style={{ width: 300 }}>
            <p>您没有管理员权限，无法使用该功能</p>
          </Card>
        );
      }
    }
  }
  const mapStateToProps = state => ({
    account: state.account.user
  });

  const mapDispatchToProps = dispatch => ({});

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(wrapperClass);
};
