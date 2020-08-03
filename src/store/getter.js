export default {
  ecpParams: state => state.ecpParams,
  loginUser: state => state.loginUser,
  //需求页全局控制效验
  writeRules: state => state.writeRules,
  //需求页全局控制输入框禁用
  writeDisable: state => state.writeDisable,
  //审核状态数据
  checkDate: state => state.checkDate,
  //手机号
  phone:state => state.phone
}
