import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";

class MessageSpan extends Component {
  render() {
    return (
      <div className="clear">
        <span className="pull-left" style={{ marginRight: "10px" }}>
          <Icon type="notification" />
        </span>
        <h3>{this.props.msgValue}</h3>
      </div>
    );
  }
}

MessageSpan.propTypes = {
  msgValue: PropTypes.string //检测数组类型
};

export default MessageSpan;
