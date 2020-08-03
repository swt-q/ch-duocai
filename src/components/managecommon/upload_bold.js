import axios from "axios";
function get_bold_file(url,data){
    axios.get(url,data,{
        headers :{
            responseType: 'blob'  
        },
    }).then(res=>{   //application/zip
        var _bold = new Blob([res.data],{type:"application/zip"})

        var url =  (window.URL) ? window.URL.createObjectURL(_bold) : window.webkitURL.createObjectURL(_bold);
        //创建一个a标签元素，设置下载属性，点击下载，最后移除该元素      responseType: 'arraybuffer'   
        let link = document.createElement('a');
        var filename = res.headers["content-disposition"].split(";")[1].split("=")[1];
        document.body.appendChild(link);
        link.href = url;

        link.style.opacity = '0';

        link.download = filename;
        // link.setAttribute('download',filename);

        link.click();

        (window.URL) ? window.URL.revokeObjectURL(_bold):window.webkitURL.revokeObjectURL(_bold);

      }).catch(err=>{
          window.console.log(err);
      });
      
};

export default get_bold_file;