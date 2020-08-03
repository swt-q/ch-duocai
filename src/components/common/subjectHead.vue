<template>
  <div class="header-wp">
    <div class="header">
      <div class="left">
        <img src="../../../static/images/logo.png" alt="">
        <i></i>
        <span>{{htitle}}</span>
      </div>
      <!-- <p>返回卖家中心</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'subjectHead',
  props: {
    htitle: {
      type: String,
      default: '哆采采购需求提交系统'
    }
  }
}
</script>

<style lang="less" scoped>
.header-wp{
  background: #fff;
  height: 102px;
  line-height: 102px;
  .header{
    width: @all-width;
    margin: 0 auto;
    .left{
      float: left;
      &>img{
        vertical-align: middle;
      }
      &>i{
        display: inline-block;
        vertical-align: middle;
        width: 1px;
        height: 38px;
        background: #e5e5e5;
        margin: 0 23px 0 36px;
      }
      &>span{
        vertical-align: middle;
        color: #1B1B1B;
        font-size: 18px;
      }
    }
    &>p{
      float: right;
      font-size: 18px;
      color: #2E88ED;
    }
  }
}
</style>

