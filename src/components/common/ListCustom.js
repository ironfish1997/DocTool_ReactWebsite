import React, { Component } from "react";
import { List, Table } from "antd";

/**
 * 自定义列表，带表头
 */
class ListCustom extends Component {
  render() {
    return (
      <div>
        <List.Item>
          {this.props.title}：{this.props.value}
        </List.Item>
      </div>
    );
  }
}

export default ListCustom;
