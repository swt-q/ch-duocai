<template>
  <div class="changhong">
    <div class="chtit">
        <h1>{{title}}</h1>
        <h3 v-if="$route.query.role == 'manger'" @click="goHistory()">历史查看页</h3>
    </div>
    <div class="containt">
        <h3>长虹佳华信息:</h3>
        <div class="info">
            <p>四川长虹佳华数字技术有限公司</p>
            <p>注册地址：绵阳市涪城区长虹大道南段西一巷12号</p>
            <p>统一社会信用代码：9151070367836756X2</p>
        </div>
        <div class="info bottom23">
            <p class="self">开户银行：建行绵阳高新支行</p>
            <p>账号：51001657937051502817</p>
        </div>
        <div v-if="passStatus && $route.query.role != 'manger' && passStatus != '1' && passStatus != '2' && passStatus != '4' && passStatus != '8'" class="downbtn"><a class="downloadbtn" href="https://fileserver.jiahuaduola.com/duocai/长虹佳华公司工商资料.zip">下载公司信息</a></div>
        <h4>长虹佳华销售人员信息：</h4>
        <el-form ref="form" :model="form" :inline="true" :rules="rules" :validate-on-rule-change="false">
            <!-- filterable -->
            <!-- :filter-method="dataFilter" -->
            <el-form-item label="销售人员姓名：" prop="value" style="margin-left:40px">
                <el-select v-model="form.value" :disabled="disableMethods()" placeholder="请选择" size="small" style="width:340px" :popper-append-to-body="false" @change="()=>{ $refs.form.validateField('value') }" @blur="()=>{ $refs.form.validateField('value') }">
                    <div class="search-div" slot="empty">
                        <input type="text" v-model="searchName">
                        <img v-show="lodingFlag" src="../../../static/images/loding.gif" alt="">
                    </div>
                    <div class="search-div">
                        <input type="text" v-model="searchName">
                        <img v-show="lodingFlag" src="../../../static/images/loding.gif" alt="">
                    </div>
                    <el-option class="self-class" v-for="item in form.options" :key="item.sellerInfoId" :label="item.sellerName" :value="item.sellerInfoId"></el-option>  
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-checkbox label="暂无销售人员" :disabled="disableCheck()" v-model="form.checked" name="type" @change="changeMethods($event)"></el-checkbox>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'changhong',
  props:['typeId','passStatus'],
  data () {
    return {
        form: {
            name: '',
            value: '',
            valueCheckbox:'0',
            personName:'',
            options: [

            ],
            checked:null,
        },
        noPerson:false,
        saveOptionsValue:'',
        ableCheck:false,
        searchName:'',
        nameValue:'',
        //模糊搜索销售人员姓名菊花图
        lodingFlag:false,
    }
  },
  methods:{
    goHistory(){
        let newUrl = this.$router.resolve({ name:'changehistory',query:{ currentId:this.typeId } });
        window.open(newUrl.href, "_blank");
    },
    disableCheck(){
        let check = false;
        // if(this.$route.query.checkType != undefined && this.$store.getters.checkDate.sellerInfoName){
        if(this.$route.query.checkType != undefined){
            check = false;
        }else if(this.$store.getters.writeDisable){
            check = true;
        }
        return check;
    },
    disableMethods(){
        let noPerson = false;
        let curruntBlooean = this.noPerson;
        if(this.$route.query.editType != undefined){
            if(curruntBlooean){
                noPerson = true;
            }else{
                noPerson = false;
            }
        }else if(this.$route.query.checkType != undefined && this.$store.getters.writeDisable){
            noPerson = false;
            if(curruntBlooean){
                noPerson = true;
            }else{
                noPerson = false;
            }
        }else if(this.$route.query.checkType == undefined && this.$store.getters.writeDisable){
            noPerson = true;
        }else if(this.$route.query.checkType == undefined){
            noPerson = true;
            if(curruntBlooean){
                noPerson = true;
            }else{
                noPerson = false;
            }
        }else{
        }
        return noPerson;
    },
    changeMethods(e){
        if(e){
            this.saveOptionsValue = this.form.value;
            this.form.value = '无';
            this.form.valueCheckbox = '1';
            this.$emit('messageNone',false);
            this.noPerson = true;
            this.$refs.form.clearValidate('value');
        }else{
            if(this.saveOptionsValue){
                this.form.value = this.saveOptionsValue;
            }
            this.form.valueCheckbox = '0';
            this.$emit('messageNone',true);
            this.noPerson = false;
            setTimeout(()=>{
                this.$refs.form.clearValidate('value');
            },0)
        }
    },
    getSale(){
        this.$post('/orderInfo/listSellerInfo').then(res=>{
            this.form.options = [];
            if(res.data.code == '0'){
                let data  = res.data.data;
                if(data){
                    this.form.options.push(...data);
                }
            }
        })
    },
    getSaleName(){
        this.lodingFlag = true;
        this.$post('/orderInfo/listSellerInfoByName',{
            params:{
                fuzzySellerName:this.nameValue
            }
        }).then(res=>{
            this.lodingFlag = false;
            this.form.options = [];
            if(res.data.code == '0'){
                let data  = res.data.data;
                if(data){
                    this.form.options.push(...data);
                }
            }
        })
    }
  },
  computed:{
      title(){
          let res = '';
          if(this.$route.query.editType){
              res = '编辑需求';
          }else if(this.$route.query.lookType){
              res = '查看需求';
          }else if(this.$route.query.checkType){
              res = '审核需求';
          }else{
              res = '提交需求';
          }
          return res;
      },
      rules(){
          return{
            value:[
                { required: this.$store.getters.writeRules, message: '不能为空', trigger: ['change'] },
            ]
          }
      },
      listenCheckData() {
        return this.$store.getters.checkDate;
      }
  },
  watch:{
    searchName(val){
        this.nameValue = val;
        if (val.length > 0) {
            var that = this;
            // 记录当前函数触发的时间
            var nowTime = Date.now();
            if (this.lastTime && nowTime - this.lastTime < 1000) {
                clearTimeout(this.timer);
                this.timer = setTimeout(function () {
                    // 记录上一次函数触发的时间
                    this.lastTime = nowTime;
                    // 修正this指向问题
                    that.getSaleName();
                }, 1000);
            }else{
                this.lastTime = nowTime;
                this.getSaleName();
            }
        }else if(val.length <= 0){
            this.getSale();
        }
    },
    listenCheckData:{
        handler(val){
            if(this.$store.getters.checkDate.sellerInfoId == '1'){
                this.noPerson = true;
                this.form.value = '无';
                this.form.checked = true;
                this.form.valueCheckbox = '1'
            }else{
                if(this.$route.query.lookType != undefined){
                    this.form.value = this.$store.getters.checkDate.sellerInfoName;
                }else{
                    this.form.value = this.$store.getters.checkDate.sellerInfoId;
                }
            }
            
        },
        deep:true
    }
  },
  mounted(){
   
    this.$nextTick(()=>{
        this.$refs.form.clearValidate()
    })
    if(this.$route.query.lookType == undefined){
        this.getSale();
    }
    
  }
}
</script>
<style lang="less" scoped>
/deep/ .self-class{
    color: #353535;
}
.search-div{
    width: 90%;
    height: 30px;
    line-height: 30px;
    margin: 10px auto 14px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>input{
        width: 100%;
        border: none;
        outline: none;
        padding-left: 11px;
        font-size: @three-size;
        color: @little-color;
    }
    &>img{
        width: 16px;
        height: 16px;
        margin-right: 8px;
    }
    
}
.changhong{
    margin-bottom: 22px;
    .chtit{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 22px;
        &>h1{
            color: @big-color;
            font-size: @one-size;
        }
        &>h3{
            cursor: pointer;
            color: @blue;
            font-size: @three-size;
        }
    }
    .containt{
        border: 1px dashed @blue;
        background: #f7f9fb;
        padding: 20px 28px 15px;
        &>h3{
            color: @big-color;
            font-size: @two-size;
            font-weight: bold;
            margin-bottom: 23px;
        }
        .info{
            color: @little-color;
            font-size: @three-size;
            margin-bottom: 18px;
            display: flex;
            &>p{
                margin-right: 86px;
            }
            &>p:last-child{
                margin-right: 0;
            }
            .self{
                margin-right:100px;
            }
        }
        .bottom23{
            margin-bottom: 23px;
        }
        .downbtn{
            width: 130px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border: 1px solid @blue;
            font-size: @three-size;
            margin-bottom: 33px;
            cursor: pointer;
            &>a{
                width: 100%;
                height: 100%;
                display: inline-block;
                color: @blue;
            }
        }
        .downbtn:hover{
            background: @blue;
            border: 1px solid transparent;
        }
        .downbtn:hover .downloadbtn{
            color: #fff;
        }
        &>h4{
            color: @big-color;
            font-size: @two-size;
            margin-bottom: 23px;
        }
    }
}
</style>


