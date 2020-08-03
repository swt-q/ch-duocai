export default {
   data() {
    return {
      authForm: {
        phone: '',
        smscode: ''
      },
      authRules: {
        phone: [{
          validator: this.phoneVaild,
          trigger: 'blur'
        }],
        smscode: [{
          validator: this.smsCodeVaild,
        }]
      }
    }
  },
  methods: {
    phoneVaild(rule, value, callback){
        const regPhone = /^1\s*[3456789]\s*(\d\s*){9}$/;
        if (value && !regPhone.test(value)) {
          callback(new Error('手机号码格式不正确，请重输'));
        } else {
          callback();
        }
    },
    smsCodeVaild(rule, value, callback){
      //发送请求
      if(!value){
        callback(new Error('请输入短信验证码'));
      }else{
        this.$post('authInfo/checkSmsCode', {
          params: {
            checkCode: value
          }
        }).then((res) => {
          if(res.data.data.code == 'fail'){
            callback(new Error('短信验证码错误，请重输'));
          }else{
            callback();
          }
        });
      }
    }
  }
}
