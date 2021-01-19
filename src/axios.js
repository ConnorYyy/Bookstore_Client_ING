import axios from 'axios'
import router from './router'
import store from './store/store'
import {TARGET_PATH} from '../config/index'
import { Message } from 'element-ui'

axios.defaults.baseURL = TARGET_PATH

// 前置拦截
axios.interceptors.request.use(config => {
  // 登录流程控制中，根据本地是否存在token判断用户的登录情况
  // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
  // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
  // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。

    const token = localStorage.getItem("token"); 
    console.log("发送前的token:"+token);
    config.headers.Authorization = token;
    // console.log("config.headers.Authorization:"+config.headers.Authorization);
    // token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    console.log("请求出错了");
    Promise.error(error)
  }
)


axios.interceptors.response.use(
  response => {
    // console.log("返回的response:"+response);
    let data = response.data;
    // console.log("response.data"+response.data);
    // console.log("response.data.code"+data.code);
    switch(response.data.code){
      // case 444:
      case 401:
        console.log("=======后端返回的编码是401=======")
        // this.$store.commit("REMOVE_INFO");//清空本地信息
        store.state.token = ''
        store.state.userInfo = {}
        localStorage.setItem("token", '')
        sessionStorage.setItem("userInfo", JSON.stringify(''))
        Message({
          type: 'waring',
          message: "请先登录！",
          duration: 1000
        })
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }, 1000);
        return Promise.reject(response);
        break;
      case 403:
        console.log("返回403");
        Message({
          type: 'waring',
          message: "未登录,请先登录！",
          duration: 1000
        })
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }, 1000);
        return Promise.reject(response);
        break;
      default:
       break;
    }
    return response;
  },
  error => {
    console.log("error:"+error);
    const status = error.response ? error.response.status : null
    console.log("error.response:"+error.response);
    console.log("status:"+status);
    return error
  }
)

