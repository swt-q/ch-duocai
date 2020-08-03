<template>
  <div class="fixed_window">
    <div @click="()=>{ $emit('passClick','供应商') }">供应商信息</div>
    <div @click="()=>{ $emit('passClick','采购商品') }">采购商品信息 </div>
    <div @click="()=>{ $emit('passClick','采购方') }">采购方信息</div>
    <div v-if="$route.query.role != 'manger'" class="tel_wp" @mouseenter="enterClick()" @mouseleave="leaveClick()">
        <p class="tel">客服<br/>电话 </p>
        <div class="tel_conent">
            <p>400-817-6667</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fixedWindow',
  data () {
    return {
      
    }
  },
  methods:{
      enterClick(){
        $(".tel_conent").animate({right:'71px'});
      },
      leaveClick(){
          $(".tel_conent").stop().animate({right:'-60px'});
      }
  },
  mounted(){

  }
}
</script>
<style lang="less" scoped>
.tel_conent{
    position: absolute;
    right: -60px;
    width: 100px;
    height: 46px;
    text-align: center;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background: @blue;
     z-index: -1;
     &>p{
         width: 96px;
     }
}
.fixed_window{
    position: fixed;
    right: 0;
    top: 50%;
    -webkit-transform: translateX(0) translateY(-50%);
    -webkit-transform: translateX(0) translateY(-50%);
    -moz-transform: translateX(0) translateY(-50%);
    -ms-transform: translateX(0) translateY(-50%);
    transform: translateX(0) translateY(-50%);
    border-top: 1px solid #ccc;
    &>div{
        width: 46px;
        height: 46px;
        text-align: center;
        display: flex;
        align-items: center;
        line-height: 22px;
        border-bottom: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        font-size: @three-size;
        color: @little-color;
        padding: 12px;
        background: #fff;
        cursor: pointer;
    }
    &>div:hover{
        color: #fff;
        background: @blue;
    }
    .tel_wp{
        position: relative;
        margin-top:43px;
        justify-content: center;
        border-top: 1px solid #ccc;
    }
}
</style>


