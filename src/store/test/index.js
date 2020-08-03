import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
    token:"",
    username:"631eab61c817e1ea3a7ae5e993d20515",
    //username:sessionStorage.getItem("usernameT") ? sessionStorage.getItem("usernameT"):"swtTest", //用户名
    password:"0e848f708b1550083fe3074b358302d8",
    role:sessionStorage.getItem("roleT") ? sessionStorage.getItem("roleT"):"user",//角色
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
        sessionStorage.setItem("roleT",params);
        state.role = params;
    },
    //保存用户username
    saveUsernameHandle(state,params){
        sessionStorage.setItem("usernameT",params);
        state.username = params;
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