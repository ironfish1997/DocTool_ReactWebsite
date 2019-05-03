import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Table,
  Divider,
  Form,
  Collapse,
  PageHeader
  // Input,
  // Icon
} from "antd";
import { connect } from "react-redux";
import { SelectCustom } from "../common";
import { bindActionCreators } from "redux";
import { findOrderByAccountId } from "@/action/order";
// import * as notificationUtil from "@/action/common/openNotification";
const Panel = Collapse.Panel;

class ItemQueryPanel extends Component {
  constructor(props) {
    super(props);
    console.log("ItemQueryPanel is Loading");
    this.state = {
      items: [],
      supply_unit: [],
      salesman_name: []
    };
  }

  componentDidMount() {
    this.props
      .findOrderByAccountId(
        localStorage.getItem("session_id"),
        this.props.account.account_id
      )
      .then(items => {
        //这里需要异步加载
        //需要筛选出所有的供货单位
        let supply_unit_set = new Set();
        //需要筛选出所有的销售员姓名
        let salesman_name_set = new Set();
        items.map((v, k) => {
          supply_unit_set.add(v.supply_unit);
          salesman_name_set.add(v.salesman_name);
          return null;
        });
        this.setState({
          ...this.state,
          items,
          supply_unit: [...supply_unit_set],
          salesman_name: [...salesman_name_set]
        });
        console.log("药物订单信息查找成功");
      })
      .catch(error => {
        console.log("药物订单信息查找失败");
      });
  }

  redirectToPanel = (record, isEdit) => {
    const { history } = this.props;
    let redirectDate = {};
    if (record) {
      this.state.items.map((v, k) => {
        if (v.id === record.id) {
          redirectDate = v;
        }
        return null;
      });
    }
    console.log(record);
    history.push({
      pathname: "/app/medicineItems/detail",
      itemRecord: redirectDate,
      isEdit: isEdit
    });
  };

  render() {
    //拷贝一份items，把里面的timestamp替换成date
    let items = JSON.parse(JSON.stringify(this.state.items));
    if (items) {
      items.map((v, k) => {
        v.date = new Date(v.date).toLocaleString();
        return null;
      });
    }
    const columns = [
      {
        title: "订单日期",
        dataIndex: "date",
        key: "date",
        width: 250,
        fixed: "left"
      },
      {
        title: "销售员姓名",
        dataIndex: "salesman_name",
        key: "salesman_name",
        width: 200
      },
      {
        title: "销售员电话",
        dataIndex: "salesman_phone",
        key: "salesman_phone",
        width: 200
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => {
          return (
            <span>
              <span onClick={() => this.redirectToPanel(record, false)}>
                查看详情
              </span>
              <Divider type="vertical" />
              <span
                onClick={() => {
                  return null;
                }}
              >
                删除
              </span>
            </span>
          );
        }
      }
    ];
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ paddingLeft: "5px" }}>
        <PageHeader
          bordered
          extra={[
            <Button
              key="3"
              type="primary"
              onClick={() => this.redirectToPanel(null, true)}
            >
              新增记录
            </Button>
          ]}
          style={{ marginBottom: "5px" }}
        />
        <Collapse accordion>
          <Panel header="筛选" key="1" forceRender>
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Row gutter={24} style={{ margin: "0px" }} type="flex">
                <Col span={7} style={{ padding: "0px" }}>
                  <Form.Item label="销售员姓名">
                    {getFieldDecorator("salesman_name", {
                      rules: [
                        {
                          required: false,
                          message: "请选定销售员"
                        }
                      ]
                    })(
                      <SelectCustom
                        optionsData={this.state.salesman_name}
                        selectItemTitle="销售员"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Panel>
        </Collapse>
        <Row
          gutter={24}
          style={{ margin: "0px", paddingTop: "5px" }}
          type="flex"
        >
          <Table
            bordered
            columns={columns}
            dataSource={items}
            scroll={{ x: 1000, y: 300 }}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account.user,
  items: state.order.items
});

const mapDispatchToProps = dispatch => ({
  findOrderByAccountId: bindActionCreators(findOrderByAccountId, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ItemQueryPanel));
