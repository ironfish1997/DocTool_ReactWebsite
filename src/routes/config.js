export default {
  menus: [
    // 菜单相关路由
    {
      key: "/app/main",
      title: "首页",
      auth: ["doctor_auth", "admin_auth"],
      icon: "mobile"
    },
    {
      key: "/app/treatment",
      title: "看病就诊服务",
      icon: "solution",
      auth: ["doctor_auth", "admin_auth"],
      subs: [
        {
          key: "/app/treatment/notification",
          auth: ["doctor_auth", "admin_auth"],
          title: "特殊情况通知"
        },
        {
          key: "/app/treatment/patientInfo",
          auth: ["doctor_auth", "admin_auth"],
          title: "病人信息管理"
        }
      ]
    },
    {
      key: "/app/publicHealth",
      title: "公共卫生服务",
      icon: "heart",
      auth: ["doctor_auth", "admin_auth"],
      subs: [
        {
          key: "/app/publicHealth/notification",
          auth: ["doctor_auth", "admin_auth"],
          title: "公共通知"
        },
        {
          key: "/app/publicHealth/specialDisease",
          auth: ["doctor_auth", "admin_auth"],
          title: "特殊病症复查"
        }
      ]
    },
    {
      key: "/app/medicineItems",
      title: "药物进销记录",
      icon: "form",
      auth: ["doctor_auth", "admin_auth"],
      subs: [
        {
          key: "/app/medicineItems",
          title: "订单管理"
        }
      ]
    },
    {
      key: "/app/admin",
      title: "系统管理",
      icon: "setting",
      auth: ["admin_auth"]
    }
  ],
  others: [] // 非菜单相关路由
};
