import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
    token:"",
    //username:"d30dc7dc9d2515c169c77e22675fdbd7",//manager
    username:sessionStorage.getItem("usernameM") ? sessionStorage.getItem("usernameM"):"", //用户名
    //password:"0e848f708b1550083fe3074b358302d8",
    password:sessionStorage.getItem("passwordM") ? sessionStorage.getItem("passwordM"):"", //123456
    role:sessionStorage.getItem("roleM") ? sessionStorage.getItem("roleM"):"",//角色
    close_demand:{},  //目标、关闭需求/重置还款日期/...
    close_demand_U:{}    //卖家列表页数据
};

const actions = {
    //保存用户角色
    setRoleHandle({commit},params){
        commit("setRoleAM",params);
    },
};

const mutations = {
    //保存角色
    setRoleAM(state,params){
        sessionStorage.setItem("roleM",params);
        state.role = params;
    },
    //保存用户username
    saveUsernameHandle(state,params){
        sessionStorage.setItem("usernameM",params);
        state.username = params;
    },
    //保存用户密码
    savaPasswordHandle(state,params){
        sessionStorage.setItem("passwordM",params);
        state.password = params;
    },
    //卖家列表页数据
    close_demand_M(state,params){
        state.close_demand = params;
    },
    //买家列表页数据
    close_demand_U(state,params){
        // console.log(params,"数据！！！");
        state.close_demand_U = params;
    },
}

const getters = {

};

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced:true
}
