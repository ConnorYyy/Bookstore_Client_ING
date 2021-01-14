import router from './router'
import store from "./store/store";
import {Message} from "element-ui";
router.beforeEach((to, from, next) => {
  console.log("=======路由跳转需要匹配！！=======")
  console.log(to.matched);
  // let token = localStorage.getItem("token");
  // let user = JSON.parse(sessionStorage.getItem("userInfo"));
  let token = store.state.token;
  let user = store.state.userInfo;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("=======该页面需要登录！！=======")
    console.log("是否已经登录 >>>>> " + (token ? "是" : "否"))
    if (!token) {  // 是否登录
      Message({
        type: 'waring',
        message: "未登录,请先登录！",
        duration: 2000
      })
      setTimeout(() => {
        next({
          path: '/login',
        })
      }, 2000);
    } else { //如果登录，判断页面权限与用户权限是否相符
      if (to.matched.some(record => record.meta.requiresManage)) {
        console.log("=======该页面需要管理员权限！！=======")
        console.log("是否具有管理员权限 >>>>> " + (user.manage ? "是" : "否"))
        if(!user.manage) { //是否为管理员
          Message({
            type: 'waring',
            message: "抱歉，该页面需要管理员权限！",
            duration: 2000
          })
        } else {
          next();
        }
      } else if(to.matched.some(record => record.meta.requiresUser)){
        console.log("=======该页面需要客户权限！！=======")
        console.log("是否具有客户权限 >>>>> " + (!user.manage ? "是" : "否"))
        if(user.manage){ //是否为客户
          Message({
            type: 'waring',
            message: "抱歉，该页面需要客户权限！",
            duration: 2000
          })
        }else {
          next();
        }
      } else{
        console.log("=======该页面不需要登录！！=======")
        next(); //确保一定要调用 next()
      }
    } 
  } else {
    next();
  }
})
