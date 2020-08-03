<!--销管列表页  用于采购需求审核-->
<template>
    <section class="main">
        <div v-if="nowComponent">
            <div class="searchBox">
            <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
                <div>
                    <el-form-item label="状态：">
                        <el-select v-model="searchFrom.orderStatus" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
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
                        <el-input v-model="searchFrom.orderNo" placeholder="请输入订单号"></el-input>
                    </el-form-item>
                    <!--日期start-->
                    <el-form-item label="提交时间：">
                        <div class="block">
                            <!-- <span class="demonstration"></span> -->

                            <el-date-picker
                                value-format="yyyy-MM-dd" 
                                v-model="searchFrom.begTime"
                                :picker-options="startDateLimit"
                                placeholder="开始日期">
                            </el-date-picker>
                            -
                            <el-date-picker
                                value-format="yyyy-MM-dd" 
                                v-model="searchFrom.endTime"
                                :picker-options="endDateLimit"
                                placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <!--日期end-->
                </div>
                <div>
                    <el-form-item label="供应商名称：">
                        <el-input v-model="searchFrom.supplierInfoName" placeholder="请输入供应商名称"></el-input>
                    </el-form-item>
                     <el-form-item label="采购商名称：">
                        <el-input v-model="searchFrom.userName" placeholder="请输入采购商名称"></el-input>
                    </el-form-item>

                    <el-form-item label="采购方式：">
                        <el-select v-model="searchFrom.purchaseType" placeholder="请输入采购方式">
                            <el-option label="请选择" value=""></el-option>
                            <el-option label="集采" value="0"></el-option>
                            <el-option label="代采" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="searchbtn">
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button type="info" @click="reset_searchFrom">重置</el-button>
                    </el-form-item>
                </div>

                
            </el-form>
        </div>
        <!--需求单信息-->
        <div class="container">
            <el-table :data="tableData" border style="width: 100%;font-size:14px" ref="multipleTable" tooltip-effect="dark" 
            @selection-change="handleSelectionChange" align="center" :header-cell-style="{background:'#EFEFEF'}" highlight-current-row
            >
                <!-- <el-table-column type="selection" width="55" header-align="center">

                </el-table-column> -->
                <el-table-column prop="number" label="序号" min-width="50" header-align="center">

                </el-table-column>
                <el-table-column prop="orderNo" label="订单号" min-width="117" header-align="center">

                </el-table-column>
                <el-table-column prop="submitTime" label="提交时间" min-width="90" header-align="center">

                </el-table-column>
                <el-table-column prop="purchaseType" label="采购方式" min-width="80" header-align="center">

                </el-table-column>
                <el-table-column prop="supplierInfoName" label="供应商名称" min-width="120" header-align="center">

                </el-table-column>
                <el-table-column prop="userName" label="采购商名称" min-width="100" header-align="center">

                </el-table-column>
                <el-table-column prop="gorssMargin" label="毛利点" min-width="65" header-align="center">

                </el-table-column>
                  <el-table-column prop="buyTotalPrice" label="采购金额" min-width="120" header-align="center">
                     <template slot-scope="scope">
                        <div class="cacel_r" v-if="scope.row.buyTotalPrice" style="text-align:right;margin:0 15px 0 0;width:100%;">
                            <span style="display:inline-block;width:100%">{{(scope.row.buyTotalPrice/100).toFixed(2)}}元</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sellTotalPrice" label="销售金额" min-width="120" header-align="center">
                    <template slot-scope="scope">
                        <div class="cacel_r" v-if="scope.row.sellTotalPrice" style="text-align:right;margin:0 15px 0 0;width:100%;">
                            <span style="display:inline-block;width:100%">{{(scope.row.sellTotalPrice/100).toFixed(2)}}元</span>
                        </div>
                    </template>

                </el-table-column>
                <el-table-column prop="orderStatus" label="状态" min-width="90" header-align="center">  
                    <!--icon-tanhao-->
                    <template slot-scope="scope">
                        <div class="cacel_r">
                            <span style="display:inline-block;width:100%;text-align:center">{{scope.row.orderStatus}}</span>
                        </div>
                    </template>

                </el-table-column>
                 <el-table-column prop="contractDetail" label="合同签章详情" min-width="120" header-align="center">
                    <!-- pdfList -->
                    <template slot-scope="scope" v-if="scope.row.contractDetail">
                        <div v-for="(item,index) in scope.row.contractDetail" :key="index">
                            <!-- <p style="margin-bottom:5px">{{item.fileName}}</p> -->
                            <p style="margin-bottom:5px">{{item.fileUrl}}</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="startTime" label="还款时间" min-width="110" header-align="center">
                    <!--是否账期、超期，距还款时间-->
                    <template slot-scope="scope" v-if="scope.row.paymentDay != '0' && scope.row.orderStatus === '需求完成'">
                        <div>
                            <p>账期：{{scope.row.startTime.payment_days}}天</p>
                            <p>{{scope.row.startTime.pay_time_count}}计算</p>
                            <p>距还款差：{{scope.row.startTime.pay_time}}天</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" min-width="115" header-align="center">
                    <template slot-scope="scope">
                        <el-button @click="lookRequireHandle(scope.row)" type="text" size="small" v-if="statusSeeShow.indexOf(scope.row.orderStatus) != -1">查看</el-button>
                        <el-button type="text" size="small" @click="chenkHandle(scope.row)" v-if="scope.row.orderStatus === '待审核'">审核</el-button>
                        <el-button type="text" size="small" @click="downLoadHandle(scope.row)" v-if="scope.row.orderStatus === '审核成功'">下载资料</el-button>
                        <el-button type="text" size="small" @click="createHandle(scope.row)" v-if="scope.row.orderStatus === '审核成功'">生成签章</el-button>
                        <el-button type="text" size="small" @click="contractHandle(scope.row)" v-if="scope.row.orderStatus === '待付款'">下载合同</el-button>
                        <el-button type="text" size="small" @click="uploadingHandle(scope.row)" v-if="scope.row.orderStatus === '待付款'">上传付款单</el-button>
                        <el-button type="text" size="small" @click="resetHandle(scope.row)" v-if="scope.row.orderStatus === '需求完成' && scope.row.paymentDay != '0'" id="set_day">重置还款起始日</el-button>
                        <el-button type="text" size="small" @click="closeHandle(scope.row)" v-if="statusCloseShow.indexOf(scope.row.orderStatus) != -1">关闭需求</el-button>
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
        
        <router-view></router-view>
        <!--关闭需求弹框-->
        <el-dialog title="请填写关闭理由" :visible.sync="reset_msg" ref="textAre" class="textAre">
            <div>
                <!-- <p class="t_title">请填写关闭理由</p> -->
                <textarea class="t_textare" @keyup="textareaNum_con" ref="textAreNum"></textarea>
                <p class="textNum_s">
                    <span>{{textareaNum}}/200</span>
                </p>
                <p class="t_btn">
                    <el-button type="info" class="t_cancle" @click="cacle_s">取消</el-button>
                    <el-button type="primary" class="t_ok" @click="cacle_ok">确认关闭</el-button>
                </p>
            </div>
        </el-dialog>

        <!--重置还款日期   事件！！--> 
        <el-dialog title="选择开始计算还款起始日" :visible.sync="dialogFormVisible">
            <p class="change_t">选择后，系统会根据所选时间和需求单的账期时间，开始计算还款日</p>
            <p>选择的当天为第一天</p>
            <el-form :model="set_time">
                <el-date-picker
                    value-format="yyyy-MM-dd" 
                    v-model="set_time.time"
                
                    placeholder="选择日期">
                </el-date-picker>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" type="info">取 消</el-button>
                <el-button type="primary" @click="change_payDay">确 定</el-button>
            </div>
        </el-dialog>

        <!--上传付款单  :limit="1"-->
        <el-dialog title="上传付款单" :visible.sync="upload_pay_img" class="upload-demo">
            <div>
                <el-upload
                    ref="upload_pay"
                    :action="upload_pay_url"
                    accept=".jpg,.jpeg,.png,.bmp,.JPG,.JPEG,.GIF,.BMP,"
                    :on-remove="on_remove_pay"
                    class="avatar-uploader"
                    :file-list="fileList_pay"  
                    :show-file-list="true"
                    :on-change="on_change"
                    drag
                    :auto-upload="false"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <div slot="footer" class="dialog-footer" id="dialog_footer">
                    <el-button type="primary" @click="change_pay_Mlist" id="upload_btn" v-show="have_no_img">确 定</el-button>
                    <el-button type="info" disabled v-show="!have_no_img" id="upload_btn">确 定</el-button>
                </div>
            </div>
       </el-dialog>
       <!--生成签章-->
        <el-dialog title="上传模板" :visible.sync="create_signature" class="upload-sign">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <div style="width:70%" class="_upload_1">
                        <el-form-item label="上传购销合同：" prop="name1">
                            <el-input v-model="ruleForm.name1" disabled></el-input>
                            <span class="upload_pdf">
                                <span class="upload_t1">上传文件</span>
                                <!-- :file-list="fileList_pay_c1"  -->
                                <el-upload
                                    ref="upload_pay_s1"
                                    :action="upload_pay_sign"
                                    :headers="myHeaders"
                                    accept=".pdf"
                                    :multiple="false"
                                    :with-credentials="true"
                                    :data="dataPdf1"
                                    name="pdfFile"
                                    class="avatar-uploader"
                                    :file-list="fileList_pay_c1" 
                                    :on-change="on_change_pay1"
                                    :beforeUpload="before_pay_upload1" 
                                    :on-error="on_error_upload1"
                                    :on-success="on_success_upload1"
                                    drag
                                    :auto-upload="false"
                                    style="opacity:0"
                                >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </span>
                        </el-form-item>
                    </div>

                    <div style="width:70%" class="_upload_2">
                        <el-form-item label="上传签收单：" prop="name2">
                            <el-input v-model="ruleForm.name2" disabled></el-input>
                            <span class="upload_pdf2">
                                <span class="upload_t2">上传文件</span>
                                <!-- :file-list="fileList_pay_c2"   -->
                                <el-upload
                                    ref="upload_pay_s2"
                                    :action="upload_pay_sign"
                                    accept=".pdf"
                                    :data="dataPdf2"
                                    :headers="myHeaders"
                                    :with-credentials="true"
                                    name="pdfFile"
                                    class="avatar-uploader"
                                    :file-list="fileList_pay_c2"
                                    :on-change="on_change_pay2"
                                    drag
                                    :multiple="false"
                                    :beforeUpload="before_pay_upload2" 
                                    :auto-upload="false"
                                    :on-error="on_error_upload2"
                                    :on-success="on_success_upload2"
                                    style="opacity:0"
                                >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </span>
                        </el-form-item> 
                    </div>
                                     
                    <!-- <div style="width:70%" class="_upload_1">
                        <el-form-item label="我司签章OU：" prop="name3">
                            <el-input v-model="ruleForm.name3" disabled></el-input>
                        </el-form-item>
                    </div> -->
                </el-form>

                <div slot="footer" class="dialog-footer" id="dialog_footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
                    <el-button type="info" plain @click="goback_pay">取 消</el-button>
                </div>
            </div>
       </el-dialog>
    </section>
</template>

<script>
import { url } from '@/api/baseUrl.js'
import process_env from "@/components/managecommon/process_env.js";
import getBase64 from "@/components/managecommon/img_base64.js";
import time_handle from "@/components/managecommon/count_day.js";
import {mapState,mapMutations} from "vuex";
    import axios from "axios";  
    export default {
        name: 'draglist',
        data() {
            return {
                visible: false,
                //----------pdf
                dialogImageUrl: '',
                dialogVisible: false,
                dataPdf:{
                    orderId:"7988779",
                    pdfType:"1"
                },
                //----------pdf
                //去签章
                goToSiginUrl:"",

                managerListApi:"/orderInfo/listPurchase",   //销管查询列表页,
                set_change_paytime:"/manager/updateOrderStartTime",
                jw_down_api:"/signOrigFile/goDowlondZip",
                nowComponent:sessionStorage.getItem("nowComponent","0") === "0" ? false:true,
                searchFrom: sessionStorage.getItem("save_search") ? JSON.parse(sessionStorage.getItem("save_search")):{
                    orderStatus: "",
                    orderNo: '',
                    begTime:"",
                    endTime:"",
                    supplierInfoName:"",
                    userName:"",
                    purchaseType:""
                },
                //日期限制
                startDateLimit: {
                    disabledDate: (time) => {
                        let endTime = this.searchFrom.endTime;
                        if (endTime) {
                            return time.getTime() > new Date(endTime).getTime();
                        }
                    }
                },
                endDateLimit: {
                    disabledDate: (time) => {
                        let beginTime = this.searchFrom.begTime;
                        if (beginTime) {
                            return time.getTime() < new Date(beginTime).getTime() - 8.64e7;  //开始和结束可以选择同一天
                        }
                    }
                },
                value1: '',
                value2: '',
                //表格数据
                tableData: [],
                
                statusCloseShow:["待审核","审核失败","审核成功","待签署合同","待付款"],  //关闭需求
                //"待审核",   ---待审核去掉查看  
                statusSeeShow:["审核失败","审核成功","待签署合同","待付款","需求完成","需求取消"],   //查看

                //分页数据
                pageList:{
                    total:0,
                },
                //驳回理由num
                reset_msg: false,
                textareaNum:0,

                //重置还款日期
                dialogFormVisible: false,
                set_time: {
                    time: '',
                },
                formLabelWidth: '120px',

                //上传付款单
                upload_pay_url:"/manager/upload", //付款单接口
                upload_pay_img:false,
                imageUrl:"",
                fileList_pay:[],
                upload_pay_data:{},
                have_no_img:false,

                //生成签章
                upload_pay_sign:"",
                create_signature:false,
                fileList_pay_c1:[],   //可换
                fileList_pay_c2:[],   //可换
                ruleForm: {
                    name1: '',
                    name2: '',
                    name3:"四川长虹佳华数字技术有限公司"
                },
                rules: {
                    name1: [
                        { required: true, message: '请上传购销合同pdf文件', trigger: 'change' },
                    ],
                    name2: [
                        { required: true, message: '请上传签收单pdf文件', trigger: 'change' },
                    ],
                    
                },
                create_pdf_i:0,
                create_pdf_i_error:0,
                dataPdf1:{
                    orderId:"",
                    pdfType:"1"
                },
                 dataPdf2:{
                    orderId:"",
                    pdfType:"3"
                },
                //cookie
                myHeaders:{},
                //分页
                show_page:true,
                //表格
                row_style:{}

            }
        },
        computed:{
            ...mapState({
                username_Store:state=>state.manageStore.username,
                close_demand:state=>state.manageStore.close_demand
            }),
            
        },
        created(){
            process_env();
        },
        mounted(){
            let paramsDate = {
                orderId:"29",
                userId:"2",
            }
            //status
            this.searchList_s(this.searchFrom);
            this.get_process_env();
        },
        components:{

        },
        watch:{
            "create_signature":{
                handler: function(newV, oldV) {
                    if(newV === false){
                        this.ruleForm.name1 = "";
                        this.ruleForm.name2 = ""
                    };
                },
                deep:true,
            }
        },
        methods: {
            ...mapMutations({
                close_demand_M:"manageStore/close_demand_M",
            }),
            //获取环境域名
            get_process_env(){
                let path = JSON.parse(sessionStorage.getItem("process"));
                if(path.NODE_ENV === "development"){  //开发
                   this.upload_pay_sign = "api/signPdf/uploadPdf";
                }else if(path.NODE_ENV === "production"){  //测试
                    this.upload_pay_sign = url+"duocai-server/signPdf/uploadPdf";
                    //正式环境需要改变。
                }
            },
            //审核状态---status --获取状态  1，2，3，4，5，6，7，8
            getStatusHandle(index){
                let statusArr = ["待提交","待审核","审核成功","审核失败","待签署合同","待付款","需求完成","需求取消"];
                return statusArr[index];
            },
            //采购方式
            getPurchaseHandle(index){
                let purchaseArr = ["集采","代采"];
                return purchaseArr[index];
            },
            handleClick(row) {
                
            },
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //搜索重置
            reset_searchFrom(){
                this.searchFrom = {
                    orderStatus: "",
                    orderNo: '',
                    begTime:"",
                    endTime:"",
                    supplierInfoName:"",
                    userName:"",
                    purchaseType:""
                };
                sessionStorage.setItem("save_search",JSON.stringify(this.searchFrom));
            },
            //审核
            chenkHandle(row){
                // this.$router.push({path:'/duocai/detail',query:{ checkType:row.id,role:"manger"}});

                let newUrl = this.$router.resolve({path:'/duocai/detail',query:{ checkType:row.id,role:"manger",reset:"0"}});
                window.open(newUrl.href, "_blank");
            },
            //查看
            lookRequireHandle(row){
                // this.$router.push({path:'/duocai/detail',query:{ lookType:row.id,role:"manger"}});

                let newUrl = this.$router.resolve({path:'/duocai/detail',query:{ lookType:row.id,role:"manger",reset:"0"}});
                window.open(newUrl.href, "_blank");
                
            },
            //下载资料
            downLoadHandle(row){
                var a_href = document.createElement("a");
                document.body.appendChild(a_href);
                a_href.href = row.fileUrl;
                a_href.target = "_block";
                a_href.click();
                document.body.removeChild(a_href);
            },
            //下载合同
            contractHandle(row){
                let a_upload = document.createElement("a");
                document.body.appendChild(a_upload);
                a_upload.href = row.signFileUrl;
                a_upload.target = "_block";
                a_upload.click();
                document.body.removeChild(a_upload);

            },
            //上传付款单
            uploadingHandle(row){
                this.upload_pay_img = true;
                this.close_demand_M(row);
            },
            //重置还款日期
            resetHandle(row){
                this.close_demand_M(row);
                this.dialogFormVisible = true;
            },
            //重置还款日期2
            change_payDay(){
                let { id,orderStatus_c } = this.close_demand;
                let params = {
                    id:id+"",
                    orderStatus:orderStatus_c,
                    startTime:this.set_time.time
                };
                this.$post(this.set_change_paytime,{params:{...params},data:{}}).then(res=>{
                    if(res.data.code === "0"){
                        this.$message.success('重置还款起始日成功！');
                        this.dialogFormVisible = false;
                        this.searchList_s(this.searchFrom);
                    }
                }).catch(error=>{

                });
            },
            //关闭需求
            closeHandle(row){
                // this.$refs.textAre.style.display = "block";
                this.reset_msg = true;
                this.close_demand_M(row);
                
            },
            handleRemove(file, fileList) {
                
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //上传成功的回调
            pdfSuccessHandle(res,file,fileList){
                // console.log(res,filemfileList,"上传成功！！！");
            },
            //change、上传失败、上传成功的回调！！！
            pdfErrorHandle(res,file,fileList){
                // console.log(res,filemfileList,"上传失败！！！");
            },

            //分页
            prev_click(prev){
                this.searchList_s({pageNum:prev,...this.searchFrom})
            },
            next_click(next){
                this.searchList_s({pageNum:next,...this.searchFrom})
            },
            current_change(current){
                this.searchList_s({pageNum:current,...this.searchFrom});
            },
            handleSizeChange(val){
               return `每页 ${val} 条`;
            },
            //查询接口
            onSubmit() {
                sessionStorage.setItem("save_search",JSON.stringify(this.searchFrom));
                this.searchList_s(this.searchFrom,1);
            },
            //查询列表
            searchList_s(params,prop){
                this.axios.post(this.managerListApi,params).then(res=>{
                    let _res = res.data;
                    if(_res.code === "0"){
                        //翻页数据
                        this.pageList.total = _res.data.total;
                        let num = (_res.data.pageNum-1)*10;
                        //分页组件
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
                                if(item.orderStatus) item.orderStatus = this.getStatusHandle(Number(item.orderStatus) - 1);
                                //采购方式
                                if(item.purchaseType === "0" || item.purchaseType === "1") item.purchaseType = this.getPurchaseHandle(item.purchaseType);
                                //合同详情订单  item
                                if(item.pdfList)  item.contractDetail = [...item.pdfList];
                                //原因
                                if(item.orderStatus_c === 8) item.cancelReason = item.cancelReason;
                                //orderId
                                if(item.id) item.id = item.id;
                                item.number = ++num;
                                //提交时间
                                if(item.submitTime) item.submitTime = item.submitTime.split(" ")[0];
                                //是否账期
                                item.paymentDay = item.paymentDay;  // 0 1 2 3 ---> 无 7 14 28
                                //是否为账期    还款时间
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
                })
            },
            //驳回理由
            textareaNum_con(e){
                let event = e || window.event;
                let target= event .target || event .srcElement;
                this.textareaNum = target.value.length;
                if(target.value.length > 200){
                    target.value = target.value.slice(0,200);
                    this.textareaNum = target.value.length;
                    this.$message({
                        showClose: true,
                        message: '关闭理由字数不能超过200个。',
                        type: 'warning'
                    });
                };
                
            },
            //取消
            cacle_s(){
                this.$refs.textAreNum.value = "";
                this.textareaNum = 0;
                this.reset_msg = false;
                // this.$refs.textAre.style.display = "none";
            },
            //确认关闭
            cacle_ok(){
                //
                if(this.$refs.textAreNum.value.length === 0){
                    this.$message({
                        showClose: true,
                        message: '请输入关闭需求理由！',
                        type: 'warning'
                    });
                    return;
                };
                let {id,orderStatus_c} = this.close_demand;
                let params_d = {
                    id,
                    status:"0",
                    orderStatus:orderStatus_c,
                    // orderStatus:"7",   //测试用
                    cancelReason:this.$refs.textAreNum.value
                };
                //关闭需求
                this.axios.post("/manager/updateOrderPurchaseStatus",params_d).then(res=>{
                    this.$refs.textAreNum.value = "";
                    this.$refs.textAre.style.display = "none";
                    this.textareaNum = 0;
                    this.reset_msg = false;
                    if(res.data.code === "0"){
                        this.searchList_s(this.searchFrom);
                        this.$message({
                            showClose: true,
                            message: '需求关闭成功！',
                            type: 'success'
                        });
                    }
                    // else if(res.data.code === "104"){
                    //     this.searchList_s(this.searchFrom);
                    //     this.$message({
                    //         showClose: true,
                    //         message: res.data.msg + "！",
                    //         type: 'success'
                    //     });
                    // }else{
                    //     this.$message({
                    //         showClose: true,
                    //         message: '需求关闭失败，稍后请重试！',
                    //         type: 'warning'
                    //     });
                    // }
                }).catch(error=>{
                })
            },

            on_change(file,filelist){
                getBase64(file.raw).then(res => {
                    this.have_no_img = true;
                    this.imageUrl = res; //base64
                    let {id} = this.close_demand;
                    //改变文件
                    if (filelist.length > 0) {
                        this.fileList_pay = [filelist[filelist.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
                    };
                    this.upload_pay_data.orderId = id + "";
                    this.upload_pay_data.base64 = res;
                    this.upload_pay_data.fileName = file.name;
                });
            },
            //上传付款单
            change_pay_Mlist(){
                let paramsData = {...this.upload_pay_data};
                this.have_no_img = false;
                this.axios.post("/manager/upload",paramsData).then(res=>{
                    if(res.data.code === "0"){
                        this.$message({
                            showClose: true,
                            message: '上传付款单成功！',
                            type: 'success'
                        });
                    }
                    // else{
                    //     this.$message({
                    //         showClose: true,
                    //         message: '上传付款单失败！',
                    //         type: 'warning'
                    //     });
                    // };
                    this.upload_pay_img = false; //弹框消失
                    this.imageUrl = ""; //图片清空
                    this.fileList_pay = [];
                    this.searchList_s(this.searchFrom); //数据刷新
                }).catch(error=>{
                    
                });
            },
            //删除付款单列表
            on_remove_pay(file,fileList){
                this.upload_pay_data = {};
                this.have_no_img = false;
                this.imageUrl = ""; //base64
            },
            //需求取消原因
            mouse_enter(row,e){
                $(e.target).next().css("display","block");
            },
            mouse_leave(e){
                $(e.target).next().css("display","none");
            },

            //生成签章
            createHandle(row){
                this.close_demand_M(row);
                this.ruleForm.name1 = "";
                this.ruleForm.name2 = "";
                this.create_signature = true;
                this.$nextTick(()=>{
                    this.$refs.ruleForm.clearValidate();
                });
                this.dataPdf1.orderId = this.close_demand.id;
                this.dataPdf2.orderId = this.close_demand.id;
            },
            //生成签章提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs.upload_pay_s1.submit();  //上传1
                        this.$refs.upload_pay_s2.submit();   //上传2
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            //生成签章----上传
            on_change_pay1(file,fileList){
                if(file.name.split(".").slice(-1)[0] != "pdf" && file.name.split(".").slice(-1)[0] != "PDF"){
                    this.$message({
                        showClose: true,
                        message: '请上传pdf文件！',
                        type: 'warning'
                    });
                    return;
                };
                if(file.name.indexOf("购销合同") > -1){ //名字
                    // fileList = [];
                    // fileList.push(file);
                    // this.ruleForm.name1 = file.name;
                    this.fileList_pay_c1 = [fileList[fileList.length - 1]]
                    this.ruleForm.name1 = file.name;
                }else if(fileList.length){
                    this.$refs.upload_pay_s1.clearFiles();
                    this.$nextTick(()=>{
                        this.$refs.ruleForm.clearValidate();
                    });
                    this.ruleForm.name1 = "";
                    this.$message({
                        showClose: true,
                        message: '您上传的购销合同名称不正确！',
                        type: 'warning'
                    });
                }
            },
            on_change_pay2(file,fileList){
                if(file.name.split(".").slice(-1)[0] != "pdf" && file.name.split(".").slice(-1)[0] != "PDF"){
                    this.$message({
                        showClose: true,
                        message: '请上传pdf文件！',
                        type: 'warning'
                    });
                    return;
                };
                if(file.name.indexOf("签收单") > -1){ //名字
                    // fileList = fileList.slice(0,1);
                    this.fileList_pay_c2 = [fileList[fileList.length - 1]]
                    this.ruleForm.name2 = file.name;
                }else if(fileList.length){
                    this.$refs.upload_pay_s2.clearFiles();
                    this.$nextTick(()=>{
                        this.$refs.ruleForm.clearValidate();
                    });
                    this.ruleForm.name2 = "";
                    this.$message({
                        showClose: true,
                        message: '您上传的签收单名称不正确！',
                        type: 'warning'
                    });
                }
            },
            //上传前
            before_pay_upload1(file,fileList){
                // console.log(file,fileList,"before1");

            },
            before_pay_upload2(file,fileList){
                // console.log(file,fileList,"before2");
            },
           //取消
            goback_pay(){
               this.create_signature = false;
            },
            on_error_upload1(res){
                // console.log(res,"错误！");
            },
            on_success_upload1(res){
                if(res.code === "0"){
                    this.create_pdf_i = this.create_pdf_i+1;
                    if(this.create_pdf_i === 2){
                        this.$message({
                            showClose: true,
                            message: '恭喜您，生成签章成功！',
                            type: 'success'
                        });
                        this.create_pdf_i = 0;
                        this.create_signature = false;
                        this.ruleForm.name1 = "";
                        this.ruleForm.name2 = "";
                        this.searchList_s(this.searchFrom); 
                        this.$refs.upload_pay_s1.clearFiles();
                        this.$refs.upload_pay_s2.clearFiles();
                    }
                }
                // else{
                //     this.create_pdf_i_error = ++this.create_pdf_i_error;
                //     this.create_signature = false;
                //     if(this.create_pdf_i_error === 2){
                //         this.create_pdf_i_error = 0;
                //         this.$message({
                //             showClose: true,
                //             message: '保存失败，请稍后重试！',
                //             type: 'error'
                //         });
                //         this.create_signature = false;
                //         this.ruleForm.name1 = "";
                //         this.ruleForm.name2 = "";
                //     };
                    
                // };
                
            },
            on_error_upload2(res){
                // console.log(res,"错误");
            },
            on_success_upload2(res){
                if(res.code === "0"){
                    this.create_pdf_i = this.create_pdf_i+1;
                    if(this.create_pdf_i === 2){
                        this.$message({
                            showClose: true,
                            message: '恭喜您，生成签章成功！',
                            type: 'success'
                        });
                        this.create_pdf_i = 0;
                        this.create_signature = false;
                        this.ruleForm.name1 = "";
                        this.ruleForm.name2 = "";
                        this.searchList_s(this.searchFrom);
                        this.$refs.upload_pay_s1.clearFiles();
                        this.$refs.upload_pay_s2.clearFiles();
                    }
                }
                // else{
                //     this.create_signature = false;
                //     this.create_pdf_i_error = ++this.create_pdf_i_error;
                //     if(this.create_pdf_i_error === 2){
                //         this.create_pdf_i_error = 0;
                //         this.$message({
                //             showClose: true,
                //             message: '保存失败，请稍后重试！',
                //             type: 'error'
                //         });
                //         this.create_signature = false;
                //         this.ruleForm.name1 = "";
                //         this.ruleForm.name2 = "";
                //     };
                // };
                
            },
            
        }
    }

</script>

<style lang="less" scoped>
    .searchBox{
        padding: 30px 8px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .searchbtn{
        margin-left:40px;
    }

    .container{
        font-size: 14px;
        margin-top: 10px;
        padding:20px 0px 80px 0px;
    }
    .showPages{
        display: flex;
        float:right;
        margin: 23px;
    }
    .el-table th>.cell{
        text-align: center;
        overflow: visible;
    }
    .el-table__header{
        /deep/ .cell{
            text-align: center;
             overflow: visible;
        }
    }

    .el-table{
        /deep/ td{
            text-align: center;
        }
    }
    .el-table th{
        /deep/ .is-leaf{
            text-align: center;
        }
        
    }
    .el-table td, .el-table th{
        text-align: center !important;
    }
    .totalNum{
        line-height: 33px;
    }

    //弹框
    .textAre{
        // display: block;
        position: fixed;
        // height: 380px;
        // width: 540px;

        // padding: 0 20px;
        // left: 50%;
        // top: 50%;
        // background: #fff;
        // border: 1px solid #ccc;
        // width: 500px;
        // height: 340px;
        // margin: -200px 0px 0px -250px;
        // z-index: 100;
        // border-radius: 10px;
    }
    .textNum_s{
        margin-top: 10px;
    }
    .t_title{
        font-weight: 600;
        text-align: center;
        font-size: 14px;
        line-height: 40px;
        color: #333;
    }
    .t_textare{
        width: 496px;
        height: 225px;
        border: 0;
        font-size: 16px;
        background: rgba(242, 242, 242);
    }
    .t_btn{
        position: absolute;
        bottom: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 47px;
        height: 44px;
    }
    .t_cancle{
        width:80px;
        margin-right: 20px;
    }
    //重置还款日期弹框
    .dialog-footer{
        display: flex;
        justify-content: center;
    }
    .dialog-footer .el-button{
        width: 80px;
        height: 34px;
    }
    .dialog-footer .el-button:nth-of-type(2){
        margin-left: 30px;
    }
    .el-dialog__wrapper{
        /deep/ .el-dialog__body{
            padding: 24px 20px;
        }
    }
    .el-dialog__wrapper{
        /deep/ .el-dialog{
            height: 255px;
            width: 490px;
        }
    }
    .textAre{
        /deep/ .el-dialog{
            height: 385px;
            width: 539px;
        }
    }
    .upload-demo{
        /deep/ .el-dialog{
             width: 600px;
            height: 420px;
        }
    }
    .upload-demo{
        /deep/ .el-dialog__headerbtn{
            top: 13px;
        }
    }
    .upload-demo{
        /deep/ .el-dialog__headerbtn{
            top: 13px;
        }
    }
    .upload-demo{
        /deep/ .el-dialog__header{
            padding: 0;
            background: #409EFF;
            text-align: center;
            line-height: 45px;
        }
    }

    //上传付款单
    .upload-sign{
        // height: 392px;;
    }
    .change_t{
        margin-bottom: 10px;
    }
    .el-form{
        margin-top: 22px;
    }
    .el-table__fixed-body-wrapper .el-table__body .el-table__row td{
        /deep/ .el-button--small{
            text-align: center;
            margin:0 !important;
        }
    }
    #set_day{
        margin: 0;
    }
    //上传付款单
    
    #upload_btn{
        position: absolute;
        right: 40px;
        bottom: 25px;
    }
    .el-table{
        /deep/ .cell{
            overflow: visible;
        }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .demo-form-inline{
        padding: 0 40px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .cacel_r{
        position: relative;
        text-align: center;
        display: flex;
        justify-content: space-between;
        width: 80px;
        margin: 0 auto;
    }
    #cacel_icon{
        font-size: 20px;
        position: absolute;
        right: 0;
        cursor: pointer;
    }
    .show_display_mouser{
        display: none;
        position: absolute;
        background: #EFEFEF;
        text-align: left;
        padding: 20px 15px;
        width: 440px;
        top: 31px;
        z-index: 100;
        height: 216px;
    };
    //上传pdf 弹框
    .upload_pdf{
        display: inline-block;
        float: right;
        margin-right: -130px;
        overflow: hidden;
        width: 96px;
        border-radius: 7px;
        height: 30px;
        border: 1px solid #409EFF;
    }
    .upload_pdf2{
        display: inline-block;
        float: right;
        margin-right: -130px;
        overflow: hidden;
        width: 96px;
        border-radius: 7px;
        height: 30px;
        border: 1px solid #409EFF;
    }
    .upload_t2,.upload_t1{
        position: absolute;
        width: 95px;
        z-index: 0;
        cursor: pointer;
        text-align: center;
    }

    ._upload_1 .el-form ._upload_1{
        /deep/ .el-form-item__label{
            padding: 0;
            position: absolute;
        }
    }
    ._upload_1,._upload_2{
        /deep/ .el-form-item__label{
            width: 120px !important;
        }
    }
    
    ._upload_1,._upload_2{
        /deep/ .el-form-item__content{
            margin-left: 120px !important;
        }
    }
    .upload-sign{
        /deep/ .el-dialog__header{
            background: #409EFF;
        }
    }
    .upload-sign,.upload-demo{
        /deep/ .el-dialog__title{
            color: #fff;
        }
    }
    .upload-sign,.upload-demo{
        /deep/ .el-icon-close:before{
            color: #fff;
        }
    }
    .upload-demo .avatar-uploader{
        /deep/ .el-icon-close:before{
            color:red !important;
        }
    }
    
    .upload-sign{
        /deep/ .el-dialog{
            height: 340px;
        }
    }
    .upload-sign{
        /deep/ .el-form{
            margin-bottom: 55px;
        }
    }
    .container{
        /deep/ .el-button{
            font-size: 14px;
        }
    }
    .upload-demo{
        /deep/ .el-upload-dragger{
            top: 40px;
            left: 190px;
            width: 177px;
        }
    }
    .upload-demo{
        /deep/ .el-upload-list{
            margin-top: 53px;
        }
    }
    #row_style{
        background: rgba(245,247,250);
    }   
    .el-input,.el-select {
        /deep/ .el-input__inner{
            border-radius: 0;
        }
    }
</style>

