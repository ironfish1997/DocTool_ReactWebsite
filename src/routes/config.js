export default {
  menus: [
    // 菜单相关路由
    {
      key: "/app/main",
      title: "首页",
      icon: "mobile"
    },
    {
      key: "/app/treatment",
      title: "看病就诊服务",
      icon: "solution",
      subs: [
        {
          key: "/app/treatment/notification",
          title: "特殊情况通知"
        },
        {
          key: "/app/treatment/patientInfo",
          title: "病人信息管理"
        }
      ]
    },
    {
      key: "/app/publicHealth",
      title: "公共卫生服务",
      icon: "heart",
      subs: [
        {
          key: "/app/publicHealth/notification",
          title: "公共通知"
        },
        {
          key: "/app/publicHealth/specialDisease",
          title: "特殊病症复查"
        }
      ]
    },
    {
      key: "/app/medicineItems",
      title: "药物进销记录",
      icon: "form",
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
      icon: "setting"
    }
  ],
  others: [] // 非菜单相关路由
};
