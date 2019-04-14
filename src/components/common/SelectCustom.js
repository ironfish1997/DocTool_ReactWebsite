import React, { Component } from "react";
import { Select } from "antd";
const Option = Select.Option;

class SelectCustom extends Component {
  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      ...value
    };
    // console.log(props);
  }

  componentWillReceiveProps() {
    const { optionsData } = this.props;
    let options = [];
    if (optionsData) {
      optionsData.map((v, k) => {
        options.push(
          <Option value={v} key={k}>
            {v}
          </Option>
        );
        return null;
      });
      this.setState({
        options: options
      });
    }
  }

  render() {
    return (
      <Select
        defaultValue={null}
        showSearch
        style={{ width: 200 }}
        placeholder={`请选择${
          this.props.selectItemTitle === null ? "" : this.props.selectItemTitle
        }`}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value={null}>不选择</Option>
        {this.state.options}
      </Select>
    );
  }
}

export default SelectCustom;
