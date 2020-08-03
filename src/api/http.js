import axios from 'axios'
// import qs from 'qs';
// import store from '../store/store.js'
import { url } from './baseUrl.js'
import router from '../router'
import {Message} from 'element-ui';
axios.defaults.headers.post['Content-Type'] = 'application/json;';
axios.defaults.withCredentials=true;
axios.defaults.timeout = 30000;

function getCookie(key) {
  var cookies = document.cookie;
  if (cookies.length > 0) {
    var start = cookies.indexOf(key + "=");
    if (start < 0) {
      return "";
    }
    var end = cookies.indexOf(";", start);
    if (end < 0) {
      end = cookies.length;
    }
    return cookies.substring(start + key.length + 1, end);
  }
}


// request拦截器
axios.interceptors.request.use(
  config => {
    const token = getCookie('token_duocai');
    let { url } = config;
    // let arrApi = ["/user/login","user/fromEcpLogin",/manager/login];
    if(url.indexOf("/user/login") > -1){
      //开发用登录不处理！
    }else if((!token && sessionStorage.getItem("role") === "manger") || url.indexOf("/manager/login") > -1) {
      window.location.href = window.location.href.split("#")[0] + "#/duocai/manageLogin";
    }else if(!token && url.indexOf("/user/login") === -1 && url.indexOf("user/fromEcpLogin") === -1){
      window.location.href = "https://jiahuaduola.com/login";
    };
    /* const token = this.getCookie('token_duocai')
    token && (config.headers['ECP-COOKIE'] = token); */
    // console.log(config)
    return config;

  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// respone拦截器
axios.interceptors.response.use(
  response => {
    var arr = ['301', '302', '303', '304', '305', '306'];
    if(response.data.code == "2001"){
      Message({
        showClose: true,
        message: response.data.msg,
        type: 'error'
      });
    }else if(arr.includes(response.data.code)) {
      //登录页
      //测试环境跳到 https://test.jiahuaduola.com/
      window.location.href = 'https://www.jiahuaduola.com/login'
      // router.replace({ path: '/404' })
    } else if (response.data.code == '1001') {
      Message({
        showClose: true,
        message: response.data.msg,
        type: 'error'
      });
      //判断状态
      if(sessionStorage.getItem("role") === "manger"){
        router.replace({name:"duocailist",params:{flag:"manager"}});
      }else if(sessionStorage.getItem("role") === "user"){
        router.replace({name:"duocailist",params:{flag:"user"}});
      };
    }else if(response.data.code != '0' && response.data.code != '1000' && response.data.code){
      Message({
        showClose: true,
        message: response.data.msg,
        type: 'error'
      });
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      Message({
        showClose: true,
        message: '因网络异常，上次操作未成功，您可进行重试',
        type: 'error'
      })
    }
    return Promise.reject(error);
  });

export const posta = (url, param) => {
  return axios.post(url, null, param).then(res => res)
};
// export const posta = (url,param) => axios.post(url,qs.stringify(param));

//环境切换
// console.log(process.env)
/* if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api'
} else {
  axios.defaults.baseURL = process.env.API_ROOT
  axios.defaults.baseURL = '/api'
} */
if (process.env.NODE_ENV == 'production') { //生产环境
  axios.defaults.baseURL = url+'duocai-server'
  // axios.defaults.baseURL = 'https://www.jiahuaduola.com/duocai-server'
} else if (process.env.NODE_ENV == 'development') { //开发环境
  axios.defaults.baseURL = '/api'
};

// export default ;

// export default {axios,posta}
