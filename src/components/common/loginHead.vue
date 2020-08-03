<template>
  <div class="head-content">
      <div class="left">
        <a href="https://jiahuaduola.com/homepage" style="color:'#575757'" class="_hover">佳华哆啦首页</a>
        <p>HI，欢迎来到佳华哆啦</p>
        <p>{{this.$store.state.phone}}</p>
      </div>
      <a class="right _hover" tag="a" href="https://jiahuaduola.com/guidelines/bBase" style="color:'#575757'">新手指引</a> 
  </div>
</template>

<script>
export default {
  name: 'headContent',
  
}
</script>

<style lang="less" scoped>
.head-content{
    width: @all-width;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    background: #F5F5F5;
    .left{
        float: left;
        color: #3B3B3B;
        font-size: @three-size;
         &>a{
           float: left;
           margin-right: 20px;
         }
        &>p{
            float: left;
            padding-right: 15px;
        }
        &>p:first-child{
            padding-right: 20px;
        }
    }
    .right{
        float: right;
        font-size: @three-size;
        color: #606060;
    }
}
._hover:hover{
  color: #2e88ed;
}
</style>

