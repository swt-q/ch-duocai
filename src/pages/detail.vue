<template>
<div class="warper">
  <div v-if="$route.query.refus != undefined" class="edit" :class="{ deitfixed:deitFlag }">
    <p>请修改以下信息后重新提交：</p>
    <p>{{$route.query.refus}}</p>
  </div>
  <div class="contain">
    <explain v-if="!$route.query.checkType && !$route.query.lookType && !$route.query.editType"></explain>
    <changhong ref="changhong" @messageNone="messageMethods" :typeId="statusId" :passStatus="passStatus"></changhong>
    <supplier ref="supplier"></supplier>
    <info ref="info" :saveObj="saveObj" @emitSave="()=>{ saveAllInfo('emit') }"></info>
    <purchase ref="purchase" @emitSave="()=>{ saveAllInfo('emit') }"></purchase>
    <fixedWindow @passClick="passClick"></fixedWindow>
    <div v-if="!$route.query.lookType" class="footer-btn" :class="{ fixed_bottom:fixedBottom }">
      <div v-if="!$route.query.checkType && !$route.query.lookType" class="emptybtn" @click="saveAllInfo()">保存</div>
      <div v-if="!$route.query.checkType && !$route.query.lookType" class="fullbtn" @click="()=>{ submitAllInfo() }">提交</div>
      <div v-if="$route.query.checkType" class="emptybtn" @click="()=>{ popup3 = true; }">通过</div>
      <div v-if="$route.query.checkType" class="emptybtn" @click="()=>{ smsDialog=true }">驳回</div>
    </div>
  </div>
   <!-- 编辑弹窗 -->
  <pop-up v-show="refus" @closePop="()=>{ refus = false }" :btnFull1="true" @btnFull1="()=>{ refus=false }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <p style="margin-bottom:10px;">抱歉，需求审核失败。<br/>请修改需求后重新提交审核。<br/>出错信息：<br/><span>{{$route.query.refus}}</span></p>
        </div>
      </template>
      <template slot="btnFull1">去修改</template>
  </pop-up>
  <!-- 驳回弹出框 -->
  <pop-up v-show="smsDialog" @closePop="()=>{ smsDialog = false }" :btnFull1="true" :btnEmpty3="true" @btnFull1="()=>{ reject() }" @btnEmpty3="()=>{ smsDialog=false }">
      <template slot="slot1">驳回</template>
      <template slot="slot2">
        <textarea resize="none" cols="30" rows="10" v-model="dialogInfo" class="examine-text" @keyup="textareaNum_con($event)" ref="textAreNum"></textarea>
        <p class="textNum_s">
          <span>{{textareaNum}}/200</span>
        </p>
      </template>
      <template slot="btnFull1">提交</template>
      <template slot="btnEmpty3">取消</template>
  </pop-up>
  <!-- 关闭需求 -->
  <pop-up v-show="$route.query.role == 'user' && status8" @closePop="()=>{ status8 = false }" :btnFull1="true" @btnFull1="()=>{ $router.push({ name:'duocailist',params:{flag:'user'}}) }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <p>需求已取消。<br/>点击按钮后可查看详情或创建新需求。<br/>了解更多，请拨打平台客服：400-817-6667</p>
        </div>
      </template>
      <template slot="btnFull1">去创建</template>
  </pop-up>
  <!-- 付款完成 -->
  <pop-up v-show="$route.query.role == 'user' && status7 && payMent != '0'" @closePop="()=>{ status7 = false }" :btnFull1="true" @btnFull1="()=>{ $router.push({ name:'duocailist',params:{flag:'user'}}) }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-chenggong1"></i>
          <p>付款完成。<br/>点击按钮后可查看详情或下载付款单。</p>
        </div>
      </template>
      <template slot="btnFull1">去查看</template>
  </pop-up>
  <!-- 需求完成 -->
  <pop-up v-show="$route.query.role == 'user' && status7 && payMent == '0'" @closePop="()=>{ status7 = false }" :btnFull1="true" @btnFull1="()=>{ $router.push({ name:'duocailist',params:{flag:'user'}}) }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-chenggong1"></i>
          <p>恭喜，需求审核通过。<br/>如需帮助，请拨打平台客服：400-817-6667</p>
        </div>
      </template>
      <template slot="btnFull1">知道了</template>
  </pop-up>
  <!-- 待付款 -->
  <pop-up v-show="$route.query.role == 'user' && status6" @closePop="()=>{ status6 = false }" :btnFull1="true" @btnFull1="()=>{ $router.push({ name:'duocailist',params:{flag:'user'}}) }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-chenggong1"></i>
          <p>恭喜，签署成功。<br/>点击按钮后可查看详情或下载合同。</p>
        </div>
      </template>
      <template slot="btnFull1">知道了</template>
  </pop-up>
  <!-- 待签署合同 -->
  <pop-up v-show="$route.query.role == 'user' && status5" @closePop="()=>{ status5 = false }" :btnFull1="true" @btnFull1="()=>{ $router.push({ name:'duocailist',params:{flag:'user'}}) }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <p>需求合同还未签署。<br/>点击按钮后继续完成合同签署。<br/>如需帮助，请拨打平台客服：400-817-6667</p>
        </div>
      </template>
      <template slot="btnFull1">去签署</template>
  </pop-up>
   <!-- 审核成功 -->
  <pop-up v-show="$route.query.role == 'user' && status3 && payMent != '0'" @closePop="()=>{ status3 = false }" :btnFull1="true" @btnFull1="()=>{ $router.push({ name:'duocailist',params:{flag:'user'}}) }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-chenggong1"></i>
          <p>恭喜，需求审核通过。<br/>商务生成签章后，您可进行合同签署。<br/>如需帮助，请拨打平台客服：400-817-6667</p>
        </div>
      </template>
      <template slot="btnFull1">知道了</template>
  </pop-up>
  <!-- 待审核 -->
  <pop-up v-show="$route.query.role == 'user' && status2" @closePop="()=>{ status2 = false }" :btnFull1="true" @btnFull1="()=>{ $router.push({ name:'duocailist',params:{flag:'user'}}) }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <p>需求正在审核中。<br/>如需帮助，请拨打平台客服：400-817-6667</p>
        </div>
      </template>
      <template slot="btnFull1">知道了</template>
  </pop-up>
  <!-- 审核窗口 -->
  <pop-up v-show="popup3" @closePop="()=>{ popup3 = false }" :btnFull1="true" :btnEmpty3="true" @btnFull1="()=>{ checkClick() }" @btnEmpty3="()=>{ popup3=false }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <p>您确定当前需求无误，可通过审核</p>
        </div>
      </template>
      <template slot="btnFull1">确定</template>
      <template slot="btnEmpty3">取消</template>
  </pop-up>
  <!-- 提交窗口 -->
  <pop-up v-show="popup1" @closePop="()=>{ popup1 = false }" :btnFull1="true" :btnEmpty3="true" @btnFull1="()=>{ submitMethods('提交');popup1=false }" @btnEmpty3="()=>{ popup1=false }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <p>是否确认提交需求？<br/>如信息存在遗漏，请返回修改</p>
        </div>
      </template>
      <template slot="btnFull1">提交</template>
      <template slot="btnEmpty3">修改</template>
  </pop-up>
  <!-- 提交成功窗口 -->
  <pop-up v-show="popup2" @closePop="()=>{ popup2 = false }" :btnFull1="true" @btnFull1="()=>{ $router.push({name:'duocailist',params:{ flag:'user' }}) }">
      <template slot="slot1">提示</template>
      <template slot="slot2">
        <div class="tc">
          <i class="iconfont icon-chenggong1"></i>
          <p>恭喜，您的需求提交成功。<br/>如需帮助，请拨打平台客服：400-817-6667</p>
        </div>
      </template>
      <template slot="btnFull1">好的</template>
  </pop-up>
  <!-- 菊花转 -->
  <div v-if="juhua" class="common_dialog"></div>
  <div v-if="juhua" class="juhua">
    <img src="../../static/images/loding.gif" alt="">
    <p>请等待，信息提交中...</p>
  </div>
</div>
</template>

<script>
import explain from '@/components/write/explain.vue'
import changhong from '@/components/write/changhong.vue'
import supplier from '@/components/write/supplier.vue'
import info from '@/components/write/info.vue'
import purchase from '@/components/write/purchase.vue'
import fixedWindow from '@/components/common/fixedWindow.vue'
import popUp from '@/components/common/popUp.vue'
export default {
  name: 'detail',
  data(){
    return{
      fixedBottom:false,
      messageFlag:true,
      deitFlag:false,
      editTop:0,
      msg:'',
      submitObj:{},
      saveObj:{},
      timer:null,
      timerFlag:false,
      //防抖
      submitFlag:true,
      rejectFlag:true,
      //弹框
      smsDialog:false,
      dialogInfo:'',
      popup1:false,
      popup2:false,
      popup3:false,
      juhua:false,
      //订单状态
      statusId:'',
      //弹窗编辑便是
      refus:false,
      status2:false,
      status3:false,
      status5:false,
      status6:false,
      status7:false,
      status8:false,
      passStatus:'',
      //账期天数
      payMent:'',
      //驳回swt
      textareaNum:0,
    }
  },
  components:{
    explain,
    changhong,
    supplier,
    info,
    purchase,
    fixedWindow,
    popUp
  },
  methods:{
    //审核
    checkClick(){
      this.popup3 = false;
      this.juhua = true;
      let changhongId = '';
      if(this.$refs.changhong.$refs.form.model.valueCheckbox == '1'){
        changhongId = this.$refs.changhong.$refs.form.model.valueCheckbox;
      }else{
        if(this.$refs.changhong.$refs.form.model.value == '无'){
          changhongId = '1';
        }else{
          changhongId = this.$refs.changhong.$refs.form.model.value;
        }
      }
      this.$post('/manager/orderCheck',{
        data:{
          orderId:this.$route.query.checkType,
          sellerInfoId:changhongId,
          ouType:'3'
        }
      }).then(res=>{
        this.juhua = false;
        let data = res.data;
        if(data.code == '0'){
          if(data.data){
            var a = document.createElement("a");
            a.href = data.data;
            a.click();
          }
          this.$router.push({name:"duocailist",params:{flag:"manager"}});
        }
      })
    },
    //驳回理由字数限制
    textareaNum_con(e){
        this.textareaNum = this.dialogInfo.length;
        if(this.dialogInfo.length > 200){
            this.dialogInfo = this.dialogInfo.slice(0,200);
            this.textareaNum = this.dialogInfo.length;
            this.$message({
                showClose: true,
                message: '关闭理由字数不能超过200个。',
                type: 'warning'
            });
        };
    },
    //驳回
    reject(){
      if(!this.dialogInfo){
        this.$message({
          showClose: true,
          message: '请输入驳回原因',
          type: 'error'
        });
        return
      }
      if(!this.rejectFlag){
        this.$message({
          showClose: true,
          message: '请不要重复点击，谢谢！',
          type: 'error'
        });
        return;
      }
      this.rejectFlag = false;
      let changhongId = '';
      if(this.$refs.changhong.$refs.form.model.valueCheckbox == '1'){
        changhongId = this.$refs.changhong.$refs.form.model.valueCheckbox;
      }else{
        if(this.$refs.changhong.$refs.form.model.value == '无'){
          changhongId = '1';
        }else{
          changhongId = this.$refs.changhong.$refs.form.model.value;
        }
      }
      this.$post('/manager/orderCheck',{
        data:{
          status:'2',
          orderId:this.$route.query.checkType,
          refuseReason:this.dialogInfo,
          sellerInfoId:changhongId,
          ouType:'3'        }
      }).then(res=>{
        this.rejectFlag = true;
        let data = res.data;
        this.$router.push('duocailist/manager')
      })
    },
    messageMethods(val){
      this.messageFlag = val;
    },
    saveAllInfo(emit){
      if(emit=='emit'){
        if(this.timerFlag){
          this.submitMethods('保存');
        }
      }else{
        if(!this.$refs.supplier.$refs.form.model.value){
          this.$message({
            showClose: true,
            message: '请先选择供应商信息',
            type: 'error'
          });
          return;
        }
        this.submitMethods('保存');
      }
    },
    submitAllInfo(){
      const p1 = new Promise((resolve,reject)=>{
        if(this.messageFlag){
          this.$refs['changhong'].$refs['form'].validate(valid=>{
            if(valid) {
              resolve()
            }
          })
        }
      })
      const p2 = new Promise((resolve,reject)=>{
        this.$refs['supplier'].$refs['form'].validate(valid=>{
            if(valid) {
              resolve()
            }
        })
      })
      const p3 = new Promise((resolve,reject)=>{
        this.$refs['info'].$refs['form'].validate(valid=>{
            if(valid) {
              resolve()
            }
        })
      })
      const p4 = new Promise((resolve,reject)=>{
        this.$refs['info'].$refs['info'].validate(valid=>{
            if(valid) resolve()
        })
      })
      const p5 = new Promise((resolve,reject)=>{
        this.$refs['purchase'].$refs['supply'].validate(valid=>{
            if(valid) resolve()
        })
      })
      if(this.messageFlag){
        Promise.all([p1,p2,p3,p4,p5]).then((res)=>{
          this.popup1 = true;
        })
      }else{
        Promise.all([p2,p3,p4,p5]).then((res)=>{
          this.popup1 = true;
        })
      }
    },
    //提交请求
    submitMethods(flag){
        // 长虹佳华销售人员信息
        if(!this.submitFlag){
          this.$message({
            showClose: true,
            message: '请不要重复点击，谢谢！',
            type: 'error'
          });
          return;
        }
        this.submitFlag = false;
        //点击确认提交出菊花图
        if(flag == '提交'){
          this.juhua = true;
        }
        if(this.$refs.changhong.$refs.form.model.valueCheckbox == '1'){
          this.submitObj.sellerInfoId = this.$refs.changhong.$refs.form.model.valueCheckbox;
        }else{
          if(this.$refs.changhong.$refs.form.model.value == '无'){
            this.submitObj.sellerInfoId = '1';
          }else{
            this.submitObj.sellerInfoId = this.$refs.changhong.$refs.form.model.value;
          }
        }
        //供应商
        this.submitObj.supplierInfoId = this.$refs.supplier.$refs.form.model.value;
        // //采购商品信息
        this.submitObj.purchaseType = this.$refs.info.$refs.form.model.value1;
        this.submitObj.paymentDay = this.$refs.info.$refs.form.model.value2;
        this.submitObj.expectSendGoodsTime = this.$refs.info.$refs.info.model.value3;
        this.submitObj.expectLogisticsType = this.$refs.info.$refs.info.model.value4;
        this.submitObj.logisticsAssume = this.$refs.info.$refs.info.model.value5;
        this.submitObj.settleAccountType = this.$refs.info.$refs.info.model.value6;
        this.submitObj.marginType = this.$refs.info.$refs.info.model.value7;
        this.submitObj.marginRatio = this.$refs.info.$refs.info.model.earnest;
        this.submitObj.gorssMargin = this.$refs.info.$refs.tableInfo.model.profit1;
        //采购商品信息( 表格 )
        // this.submitObj.goodsDTOList = this.$refs.info.$refs.tableInfo.model.tableData;
        function accMul(arg1,arg2){ 
          var m=0,s1=arg1.toString(),s2=arg2.toString(); 
          try{m+=s1.split(".")[1].length}catch(e){} 
          try{m+=s2.split(".")[1].length}catch(e){} 
          return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
        } 
        let arr = JSON.parse(JSON.stringify(this.$refs.info.$refs.tableInfo.model.tableData));
        arr.forEach(v=>{
          v.buyPrice = v.showBuyPrice ? accMul(v.showBuyPrice,100) : '';
          v.sellPrice = v.showSellPrice ? accMul(v.showSellPrice,100) : '';
        })
        this.submitObj.goodsDTOList = arr;
        
        //采购方
        let trims = this.$refs.purchase.$refs.supply.model;
        trims.buyerMobile = trims.linkPhone || trims.linkPhone != undefined ? trims.linkPhone.replace(/\s*/g, "") : '';
        trims.recvMobile = trims.buttPhone || trims.buttPhone != undefined ? trims.buttPhone.replace(/\s*/g, "") : '';
        trims.busiMobile = trims.duijiePhone || trims.duijiePhone != undefined ? trims.duijiePhone.replace(/\s*/g, "") : '';
        this.submitObj.usersReqDTO = trims;

        if(flag == '提交'){
          //先走保存 再走 提交
          this.$post('/orderInfo/saveOrderInfo',{
            data:this.submitObj
          }).then(res=>{
            let data = res.data.data;
            if(res.data.code == '0'){
              this.submitObj.orderId = data.orderId;
              //走提交
              this.$post('/orderInfo/submitOrderInfo',{
                data:this.submitObj
              }).then(res1=>{
                this.juhua = false;
                if(res1.data.code == '0'){
                  this.submitObj.orderId = data.orderId;
                  this.popup2 = true;
                }else if(res1.data.code == '1000'){
                  this.$message({
                    showClose: true,
                    message: res1.data.msg,
                    type: 'error'
                  });
                }
                this.submitFlag = true;
              })
            }else if(res.data.code == '1000'){
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
              this.submitFlag = true;
            }
          })
        }else{
          this.$post('/orderInfo/saveOrderInfo',{
            data:this.submitObj
          }).then(res=>{
            this.juhua = false;
            let data = res.data.data;
            if(data){
              // this.saveObj  = data.goodsDTOList;
            }
            if(res.data.code == '0'){
              this.$message({
                  showClose: true,
                  message: '保存成功',
                  type: 'success'
                });
              //保存返回的id 给/manager/getOrderInfo使用
              this.submitObj.orderId = data.orderId;
              sessionStorage.setItem('statusId',data.orderId);
            }else if(res.data.code == '1000'){
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
            }
            this.submitFlag = true;
          })
        }
    },
    passClick(val){
      if(val == '供应商'){
         $('html, body').animate({scrollTop:$('.supplie').offset().top}, 400)
      }else if(val == '采购商品'){
         $('html, body').animate({scrollTop:$('.info .containt').offset().top}, 400)
      }else if(val == '采购方'){
         $('html, body').animate({scrollTop:$('.purchase').offset().top}, 400)
      }
    },
    onScroll(){
      if($(document).scrollTop() > this.editTop){
        this.deitFlag = true;
      }else{
        this.deitFlag = false;
      }

      if($(document).scrollTop() >= $(document).height() - $(window).height() - $('.footer-wrap').height() - 120){
        this.fixedBottom = true
      }else{
        this.fixedBottom = false
      }
      
    },
    //审核状态
    typeStatus(){
      this.$post('/manager/getOrderInfo',{
        params:{
          orderId:this.statusId
        }
      }).then(res=>{
        let data = res.data.data;
        this.$store.commit('checkDate',data);
        this.payMent = data.paymentDay;
        this.passStatus = data.orderStatus;
        console.log(this.passStatus)
        if(data.orderStatus == '2'){
          this.status2 = true;
        }else if(data.orderStatus == '3'){
          this.status3 = true;
        }else if(data.orderStatus == '5'){
          this.status5 = true;
        }else if(data.orderStatus == '6'){
          this.status6 = true;
        }else if(data.orderStatus == '7'){
          this.status7 = true;
        }else if(data.orderStatus == '8'){
          this.status8 = true;
        }
      })
    }
  },
  mounted(){
    //查看信息未填清空。 
    let {reset} = this.$route.query;
    if(reset){
      for(var i = 0;i<$("input").length;i++){
        if($("input").eq(i).val() === ""){
          $("input").eq(i).attr("placeholder","");
        }
      }
    };
    this.$nextTick(function() {
      if(!this.$route.query.lookType){
        window.addEventListener('scroll', this.onScroll);
      }
      this.editTop = $('.contain').offset().top;
    });
    //是否是弹窗编辑
    if(this.$route.query.refus != undefined){
      this.refus = true;
    }
    //3分钟后执行锚点保存
    this.timer = setInterval(() => {
      this.timerFlag = true;
    }, 180000);
    //根据状态给/manager/getOrderInfo接口 更换 id 以及保存时机
    if(this.$route.query.checkType != undefined){
      this.statusId = this.$route.query.checkType;
      this.submitObj.orderId = this.$route.query.checkType;
    }else if(this.$route.query.lookType != undefined){
      this.statusId = this.$route.query.lookType;
      this.submitObj.orderId = this.$route.query.lookType;
    }else if(this.$route.query.editType != undefined){
      this.statusId = this.$route.query.editType;
      this.submitObj.orderId = this.$route.query.editType;
    }else if(sessionStorage.getItem('statusId') != null){
      this.statusId = sessionStorage.getItem('statusId')
      this.submitObj.orderId = sessionStorage.getItem('statusId');
      this.typeStatus();
    }
    //根据状态 选择是否disable
    if(this.$route.query.editType != undefined){
      this.$store.commit('writeRules',true);
      this.$store.commit('writeDisable',false);
      this.typeStatus();
    }else if(this.$route.query.checkType != undefined){
      this.$store.commit('writeRules',false);
      this.$store.commit('writeDisable',true);
      this.typeStatus();
    }else if(this.$route.query.lookType != undefined){
      this.$store.commit('writeRules',false);
      this.$store.commit('writeDisable',true);
      this.typeStatus();
    }else{
      this.$store.commit('writeRules',true);
      this.$store.commit('writeDisable',false);
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
    sessionStorage.removeItem('statusId');
    clearInterval(this.timer)
  },

}
</script>

<style lang="less" scoped>
.edit{
  width: 1156px;
  margin: 0 auto;
  border: 1px solid #FF8523;
  background: #FEF5ED;
  padding: 12px 22px;
  color: #FF2A52;
  line-height: 22px;
  margin-top: 20px;
  margin-bottom: -20px;
  font-size: @three-size;
  word-wrap: break-word;
  word-break: break-all;
}
.deitfixed{
  margin-top: 0;
  position: fixed;
  top: 0;
  left:50%;
  -webkit-transform: translateX(-50%) translateY(0);
  -webkit-transform: translateX(-50%) translateY(0);
  -moz-transform: translateX(-50%) translateY(0);
  -ms-transform: translateX(-50%) translateY(0);
  transform: translateX(-50%) translateY(0);
  z-index: 10;
}
.contain{
  width: calc(@all-width - 62px);
  margin: 20px auto 0;
  padding: 27px 31px 90px;
  background: #fff;
  overflow: hidden;
  position: relative;
  .footer-btn{
    width: 1200px;
    height: 58px;
    background: #EAEAEA;
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -600px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    &>div{
      width: 118px;
      height: 40px;
      font-size: @two-size;
      text-align: center;
      line-height: 40px;
      margin-right: 40px;
      cursor: pointer;
    }
    .emptybtn,.fullbtn{
      border: 1px solid @blue;
      color: @blue;
      background: #fff;
    }
    .fullbtn{
      border: 1px solid @blue;
      color: #fff;;
      background: @blue;
    }
    &>div:last-child{
      margin-right: 0;
    }
  }
  .fixed_bottom{
      position: absolute;
    }
}
.warper{
  margin-bottom: 35px;
}
/deep/ .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
  position: relative;
  top: 2px;
}
.examine-text {
    width: 430px;
    height: 180px;
    border: 1px solid #ccc !important;
    margin-bottom: 10px;
    padding: 12px;
    resize: none;
    outline: none;
    font-size: 16px;
    background: rgba(242, 242, 242);
  }
  .textNum_s{
    margin-bottom: 10px;
  }
.tc{
  padding: 0 10px;
  text-align: center;
  line-height: 28px;
  &>i{
    font-size: 60px;
    color: @orange;
    display: inline-block;
    margin: 14px 0 34px;
  }
  &>p{
    font-size: @three-size;
    color: #3C3E44;
    margin-bottom: 24px;
    &>span{
      min-width: 180px;
      max-width: 500px;
      max-height: 240px;
      display: inline-block;
      word-wrap: break-word;
      word-break: break-all;
      overflow-y: auto;
    }
  }
}
/deep/ .dialog{
  width: auto !important;
  .save{
      width: auto !important;
      height: 32px !important;
      line-height: 32px !important;
      &>div{
        width: 68px !important;
      }
  }
  .contani{
    padding: 25px 27px !important;
  }
}
.juhua{
  width: 280px;
  height: 200px;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  position: fixed;
  top: 50%;
  left:50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  z-index: 201;
  &>img{
    margin:45px 0 30px; 
  }
  &>p{
    font-size: @three-size;
  }
}
</style>

