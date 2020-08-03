<template>
  <div class="result-wrap">
    <subject-blue-head
      :htitle="htitle"
      class="subject-class"
    ></subject-blue-head>
    <div class="success-wrap" v-show="successFlag">
      <i class="iconfont icon-chenggong1"></i>
      <p class="p-tip">您已成功完成《{{ initData.contractName }}》的签署</p>
      <p class="p-msg">
        <span class="span-name"> 公司名称： {{ initData.companyName }} </span>
        <span class="span-lic">营业执照编号：{{ initData.companyLic }} </span>
      </p>
      <div class="div-btn">
        <div class="down-btn btn"><a @click="downloadPdf">下载协议</a></div>
        <div class="scan-btn btn">
          <a :href="initData.fileUrl" target="_blank">查看协议</a>
        </div>
      </div>
    </div>
    <div class="fail-wrap" v-show="!successFlag">
      <i class="iconfont icon-iconfontxiaogantanhao"></i>
      <p class="p-tip">您签署的《{{ initData.contractName }}》出错了</p>
      <p class="p-msg">
        <span class="span-name"> 公司名称：{{ initData.companyName }} </span>
        <span class="span-lic">营业执照编号：{{ initData.companyLic }} </span>
      </p>
      <p class="p-error-tip">根据出错提示信息，请重新进行签署。</p>
      <p class="p-error">{{ initData.msg }}</p>
      <div class="go-sign" @click="goSign">立即去签署</div>
    </div>
    <subject-footer></subject-footer>
  </div>
</template>

<script>
import subjectBlueHead from '@/components/common/subjectBlueHead'
import subjectFooter from '@/components/common/subjectFooter.vue'
export default {
  name: 'eleresult',
  data () {
    return {
      htitle: '在线签署',
      contractId: '',
      successFlag: true,
      initData: {
        'companyName': '',
        'companyLic': '',
        'fileUrl': '',
        'signTimestamp': ''
      },
    }
  },
  components: {
    subjectBlueHead,
    subjectFooter
  },
  methods: {
    downloadPdf(){
      this.$download('signContract/downloadPdf',{contractId:this.contractId});
    },
    getInit () {
      this.$post('signContract/goResult', {
        params: {
          contractId: this.contractId
        }
      }).then((res) => {
        const result = res.data;
        Object.assign(this.initData, result.data)
        if (result.data.code == '1') {
          //成功了
          this.successFlag = true
        } else {
          this.successFlag = false
        }
      });
    },
    goSign () {
      this.$router.push({
        name: 'elesign',
        query: {
          signTimestamp: this.initData.signTimestamp
        }
      })
    },
    downloadExcel (url, fileName) {
      // console.log('cccc');
      const a = document.createElement('a')
      a.setAttribute('download', fileName)
      a.setAttribute('target', '_blank')
      a.setAttribute('href', url)
      a.click()
    }
  },
  mounted () {
    this.contractId = this.$route.query.contractId;
    this.getInit()
  }
}
</script>

<style lang="less" scoped>
.result-wrap {
  color: rgba(53, 53, 53, 1);
  i {
    margin: 0 auto;
    font-size: 70px;
    color: #ee8b3f;
  }
  .p-tip {
    font-size: 18px;
    color: #ee8b3f;
    margin-top: 25px;
    margin-bottom: 35px;
  }
  .p-msg {
    font-size: 14px;
    .span-lic {
      margin-left: 30px;
    }
    span {
      color: rgba(53, 53, 53, 0.8);
    }
  }
  .success-wrap {
    padding-top: 190px;
    text-align: center;
    padding-bottom: 254px;
    .div-btn {
      font-size: 14px;
      margin-top: 60px;
      .btn {
        display: inline-block;
        .v-center(135px, 40px);
        cursor: pointer;
      }
      .down-btn {
        background: rgba(46, 136, 237, 1);
        color: #fff;
        margin-bottom: 0px;
        a {
          color: #fff;
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        &:hover {
          opacity: 0.8;
          a {
            color: #fff;
          }
        }
      }
      .scan-btn {
        border: 1px solid rgba(46, 136, 237, 1);
        color: rgba(46, 136, 237, 1);
        margin-left: 32px;
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: rgba(46, 136, 237, 1);
        }
        &:hover {
          color: #fff;
          background: rgba(46, 136, 237, 1);
          a {
            color: #fff;
          }
        }
      }
    }
  }
  .fail-wrap {
    padding-top: 190px;
    text-align: center;
    padding-bottom: 254px;
    .p-error-tip {
      margin-top: 58px;
      margin-bottom: 20px;
    }
    .p-error {
      color: #c50000;
    }
    .go-sign {
      display: inline-block;
      padding: 12px 28px;
      background: rgba(46, 136, 237, 1);
      color: #fff;
      margin-top: 43px;
      cursor: pointer;
    }
  }
}
</style>
