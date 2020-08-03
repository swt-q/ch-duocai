<template>
  <div class="phone-wrap">
    <p class="p-msg">
      <span class="msg-name">法人姓名：{{ this.userInfo.userName }} </span
      ><span class="msg-code">法人身份证号：{{ this.userInfo.idCardNo }}</span>
    </p>
    <el-form
      ref="authForm"
      :model="authForm"
      label-width="100px"
      label-position="right"
      class="auth-form"
      :rules="authRules"
      :hide-required-asterisk="true"
    >
      <el-form-item label="法人手机号：" prop="phone">
        <el-input
          v-model="authForm.phone"
          placeholder="请输入同上面展示的法人身份证号匹配的手机号"
          class="form-input input-phone"
          @focus="showTip"
        ></el-input>
      </el-form-item>
      <commontext class="tip-text" :propText="tipText"></commontext>
      <el-form-item label="短信验证码：" class="sms-lable" prop="smscode">
        <el-input
          v-model="authForm.smscode"
          class="sms-input form-input"
          :validate-event="false"
        ></el-input>
        <sendsms :phone="authForm.phone" :authType="authType"></sendsms>
      </el-form-item>
    </el-form>
    <div class="div-submit" @click="goAuth">提交</div>
  </div>
</template>

<script>
import authfromMin from '../mixin/authfrom.js'
import sendsms from '@/components/common/sendsms.vue'
import commontext from '@/components/elesign/commontext'

export default {
  name: '',
  mixins: [authfromMin],
  data () {
    return {
      tipText: '后面签署过程中会用到此手机号进行短信验证',
      clickFlag:false,
      authType:'1'
    };
  },
  props: {
    userInfo: {
      type: Object
    }
  },
  components: {
    sendsms,
    commontext
  },
  computed: {
  }
  ,
  watch: {},
  methods: {
    goAuth () {
      if(this.clickFlag){
        this.$message('请不要重复点击');
        return false;
      }
      this.$refs['authForm'].validate((valid) => {
        if (valid) {
          this.$post('authInfo/goAuth', {
            params: {
              type: 1,
              phoneNo: this.authForm.phone
            }
          }).then((res) => {
            const result = res.data;
            if (result.data.code == '0') {
              this.clickFlag = true;
              this.$emit('authSuccess', result.data.authId)
            } else {
              if(result.data.msg == '不一致'){
                  result.data.msg = "请输入同上面展示的法人身份证号匹配的手机号";    
              }
              this.$info(result.data.msg, '提示', {
                showCancelButton: false,
                confirmButtonText: '确定',
                closeOnClickModal: false
              })
            }
          });
        } else {
          return false;
        }
      });
    },
    showTip () {
      this.$refs['authForm'].clearValidate('phone');
      this.tipText = '请输入同上面展示的法人身份证号匹配的手机号';
    },
    phoneVaild (rule, value, callback) {
      const regPhone = /^1\s*[3456789]\s*(\d\s*){9}$/;
      if (value === '') {
        this.tipText = '';
        callback(new Error('请输入手机号'));
      } else if (!regPhone.test(value)) {
        this.tipText = '';
        callback(new Error('手机号码格式不正确，请重输'));
      } else {
        this.tipText = '后面签署过程中会用到此手机号进行短信验证';
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
            checkCode: value,
            phoneNo:this.authForm.phone,
            type:this.authType
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
</script>

<style lang='less' scoped>
.phone-wrap {
  .p-msg {
    margin-top: 16px;
    margin-bottom: 16px;
    span {
      color: rgba(53, 53, 53, 1);
      opacity: 0.8;
    }
    .msg-code {
      margin-left: 60px;
      font-size: 14px;
    }
  }
  .sms-lable {
    .sms-input {
      width: 180px;
    }
  }
  .auth-form {
    position: relative;
    .form-p {
      color: rgba(53, 53, 53, 1);
      font-size: 14px;
      position: absolute;
      top: 48px;
      left: 100px;
    }
    .form-p-orange {
      color: #ee8b3f;
      position: absolute;
      top: 48px;
      left: 100px;
    }
    .tip-text {
      position: absolute;
      top: 40px;
      left: 100px;
    }
  }
  .div-submit {
    .v-center(66px, 32px);
    background: rgba(46, 136, 237, 1);
    color: #fff;
    cursor: pointer;
    margin-left: 100px;
  }
  .auth-form {
    /deep/ .el-input__inner {
      height: 30px !important;
      line-height: 30px !important;
    }
    /deep/ .input-phone .el-input__inner {
      width: 317px;
      padding: 0 10px;
    }
    /deep/ .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 28px;
    }
    /deep/ .el-form-item--small .el-form-item__error {
      padding-top: 8px;
    }
  }
}
</style>