<template>
  <div class="info">
    <div class="containt" @click="hiddenClick($event)">
    <!-- <div class="containt" @click.stop="()=>{ clickShow=false }"> -->
        <h3>采购商品信息:</h3>
        <el-form ref="form" :model="form" :inline="true" :rules="rules" style="margin:0 0 20px 60px;" :validate-on-rule-change="false">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="采购形式：" prop="value1">
                        <el-select :disabled="$store.getters.writeDisable" v-model="form.value1" placeholder="请选择" size="small" style="width:340px" @change="()=>{ $refs.form.validateField('value1') }" @blur="()=>{ $refs.form.validateField('value1') }">
                            <el-option v-for="(item,i) in form.options1" :key="i" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账期天数：" prop="value2">
                        <el-select :disabled="$store.getters.writeDisable" v-model="form.value2" placeholder="请选择" size="small" style="width:340px" @change="payment($event,'value2')" @blur="()=>{ $refs.form.validateField('value2') }">
                            <el-option v-for="(item,i) in form.options2" :key="i" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- 表格上 -->
        <div class="add" style="position: relative;margin-left:30px;">
            <div v-if="!$store.getters.writeDisable" v-show="clickShow" class="addbtn_left" :style="tableInfo.tableData.length>5?'background:#fff':''">
                <i v-if="tableInfo.tableData.length>5" v-show="jianFlag" class="iconfont icon-jian" @mouseover="()=>{ jianFlag = false }" ></i>
                <i v-if="tableInfo.tableData.length>5" v-show="!jianFlag" class="iconfont icon-jianqu blue" @click.stop="addHandle('jian')"  @mouseout="()=>{ jianFlag = true }"></i>
                <i v-show="addFlag" class="iconfont icon-add float_left" @mouseover="()=>{ jianFlag=true;addFlag = false }" ></i>
                <i v-show="!addFlag" class="iconfont icon-jiahao blue float_left" @click.stop="addHandle('add')" @mouseout="()=>{ addFlag = true }"></i>
            </div>
            <div v-if="!$store.getters.writeDisable" v-show="clickShow" class="addbtn_right" :style="tableInfo.tableData.length>5?'background:#fff':''">
                <i v-if="tableInfo.tableData.length>5" v-show="jianFlag" class="iconfont icon-jian" @mouseover="()=>{ jianFlag = false }" ></i>
                <i v-if="tableInfo.tableData.length>5" v-show="!jianFlag" class="iconfont icon-jianqu blue" @click.stop="addHandle('jian')"  @mouseout="()=>{ jianFlag = true }"></i>
                <i v-show="addFlag" class="iconfont icon-add float_right" @mouseover="()=>{ jianFlag=true;addFlag = false }" ></i>
                <i v-show="!addFlag" class="iconfont icon-jiahao blue float_right" @click.stop="addHandle('add')" @mouseout="()=>{ addFlag = true }"></i>
            </div>
            <el-form ref="tableInfo" :model="tableInfo">
                <el-table :data="tableInfo.tableData" border id="tablescroll" class="tb-edit" :header-cell-style="{background:'#f5f5f5',color:'#252525',fontWeight:'400'}" style="width: 1020px;font-size: 14px" highlight-current-row @row-click="handleCurrentChange" :summary-method="getSummaries" show-summary @cell-mouse-enter="handleMouseEnter">
                    <el-table-column label="序号" width="53" prop="num" align="center"></el-table-column>
                    <el-table-column label="专业公司" width="80" prop="companyName" header-align="center" align="center"></el-table-column>
                    <el-table-column label="商品品牌" width="209" prop="brandName" header-align="center" align="left">
                        <template slot-scope="scope">
                            <el-input :disabled="$store.getters.writeDisable" class="hidden" type="textarea" maxlength="64" resize="none" autosize v-model="scope.row.brandName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品品类" width="209" prop="categoryName" header-align="center" align="left">
                        <template slot-scope="scope">
                            <el-input :disabled="$store.getters.writeDisable" class="hidden" type="textarea" maxlength="64" resize="none" autosize v-model="scope.row.categoryName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="上传授权" width="111" prop="base64" align="center">
                        <template slot-scope="scope">
                            <uploading @handle="handlePic($event,scope.row)" :showFlag="scope.row.base64" :picIndex="scope.$index" :src="scope.row.base64" @update="(base64,name,authImageId) => upload(base64,name,scope.row,authImageId,scope.$index)" />
                        </template>
                    </el-table-column>
                    <el-table-column label="采购商品名称" width="131" prop="goodsName" header-align="center" align="left">
                        <template slot-scope="scope">
                            <el-input :disabled="$store.getters.writeDisable" class="hidden" type="textarea" maxlength="255" resize="none" autosize v-model="scope.row.goodsName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品型号" width="99" prop="type" header-align="center" align="left">
                        <template slot-scope="scope">
                            <el-input :disabled="$store.getters.writeDisable" class="hidden" type="textarea" maxlength="128" resize="none" autosize v-model="scope.row.type"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" width="67" prop="unit" align="center">
                        <template slot-scope="scope">
                            <el-input :disabled="$store.getters.writeDisable" class="textcenter hidden" maxlength="11" type="textarea" resize="none" autosize v-model="scope.row.unit"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" width="67" prop="goodsCount" align="center">
                        <template slot-scope="scope">
                            <el-input :disabled="$store.getters.writeDisable" class="textcenter hidden" maxlength="11" type="textarea" resize="none" autosize v-model="scope.row.goodsCount" @input="onlyNum(scope.row)" @change="handleEdit(scope.$index, scope.row)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="毛利点" width="79" prop="profit" align="center">
                        <template slot-scope="scope">
                            <el-input :disabled="$store.getters.writeDisable" class="textright hidden" maxlength="16" type="textarea" :data=scope resize="none" autosize v-model="tableInfo.profit1" @input="sumExp(tableInfo.profit1,'profit1')"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="采购单价（元）" width="124" prop="showBuyPrice" align="center">
                        <template slot-scope="scope">
                            <el-input :disabled="$store.getters.writeDisable" class="textright hidden" maxlength="16" type="textarea" resize="none" autosize v-model="scope.row.showBuyPrice" @blur="toFix(scope.row,'showBuyPrice')" @input="sumExp(scope.row,'showBuyPrice')" @change="handleEdit(scope.$index, scope.row)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="采购金额（元）" width="124" prop="purchaseMoney" align="right"></el-table-column>
                    <el-table-column label="销售单价（元）" width="124" prop="showSellPrice" align="center">
                        <template slot-scope="scope">
                            <el-input :disabled="$store.getters.writeDisable" class="textright hidden" maxlength="16" type="textarea" resize="none" autosize v-model="scope.row.showSellPrice" @blur="toFix(scope.row,'showSellPrice')" @input="sumExp(scope.row,'showSellPrice')" @change="handleEdit(scope.$index, scope.row)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="销售总价（元）" class="textright" width="124" prop="marketAllMoney" header-align="center" align="right"></el-table-column>
                </el-table>
        </el-form>
        </div>
        <div class="totie">
            <div>
                <p>采购单金额合计：{{tableInfo.purchase}} 元</p>
                <p>销售单金额合计：{{tableInfo.marketSum}} 元</p>
            </div>
        </div>
        <!-- 表格下 -->
        <el-form ref="info" :model="info" :inline="true" :rules="rules" label-width="150px" style="margin-top:30px" :validate-on-rule-change="false">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="期望发货时间：" prop="value3">
                        <el-date-picker :disabled="$store.getters.writeDisable" style="width:340px" :clearable="false" clear-icon="el-icon-date" value-format="yyyy-MM-dd" :picker-options="pickerOptions" v-model="info.value3" type="date" placeholder="选择日期" @change="commonRules('value3','emit')" @blur="commonRules('value3')"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="期望物流方式：" prop="value4">
                        <el-select :disabled="$store.getters.writeDisable" v-model="info.value4" placeholder="请选择" size="small" style="width:340px" @change="commonRules('value4')" @blur="commonRules('value4')">
                            <el-option v-for="item in info.options4" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="物流费用承担方：" prop="value5">
                        <el-select :disabled="$store.getters.writeDisable" v-model="info.value5" placeholder="请选择" size="small" style="width:340px" @change="commonRules('value5')" @blur="commonRules('value5')">
                            <el-option v-for="item in info.options5" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结算方式：" prop="value6">
                        <el-select :disabled="$store.getters.writeDisable" v-model="info.value6" placeholder="请选择" size="small" style="width:340px" @change="commonRules('value6')" @blur="commonRules('value6')">
                            <el-option v-for="item in info.options6" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="屡约保证金比率：" prop="value7">
                        <el-select :disabled="$store.getters.writeDisable" v-model="info.value7" placeholder="请选择" size="small" :style="earnestFlag?'width:237px':'width:340px'" ref="custom" @change="custom($event)" @blur="commonRules('value7')">
                            <el-option v-for="item in info.options7" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="earnestFlag" prop="earnest" style="width:102px;margin-left:6px;">
                        <div style="display:flex;">
                            <el-input :disabled="$store.getters.writeDisable" v-model="info.earnest" maxlength="16" @input="dotReplace()"></el-input> <span style="margin-left:4px">%</span>
                        </div>  
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
  </div>
</template>

<script>
import uploading from '@/components/common/uploading.vue'
export default {
name: 'info',
props:['saveObj'],
data () {
    return {
        addFlag:true,
        jianFlag:true,
        clickShow:false,
        //保证金显示隐藏
        earnestFlag:false,
        newPro:'',
        form:{
            options1: [
                {
                    id:'0',
                    label: '集采'
                }, 
                {
                    id:'1',
                    label: '代采'
                }, 
            ],
            options2: [
                {
                    id:'0',
                    label: '无'
                }, 
                {
                    id:'1',
                    label: '7天'
                }, 
                {
                    id:'2',
                    label: '14天'
                }, 
                {
                    id:'3',
                    label: '28天'
                }, 
            ],
            value1:'',
            value2:'',
        },
        tableInfo:{
            purchase:'',
            marketSum:'',
            profit1:'',
            tableData: [
                {
                    num: '1',
                    companyName: '通用电子',
                    brandName: '',
                    categoryName:'',
                    base64:'',
                    imgName:'',
                    authImageId:'',
                    goodsName:'',
                    goodsId:'',
                    type:'',
                    unit:'',
                    goodsCount:'',
                    showBuyPrice:'',
                    buyPrice:'',
                    purchaseMoney:'',
                    showSellPrice:'',
                    sellPrice:'',
                    marketAllMoney:'',
                },
                {
                    num: '2',
                    companyName: '通用电子',
                    brandName: '',
                    categoryName:'',
                    base64:'',
                    imgName:'',
                    authImageId:'',
                    goodsName:'',
                    goodsId:'',
                    type:'',
                    unit:'',
                    goodsCount:'',
                    showBuyPrice:'',
                    buyPrice:'',
                    purchaseMoney:'',
                    showSellPrice:'',
                    sellPrice:'',
                    marketAllMoney:'',
                },
                {
                    num: '3',
                    companyName: '通用电子',
                    brandName: '',
                    categoryName:'',
                    base64:'',
                    imgName:'',
                    authImageId:'',
                    goodsName:'',
                    goodsId:'',
                    type:'',
                    unit:'',
                    goodsCount:'',
                    showBuyPrice:'',
                    buyPrice:'',
                    purchaseMoney:'',
                    showSellPrice:'',
                    sellPrice:'',
                    marketAllMoney:'',
                },
                {
                    num: '4',
                    companyName: '通用电子',
                    brandName: '',
                    categoryName:'',
                    base64:'',
                    imgName:'',
                    authImageId:'',
                    goodsName:'',
                    goodsId:'',
                    type:'',
                    unit:'',
                    goodsCount:'',
                    showBuyPrice:'',
                    buyPrice:'',
                    purchaseMoney:'',
                    showSellPrice:'',
                    sellPrice:'',
                    marketAllMoney:'',
                },
                {
                    num: '5',
                    companyName: '通用电子',
                    brandName: '',
                    categoryName:'',
                    base64:'',
                    imgName:'',
                    authImageId:'',
                    goodsName:'',
                    goodsId:'',
                    type:'',
                    unit:'',
                    goodsCount:'',
                    showBuyPrice:'',
                    buyPrice:'',
                    purchaseMoney:'',
                    showSellPrice:'',
                    sellPrice:'',
                    marketAllMoney:'',
                },
            ],
        },
        //日期选项
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() <= Date.now() - 8.64e7;
            }
        },
        info:{
            value3:'',
            value4:'',
            value5:'',
            value6:'',
            value7:'',
            earnest:'',
            options4: [
                {
                    id:'0',
                    label: '物流'
                }, 
                {
                    id:'1',
                    label: '快递'
                }, 
            ],
            options5: [
                {
                    id:'0',
                    label: '供应商'
                }, 
                {
                    id:'1',
                    label: '采购方'
                }, 
            ],
            options6: [
                {
                    id:'0',
                    label: '电汇'
                }, 
                {
                    id:'1',
                    label: '银承'
                }, 
            ],
            options7: [
                {
                    id:'0',
                    label: '已签订履约保证金协议'
                }, 
                {
                    id:'1',
                    label: '自定义保证金'
                }, 
            ],
        }
    }
},
filters: { //局部过滤器
    toChies: function(amount) { //形参
    // 汉字的数字
    const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    // 基本单位
    const cnIntRadice = ["", "拾", "佰", "仟"];
    // 对应整数部分扩展单位
    const cnIntUnits = ["", "万", "亿", "兆"];
    // 对应小数部分单位
    const cnDecUnits = ["角", "分"];
    // 整数金额时后面跟的字符
    const cnInteger = "整";
    // 整型完以后的单位
    const cnIntLast = "元";
    // 最大处理的数字
    const maxNum = 9999999999999999.99;
    // 金额整数部分
    let integerNum;
    // 金额小数部分
    let decimalNum;
    // 输出的中文金额字符串
    let chineseStr = "";
    // 分离金额后用的数组，预定义
    let parts;
    if (amount === "") {
        return "";
    }
    amount = parseFloat(amount);
    if (amount >= maxNum) {
        // 超出最大处理数字
        return "";
    }
    if (amount === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    // 转换为字符串
    amount = amount.toString();
    if (amount.indexOf(".") === -1) {
        integerNum = amount;

        decimalNum = "";
    } else {
        parts = amount.split(".");
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    // 获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        let zeroCount = 0;
        const IntLen = integerNum.length;
        for (let i = 0; i < IntLen; i++) {
            const n = integerNum.substr(i, 1);
            const p = IntLen - i - 1;
            const q = p / 4;
            const m = p % 4;
            if (n === "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                // 归零
                zeroCount = 0;
                //alert(cnNums[parseInt(n)])
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m === 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    // 小数部分
    if (decimalNum !== "") {
        const decLen = decimalNum.length;
        for (let i = 0; i < decLen; i++) {
            const n = decimalNum.substr(i, 1);
            if (n !== "0") {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr === "") {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum === "") {
        chineseStr += cnInteger;
    }
    return chineseStr;
},
mycurrency: function(arg1) { 
    if(!arg1) return '';
    return Number(arg1).toFixed(2);
}
},
components:{
    uploading
},
methods:{
    toFix(scope,type){
        if(type == 'showBuyPrice' && scope.showBuyPrice){
            scope.showBuyPrice = (Math.round(Number(scope.showBuyPrice) * 100) / 100).toFixed(2);
        }else if(type == 'showSellPrice' && scope.showSellPrice){
            scope.showSellPrice = (Math.round(Number(scope.showSellPrice) * 100) / 100).toFixed(2);
        }
    },
    onlyNum(scope){
        scope.goodsCount = scope.goodsCount.replace(/[^\d]/g,'')
    },
    sumExp(scope,type){
        if(type == 'showBuyPrice'){
            //先把非数字的都替换掉，除了数字和.
            scope.showBuyPrice = scope.showBuyPrice.replace(/[^\d.]/g,"");
            //必须保证第一个为数字而不是.
            scope.showBuyPrice = scope.showBuyPrice.replace(/^\./g,"");
            //保证只有出现一个.而没有多个.
            scope.showBuyPrice = scope.showBuyPrice.replace(/\.{2,}/g,".");
            //保证.只出现一次，而不能出现两次以上
            scope.showBuyPrice = scope.showBuyPrice.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        }else if(type == 'showSellPrice'){
            scope.showSellPrice = scope.showSellPrice.replace(/[^\d.]/g,"");
            scope.showSellPrice = scope.showSellPrice.replace(/^\./g,"");
            scope.showSellPrice = scope.showSellPrice.replace(/\.{2,}/g,".");
            scope.showSellPrice = scope.showSellPrice.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        }else{
            this.tableInfo.profit1 = this.tableInfo.profit1.replace(/[^\d.]/g,"");
            this.tableInfo.profit1 = this.tableInfo.profit1.replace(/^\./g,"");
            this.tableInfo.profit1 = this.tableInfo.profit1.replace(/\.{2,}/g,".");
            this.tableInfo.profit1 = this.tableInfo.profit1.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            let sub = this.tableInfo.profit1.split('.');
            if(sub[1] && sub[1].length<=5){
                this.tableInfo.profit1 = sub[0]+'.'+sub[1];
                this.newPro = sub[1];
            }else if(sub[0] && sub[1]){
                this.tableInfo.profit1 = sub[0]+'.'+this.newPro;
            }
        }
    },
    dotReplace(){
        this.info.earnest = this.info.earnest.replace(/[^\d.]/g,"");
        this.info.earnest = this.info.earnest.replace(/^\./g,"");
        this.info.earnest = this.info.earnest.replace(/\.{2,}/g,".");
        this.info.earnest = this.info.earnest.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        let sub = this.info.earnest.split('.');
        if(sub[1] && sub[1].length<=5){
            this.info.earnest = sub[0]+'.'+sub[1];
            this.newPro = sub[1];
        }else if(sub[0] && sub[1]){
            this.info.earnest = sub[0]+'.'+this.newPro;
        }
    },
    hiddenClick(e){
        if(e.target.className == 'containt' || e.target.className == 'totie'){
            this.clickShow = false;
        }
    },
    //账期天数选择
    payment(val,ele){
        if(val == '0'){
            this.tableInfo.profit1 = ''
        }else if(val == '1'){
            this.tableInfo.profit1 = '0.994'
        }else if(val == '2'){
            this.tableInfo.profit1 = '0.9928'
        }else if(val == '3'){
            this.tableInfo.profit1 = '0.9928'
        }
        this.$refs.form.validateField(ele);
    },
    custom(val){
        if(val == '1'){
            this.earnestFlag = true;
        }else{
            this.earnestFlag = false;
        }
        // this.$refs.custom.selected.currentLabel = val;
        this.$refs.info.validateField('value7');
    },
    commonRules(ele,em){
        if(ele=='value3' && em=='emit'){
            this.$emit('emitSave');
        }
        this.$refs.info.validateField(ele);
    },
    handleMouseEnter(row, column, cell, event){
        if(Number(row.num) == this.tableInfo.tableData.length){
            if(!this.clickShow){
                this.clickShow = true;
            }
        }
    },
    addHandle(type){
        if(type == 'add'){
            let maxSum = Math.max.apply(Math,this.tableInfo.tableData.map(item => { return item.num }));
            let obj = {
                num: maxSum+1,
                companyName: '通用电子',
                brandName: '',
                categoryName:'',
                base64:'',
                imgName:'',
                authImageId:'',
                goodsName:'',
                goodsId:'',
                type:'',
                unit:'',
                goodsCount:'',
                showBuyPrice:'',
                buyPrice:'',
                purchaseMoney:'',
                showSellPrice:'',
                sellPrice:'',
                marketAllMoney:'',
            }
            this.tableInfo.tableData.push(obj);
        }else{
            this.tableInfo.tableData.pop();
        }
    },
    //计算合计方法
    getSummaries(param){
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
            /* if (index === 0) {
            sums[index] = '总计'
            } else  */
            if (index === 11 || index === 13) {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                    return prev + curr
                } else {
                    return prev
                }
                }, 0)
            } else {
                sums[index] = 'N/A'
            }
            } else {
            sums[index] = ''
            }
        })
        this.tableInfo.purchase = (Math.round(sums[11] * 100) / 100).toFixed(2);
        this.tableInfo.marketSum = (Math.round(Number(sums[13]) * 100) / 100).toFixed(2);
        return sums
    },
    //图片子传参
    handlePic(parameter,data){
        if(parameter == 'del'){
            data.base64 = '';
            data.imgName = '';
            data.authImageId = '';
        }
    },
    //图片上传
    upload(base64,name,data,authImageId,index) {
        if (base64) {
            data.base64 = base64;
            data.imgName = name.name;
            data.authImageId = authImageId;
        }
        this.$set(this.tableInfo.tableData,index,data);
    },
    //点击表格事件
    handleCurrentChange(row, event, column) {
        if(!this.$store.getters.writeDisable){
            var arr = ['序号','专业公司','上传授权','采购金额（元）','销售总价（元）'];
            if(event && !arr.includes(event.label)){
                if(event.label == '数量'){
                    $(".el-table__body-wrapper")[0].scrollLeft = 666;
                }
                if(event && column && column.path[6].children[1]){
                    column.path[6].children[1].querySelectorAll('td').forEach((v,i)=>{
                        v.style = '';
                    })
                    if(column.srcElement.className == 'el-textarea__inner'){
                        column.path[3].style = 'border:1px solid #9c9c9c;z-index:1;'
                    }
                }
            }
        }
        
    },
    //离开表格焦点事件
    handleEdit(index, row) {
        if(row.goodsCount && row.showBuyPrice){
            setTimeout(()=>{
                let res1 = Number(row.goodsCount)*Number(row.showBuyPrice);
                row.purchaseMoney = (Math.round(res1 * 100) / 100).toFixed(2);
            },10)
            
        }else if(!row.goodsCount || !row.showBuyPrice){
            row.purchaseMoney = ''
        }
        if(row.goodsCount && row.showSellPrice){
            setTimeout(()=>{
                let res2 = Number(row.goodsCount)*Number(row.showSellPrice);
                row.marketAllMoney = (Math.round(res2 * 100) / 100).toFixed(2);
            },10)
        }else if(!row.goodsCount || !row.showSellPrice){
            row.marketAllMoney = ''
        }
    }
},
watch:{
    saveObj:{
        handler(val){
            if(val){
                for(let i=0;i<this.tableInfo.tableData.length;i++){
                    let index = i;
                    for(let j=0;j<val.length;j++){
                        if(index==j){
                            this.tableInfo.tableData[i].goodsId = val[j].goodsId;
                        }
                    }
                }
            }
        },
        deep:true
    },
    listenCheckData:{
        handler(val){
            let info = this.$store.getters.checkDate;
            this.tableInfo.profit1 = info.gorssMargin;
            this.form.value1 = info.purchaseType;
            this.form.value2 = info.paymentDay;
            if(info.goodsDTOList){
                let nums = 0;
                let tableData = info.goodsDTOList;
                for(var i=0;i<tableData.length;i++){
                    tableData[i].num = ++nums;
                    tableData[i].showBuyPrice = tableData[i].buyPrice ? (Number(tableData[i].buyPrice) / 100).toFixed(2) : '';
                    tableData[i].showSellPrice = tableData[i].sellPrice ? (Number(tableData[i].sellPrice) / 100).toFixed(2) : '';
                    tableData[i].purchaseMoney = tableData[i].goodsCount && tableData[i].showBuyPrice ? (Number(tableData[i].goodsCount) * Number(tableData[i].showBuyPrice)).toFixed(2) : '';
                    tableData[i].marketAllMoney = tableData[i].goodsCount && tableData[i].showSellPrice ? (Number(tableData[i].goodsCount) * Number(tableData[i].showSellPrice)).toFixed(2) : '';
                    if(tableData.length < 5){
                        tableData.push(
                            {
                                num: tableData.length+1,
                                companyName: '通用电子',
                                brandName: '',
                                categoryName:'',
                                base64:'',
                                imgName:'',
                                authImageId:'',
                                goodsName:'',
                                goodsId:'',
                                type:'',
                                unit:'',
                                goodsCount:'',
                                showBuyPrice:'',
                                buyPrice:'',
                                purchaseMoney:'',
                                showSellPrice:'',
                                sellPrice:'',
                                marketAllMoney:'',
                            }
                        )
                    }
                };
                this.tableInfo.tableData = JSON.parse(JSON.stringify(tableData));
            }
            
            this.info.value3 = info.expectSendGoodsTime;
            this.info.value4 = info.expectLogisticsType;
            this.info.value5 = info.logisticsAssume;
            this.info.value6 = info.settleAccountType;
            if(info.marginType == '1'){
                this.earnestFlag = true;
                this.info.earnest  = info.marginRatio
            }
            this.info.value7 = info.marginType;

        },
        deep:true
    }
},
computed:{
    rules(){
        var checkphoneNum=(rule,value,callback)=>{
            if(value == ""){
                return callback(new Error('不能为空'));
            }else if(!(/^\d+$|^\d*\.\d+$/g).test(value)){
                return callback(new Error('请填写数字'));
            }else if(value.indexOf('.') >= 0){
                if(value.split('.')[1].length>5){
                    return callback(new Error('小数点位数不得超过5位'));
                }else{
                    return callback();
                }
            }else{
                return callback();
            }
        };
        return{
            value1:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            value2:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            value3:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            value4:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            value5:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            value6:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            value7:[{ required: this.$store.getters.writeRules, message: '不能为空', trigger: ['blur'] }],
            earnest:[{ required: this.$store.getters.writeRules, validator: checkphoneNum, trigger: ['blur'] }]
        }
    },
    //监听vuex数据 （ 审核状态的 ）
    listenCheckData() {
        return this.$store.getters.checkDate;
    }
},
mounted(){
    //重置效验
    this.$nextTick(()=>{
        this.$refs.form.clearValidate();
        this.$refs.info.clearValidate();
    })
    this.tableInfo.tableData.forEach((v,i)=>{
        if(v.goodsCount && v.showBuyPrice){
            let res1 = Number(v.goodsCount)*Number(v.showBuyPrice);
            v.purchaseMoney = (Math.round(res1 * 100) / 100).toFixed(2);
        }
        if(v.goodsCount && v.showSellPrice){
            let res2 = Number(v.goodsCount)*Number(v.showSellPrice);
            v.marketAllMoney = (Math.round(res2 * 100) / 100).toFixed(2);
        }
    })
}
}
</script>
<style lang="less" scoped>
.add{
    position: relative;
    .addbtn_left,.addbtn_right{
        width: 60px;
        position: absolute;
        bottom: 24px;
        z-index: 10;
        &>i{
            cursor: pointer;
            font-size: 24px;
            z-index: 10;
            color: #D3D3D3;
        }
        .float_left{
            float: right;
        }
        .float_right{
            float: left;
        }
        .blue{
            color: @blue;
        }
    }
    .addbtn_left{
        left: -70px;
        &>i{
            margin-right: 4px;
        }
    }
    .addbtn_right{
        right: -46px;
        &>i{
            margin-right: 6px;
        }
    }
}
.totie{
    width: 1018px;
    margin-left: 30px;
    // line-height: 50px;
    border:1px solid #EBEEF5;
    border-top: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &>div{
        display: flex;
        flex-wrap: wrap;
        padding: 16px 0;
        line-height: 30px;
        &>p{
            font-size: @three-size;
            color: @little-color;
            margin-left: 30px;
            float: right;
        }
        &>p:first-child{
            margin-right: 70px;
        }
        &>p:last-child{
            margin-right: 33px;
        }
    }
}
.containt{
    border: 1px dashed @blue;
    padding: 20px 28px;
    margin-bottom: 22px;
    &>h3{
        color: @big-color;
        font-size: @two-size;
        font-weight: bold;
        margin-bottom: 17px;
    }
}
.bottom0{
    margin-bottom: 0 !important;
}
.pad10{
    padding-bottom: 3px !important;
}
/deep/ .tb-edit .textcenter>textarea{
    text-align: center;
}
/deep/ .tb-edit .textright>textarea{
    overflow-y: hidden;
    text-align: right;
}
/deep/ .tb-edit .hidden>textarea{
    overflow-y: hidden;
}
/deep/ .tb-edit .el-textarea__inner{
    border: none !important;
    background: none !important;
    padding-left: 0 !important;
    padding: 12px 0;
}
/deep/ .el-table__body tr.current-row>td{
  background-color: #fff !important;
}
/deep/ .el-table td{
    padding: 0 0 !important;
}
/deep/ .el-table__footer-wrapper{
    display: none;
}
</style>


