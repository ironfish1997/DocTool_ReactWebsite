import React, { Component } from "react";
import { Table, Tag, Divider, Button } from "antd";
import { connect } from "react-redux";
import { withAdminAuth } from "@/HOC/withAdminAuth";
import {
  getAllUsers,
  frozeAccount,
  unFrozeAccount,
  deleteAccount
} from "@/action/account";
import * as notificationUtil from "@/action/common/openNotification";
import "./index.less";
const { Column } = Table;

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_list: []
    };
  }
  componentDidMount() {
    getAllUsers(localStorage.getItem("session_id").replace(/"/g, ""))
      .then(data => {
        this.setState({
          user_list: data
        });
      })
      .catch(error => {
        notificationUtil.openNotificationWithIcon(
          "error",
          "信息读取好像出了一点小问题，请刷新页面重试"
        );
        this.setState({
          user_list: []
        });
      });
  }

  doDeleteAccount = account_id => {
    if (account_id === "admin") {
      notificationUtil.openNotificationWithIcon("error", "您不能删除超级用户");
      return;
    }
    deleteAccount(
      localStorage.getItem("session_id").replace(/"/g, ""),
      account_id
    )
      .then(data => {
        let user_list_new = JSON.parse(JSON.stringify(this.state.user_list));
        user_list_new = user_list_new.filter(v => {
          return v.account_id !== account_id;
        });
        console.log(user_list_new);
        notificationUtil.openNotificationWithIcon("info", "删除账户成功");
        this.setState({
          user_list: user_list_new
        });
      })
      .catch(error => {
        notificationUtil.openNotificationWithIcon(
          "error",
          "删除账户失败,请稍后再试"
        );
      });
  };

  doFrozeOrUnFrozeAccount = (status, account_id) => {
    if (status) {
      if (account_id === "admin") {
        notificationUtil.openNotificationWithIcon(
          "error",
          "您不能冻结超级用户"
        );
        return;
      }
      frozeAccount(
        localStorage.getItem("session_id").replace(/"/g, ""),
        account_id
      )
        .then(data => {
          let user_list_new = JSON.parse(JSON.stringify(this.state.user_list));
          user_list_new.map((v, k) => {
            if (v.account_id === account_id) {
              v.status = data.status;
            }
            return null;
          });
          console.log(user_list_new);
          notificationUtil.openNotificationWithIcon("info", "冻结账户成功");
          this.setState({
            user_list: user_list_new
          });
        })
        .catch(error => {
          notificationUtil.openNotificationWithIcon(
            "error",
            "冻结账户失败,请稍后再试"
          );
        });
    } else {
      if (account_id === "admin") {
        notificationUtil.openNotificationWithIcon(
          "error",
          "您不能解冻超级用户"
        );
        return;
      }
      unFrozeAccount(
        localStorage.getItem("session_id").replace(/"/g, ""),
        account_id
      )
        .then(data => {
          let user_list_new = JSON.parse(JSON.stringify(this.state.user_list));
          user_list_new.map((v, k) => {
            if (v.account_id === account_id) {
              v.status = data.status;
            }
            return null;
          });
          console.log(user_list_new);
          notificationUtil.openNotificationWithIcon("info", "解冻帐户成功");
          this.setState({
            user_list: user_list_new
          });
        })
        .catch(error => {
          notificationUtil.openNotificationWithIcon(
            "error",
            "解冻账户失败,请稍后再试"
          );
        });
    }
  };
  render() {
    return (
      <div className="adminPanel">
        <Table dataSource={this.state.user_list} bordered rowKey="account_id">
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
                <Button
                  size="small"
                  type="primary"
                  key="frozeAccount"
                  onClick={() =>
                    this.doFrozeOrUnFrozeAccount(
                      record.status,
                      record.account_id
                    )
                  }
                >
                  冻结/解冻账户
                </Button>
                <Divider type="vertical" />
                <Button size="small" type="primary" key="updateAuth">
                  修改权限
                </Button>
                <Divider type="vertical" />
                <Button
                  size="small"
                  type="danger"
                  key="deleteAuth"
                  onClick={() => this.doDeleteAccount(record.account_id)}
                >
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

const mapStateToProps = state => ({
  account: state.account.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAdminAuth(AdminPanel));
