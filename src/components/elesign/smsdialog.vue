<template>
  <div class="sms-wrap">
    <p>
      将为<span>{{ phone }}</span
      >手机发送验短信验证码
    </p>
    <el-form
      ref="authForm"
      :model="authForm"
      label-width="0"
      label-position="right"
      class="sms-form"
      :rules="authRules"
      :hide-required-asterisk="true"
    >
      <el-form-item label="" prop="smscode">
        <el-input
          v-model="authForm.smscode"
          placeholder=""
          class="form-input"
          :validate-event="false"
        ></el-input>
        <sendsms :phone="phone" class="send-class" :authType="authType"></sendsms>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="submit-btn" @click="goVisa"
      >提交</el-button
    >
    <!-- <el-button type="primary" plain class="submit-btn" @click="reAuth"
      >重新实名验证</el-button
    > -->
  </div>
</template>

<script>
import authfromMin from '../mixin/authfrom.js'
import sendsms from '@/components/common/sendsms'
export default {
  name: '',
  mixins: [authfromMin],
  data () {
    return {
      clickFlag:false,
      authType:'0'
    };
  },
  props: {
    phone: {
      type: String,
      default: ''
    }
  },
  components: {
    sendsms
  },
  computed: {},
  watch: {},
  methods: {
    goVisa () {
      if(this.clickFlag){
        this.$message('请不要重复点击');
        return false;
      }
      this.$refs['authForm'].validate((valid) => {
        if (valid) {
          this.clickFlag = true;
          this.$emit('authed');
        }
      });
    },
    reAuth () {
      this.$emit('reAuth')
    },
    smsCodeVaild(rule, value, callback){
      //发送请求
      if(!value){
        callback(new Error('请输入短信验证码'));
      }else{
        this.$post('authInfo/checkSmsCode', {
          params: {
            checkCode: value,
            phoneNo:this.phone,
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
.sms-wrap {
  padding-top: 40px;
  padding-left: 50px;
  p {
    span {
      color: #ff8523;
    }
  }
  .sms-form {
    margin-top: 26px;
    margin-bottom: 30px;
  }
  /deep/ .el-input {
    width: 173px;
    .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
  }
  .submit-btn {
    margin-bottom: 30px;
  }
}
</style>