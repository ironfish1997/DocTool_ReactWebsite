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
    //这里需要异步加载
    let items = [
      {
        key: "1",
        id: "1", //订单号
        date: new Date().getTime(), //订单日期
        certification_status: true, //证照情况
        supply_unit: "常德毕盛医药", //供货单位
        salesman_name: "武斌", //销售员姓名
        salesman_phone: 13876545362, //销售员电话
        medicine_list: [
          {
            id: "123456", //药物信息编号（订单号+药物编号）
            medicine_name: "阿莫西林分散片", //药物名称
            produce_company: "湖南万众药业", //生产厂家名称
            approval_number: "gb28181", //批注文号
            size: "23.6", //药物规格
            formulation: "一型剂", //剂型
            batch_number: "xx3064", //批号
            unit_price: 130, //单价
            unit: "瓶", //单位
            count: 10, //数量
            expire_date: "2020-03-11" //有效期
          },
          {
            id: "12345678", //药物信息编号（订单号+药物编号）
            medicine_name: "氨苄西林分散片", //药物名称
            produce_company: "湖南万众药业", //生产厂家名称
            approval_number: "gb28181", //批注文号
            size: "24", //药物规格
            formulation: "一型剂", //剂型
            batch_number: "xx3064", //批号
            unit_price: 130, //单价
            unit: "瓶", //单位
            count: 10, //数量
            expire_date: "2020-03-11" //有效期
          }
        ], //订单内药物信息
        extra_meta: {} //其他信息，备用
      },
      {
        key: "2",
        id: "2", //订单号
        date: new Date().getTime(), //订单日期
        certification_status: true, //证照情况
        supply_unit: "常德毕盛医药", //供货单位
        salesman_name: "吴雷", //销售员姓名
        salesman_phone: 18872637827, //销售员电话
        medicine_list: [
          {
            id: "123456", //药物信息编号（订单号+药物编号）
            medicine_name: "阿莫西林分散片", //药物名称
            produce_company: "湖南万众药业", //生产厂家名称
            approval_number: "gb28181", //批注文号
            size: "23.6", //药物规格
            formulation: "一型剂", //剂型
            batch_number: "xx3064", //批号
            unit_price: 130, //单价
            unit: "瓶", //单位
            count: 10, //数量
            expire_date: 1586763987 //有效期
          },
          {
            id: "12345678", //药物信息编号（订单号+药物编号）
            medicine_name: "氨苄西林分散片", //药物名称
            produce_company: "湖南万众药业", //生产厂家名称
            approval_number: "gb28181", //批注文号
            size: "24", //药物规格
            formulation: "一型剂", //剂型
            batch_number: "xx3064", //批号
            unit_price: 130, //单价
            unit: "瓶", //单位
            count: 10, //数量
            expire_date: 1586763987 //有效期
          }
        ], //订单内药物信息
        extra_meta: {} //其他信息，备用
      }
    ];
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
        title: "订单号",
        dataIndex: "id",
        key: "id",
        width: 200,
        fixed: "left"
      },
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
              <Row gutter={24} style={{ margin: "0px" }}>
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
        <Row gutter={24} style={{ margin: "0px", paddingTop: "5px" }}>
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
  ...state
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ItemQueryPanel));
