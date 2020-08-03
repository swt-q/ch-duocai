import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base:'duocai',
  routes: [{
      path: '/duocai',
      component: resolve => require(['@/pages/duocai'], resolve),
      redirect: '/duocai/userLogin',
      children: [
        //需求编辑页
        {
          path: '/duocai/detail',
          name: 'detail',
          component: resolve => require(['@/pages/detail'], resolve)
        }
      ]
    },
    //签章页面
    {
      path: '/duocai/elesign',
      name: 'elesign',
      component: resolve => require(['@/pages/elesign'], resolve)
    },
    {
      path: '/duocai/eleresult',
      name: 'eleresult',
      component: resolve => require(['@/pages/eleresult'], resolve)
    },
    //manage 登录
    {
      path: '/duocai/managelogin',
      name: "manageLogin",
      component: resolve => require(['@/pages/manage/managelogin'], resolve),
    },
    //需求列表页
    {
      path: '/duocai/duocailist/:flag',
      name: "duocailist",
      component: resolve => require(['@/pages/manage/requirelist'], resolve),
    },
    {
      path: '/ecp',
      name: 'ecp',
      component: resolve => require(['@/pages/pcLogin/ecpPlat'], resolve)
    },
    //变更历史
    {
      path: '/duocai/changehistory',
      name: "changehistory",
      component: resolve => require(['@/pages/manage/changehistory'], resolve),
    },
    {
      // vue同步登录完成页
      path: '/sync-login',
      name: 'sync-login',
      component: resolve => require(['@/pages/pcLogin/syncLogin'], resolve)
    },
    {
      // vue同步登出完成页
      path: '/sync-logout',
      name: 'sync-logout',
      component: resolve => require(['@/pages/pcLogin/syncLogout'], resolve)
    },
    //测试登录----正式不上!
    {
      path: "/duocai/userLogin",
      name: "/userLogin",
      component: resolve => require(["@/pages/testLogin/testLogin"], resolve)
    }
  ]
})
