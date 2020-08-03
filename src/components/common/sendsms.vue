<template>
  <div class="countdown-wrap">
    <div class="getCode" @click="sendSms" v-show="!isDisabled">
      获取短信验证码
    </div>
    <div class="getCode disabled" v-show="isDisabled">
      重新发送（{{ count }}）
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'sendsms',
  data () {
    return {
      timer: null, //定时器
      count: '', // 计数
      isDisabled: false, //控制显示
    }
  },
  props: {
    phone: {
      type: String,
      default: ''
    },
    authType: {
      type: String,
      default: ''
    }
  },
  methods: {
    sendSms () {
      const regPhone = /^1\s*[3456789]\s*(\d\s*){9}$/;
      if (this.phone === '') {
        this.$info('接收短信手机号码不能为空，请重新输入', '提示', {
          showCancelButton: false
        })
      } else if (!regPhone.test(this.phone)) {
        //格式检验没通过
        this.$info('手机号码格式不正确，请重输', '提示', {
          showCancelButton: false
        })
      } else {
        //发送短信验证码
        this.$post('authInfo/sendPhoneCode', {
          params: {
            phoneNo: this.phone,
            type:this.authType
          }
        }).then((res) => {
          this.timeDown()
        });
      }
    },
    timeDown () {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.isDisabled = true
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.isDisabled = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.countdown-wrap {
  display: inline-block;
  .getCode {
    .v-center(122px, 28px);
    line-height: 27px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid @blue;
    color: @blue;
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
    &.disabled {
      background: rgba(161, 161, 161, 1);
      border: 1px solid rgba(161, 161, 161, 1);
      color: #fff;
    }
  }
}
</style>

