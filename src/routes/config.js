export default {
  menus: [
    // 菜单相关路由
    {
      key: "/app/dashboard/index",
      title: "首页",
      icon: "mobile",
      component: "Dashboard"
    },
    {
      key: "/app/treatment",
      title: "看病就诊服务",
      icon: "solution",
      subs: [
        {
          key: "/app/treatment/notification",
          title: "特殊情况通知",
          component: "EmergencyNotificationPanel"
        },
        {
          key: "/app/treatment/patientInfo",
          title: "病人信息管理",
          component: "PatientInfoPanel"
        }
      ]
    },
    {
      key: "/app/publicHealth",
      title: "公共卫生服务",
      icon: "heart",
      subs: [
        { key: "/app/publicHealth/notification", title: "公共卫生服务通知", component: "Buttons" },
        { key: "/app/publicHealth/specialDisease", title: "特殊病症复查", component: "Icons" },
      ]
    },
    // {
    //   key: "/app/animation",
    //   title: "动画",
    //   icon: "rocket",
    //   subs: [
    //     {
    //       key: "/app/animation/basicAnimations",
    //       title: "基础动画",
    //       component: "BasicAnimations"
    //     },
    //     {
    //       key: "/app/animation/exampleAnimations",
    //       title: "动画案例",
    //       component: "ExampleAnimations"
    //     }
    //   ]
    // },
    // {
    //   key: "/app/table",
    //   title: "表格",
    //   icon: "copy",
    //   subs: [
    //     {
    //       key: "/app/table/basicTable",
    //       title: "基础表格",
    //       component: "BasicTable"
    //     },
    //     {
    //       key: "/app/table/advancedTable",
    //       title: "高级表格",
    //       component: "AdvancedTable"
    //     },
    //     {
    //       key: "/app/table/asynchronousTable",
    //       title: "异步表格",
    //       component: "AsynchronousTable"
    //     }
    //   ]
    // },
    // {
    //   key: "/app/form",
    //   title: "表单",
    //   icon: "edit",
    //   subs: [
    //     {
    //       key: "/app/form/basicForm",
    //       title: "基础表单",
    //       component: "BasicForm"
    //     }
    //   ]
    // },
    // {
    //   key: "/app/chart",
    //   title: "图表",
    //   icon: "area-chart",
    //   subs: [
    //     { key: "/app/chart/echarts", title: "echarts", component: "Echarts" },
    //     { key: "/app/chart/recharts", title: "recharts", component: "Recharts" }
    //   ]
    // },
    // {
    //   key: "/subs4",
    //   title: "页面",
    //   icon: "switcher",
    //   subs: [{ key: "/login", title: "登录" }, { key: "/404", title: "404" }]
    // },
    // {
    //   key: "/app/auth",
    //   title: "权限管理",
    //   icon: "safety",
    //   subs: [
    //     { key: "/app/auth/basic", title: "基础演示", component: "AuthBasic" },
    //     {
    //       key: "/app/auth/routerEnter",
    //       title: "路由拦截",
    //       component: "RouterEnter",
    //       auth: "auth/testPage"
    //     }
    //   ]
    // },
    // {
    //   key: "/app/cssModule",
    //   title: "cssModule",
    //   icon: "star",
    //   component: "Cssmodule"
    // },
    // {
    //   key: "/app/extension",
    //   title: "功能扩展",
    //   icon: "bars",
    //   subs: [
    //     {
    //       key: "/app/extension/queryParams",
    //       title: "问号形式参数",
    //       component: "QueryParams",
    //       query: "?param1=1&param2=2"
    //     }
    //   ]
    // }
  ],
  others: [
    {
      key: "/app/editAccountInfo",
      title: "信息修改",
      component: "EditAccountInfo"
    },
    {
      key: "/app/treatment/patientInfo/search",
      title: "搜索",
      component: "TreatmentSearchPanel"
    }
  ] // 非菜单相关路由
};
