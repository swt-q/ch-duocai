export default {
    token(state,value){
        localStorage.token = value;
        state.token = value;
    },
    //手机号
    savePhone(state,params){
        sessionStorage.setItem("phone",params);
        state.phone = params;
    },
    //保存角色
    setRoleAM(state,params){
        sessionStorage.setItem("role",params);
        state.role = params;
    },
    //保存用户username
    saveUsernameHandle(state,params){
        sessionStorage.setItem("usernameM",params);
        state.username = params;
    },
    ecpParams(state, value) {
        state.ecpParams = value;
      },
    loginUser(state, value) {
        state.loginUser = value;
    },
    //需求页全局控制效验
    writeRules(state, boole) {
        state.writeRules = boole;
    },
    //需求页全局控制输入框禁用
    writeDisable(state, boole) {
        state.writeDisable = boole;
    },
    //审核状态数据
    checkDate(state, obj) {
        state.checkDate = obj;
    }
}


  
