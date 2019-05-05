import PropTypes from "prop-types";
import React, { Component } from "react";
export let withDoctorAuth = ComposedComponent =>
  class WrapComponent extends Component {
    // 构造
    // constructor(props) {
    //   super(props);
    // }

    static propTypes = {
      account: PropTypes.object.isRequired
    };

    isAdmin = account => {
      if (
        account.account_permission &&
        account.account_permission.indexOf("doctor_auth") >= 0
      ) {
        return true;
      } else {
        return false;
      }
    };

    render() {
      if (this.isAdmin(this.props.account)) {
        return <ComposedComponent {...this.props} />;
      } else {
        return null;
      }
    }
  };
