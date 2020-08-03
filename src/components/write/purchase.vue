<template>
  <div class="purchase">
    <div class="containt">
        <h3>采购方信息（含增值税专用发票信息）：</h3>
        <el-form ref="supply" :model="supply" :rules="rules" label-width="157px" :validate-on-rule-change="false">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="采购方公司全称：" prop="companyName">
                        <el-input :disabled="true" v-model="supply.companyName" placeholder="请输入采购方公司全称" maxlength="128" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="采购方公司地址：" prop="companyAddr">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.companyAddr" placeholder="请输入采购方公司详细地址" maxlength="255" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="采购方联系人：" prop="buyerName">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.buyerName" placeholder="请输入采购方联系人" maxlength="32" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人手机：" prop="linkPhone" ref="linkPhone">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.linkPhone" placeholder="请输入联系人手机号码" maxlength="13" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人电话：" prop="buyerPhone">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.buyerPhone" placeholder="请输入联系人电话号码" maxlength="16" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="采购方开户行：" prop="buyerBankName">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.buyerBankName" placeholder="请输入采购方开户行" @blur="()=>{ $emit('emitSave') }" maxlength="128" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="采购方银行账号：" prop="buyerBankNum">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.buyerBankNum" placeholder="请输入采购方银行账号" maxlength="64" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="采购方税号：" prop="buyerTaxNum">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.buyerTaxNum" placeholder="请输入采购方税号" maxlength="64" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收货联系人：" prop="recvName">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.recvName" placeholder="请输入收货联系人姓名" maxlength="32" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收货邮箱：" prop="recvEmail">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.recvEmail" placeholder="请输入收货邮箱" maxlength="64" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收货地址：" prop="recvAddr">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.recvAddr" placeholder="请输入详细收货地址" maxlength="255" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收货人手机：" prop="buttPhone">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.buttPhone" placeholder="请输入收货人手机号码" maxlength="13" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收货人电话：" prop="recvPhone">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.recvPhone" placeholder="请输入收货人电话号码" maxlength="16" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收货人身份证号码：" prop="recvIdCard">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.recvIdCard" placeholder="请输入收货人身份证号码" maxlength="18" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商务对接人姓名：" prop="busiName">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.busiName" placeholder="请输入商务对接人姓名" maxlength="32" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="职务：" prop="duty">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.duty" placeholder="请输入职务" maxlength="64" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="对接人手机：" prop="duijiePhone">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.duijiePhone" placeholder="请输入对接人手机号码" maxlength="13" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="对接人电话：" prop="busiPhone">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.busiPhone" placeholder="请输入对接人电话号码" maxlength="16" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="微信：" prop="wechat">
                        <el-input :disabled="$store.getters.writeDisable" v-model="supply.wechat" placeholder="请输入微信号" maxlength="64" size="small" label="right" :style="allWidth"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
  </div>
</template>

<script>
import { identityExp } from '@/components/common/identityExp.js'
export default {
  name: 'purchase',
  data () {
    return {
        allWidth:'width: 340px',
        supply:{
            companyName:'',
            companyAddr:'',
            buyerName:'',
            linkPhone:'',
            //入参联系人手机
            buyerMobile:'',
            buyerPhone:'',
            warrantyDay:'原厂提供',
            warrantyRank:'原厂提供',
            buyerBankName:'',
            buyerTaxNum:'',
            buyerBankNum:'',
            recvName:'',
            recvEmail:'',
            recvAddr:'',
            buttPhone:'',
            //入参联系人手机
            recvMobile:'',
            recvPhone:'',
            recvIdCard:'',
            busiName:'',
            duty:'',
            duijiePhone:'',
            //入参对接人手机
            busiMobile:'',
            busiPhone:'',
            wechat:'',
        },
    }
  },
  methods:{
      getInfo(){
          this.$post('/orderInfo/getUserInfoById').then(res=>{
              let data = res.data.data;
              if(data){
                this.supply.companyName = data.companyName;
                this.supply.duijiePhone = data.busiMobile;
                this.supply.busiPhone = data.busiPhone;
                this.supply.buyerBankName = data.buyerBankName;
                this.supply.buyerBankNum = data.buyerBankNum;
                this.supply.linkPhone = data.buyerMobile;
                this.supply.buyerName = data.buyerName;
                this.supply.buyerPhone = data.buyerPhone;
                this.supply.buyerTaxNum = data.buyerTaxNum;
                this.supply.companyAddr = data.companyAddr;
                this.supply.busiName = data.busiName;
                this.supply.duty = data.duty;
                this.supply.recvAddr = data.recvAddr;
                this.supply.recvEmail = data.recvEmail;
                this.supply.recvIdCard = data.recvIdCard;
                this.supply.buttPhone = data.recvMobile;
                this.supply.recvName = data.recvName;
                this.supply.recvPhone = data.recvPhone;
                this.supply.wechat = data.wechat;
              }
          })
      }
  },
  watch:{
      supplyNew:{
          handler(newValue, oldValue){
            if (this.supply.linkPhone && this.supply.linkPhone.length <= 13) {
                this.supply.linkPhone = newValue.linkPhone.length > oldValue.linkPhone.length ? newValue.linkPhone.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.supply.linkPhone.trim()
            }
            if (this.supply.buttPhone && this.supply.buttPhone.length <= 13) {
                this.supply.buttPhone = newValue.buttPhone.length > oldValue.buttPhone.length ? newValue.buttPhone.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.supply.buttPhone.trim()
            }
            if (this.supply.duijiePhone && this.supply.duijiePhone.length <= 13) {
                this.supply.duijiePhone = newValue.duijiePhone.length > oldValue.duijiePhone.length ? newValue.duijiePhone.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.supply.duijiePhone.trim()
            }
            /* if(this.supply.tel.length == 0){
                this.$nextTick(() => {
                    this.$refs['supply'].clearValidate('tel');
                })
            } */
          },
          deep:true
      },
      listenCheckData:{
        handler(val){
            let info = this.$store.getters.checkDate.usersReqDTO;
            this.supply.companyName = info.companyName;
            this.supply.duijiePhone = info.busiMobile;
            this.supply.busiPhone = info.busiPhone;
            this.supply.buyerBankName = info.buyerBankName;
            this.supply.buyerBankNum = info.buyerBankNum;
            this.supply.linkPhone = info.buyerMobile;
            this.supply.buyerName = info.buyerName;
            this.supply.buyerPhone = info.buyerPhone;
            this.supply.buyerTaxNum = info.buyerTaxNum;
            this.supply.companyAddr = info.companyAddr;
            this.supply.busiName = info.busiName;
            this.supply.duty = info.duty;
            this.supply.recvAddr = info.recvAddr;
            this.supply.recvEmail = info.recvEmail;
            this.supply.recvIdCard = info.recvIdCard;
            this.supply.buttPhone = info.recvMobile;
            this.supply.recvName = info.recvName;
            this.supply.recvPhone = info.recvPhone;
            this.supply.wechat = info.wechat;
        },
        deep:true
      }
        /* companyName:'',
        companyAddr:'',
        buyerName:'',
        linkPhone:'',
        //入参联系人手机
        buyerMobile:'',
        buyerPhone:'',
        warrantyDay:'原厂提供',
        warrantyRank:'原厂提供',
        buyerBankName:'',
        buyerTaxNum:'',
        buyerBankNum:'',
        recvName:'',
        recvEmail:'',
        recvAddr:'',
        buttPhone:'',
        //入参联系人手机
        recvMobile:'',
        recvPhone:'',
        recvIdCard:'',
        busiName:'',
        duty:'',
        duijiePhone:'',
        //入参对接人手机
        busiMobile:'',
        busiPhone:'',
        wechat:'', */
  },
  computed:{
    supplyNew(){
        return JSON.parse(JSON.stringify(this.supply))
    },
    rules(){
        var checkphoneNum=(rule,value,callback)=>{
            if(this.$route.query.checkType == undefined && this.$route.query.lookType == undefined){
                if(value == "" || value == undefined){
                    return callback(new Error('不能为空'));
                }else if(!identityExp(value)){
                    return callback(new Error('身份证格式不正确'));
                }else{
                    return callback();
                }
            }
        };
        return{
            value:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            companyName:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            companyAddr:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            buyerName:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            linkPhone:[
                { required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] },
                { pattern: /^1\s*[3456789]\s*(\d\s*){9}$/, message: '手机格式不正确', trigger: 'blur'}
            ],
            buyerBankName:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            buyerTaxNum:[
                { required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] },
                { pattern: /^[0-9a-zA-Z]*$/g, message: '请填写正确的税号信息', trigger: 'blur'}
            ],
            buyerBankNum:[
                { required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] },
                { pattern: /^[0-9]+$/, message: '银行账号必须为数字', trigger: 'blur'}
            ],
            recvPhone:[
                { pattern: /^[0-9-]*$/, message: '电话格式不正确', trigger: 'blur'}
            ],
            buttPhone:[
                { required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] },
                { pattern: /^1\s*[3456789]\s*(\d\s*){9}$/, message: '手机格式不正确', trigger: 'blur'}
            ],
            buyerPhone:[{ pattern: /^[0-9-]*$/, message: '电话格式不正确', trigger: 'blur'}],
            recvName:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            recvEmail:[
                { required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] },
                { pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, message: '邮箱格式不正确', trigger: 'blur'}
            ],
            recvAddr:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            recvIdCard:[{ required: this.$store.getters.writeRules,validator: checkphoneNum, trigger: ['blur'] }],
            duijiePhone:[
                { pattern: /^1\s*[3456789]\s*(\d\s*){9}$/, message: '手机格式不正确', trigger: 'blur'}
            ],
            busiPhone:[
                { pattern: /^[0-9-]*$/, message: '电话格式不正确', trigger: 'blur'}
            ],
        }
    },
    //监听vuex数据 （ 审核状态的 ）
    listenCheckData() {
        return this.$store.getters.checkDate;
    }
  },
  mounted(){
      this.$nextTick(()=>{
        this.$refs.supply.clearValidate()
      })
      if(this.$route.query.checkType == undefined && this.$route.query.lookType == undefined && this.$route.query.editType == undefined){
        this.getInfo();
      } 
      
  }
}
</script>
<style lang="less" scoped>
.containt{
    border: 1px dashed @blue;
    padding: 20px 28px;
    margin-bottom: 40px;
    &>h3{
        color: @big-color;
        font-size: @two-size;
        font-weight: bold;
        margin-bottom: 17px;
    }
}
</style>


