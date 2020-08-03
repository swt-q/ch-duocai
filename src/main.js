// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import './assets/css/reset.css'
import './assets/css/eleui.less'

//封装请求

import {posta} from './api/http'
Vue.prototype.$post = posta;

import '@/components/common/msgtip/msgtip.js'
import '@/components/common/download/download.js'

//number类型能输入字母e 自定义指令
import VueOnkeypress from './components/common/index'
Vue.directive('VueOnkeypress', VueOnkeypress);

//图片放大
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview, {
  fullscreenEl: false // 关闭全屏按钮
})

//密码加密
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import {Form,FormItem,Row,Input,Checkbox,CheckboxButton,CheckboxGroup,Select,Option,OptionGroup,Autocomplete,Col,Table,TableColumn,Upload,Button,Dialog,DatePicker,Pagination,Message,MessageBox,Icon,Radio,Popover, Tooltip,Alert} from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Row);
Vue.use(Autocomplete);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Pagination);
//element UI Message消息提示框挂载。
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$msgbox = MessageBox;
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(DatePicker);
Vue.use(Icon);
Vue.use(Radio);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Alert);


Vue.config.productionTip = false


//bus总线用户 非父子组件之间的通讯
Vue.prototype.bus = new Vue();
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
