import React, { Component } from "react";
import { Table, Tag, Divider, Button } from "antd";
import "./index.less";
const { Column } = Table;

class AdminPanel extends Component {
  state = {
    user_list: []
  };
  componentDidMount() {
    const user_list = [
      {
        key: "1",
        id: "5cac4ab99d00e58cc6824738",
        name: "admin",
        area: "china,hunan,changde,wuling",
        contacts: {
          wechat: null,
          qq: null,
          phone_number: "18587391090",
          email: null
        },
        extra_meta: null,
        account_id: "admin",
        account_password: "21232f297a57a5a743894a0e4a801fc3",
        status: true,
        account_permission: ["doctor_auth", "admin_auth"]
      },
      {
        key: "2",
        id: "5cac4ab99d00e58cc682dsad8",
        name: "liyong.liu",
        area: "china,hunan,changde,wuling",
        contacts: {
          wechat: null,
          qq: null,
          phone_number: "18587391090",
          email: null
        },
        extra_meta: null,
        account_id: "1481980097@qq.com",
        account_password: "21232f297a57a5a743894a0e4a801fc3",
        status: true,
        account_permission: ["admin_auth"]
      }
    ];
    this.setState({
      user_list
    });
  }
  render() {
    // const { user_list } = this.state;
    //把状态和权限数据更改一下格式
    // let user_list_new = JSON.parse(JSON.stringify(user_list));
    // user_list_new.map((v, k) => {});
    return (
      <div className="adminPanel">
        <Table dataSource={this.state.user_list} bordered>
          <Column
            title="账号"
            dataIndex="account_id"
            key="account_id"
            width="200"
          />
          <Column title="用户名" dataIndex="name" key="name" width="200" />
          <Column
            title="状态"
            dataIndex="status"
            key="status"
            width="200"
            render={status => (status ? <span>正常</span> : <span>冻结</span>)}
          />
          <Column
            title="权限"
            dataIndex="account_permission"
            key="account_permission"
            width="300"
            render={status => (
              <span>
                {status.map((v, k) => (
                  <Tag color="blue" key={k}>
                    {v}
                  </Tag>
                ))}
              </span>
            )}
          />
          <Column
            title="操作"
            key="operation"
            render={record => (
              <span>
                <Button size="small" type="primary" key="frozeAccount">
                  冻结/解冻账户
                </Button>
                <Divider type="vertical" />
                <Button size="small" type="primary" key="updateAuth">
                  修改权限
                </Button>
                <Divider type="vertical" />
                <Button size="small" type="danger" key="deleteAuth">
                  删除账户
                </Button>
              </span>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default AdminPanel;
