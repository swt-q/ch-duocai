<template>
  <div class="header-wp">
    <div class="header">
      <div class="left">
        <img src="../../../static/images/logo2.png" alt="">
        <i></i>
        <span>{{htitle}}</span>
      </div>
      <div class="right">
        账户名称：{{this.$store.state.phone}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'subjectHead',
  data () {
    return {
    }
  },
  props: {
    htitle: {
      type: String,
      default: '在线签署'
    }
  }
}
</script>

<style lang="less" scoped>
.header-wp{
  background: #2E88ED;
  height: 102px;
  line-height: 102px;
  .header{
    width: @all-width;
    margin: 0 auto;
    color:#fff;
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
        color: #fff;
        font-size: 24px;
      }
    }
    .right{
      float: right;
    }
    &>p{
      float: right;
      font-size: 18px;
      color: #2E88ED;
    }
  }
}
</style>

