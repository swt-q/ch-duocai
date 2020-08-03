import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$download = function download(url,param) {
  axios.get(url, {
    responseType: 'blob',
    params:param
  }).then((res) => {
    let blob = new Blob([res.data], {
      type: res.headers["content-type"]
    });
    var filename = decodeURI(res.headers["content-disposition"]).split(";")[1].split("=")[1];
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
      const a = document.createElement('a');
      a.download = filename;
      a.href = e.target.result;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }).catch((err) => {
    console.log(err.message);
  })
}
