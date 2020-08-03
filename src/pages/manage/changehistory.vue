<template>
    <div class="change_history">
        <manageHeader/>
        <!--变更历史-->
        <div  class="requireTitle">
            <div>
                <p class="reqFormManage">变更历史</p>
            </div>
            <!--列表数据-->
            <div>
                <el-form ref="form" :model="form" label-width="80px" disabled>
                    <table>
                        <tr class="c_t">
                            <td>采购方联系方式</td>
                        </tr>
                        <tr class="_flex _mr2">
                            <td class="_flex">
                                <label class="_inline">商务对接人名称：</label>
                                <el-input v-model="form.user.busiName"></el-input>
                            </td>
                            <td class="_flex">
                                 <label class="_inline _center">职务：</label>
                                <el-input v-model="form.user.duty"></el-input>
                            </td>
                            <td class="_flex">
                                <label class="_inline">微信：</label>
                                <el-input v-model="form.user.wechat"></el-input>
                            </td>
                        </tr>
                        <tr class="_flex _mr2">
                             <td class="_flex">
                                 <label class="_inline">对接人手机：</label>
                                <el-input v-model="form.user.busiMobile"></el-input>
                            </td>
                             <td class="_flex">
                                 <label class="_inline">对接人电话：</label>
                                <el-input v-model="form.user.busiPhone"></el-input>
                            </td>
                        </tr>
                    </table>

                     <table>
                        <tr class="c_t">
                            <td>供应商联系方式</td>
                        </tr>
                        <tr class="_flex _mr2">
                            <td class="_flex">
                                <label class="_inline">商务对接人名称：</label>
                                <el-input v-model="form.supplier.buttName"></el-input>
                            </td>
                            <td class="_flex">
                                 <label class="_inline _center">职务：</label>
                                <el-input v-model="form.supplier.duty"></el-input>
                            </td>
                            <td class="_flex">
                                <label class="_inline">微信：</label>
                                <el-input v-model="form.supplier.wechat"></el-input>
                            </td>
                        </tr>
                        <tr class="_flex _mr2">
                             <td class="_flex">
                                 <label class="_inline">对接人手机：</label>
                                <el-input v-model="form.supplier.buttPhone"></el-input>
                            </td>
                             <td class="_flex">
                                 <label class="_inline">对接人电话：</label>
                                <el-input v-model="form.supplier.buttTelephone"></el-input>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr class="c_t">
                            <td class="_flex">
                                佳华哆啦销售联系方式
                            </td>
                        </tr>
                        <tr class="_flex _mr2">
                            <td class="_flex">
                                 <label class="_inline">销售人姓名：</label>
                                <el-input v-model="form.sellerInfoName" disabled></el-input>
                            </td>
                        </tr>
                            
                    </table>
                </el-form>
            </div>
            <!--表格-->
            <el-table :data="tableData" style="width:100%;font-size:14px;color:#353535;" ref="multipleTable" align="center" border
            :header-cell-style="{background:'#EFEFEF',color:'#252525',fontWeight:400}" 
            >
                <!-- <el-table-column type="selection" width="55px" header-align="center">

                </el-table-column> -->
                <el-table-column prop="num" label="序号" width="100px" header-align="center">

                </el-table-column>
                <el-table-column prop="userName" label="采购商名称" width="230px" header-align="center">

                </el-table-column>
                <el-table-column prop="orderStatus" label="需求状态" width="150px" header-align="center">
                    <template slot-scope="scope">
                        <div>
                            <p>{{scope.row.orderStatus}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="reson" label="变更理由" width="230px" header-align="center">
                     <!--是否账期、超期，距还款时间   //待处理-->
                    <template slot-scope="scope" v-if="scope.row.reson_c != ''">
                        <div>
                            <p>{{scope.row.reson_c}}</p>
                            <p>{{scope.row.reson}}</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="checkTime" label="处理时间" width="264px" header-align="center">

                </el-table-column>
            
                <el-table-column prop="checkName" label="处理人" width="145px" header-align="center"> 

                </el-table-column>

                <!-- <el-table-column prop="orderStatus" label="变更类型" width="125px" header-align="center">

                </el-table-column> -->

                 

            </el-table>
        </div>
        <subjectFooter/>
    </div>
</template>

<script>
import manageHeader from "@/components/managecommon/manageHeader.vue";
import subjectFooter from '@/components/common/subjectFooter.vue';
import { mapState,mapMutations } from "vuex";
export default {
    name:"changeChistory",
    data(){
        return {
            change_history:"/manager/getOrderInfo",
            form:{
                    user:{

                    },
                    supplier:{

                    },
                    sellerInfoName:""
            },
            //采购方名称
            userName:"",
            tableData:[],
        }
    },
    components:{
        manageHeader,
        subjectFooter
    },
    computed:{
        ...mapState({
            
        })
    },
    mounted(){
        //接口逻辑
        let { currentId } = this.$route.query;
        this.axios.post(`${this.change_history}?orderId=${currentId}`).then(res=>{
            if(res.data.code === "0"){
                //采购方 对接人名称
                //let { busiName,duty,wechat,busiMobile,busiPhone } = res.data.data.usersReqDTO;  // 职务  微信  对接人手机号  对接人电话
                this.form.user.busiName = res.data.data.usersReqDTO.busiName;
                this.form.user.duty = res.data.data.usersReqDTO.duty;
                this.form.user.wechat = res.data.data.usersReqDTO.wechat;
                this.form.user.busiMobile = res.data.data.usersReqDTO.busiMobile;
                this.form.user.busiPhone = res.data.data.usersReqDTO.busiPhone;
                //供应商
                //let { buttName,duty,wechat,buttPhone,buttTelephone} = res.data.data.supplierInfoDTO;
                this.form.supplier.buttName = res.data.data.supplierInfoDTO.buttName;
                this.form.supplier.duty = res.data.data.supplierInfoDTO.duty;
                this.form.supplier.wechat = res.data.data.supplierInfoDTO.wechat;
                this.form.supplier.buttPhone = res.data.data.supplierInfoDTO.buttPhone;
                this.form.supplier.buttTelephone = res.data.data.supplierInfoDTO.buttTelephone;

                //佳华哆啦销售联系方式
                this.form.sellerInfoName = res.data.data.sellerInfoName;
                this.userName = res.data.data.userName;

                let num = 0;
                this.tableData = res.data.data.orderStatusRecordDTOList.map(item=>{
                    item.reson_c = item.refuseReason ? "驳回理由：": item.cancelReason ? "取消理由：":"";
                    item.reson = item.refuseReason ? item.refuseReason:item.cancelReason;
                    item.num = ++num;
                    item.userName = this.userName;
                    return item;
                });
                //表格数据

            }
        }).catch(error=>{

        })
        this.$nextTick(()=>{
            $(".el-textarea__inner").addClass("input_p");
        });
        $(".el-input__inner").addClass("input_p");
    },
    methods:{

    }
}
</script>

<style lang="less" scoped>
    .requireTitle{
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        margin-bottom: 35px;
         width:1200px;
        background:#FFFFFF;
        margin: 0 auto;
        box-sizing: border-box;
        margin-top: 15px;
        padding: 30px 40px 20px;
    }
    .reqFormManage{
       font-size:20px;
        color:rgba(37,37,37,1);
    }
    .new-constructor{
        width:130px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(46, 136, 237, 1);
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        margin-top: 30px;
        color: #2E88ED;
        cursor: pointer;
    }
    .cloun div{
        display: flex;
        justify-content: space-between;
    }
    .c_t{
        display: block;
        margin: 30px 0px;
        // margin-top: 40px;
        font-size: 14px;
        font-weight: 550;
        // margin-bottom: 20px;
    }
    .el-form{
        /deep/ .el-form-item__label{
            width:140px;
        }
    }
    ._inline{
        display: inline-block;
        width: 180px;
    }
    ._flex{
        display: flex;
        justify-content: space-between;;
        align-items: center;
    }
    ._mr2{
        margin-bottom: 22px;
    }
    
    .el-table{
        /deep/ td{
            text-align: center;
        }
    }
    ._center{
        text-align: center;
    }
    
    .requireTitle{
        /deep/ .el-table td, .el-table th.is-leaf{
            border-bottom: 1px solid #e5e5e5 !important;
        }
    }
    .requireTitle{
        /deep/ .el-table th.is-leaf{
            border-bottom: 1px solid #e5e5e5 !important;
        }
    }
    .requireTitle{
        /deep/ .el-table--border{
            border-top: 1px solid #e5e5e5 !important;
            border-left: 1px solid #e5e5e5 !important;
        }
    }
    .requireTitle /deep/.el-table--border td{
        border-right: 1px solid #e5e5e5 !important;
    }
    .requireTitle /deep/.el-table--border th{
        border-right: 1px solid #e5e5e5 !important;
        background:rgba(245,245,245,1);
    }
</style>