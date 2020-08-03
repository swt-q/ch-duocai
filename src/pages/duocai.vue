<template>
  <div>
      <div v-if="role === 'user'">
        <login-head></login-head>
        <subject-head></subject-head>
      </div>
      <manageHeader v-if="role === 'manger'"/>
      <router-view/>
      <subject-footer></subject-footer>
  </div>
</template>

<script>
import manageHeader from "@/components/managecommon/manageHeader.vue"
import loginHead from '@/components/common/loginHead.vue'
import subjectHead from '@/components/common/subjectHead.vue'
import subjectFooter from '@/components/common/subjectFooter.vue'
export default {
  name: 'duocai',
  data(){
    return{
      role:"user"
    }
  },
  components:{
    loginHead,
    subjectHead,
    subjectFooter,
    manageHeader
  },
  methods:{

  },
  mounted(){
    let { role,checkType,lookType } = this.$route.query;
    this.role = role;
    if(checkType || lookType){
      this.$nextTick(()=>{
        $(".el-textarea__inner").addClass("input_p");
      })
      $(".el-input__inner").addClass("input_p");
    }else{
      if($(".el-input__inner").hasClass("input_p")){
         $(".el-input__inner").removeClass("input_p");
      };
      this.$nextTick(()=>{
        if($(".el-textarea__inner").hasClass("input_p")){
          $(".el-textarea__inner").removeClass("input_p");
        }
      })
    }
    this.$nextTick(()=>{
      $('.el-select-dropdown__item').find('span').addClass("select_li");
     })
  }
}
</script>

<style>
.select_li{
  color: #353535;
}
</style>
<style lang="less" scoped>
/deep/ .el-form-item .el-form-item__label{
  color: #353535;
  padding: 0;
}
/deep/ .el-input__inner {
    border-radius:0;
    border: 1px solid #d9d9d9;
    font-size: 14px;
  }
</style>

