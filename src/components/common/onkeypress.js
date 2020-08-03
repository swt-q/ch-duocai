import {checkNumber} from '../../api/util'

export default {
  bind: function (el,binding) {
    el.onkeypress = function(e){
      return checkNumber(e)
    }
  }
}