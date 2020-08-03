<template>
  <div>
    <div class="common_dialog"></div>
    <div class="dialog">
        <div class="title">
            <h3><slot name="slot1"></slot></h3>
            <i class="iconfont icon-guanbi" @click="()=>{ $emit('closePop') }"></i>
        </div>
        <div class="contani">
            <slot name="slot2"></slot>
            <div class="save">
                <div v-if="btnEmpty1" class="empty" @click="()=>{ $emit('btnEmpty1') }"><slot name="btnEmpty1" ></slot></div>
                <div v-if="btnEmpty2" class="empty" @click="()=>{ $emit('btnEmpty2') }"><slot name="btnEmpty2" ></slot></div>
                <div v-if="btnFull1" class="full" @click="()=>{ $emit('btnFull1') }"><slot name="btnFull1" ></slot></div>
                <div v-if="btnEmpty3" class="empty" @click="()=>{ $emit('btnEmpty3') }"><slot name="btnEmpty3" ></slot></div>
                <div v-if="btnEmpty4" class="blueEmpty" @click="()=>{ $emit('btnEmpty4') }"><slot name="btnEmpty4" ></slot></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popUp',
  props:['btnEmpty1','btnEmpty2','btnFull1','btnEmpty3','btnEmpty4'],
  data () {
    return {
      
    }
  },
  methods:{

  },
  mounted(){

  }
}
</script>
<style lang="less" scoped>
.save{
    width: 300px;
    overflow: hidden;
    height: 40px;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;
    padding-bottom: 2px;
    display: flex;
    justify-content: center;
    &>div{
        width: 118px;
        height: 100%;
        font-size: @two-size;
        margin-right: 29px;
        cursor: pointer;
    }
   .full{
        background: @blue;
        border: 1px solid transparent;
        color: #fff;
        float: left;
    }
   .empty{
        background: #fff;
        border: 1px solid #D3D3D3;
        color: #6B6B6B;
        float: left;
    }
    .blueEmpty{
        background: #fff;
        border: 1px solid @blue;
        color: @blue;
        float: left;
    }
    &>div:last-child{
        margin-right: 0;
    }
}
.dialog{
    min-width: 410px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left:50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    z-index: 201;
    .title{
        background: #E9E9E9;
        text-align: center;
        position: relative;
        height: 44px;
        line-height: 44px;
        &>h3{
            font-size: @two-size;
            color: @dialog-color;
        }
        &>i{
            cursor: pointer;
            color: #bababa;
            position: absolute;
            top: 50%;
            right: 16px;
            -webkit-transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
        }
    }
    .contani{
        background: #fff;
        padding: 32px;
        overflow: hidden;
    }
}
/deep/ .dialog{
    width: 1100px;
}
</style>


