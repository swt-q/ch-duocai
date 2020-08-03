<template>
  <div class="elesign-wrap">
    <subject-blue-head
      :htitle="htitle"
      class="subject-class"
    ></subject-blue-head>
    <div class="content-wrap">
      <div class="content-div">
        <div class="content-left">
          <span class="left-num left-num1">1</span>
          <span class="left-text">实名认证</span>
          <svg>
            <line
              x1="150"
              y1="0"
              x2="150"
              y2="210"
              style="stroke :#C1C1C1;stroke-width:2"
              stroke-dasharray="10,5"
            ></line>
          </svg>
          <span class="left-num left-num2">2</span>
          <span class="left-text">完成签署</span>
          <svg class="svg-line">
            <line
              x1="150"
              y1="0"
              x2="150"
              y2="620"
              style="stroke :#C1C1C1;stroke-width: 2px;"
              stroke-dasharray="10,5"
            ></line>
          </svg>
          <i class="iconfont icon-arrow-down"></i>
        </div>
        <div class="content-middle">
          <p class="p1">您正在进行《{{ initData.fileName }}》的签署</p>
          <p class="p2">
            <span class="span-name">公司名称：{{ initData.companyName }}</span>
            <span class="span-code"
              >营业执照编号：{{ initData.companyLic }}</span
            >
          </p>
          <div class="pdf-wrap">
            <embed
              :src="initData.fileUrl"
              type="application/pdf"
              width="100%"
              height="100%"
              internalinstanceid="11"
            />
          </div>
        </div>
        <div class="content-right">
          <div class="submit-btn btn" @click="getAuthStatus">
            <i class="iconfont icon-tijiao i-icon"></i>
            <span>提交签署</span>
          </div>
          <div class="down-btn btn" @click="downloadPdf">
            <i class="iconfont icon-xiazai i-icon"></i>
            <span>下载协议</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 实名验证的弹窗 -->
    <el-dialog
      title="实名验证"
      :visible.sync="authDialog"
      width="530px"
      :center="true"
      :before-close="beforeCloseClick"
      v-if="authDialog"
    >
      <div class="auth-wrap">
        <div class="auth-div" v-show="!showEwm">
          <p class="p-tip">
            您还没有完成实名验证，验证成功后就可以操作在线签署了。
          </p>
          <p class="p-choose">选择验证方式：</p>
          <div class="choose-radio">
            <el-radio v-model="authType" label="1"> 手机运营商验证</el-radio>
            <el-radio v-model="authType" label="2">人脸识别验证</el-radio>
          </div>
          <keep-alive>
            <component
              :is="currentView"
              @showEwm="showEwmFun"
              :userInfo="userInfo"
              @authSuccess="authSuccessFun"
              ref="authCom"
            ></component>
          </keep-alive>
        </div>
        <div class="ewm-div" v-show="showEwm" :key="ewmCount">
          <p class="p-data" v-show="!ewmError">
            距离二维码过期还剩<span class="orange"
              ><countdown
                :time="alltime"
                ref="timeChild"
                @alltimeout="timeoutCall"
              ></countdown></span
            >，过期后请点刷新按钮重新获取二维码。
          </p>
          <commontext
            :propText="ewmText"
            v-show="ewmError"
            class="p-timeout"
          ></commontext>
          <div class="ewm-wrap">
            <div class="qrcode" ref="qrCodeUrl"></div>
            <div class="ewm-timeout" v-show="ewmError">
              <img src="../../static/images/ewm-mask.jpg" alt="" />
              <el-button type="primary" @click="reGetEwm">刷新</el-button>
            </div>
          </div>
          <div class="ewm-tip">
            <i class="iconfont icon-saoma"></i
            ><span>使用微信扫一扫完成验证 </span>
          </div>
          <p class="p-return blue" @click="showEwm = !showEwm">返回</p>
        </div>
      </div>
    </el-dialog>
    <!-- 短信验证码的弹窗 -->
    <el-dialog
      title="短信验证"
      :visible.sync="smsDialog"
      width="406px"
      :center="true"
      :before-close="beforeCloseClick"
      v-if="smsDialog"
    >
      <smsdialog
        :phone="userInfo.phone"
        @reAuth="reAuth"
        @authed="authedFun"
      ></smsdialog>
    </el-dialog>
    <subject-footer></subject-footer>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';


import subjectBlueHead from '@/components/common/subjectBlueHead.vue'
import countdown from '@/components/common/countdown.vue'
import subjectFooter from '@/components/common/subjectFooter.vue'
import authface from '@/components/elesign/authface'
import authphone from '@/components/elesign/authphone'
import commontext from '@/components/elesign/commontext'
import smsdialog from '@/components/elesign/smsdialog'


import authfromMin from '../components/mixin/authfrom.js'

const TIME_COUNT = 60;
export default {
  name: 'elesign',
  mixins: [authfromMin],
  data () {
    return {
      htitle: '在线签署',//标题
      authType: '1',//验证的方式
      authDialog: false,//实名验证的弹窗
      smsDialog: false,//短信验证的弹窗
      showEwm: false,//展示二维码的弹窗
      alltime: '3600000',
      componentsArr: ['authphone', 'authface'],
      ewmText: '二维码已过期，点刷新按钮重新获取二维码。',
      ewmError: false,
      ewmCount: 0,
      userInfo: {
        userName: '',
        idCardNo: '',
        phone: ''
      },
      bizCode: '',
      checkUrl: '',
      checkFaceTimer: null, // 轮询人脸是否认证成功
      checkFaceResultFlag: 0,//防止多次触发人脸成功后续的处理
      initData: {
        'contractId': '',
        'pdfId': '',
        'companyLic': '',
        'companyName': '',
        'fileName': '',
        'fileUrl': '',
        'pageType': 2
      },
      authId: '', //认证id
      signTimestamp: ''
    }
  },
  components: {
    subjectBlueHead,
    countdown,
    authface,
    authphone,
    commontext,
    smsdialog,
    subjectFooter
  },
  computed: {
    currentView () {
      return this.componentsArr[this.authType - 1];
    }
  },
  mounted () {
  },
  methods: {
    downloadPdf () {
      this.$download('signPdf/downloadPdf', { pdfId: this.initData.pdfId });
    },
    beforeCloseClick () {
      this.$info('您确认要放弃本次验证？', '提示', {
        confirmButtonText: '是的',
        cancelButtonText: '再想想',
      }).then(() => {
        this.authDialog = false;
        this.smsDialog = false;
      }).catch(() => {
      });
    },
    // 生成二维码
    creatQrCode () {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.checkUrl, // 需要转换为二维码的内容
        width: 180,
        height: 180,
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    showEwmFun (bizCode, checkUrl, authId) {
      //发请求
      this.showEwm = true;
      this.ewmCount++;
      this.ewmError = false;
      this.bizCode = bizCode;
      this.checkUrl = checkUrl;
      this.authId = authId;
      setTimeout(() => {
        this.creatQrCode();
        this.$refs.timeChild.countTime();
        this.getFaceResult();
      }, 200)
    },
    authSuccessFun (authId) {
      this.authId = authId;
      this.authDialog = false;
      this.$success('<p>实名验证成功，</p><p>系统将继续帮您完成签章，请耐心等待4-6秒</p>', '提示', {
        showCancelButton: false,
        showConfirmButton: false,
        showClose: false,
        closeOnHashChange: true
      })
      this.getCustomerSign();
    },
    authedFun () {
      this.smsDialog = false;
      this.$success('<p>手机号验证成功，</p><p>系统将继续帮您完成签章，请耐心等待4-6秒</p>', '提示', {
        showCancelButton: false,
        showConfirmButton: false,
        showClose: false,
        closeOnHashChange: true
      })
      this.getCustomerSign();
    },
    getCustomerSign () {
      this.$post('signContract/getCustomerSign', {
        params: {
          pdfId: this.initData.pdfId,
          authenticationId: this.authId
        }
      }).then((res) => {
        const result = res.data;
        this.$router.push({
          name: 'eleresult',
          query: {
            contractId: result.data.contractId
          }
        })
      });
    },

    getFaceResult () {
      clearInterval(this.checkFaceTimer);
      this.checkFaceTimer = setInterval(() => {
        setTimeout(this.checkFaceResult, 0)
      }, 5000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.checkFaceTimer);
      })
    },
    checkFaceResult () {
      this.$post('authInfo/checkFaceIdResult', {
        params: {
          bizCode: this.bizCode,
        }
      }).then((res) => {
        const result = res.data;
        //fail 继续轮询
        if (result.data.code != 'fail') {
          clearInterval(this.checkFaceTimer);
          if (this.checkFaceResultFlag == 0) {
            if (result.data.code == '0') {
              this.checkFaceResultFlag = 1;
              this.authDialog = false;
              this.$success('<p>人脸验证识别成功，</p><p>系统将继续帮您完成签章，请耐心等待4-6秒</p>', '提示', {
                showCancelButton: false,
                showConfirmButton: false,
                showClose: false,
                closeOnHashChange: true
              })
              this.getCustomerSign();
            } else {
              //人脸验证失败了
              this.$info(result.data.msg, '提示', {
                showCancelButton: false,
                confirmButtonText: '确定'
              }).then(() => {
                //重新获取二维码
                this.reGetEwm();
              })
            }
          }

        }
      });
    },
    timeoutCall () {
      this.ewmError = true;
      this.commontext = '二维码已过期，点刷新按钮重新获取二维码。'
      clearInterval(this.checkFaceTimer);
    },
    getAuthStatus () {
      this.$post('authInfo/getAuthStatus', {}).then((res) => {
        const result = res.data;
        if (result.data.flag == true) {
          //验证成功了
          this.smsDialog = true;
          this.authId = result.data.authId;
        } else {
          this.authDialog = true;
        }
        Object.assign(this.userInfo, result.data);
      });
    },
    reAuth () {
      this.authDialog = true;
      this.smsdialog = false;
    },
    reGetEwm () {
      this.$refs.authCom.goAuth(1);
    },
    handleScroll () {
      const scrolled =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrolled > 224) {
        $('.content-right').css('top', ($(document).scrollTop() - 216) + 'px');
      } else {
        $('.content-right').css('top', '0px');
      }
    },
    getInit () {
      this.$post('signContract/goSignContract', {
        params: {
          signTimestamp: this.signTimestamp
        }
      }).then((res) => {
        const result = res.data;
        Object.assign(this.initData, result.data)
        if (this.initData.pageType == 1) {
          //跳转到结果页
          this.$router.push({
            name: 'eleresult',
            query: {
              contractId: result.data.contractId
            }
          })
        }
      });
    }
  },
  mounted () {
    this.signTimestamp = this.$route.query.signTimestamp;
    window.addEventListener('scroll', this.handleScroll)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', this.handleScroll)
    })
    this.getInit()
  },
  beforeDestroy () {
    $('.el-button').click();
  }
}
</script>
<style lang="less" scoped>
.elesign-wrap {
  font-size: 14px;
  width: 100%;
  background: #fff;
  .content-wrap {
    width: @all-width;
    margin: 0 auto;
    padding-top: 55px;
    margin-bottom: 42px;

    .content-div {
      position: relative;
      width: 1066px;
      margin: 0 auto;
      overflow: hidden;
      .content-left {
        float: left;
        width: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 66px;
        .left-num {
          display: inline-block;
          width: 30px;
          height: 30px;
          color: #fff;
          border-radius: 50%;
          line-height: 30px;
          text-align: center;
        }
        .left-num1 {
          background: rgba(255, 133, 35, 1);
          border: 1px solid rgba(255, 255, 255, 1);
          box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.07);
        }
        .left-num2 {
          background: rgba(193, 193, 193, 1);
          border: 1px solid rgba(255, 255, 255, 1);
          box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.07);
        }
        .left-text {
          margin-top: 10px;
          margin-bottom: 10px;
          font-weight: 400;
          font-size: 14px;
        }
        .svg-line {
          height: 608px;
        }
        i {
          display: inline-block;
          color: #c1c1c1;
        }
      }
      .content-middle {
        float: left;
        width: 880px;
        margin-left: 20px;
        margin-right: 20px;
        background: rgba(255, 255, 255, 1);
        .p1 {
          font-size: 18px;
          color: rgba(37, 37, 37, 1);
        }
        .p2 {
          margin-top: 17px;
          margin-bottom: 17px;
          font-size: 14px;
          color: rgba(0, 0, 0, 1);
          opacity: 0.8;
          .span-code {
            margin-left: 50px;
          }
        }
        .pdf-wrap {
          height: 920px;
        }
      }
      .content-right {
        padding-top: 60px;
        position: absolute;
        right: 0px;
        top: 0px;
        .btn {
          width: 86px;
          height: 86px;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
          i {
            color: #fff;
            margin-top: 16px;
            margin-bottom: 10px;
            font-size: 24px;
            display: block;
          }
          span {
            font-size: 14px;
            color: #fff;
          }
        }
        .submit-btn {
          background: #18b1fc;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        .down-btn {
          background: rgba(255, 255, 255, 1);
          border: 1px solid #a0a0a0;
          margin-top: 20px;
          i {
            color: #a0a0a0;
          }
          span {
            color: #a0a0a0;
          }
        }
      }
    }
  }
  .auth-wrap {
    background: #fff;
    z-index: 30;
    .title {
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 16px;
      background: #f7f7f7;
      i {
        float: right;
        padding-right: 20px;
      }
    }
    .auth-div {
      padding: 20px 45px 30px 45px;
      .p-tip {
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      }
      .p-choose {
        height: 64px;
        line-height: 64px;
        font-size: 14px;
      }
    }
  }
  .ewm-div {
    .p-data {
      margin-top: 18px;
      margin-bottom: 14px;
      padding-left: 57px;
    }
    .p-timeout {
      margin-top: 18px;
      margin-bottom: 14px;
      text-align: center;
      color: #e80101;
    }
    .ewm-wrap {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      border: 1px solid rgba(0, 0, 0, 0.15);
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      .ewm-timeout {
        .v-center(200px, 200px);
        position: absolute;
        top: 0px;
        left: 0px;
        img {
          width: 100%;
          height: 100%;
        }
        .el-button {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -28px;
          margin-top: -16px;
        }
      }
    }
    .ewm-tip {
      .v-center(200px, 40px);
      background: rgba(46, 136, 237, 1);
      color: #fff;
      margin: 20px auto 10px;
      span {
        margin-left: 10px;
      }
    }
    .p-return {
      text-align: center;
      padding-bottom: 30px;
      cursor: pointer;
    }
  }
  .auth-form /deep/ .el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
  }
  .confirmDialog {
    .icon-div {
      text-align: center;
      margin-top: 30px;
      margin-bottom: 24px;
      i {
        font-size: 50px;
        color: #f5c498;
      }
    }
    p {
      text-align: center;
      margin-top: 24px;
      margin-bottom: 28px;
      color: rgba(60, 62, 68, 1);
    }
  }
}
</style>

