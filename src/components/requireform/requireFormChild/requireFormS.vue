<!--卖家列表页-->
<template>
    <div class="requireFormS">
        <!--需求单查询-->
        <div class="requireSearch">
            <div>
                <el-form :inline="true" :model="requireFormData" class="require-form-data">
                    <el-form-item label="状态：">
                        <el-select v-model="requireFormData.orderStatus" placeholder="请选择" size="medium" id="statusF" width="120px">
                            <el-option label="请选择" value=""></el-option>
                            <el-option label="待提交" value="1"></el-option>
                            <el-option label="待审核" value="2"></el-option>
                            <el-option label="审核成功" value="3"></el-option>
                            <el-option label="审核失败" value="4"></el-option>
                            <el-option label="待签署合同" value="5"></el-option>
                            <el-option label="待付款" value="6"></el-option>
                            <el-option label="需求完成" value="7"></el-option>
                            <el-option label="需求取消" value="8"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="订单号：">
                        <!-- <el-select v-model="requireFormData.orderNo" placeholder="请选择" size="medium">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="item in orderNo_c" :label="item" :value="item" :key="item"></el-option>
                        </el-select> -->
                        <el-input v-model="requireFormData.orderNo" size="medium" placeholder="请输入订单号" id="orderNum"></el-input>
                    </el-form-item>

                    <el-form-item label="时间：">
                        <el-date-picker 
                        value-format="yyyy-MM-dd" 
                        v-model="requireFormData.begTime" 
                        :picker-options="startDateLimit"
                        size="medium" 
                        placeholder="开始时间">
                        </el-date-picker>
                        -
                        <el-date-picker 
                        value-format="yyyy-MM-dd" 
                        v-model="requireFormData.endTime"
                        :picker-options="endDateLimit"  
                        size="medium" 
                        placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="供应商名称：" id="sellerB">
                        <el-input v-model="requireFormData.supplierInfoName" size="medium" placeholder="请选择"></el-input>
                    </el-form-item>

                   <span @click="onSubmit" class="searchList">查找</span>
                </el-form>
            </div>
        </div>
        <!--需求单列表  show-summary  --> 
        <div class="requireList">
             <el-table :data="tableData" ref="multipleTable" align="center" border tooltip-effect="dark"
            :header-cell-style="{background:'#F5F5F5',color:'#252525',fontWeight:400}"
            highlight-current-row
            style="width: 100%;font-size:14px;color:#353535;"
             >
                <!-- <el-table-column type="selection" width="55px" header-align="center">

                </el-table-column> -->
                <el-table-column prop="number" label="序号" width="55px" header-align="center">

                </el-table-column>
                <el-table-column prop="orderNo" label="订单号" width="150px" header-align="center">

                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="130px" header-align="center">

                </el-table-column>

                <el-table-column prop="supplierInfoName" label="供应商名称" width="224px" header-align="center">
                    <template slot-scope="scope">
                        <div class="cacel_r" v-if="scope.row.supplierInfoName" style="text-align:left;margin:0">
                            {{scope.row.supplierInfoName}}
                        </div>
                    </template>
                </el-table-column>
                <!--Math.round(num*100)/100  -->
                <el-table-column prop="buyTotalPrice" label="采购金额" width="120px" header-align="center"> 
                    <template slot-scope="scope">
                        <div class="cacel_r" v-if="scope.row.buyTotalPrice" style="text-align:right;margin:0 15px 0 0;width:100%;">
                            <span style="display:inline-block;width:100%">{{(scope.row.buyTotalPrice/100).toFixed(2)}}元</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="orderStatus" label="状态" width="120px" header-align="center">
                     <template slot-scope="scope">
                        <div class="cacel_r" v-if="scope.row.orderStatus === '需求取消'">
                            <span style="vertical-align: middle;">需求取消</span>
                            <span slot="reference" class="iconfont icon-tanhao" id="cacel_icon" @mouseenter="mouse_enter(scope.row,$event)"  @mouseleave="mouse_leave($event)">
                               
                            </span>
                             <div class="show_display_mouser" @mouseenter="mouse_enter_c($event)"  @mouseleave="mouse_leave_c($event)">
                                 <p>取消原因：</p>
                                 <span style="color:#6A6A6A">{{scope.row.cancelReason}}</span>
                             </div>
                        </div>
                        <div class="cacel_r" v-if="scope.row.orderStatus != '需求取消'">
                            <span style="display:inline-block;width:100%;text-align:center">{{scope.row.orderStatus}}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="startTime" label="还款时间" width="190px" header-align="center">
                     <!--是否账期、超期，距还款时间   //待处理-->
                    <template slot-scope="scope" v-if="scope.row.paymentDay != '0' && scope.row.orderStatus === '需求完成'">
                        <div style="text-align:left">
                            <p>账期：{{scope.row.startTime.payment_days}}天</p>
                            <p>{{scope.row.startTime.pay_time_count}}计算</p>
                            <p>距还款差：{{scope.row.startTime.pay_time}}天</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="130px" header-align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="edit_handle(scope.row)" v-if="edit_s.indexOf(scope.row.orderStatus) != -1">编辑</el-button>
                        <!-- <el-button type="text" size="small" @click="subit_handle(scope.row)" v-if="edit_s.indexOf(scope.row.orderStatus) != -1">提交</el-button> -->
                        <el-button type="text" size="small" @click="sign_sale_handle(scope.row)" v-if="scope.row.orderStatus === '待签署合同'">
                            <router-link tag="a" target="_blank" :to="{name:'elesign',query:{signTimestamp:scope.row.signTimestamp_con}}" style="color:#409EFF">签署销售合同</router-link>
                        </el-button>
                        <el-button type="text" size="small" @click="sign_form_handle(scope.row)" v-if="scope.row.orderStatus === '待签署合同'">
                            <router-link tag="a" target="_blank" :to="{name:'elesign',query:{signTimestamp:scope.row.signTimestamp_sign}}" style="color:#409EFF">签署签收单</router-link>
                        </el-button>
                        <el-button type="text" size="small" @click="see_handle(scope.row)" v-if="see_s.indexOf(scope.row.orderStatus) != -1">查看</el-button>
                        <el-button type="text" size="small" @click="upload_handle(scope.row)" v-if="scope.row.orderStatus === '待付款'">下载合同</el-button>
                        <el-button type="text" size="small" @click="upload_payment_handle(scope.row)" v-if="scope.row.orderStatus === '需求完成' && scope.row.paymentDay != '0'">下载付款单</el-button>
                    </template>
                </el-table-column>
            </el-table>
             <!--分页-->
            <div class="showPages" v-if="pageList.total != 0">
                <span class="totalNum">共{{pageList.total}}条</span>
                <el-pagination
                    v-if="show_page"
                    background
                    layout="prev, pager, next"
                    @size-change="handleSizeChange"
                    @prev-click="prev_click"
                    @next-click="next_click"
                    @current-change="current_change"
                    :page-size="10"
                    :current-page="1"
                    :total="pageList.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import time_handle from "@/components/managecommon/count_day.js";
import get_bold_file from "@/components/managecommon/upload_bold.js";
//---卖家列表页
import { mapState,mapMutations } from "vuex";
export default {
    name:"requireFormS",
    props:["newConstructor"],
    data(){
        return {
            userListApi:"/orderInfo/listPurchase",  //卖家列表查询接口  
            user_down_api:"/orderInfo/downPayImg", //下载付款单接口
            //查询数据show
            requireFormData: sessionStorage.getItem("save_search_b") ? JSON.parse(sessionStorage.getItem("save_search_b")):{
                orderStatus: '',
                orderNo:"",
                begTime: "",
                endTime:"",
                supplierInfoName:"",
            },
            //日期限制
            startDateLimit: {
                disabledDate: (time) => {
                    let endTime = this.requireFormData.endTime;
                    if (endTime) {
                        return time.getTime() > new Date(endTime).getTime();
                    }
                }
            },
            endDateLimit: {
                disabledDate: (time) => {
                    let beginTime = this.requireFormData.begTime;
                    if (beginTime) {
                        return time.getTime() < new Date(beginTime).getTime() - 8.64e7;  //开始和结束可以选择同一天
                    }
                }
            },
            orderNo_c:[],
            //表格数据
            tableData:[],
            
            edit_s:["待提交","审核失败"], //编辑、提交
            see_s:["待审核","审核成功","待签署合同","待付款","需求完成","需求取消"],
            
            //下载付款单
            down_load_url:"",
            //分页
            pageList:{
                total:0,
            },
            show_page:true,
        }
    },
    computed:{
        ...mapState({
            // close_demand_U:state=>state.manageStore.close_demand_U,
        }),
    },
    mounted(){
        this.search_c(this.requireFormData);
    },
    watch:{
        
    },
    methods:{
        ...mapMutations({
            // close_demand_U:"manageStore/close_demand_U",
        }),
        //修改样式
        tableRowStyle({row,rowIndex}){
            return 'background-color:rgba(0, 0, 0, 0.15);font-size:14px;border-color:#868686'
        },
        //设置表头行的样式
        tableHeaderColor({row,column,rowIndex,columnIndex}){
            return 'background-color:rgba(239,239,239,1);color:rgba(37,37,37,1);font-wight:400;font-size:14px;text-align:center;border-color: #868686'

        },
        //查询
        onSubmit(){
            sessionStorage.setItem("save_search_b",JSON.stringify(this.requireFormData));
            this.search_c(this.requireFormData,1);
        },
        //选中改变
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //-----------操作
        //编辑
        edit_handle(row){
            // let refuseReason = row.refuseReason ? row.refuseReason:"";
            let newUrl = this.$router.resolve({path:'/duocai/detail',query:{editType:row.id,refus:row.refuseReason,role:"user"}})
            window.open(newUrl.href, "_blank");
        },
        //提交
        subit_handle(row){

        },
        //签署销售合同
        sign_sale_handle(row){
            // this.$route.push({name:"elesign",query:{signTimestamp}});
        },
        //签署签收单
        sign_form_handle(row){
            
        },
        //查看  
        see_handle(row){
            let newUrl = this.$router.resolve({path:'/duocai/detail',query:{lookType:row.id,role:"user",reset:"0"}}) 
            window.open(newUrl.href, "_blank");
        },
        //需求取消原因
        mouse_enter(row,e){
            $(e.target).next().css("display","block");
        },
        mouse_leave(e){
            $(e.target).next().css("display","none");
        },
        mouse_enter_c(e){
            $(e.target).css("display","block");
        },
        mouse_leave_c(e){
            $(e.target).css("display","none");
        },
        //下载合同
        upload_handle(row){
            let a_upload = document.createElement("a");
            document.body.appendChild(a_upload);
            a_upload.href = row.signFileUrl;
            a_upload.target = "_block";
            a_upload.click();
            document.body.removeChild(a_upload);
        },
        //下载付款单
        upload_payment_handle(row){
            // this.close_demand_U(row);
            let {id} = row;
            let paramsData = {
                id,
            };
            // get_bold_file(this.user_down_api,{
            //     params:{...paramsData},
            //     data:{}
            // });

            this.$download(this.user_down_api,{...paramsData});
        },

        //serach_swt
        search_c(params,prop){
            this.axios.post(this.userListApi,params).then(res=>{
                let _res = res.data;
                if(_res.code === "0"){
                    //翻页数据
                    this.pageList.total = _res.data.total;
                    let num = (_res.data.pageNum - 1)*10;
                    //分页
                    if(prop){
                        this.show_page = false;
                    　　this.$nextTick(() => {
                    　　  this.show_page = true;
                    　　});
                    };
                    if(_res.data.total === 0){
                        this.tableData = [];
                    }else{
                        this.tableData = _res.data.list.map(item=>{
                            // //审核状态
                            item.orderStatus_c = item.orderStatus;
                            //状态
                            if(item.orderStatus) item.orderStatus = this.get_status(item.orderStatus - 1);
                            // item.orderStatus = (item.purchaseStatus == "0" && item.orderStatus) ? this.getStatusHandle(item.orderStatus - 1):this.getStatusHandle(6);
                            if(item.orderStatus === "待签署合同" && item.pdfList){
                                for(var i= 0;i<item.pdfList.length;i++){
                                    if(item.pdfList[i].fileType == 1) item.signTimestamp_con = item.pdfList[i].signTimestamp;
                                    if(item.pdfList[i].fileType == 3) item.signTimestamp_sign = item.pdfList[i].signTimestamp;
                                }
                            };
                            //合同详情订单  item
                            if(item.pdfList)  item.contractDetail = [...item.pdfList];
                            //创建时间
                            if(item.createTime) item.createTime = item.createTime.split(" ")[0];
                            //orderId
                            if(item.id) item.id = item.id;
                            item.number = ++num;
                            //还款时间
                            if(item.paymentDay != "0"){
                                var num_pay = item.paymentDay == "1" ? 7:item.paymentDay == "2" ? 14:28;
                                //还款日 - 当前天数
                                var count_day_num3 = time_handle.count_pay_day("yyyy-MM-dd",item.startTime,num_pay-1); //还款日
                                var count_day_num4 = time_handle.get_count_day(time_handle.get_detail_day(),count_day_num3);
                                let y_y_r = item.startTime ? item.startTime.replace("-","年").replace("-","月") + "日" :"";
                                item.startTime ={   // time_handle.get_count_day(ime_handle.get_detail_day(),item.startTime)
                                    pay_time:count_day_num4 > 0? count_day_num4:0,      //账期剩余时间
                                    payment_days: num_pay,                         //账期天数
                                    pay_time_count: y_y_r,         //还款日期
                                };
                            };  
                            //操作
                            return item;
                        });
                    };
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        //状态机
        get_status(index){   
            let arr = ["待提交","待审核","审核成功","审核失败","待签署合同","待付款","需求完成","需求取消"];
            return arr[index];
        },

        //分页
        prev_click(prev){
            this.search_c({pageNum:prev,...this.requireFormData})
        },
        next_click(next){
            this.search_c({pageNum:next,...this.requireFormData})
        },
        current_change(current){
            this.search_c({pageNum:current,...this.requireFormData});
        },
        handleSizeChange(val){
            // console.log(`每页 ${val} 条`);
            return `每页 ${val} 条`;
        },
    }
}
</script>

<style lang="less" scoped>
    .requireSearch{
        margin-bottom:15px;
    }
    #status{
        width: 120px !important;
    }
    .el-input,.el-select {
        /deep/ .el-input__inner{
            border-radius: 0;
            display: inline-block;
            width: 150px;
        }
    }
    .el-input{
        /deep/ #orderNum{
            display: inline-block;
            width: 182px;
        }
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:150px;
    }
    #sellerB .el-input__inner{
        width:150px;
    }
    .el-input,.el-select {
        /deep/ #statusF{
            width: 120px;
        }
    }
    .el-form{
        position: relative;
    }
    .searchList{
        position: absolute;
        // top: 3px;
        right: 0px;
        display: inline-block;
        text-align: center;
        font-size: 14px;
        line-height: 33px;
        width: 60px;
        height: 32px;
        background: #ffffff;
        border: 1px solid #2e88ed;
        color: #2E88ED;
        cursor: pointer;
        
    }
    .el-table{
        /deep/ td{
            text-align: center;
        }
    }
    .el-table{
        /deep/ .has-gutter{
            background:rgba(255,255,255,1);
        }
    }
    .requireList{
        padding-bottom: 70px;
    }
    .searchList:hover{
        background:#2E88ED;
        color:rgba(255,255,255,1);
    }
    .el-form-item{
        /deep/ .el-form-item__label{
            padding-right:0px !important;
        }
    }
    .el-form--inline .el-form-item{
        margin-right: 15px;
    }
    .showPages{
        display: flex;
        float:right;
        margin: 23px;
    }
    .totalNum{
        line-height: 33px;
    }
    .requireList{
        /deep/ .el-button{
            font-size: 14px;
        }
    }
    .requireFormS{
        /deep/.el-table{
            overflow: visible !important;
        }
    }
    .requireFormS{
        /deep/.el-table__body-wrapper{
            overflow: visible !important;
        }
    }
    .show_display_mouser{
        display: none;
        position: absolute;
        background: #EFEFEF;
        text-align: left;
        padding: 20px 15px;
        width: 441px;
        top: 50px;
        z-index: 100;
        height: auto;
        max-height: 216px;
        left: 0px;
    };
    .show_display_mouser::before {
        content: " ";
        position: absolute;
        bottom: 100%;
        left: 79px;
        top: -10px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-bottom: 10px solid #ebe9e9;
        border-right: 10px solid transparent;
    }
    .requireList{
        /deep/ .el-table td, .el-table th.is-leaf{
            border-bottom: 1px solid #e5e5e5 !important;
        }
    }
    .requireList{
        /deep/ .el-table th.is-leaf{
            border-bottom: 1px solid #e5e5e5 !important;
        }
    }
    .requireList{
        /deep/ .el-table--border{
            border-top: 1px solid #e5e5e5 !important;
            border-left: 1px solid #e5e5e5 !important;
        }
    }
    .requireList /deep/.el-table--border td{
        border-right: 1px solid #e5e5e5 !important;
    }
    .requireList /deep/.el-table--border th{
        border-right: 1px solid #e5e5e5 !important;
        background:rgba(245,245,245,1);
    }
    
    #cacel_icon{
        color:rgb(255, 133, 35);
        vertical-align: middle;
        font-size:20px
    }
</style>