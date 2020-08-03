<template>
  <div class="footer-wrap">
    <p class="footer-top">
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010602100419"
        style="color: #fff;"
      >
        <img src="../../../static/images/gawb.png" />京公网安备 11010602100419号</a
      >
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a
        href="http://www.beian.miit.gov.cn"
        style="color: #fff;"
        target="_blank"
        >ICP备案号：蜀ICP备18018244号-2
      </a>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a>ICP证号：川B2-20180568</a>
    </p>
    <p class="footer-middle">
      Copyright © <span class="yearNum"></span> 四川长虹云计算有限公司 版权所有
    </p>
    <p class="footer-bottom"> 客服电话：	400-817-6667 </p>
  </div>
</template>

<script>
export default {
  name: 'subjectFooter'
}
</script>

<style lang="less" scoped>
.footer-wrap {
  width: 100%;
  background-color: #232323;
  color: #ffffff;
  font-size: 12px;
  padding: 20px 5px 30px 5px;
  box-sizing:border-box;
  a {
    color: #ffffff;
    img {
      vertical-align: middle;
      margin-right: 6px;
      margin-top: -3px;
    }
  }
  p {
    text-align: center;
    &.footer-middle {
      margin-top: 10px;
    }
    &.footer-bottom {
      margin-top: 10px;
    }
  }
}
</style>

