<template>
  <div class="header-wp">
    <div class="header">
      <div class="left">
            <span>哆采需求商务管理后台</span>
      </div>
      <div class="right">
          <span class="maginR">
              <span>{{usernameStore}}</span>
              <span class="imgbox">
                  <img src="../../../static/images/timg.jpg" alt="">
              </span>
          </span>
          <span>
              <span class="el-icon-switch-button goOutIcon"></span>
              <span class="goOut" @click="goOut">退出</span>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: 'subjectHead',  
  props:["newConstructor"],
  data(){
    return {
      logout_api:"/manager/logout",
    }
  },
  computed:{
      ...mapState({
          usernameStore:state=>state.manageStore.username,
      })
  },
  mounted(){
    if(this.newConstructor){
      $(".header").css("width","1200px");
    }else if(window.location.href.split("#")[1] === "/duocai/duocailist/manager"){
      $(".header").css({
        width:"100%",
        padding: "0 20px",
        boxSizing: "border-box",
      })
    }
  },
  methods:{
      goOut(){
          sessionStorage.removeItem("usernameM");
          sessionStorage.removeItem("roleM");
          this.axios.post(this.logout_api,{}).then(res=>{
            sessionStorage.removeItem("role");
            this.$message({
              showClose: true,
              message: '退出登录成功！',
              type: 'success'
            });
            this.$router.push({name:"manageLogin"});
          }).catch(error=>{
           
          })
      }
  }
}
</script>

<style lang="less" scoped>
.header-wp{
  background: #2e88ed;
  height: 70px;
  line-height: 70px;
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
        font-size: 24px;
        color: #fff;
      }
    }
    &>p{
      float: right;
      font-size: 18px;
      color: #2E88ED;
    }
  }
}
.right{
    float: right;
}
.right img{
    width: 100%;
    height: 100%
}
.imgbox{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 28px;
}
.imgbox img{
    vertical-align: middle;
    border-radius: 50px;
}
.goOut{
    cursor: pointer;
    color: rgba(255,255,255,0.8);
}
.maginR{
    margin-right:15px;
}
.maginR span{
    margin-left: 5px;
    color: rgba(255,255,255,0.8);
    font-size: 14px;
}
.goOutIcon{
    color: red;
    font-weight: 600;
}
    
</style>

