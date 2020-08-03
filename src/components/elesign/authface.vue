<template>
  <div class="face-auth-wrap">
    <el-form
      ref="authForm"
      :model="authForm"
      label-width="100px"
      label-position="right"
      class="auth-form"
      :rules="authRules"
      :hide-required-asterisk="true"
    >
      <el-form-item label="手机号码：" prop="phone">
        <el-input
          v-model="authForm.phone"
          placeholder="请输入您的常用手机号码"
          class="form-input input-phone"
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
    <div class="getErm" @click="goAuth(0)">获取验证二维码</div>
  </div>
</template>

<script>
import authfromMin from '../mixin/authfrom.js'
import sendsms from '@/components/common/sendsms.vue'
import commontext from '@/components/elesign/commontext'
export default {
  name: '',
  data () {
    return {
      tipText: '后面签署过程中会用到此手机号进行短信验证',
      authType: '2'
    };
  },
  mixins: [authfromMin],
  components: {
    sendsms,
    commontext
  },
  computed: {},
  watch: {},
  methods: {
    goAuth (flag) {
      if (flag == '0') {
        this.$refs['authForm'].validate((valid) => {
          if (valid) {
            this.toGetErm();
          } else {
            return false;
          }
        });
      } else {
        this.toGetErm();
      }
    },
    toGetErm () {
      this.$post('authInfo/goAuth', {
        params: {
          type: 2,
          phoneNo: this.authForm.phone
        }
      }).then((res) => {
        const result = res.data;
        if (result.data.code == '0') {
          this.$emit('showEwm', result.data.bizCode, result.data.checkUrl, result.data.authId)
        } else {
          this.$info(result.data.msg, '提示', {
            showCancelButton: false,
            confirmButtonText: '确定',
            closeOnClickModal: false
          })
        }
      });
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
  },
  created () {

  },
  mounted () {

  },
}
</script>

<style lang='less' scoped>
.face-auth-wrap {
  padding-top: 20px;
  .getErm {
    .v-center(317px, 32px);
    cursor: pointer;
    background: rgba(46, 136, 237, 1);
    color: #fff;
    margin-left: 100px;
  }
  .getCode {
    margin-left: 10px;
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
  }
  .div-submit {
    .v-center(66px, 32px);
    background: rgba(46, 136, 237, 1);
    color: #fff;
    cursor: pointer;
    margin-left: 100px;
    border-radius: 4px;
    &.disabled {
      background: #a1a1a1;
      color: #fff;
    }
  }
  .tip-text {
    position: absolute;
    top: 40px;
    left: 100px;
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
  .auth-form /deep/ .el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
  }
}
</style>