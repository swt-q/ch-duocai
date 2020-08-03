import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getter'
//manage store  数据。
import manageStore from "./manage/index.js"
import testStore from "./test/index.js"
Vue.use(Vuex);


export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules:{
        manageStore,
        testStore
    }
})
