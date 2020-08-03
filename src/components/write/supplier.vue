<template>
  <div class="supplie">
    <div class="containt">
        <h3>供应商信息：</h3>
        <el-form ref="form" :model="form" :inline="true" :rules="rules" style="margin-left:78px" :validate-on-rule-change="false">
            <el-form-item label="供应商：" ref="name" prop="value">
                <el-select :disabled="$store.getters.writeDisable" ref="select" v-model="form.value" placeholder="请选择供应商" filterable :filter-method="dataFilter" size="small" style="width:340px" @change="()=>{ $refs.form.validateField('value') }" @blur="()=>{ $refs.form.validateField('value') }">
                    <el-option v-for="item in form.options" :key="item.supplierInfoId" :label="item.companyName" :value="item.supplierInfoId">
                        <span style="float: left;color: #858585;">{{item.companyName}}</span>
                        <span @click.stop="editClick(item.supplierInfoId)" style="float: right;color: #353535;">编辑</span>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <p v-if="$route.query.checkType != undefined || $route.query.lookType != undefined" @click="()=>{ popup = true }">
            <span>查看</span>
        </p>
        <p v-else @click="openAdd()">
            <span v-if="companyData">列表中没有，</span>
            <span>立即新建供应商</span>
        </p>
    </div>
    <pop-up v-show="popup" @closePop="()=>{ popup = false }" :btnFull1="btnOpen" :btnEmpty4="btnClose" :btnEmpty3="btnOpen" @btnFull1="saveClick('supply')" @btnEmpty3="()=>{ popup=false }" @btnEmpty4="falseClose()">
        <template slot="slot1" v-if="$route.query.lookType || $route.query.checkType">查看供应商信息</template>
        <template slot="slot1" v-else>添加供应商信息</template>
        <template slot="slot2">
            <el-form ref="supply" :model="supply" :rules="rules" label-width="162px" :validate-on-rule-change="false">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="供应商公司全称：" prop="companyName">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.companyName" placeholder="请输入供应商公司全称" maxlength="128" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="供应商公司地址：" prop="companyAddress">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.companyAddress" placeholder="请输入供应商公司地址" maxlength="255" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="供应商法人代表：" prop="legalPerson">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.legalPerson" placeholder="请输入供应商法人代表姓名" maxlength="64" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="资质：" prop="aptitude">
                            <el-select :disabled="$store.getters.writeDisable" v-model="supply.aptitude" placeholder="请选择" size="small" label="right" :style="allWidth" @change="()=>{ $refs.supply.validateField('aptitude') }" @blur="()=>{ $refs.supply.validateField('aptitude') }">
                                <el-option v-for="item in supply.arr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="供应商联系人：" prop="supplierLinkName">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.supplierLinkName" placeholder="请输入供应商联系人姓名" maxlength="32" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人手机：" prop="showLinkPhone">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.showLinkPhone" placeholder="请输入联系人手机号码" maxlength="13" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人电话：" prop="linkTelephone">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.linkTelephone" placeholder="请输入联系人电话" maxlength="16" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="保修期：" prop="warrantyDay">
                            <el-input v-model="supply.warrantyDay" size="small" label="right" :disabled="true" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="保修级别（天*小时）：" prop="warrantyRank">
                            <el-input v-model="supply.warrantyRank" size="small" label="right" :disabled="true" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="供应商开户银行：" prop="depositBankName">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.depositBankName" placeholder="请输入供应商开户银行名称" maxlength="64" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="供应商税号：" prop="dutyParagraph">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.dutyParagraph" placeholder="请输入供应商税号" maxlength="64" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="供应商银行账号：" prop="bankCardNumber">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.bankCardNumber" placeholder="请输入供应商银行账号" maxlength="64" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商务对接人姓名：" prop="buttName">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.buttName" placeholder="请输入商务对接人姓名" size="small" maxlength="64" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职务：" prop="duty">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.duty" placeholder="请输入职务" size="small" label="right" maxlength="64" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="对接人手机：" prop="showButtPhone">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.showButtPhone" placeholder="请输入对接人手机号码" maxlength="13" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="对接人电话：" prop="buttTelephone">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.buttTelephone" placeholder="请输入对接人电话号码"  maxlength="16" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="微信：" prop="wechat">
                            <el-input :disabled="$store.getters.writeDisable" v-model="supply.wechat" placeholder="请输入微信号"  maxlength="64" size="small" label="right" :style="allWidth"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </template>
        <template slot="btnFull1">保存</template>
        <template slot="btnEmpty3">取消</template>
        <template slot="btnEmpty4">返回</template>
    </pop-up>
  </div>
</template>

<script>
import popUp from '@/components/common/popUp.vue'
export default {
  name: 'supplier',
  data () {
    return {
        allWidth:'width: 340px',
        btnClose:'',
        btnOpen:true,
        popup:false,
        allOptions:[],
        form:{
            options: [
                
            ],
            value:'',
        },
        //供应商编辑id
        companyId:'',
        //是否有供应商
        companyData:false,
        //记录上一次时间
        lastTime:0,
        timer:null,
        companyVal:'',
        //弹窗
        supply:{
            companyName:'',
            companyAddress:'',
            legalPerson:'',
            aptitude:'',
            supplierLinkName:'',
            linkPhone:'',
            showLinkPhone:'',
            linkTelephone:'',
            warrantyDay:'原厂提供',
            warrantyRank:'原厂提供',
            depositBankName:'',
            dutyParagraph:'',
            bankCardNumber:'',
            buttName:'',
            duty:'',
            buttPhone:'',
            showButtPhone:'',
            buttTelephone:'',
            wechat:'',
            arr: [
                {   
                    value: '1',
                    label: '品牌商'
                }, 
                {
                    value: '2',
                    label: '授权商'
                }, 
                {
                    value: '3',
                    label: '无授权'
                },
                {
                    value: '4',
                    label: '国包商'
                },
                {
                    value: '5',
                    label: '省包商'
                },
                {
                    value: '6',
                    label: '电商'
                },
                {
                    value: '7',
                    label: '厂商'
                },
            ],
        },
        //防抖
        saveClickFlag:true,
    }
  },
  components:{
      popUp
  },
  methods:{
      falseClose(){
        //重置效验
        this.$nextTick(()=>{
            this.$refs.supply.clearValidate();
        })
        this.popup = false;
      },
      openAdd(){
        this.$nextTick(()=>{
            this.$refs.supply.clearValidate();
        })
        //清空
        Object.keys(this.supply).forEach(key => {
            if(key != 'warrantyDay' && key != 'warrantyRank' && key != 'arr'){
                this.supply[key]= ''
            }
        }); 
        this.popup = true
      },
      //编辑按钮
      editClick(id){
          this.$nextTick(()=>{
            this.$refs.supply.clearValidate();
          })
          this.$post('/orderInfo/getSupplierInfoById',{
              params:{
                  id:id,
              }
          }).then(res=>{
              let data = res.data.data;
              if(data){
                  this.$refs.select.handleClose();
                  this.supply = data;
                  this.supply.arr = [{value: '1',label: '品牌商'}, {value: '2',label: '授权商'}, {value: '3',label: '无授权'},{value: '4',label: '国包商'},{value: '5',label: '省包商'},{value: '6',label: '电商'},{value: '7',label: '厂商'}]
                  if(this.supply.linkPhone){
                    this.$set(this.supply,'showLinkPhone',data.linkPhone)
                  }
                  if(this.supply.buttPhone){
                      this.$set(this.supply,'showButtPhone',data.buttPhone)
                  }
                  this.supply.supplierInfoId = id;
                  this.popup = true;
              }
          })
      },
      dataFilter(val){
        this.companyVal = val;
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
                    that.getCompany();
                }, 1000);
            }else{
                this.lastTime = nowTime;
                that.getCompany();
            }
        }
      },
      //模糊差供应商
      getCompany(){
          this.$post('/orderInfo/listSupplierByName',{
              params:{
                  fuzzyCompanyName:this.companyVal
              }
          }).then(res=>{
            let data = res.data.data;
            this.form.options = [];
            if(data){
                this.form.options.push(...data);
            }
            if(!this.companyVal){
                this.getCompanyData();
            }
          })
      },
      //是否有供应商
      getCompanyData(){
        this.$post('/orderInfo/listAllSupplier').then(res=>{
            let data = res.data.data;
            if(data){
                this.form.options = data;
                this.companyData = false
            }else{
                this.companyData = true
            }
        })
      },
      //保存按钮
      saveClick(supply){
        if(!this.saveClickFlag) {
            this.$message({
                showClose: true,
                message: '请不要重复点击，谢谢！',
                type: 'error'
            });
            return
        };
        this.$refs[supply].validate((valid) => {
          if (valid) {
            this.saveClickFlag = false;
            this.supply.showLinkPhone ? this.supply.linkPhone = this.supply.showLinkPhone.replace(/\s*/g, "") : this.supply.linkPhone = '';
            this.supply.showButtPhone ? this.supply.buttPhone = this.supply.showButtPhone.replace(/\s*/g, "") : this.supply.buttPhone = '';
            this.$post('/orderInfo/saveSupplierInfo',{
                data:this.supply
            }).then(res=>{
                this.saveClickFlag = true;
                let data = res.data.data;
                if(res.data.code != '0'){
                    this.getCompanyData();
                }
                if(res.data.code == '0' && data){
                    this.getCompanyData();
                    this.form.options.push(data);
                    this.form.value = data.supplierInfoId;
                    this.$refs['name'].clearValidate();
                    //重置效验
                    this.$nextTick(()=>{
                        this.$refs.supply.clearValidate();
                    })
                    this.popup = false;
                    this.$message({
                        showClose: true,
                        message: '保存成功',
                        type: 'success'
                    });
                }
            })
          } else {
            return false;
          }
        });
      }
  },
  watch:{
      supplyNew:{
          handler(newValue, oldValue){
            if (this.supply.showLinkPhone && this.supply.showLinkPhone.length <= 13) {
                this.supply.showLinkPhone = newValue.showLinkPhone.length > oldValue.showLinkPhone.length ? newValue.showLinkPhone.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.supply.showLinkPhone.trim()
            }
            if (this.supply.showButtPhone && this.supply.showButtPhone.length <= 13) {
                this.supply.showButtPhone = newValue.showButtPhone.length > oldValue.showButtPhone.length ? newValue.showButtPhone.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.supply.showButtPhone.trim()
            }
            /* if(this.supply.tel.length == 0){
                this.$nextTick(() => {
                    this.$refs['supply'].clearValidate('tel');
                })
            } */
          },
          deep:true
        //   immediate:true
      },
      listenCheckData:{
            handler(val){
                let info = this.$store.getters.checkDate.supplierInfoDTO;
                if(this.$route.query.lookType != undefined){
                    this.form.value = this.$store.getters.checkDate.supplierInfoName;
                }else if(this.$route.query.checkType != undefined){
                     this.form.value = this.$store.getters.checkDate.supplierInfoName;
                }else{
                    this.form.value = this.$store.getters.checkDate.supplierInfoId;
                }
                this.supply.companyName =  info.companyName;
                this.supply.companyAddress = info.companyAddress;
                this.supply.legalPerson = info.legalPerson;
                this.supply.aptitude = info.aptitude;
                this.supply.supplierLinkName = info.supplierLinkName;
                this.supply.linkTelephone = info.linkTelephone;
                this.supply.showLinkPhone = info.linkPhone;
                this.supply.depositBankName = info.depositBankName;
                this.supply.dutyParagraph = info.dutyParagraph;
                this.supply.bankCardNumber = info.bankCardNumber;
                this.supply.buttName = info.buttName;
                this.supply.duty = info.duty;
                this.supply.showButtPhone = info.buttPhone;
                this.supply.buttTelephone = info.buttTelephone;
                this.supply.wechat = info.wechat;
            },
            deep:true
        }
  },
  computed:{
      supplyNew(){
          return JSON.parse(JSON.stringify(this.supply))
      },
      rules(){
          return{
            value:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            companyName:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            companyAddress:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            legalPerson:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            aptitude:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            supplierLinkName:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            showLinkPhone:[
                { required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] },
                {pattern: /^1\s*[3456789]\s*(\d\s*){9}$/, message: '手机格式不正确', trigger: 'blur'}
            ],
            depositBankName:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            dutyParagraph:[
                { required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] },
                {pattern: /^[0-9a-zA-Z]*$/g, message: '请填写正确的税号信息', trigger: 'blur'}
            ],
            bankCardNumber:[
                { required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] },
                {pattern: /^[0-9]+$/, message: '银行账号必须为数字', trigger: 'blur'}
            ],
            buttTelephone:[
                {pattern: /^[0-9-]*$/, message: '电话格式不正确', trigger: 'blur'}
            ],
            showButtPhone:[
                {pattern: /^1\s*[3456789]\s*(\d\s*){9}$/, message: '手机格式不正确', trigger: 'blur'}
            ],
            linkTelephone:[
                {pattern: /^[0-9-]*$/, message: '电话格式不正确', trigger: 'blur'}
            ],
          }
      },
      //监听vuex数据 （ 审核状态的 ）
      listenCheckData() {
        return this.$store.getters.checkDate;
      }
  },
  mounted(){
      /* this.$nextTick(()=>{
        this.$refs.form.clearValidate();
        this.$refs.supply.clearValidate();
      }) */
      if(this.$route.query.checkType == undefined && this.$route.query.lookType == undefined){
          this.getCompanyData();
      }
      if(this.$route.query.lookType != undefined){
          this.btnClose = true;
          this.btnOpen = '';
      }else if(this.$route.query.checkType != undefined){
          this.btnClose = true;
          this.btnOpen = '';
      }else if(this.$route.query.editType != undefined){
          this.btnClose = '';
          this.btnOpen = true;
      }else{
          this.btnClose = '';
          this.btnOpen = true;
      }
  }
}
</script>
<style lang="less" scoped>
.supplie{
     margin-bottom: 22px;
    &>h1{
        color: @big-color;
        font-size: @one-size;
        margin-bottom: 22px;
    }
    .containt{
        height: 92px;
        border: 1px dashed @blue;
        padding: 20px 28px;
        &>h3{
            color: @big-color;
            font-size: @two-size;
            font-weight: bold;
            margin-bottom: 17px;
        }
        &>p{
            float: left;
            padding: 11px 0 0 14px;
            font-size: @three-size;
            cursor: pointer;
            &>span:first-child{
                color: @big-color;
            }
            &>span:last-child{
                color: @blue;
            }
        }
    }
}
/deep/ .el-form{
    float: left;
}
/deep/ .dialog{
  width: 1100px !important;
  .save{
      width: 300px !important;
      height: 40px !important;
      line-height: 40px !important;
      &>div{
        width: 118px !important;
      }
  }
  .contani{
    padding: 32px !important;
  }
}
</style>


