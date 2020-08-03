export default {
    passwordMd5 :"ECPSSE",
    role:sessionStorage.getItem("role") ? sessionStorage.getItem("role"):"",//角色
    ecpParams: {},
    loginUser: {
      id: '',
      name: ''
    },
    //需求页全局控制效验
    writeRules:true,
    //需求页全局控制输入框禁用
    writeDisable:false,
    //审核状态数据
    checkDate:{},
    //手机号
    phone:sessionStorage.getItem("phone") ? sessionStorage.getItem("phone") :''
}
  
