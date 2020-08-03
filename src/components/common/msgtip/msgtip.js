import Vue from 'vue'
// 确认信息/报错
Vue.prototype.$info = function alert(msg = '', title = '提示', settings = {}) {
    const settingsAll = {  
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true,
      type:'warning',
      closeOnClickModal: false
    }
    Object.assign(settingsAll,settings)
    return this.$confirm(`${msg}`, title, settingsAll)
}

//success
Vue.prototype.$success = function alert(msg = '', title = '提示', settings = {}) {
  const settingsAll= {  
    confirmButtonText: '确定',
    showCancelButton:false,
    dangerouslyUseHTMLString: true,
    type:'success',
    closeOnClickModal: false
  }
    Object.assign(settingsAll,settings)
    return this.$confirm(`${msg}`, title, settingsAll)
}
