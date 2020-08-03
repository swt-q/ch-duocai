<template>
    <div class="requireForm">
        <!--需求单列表头部， 新建采购可控制-->
        <div class="requireTitle">
            <p class="reqFormManage">需求单管理</p>
            <p class="new-constructor" v-if="newConstructor" @click="newHandle">新建采购需求</p>
        </div>
        <!--需求单查询-->
       <requireFormS v-if="newConstructor"/>
       <requireFormM v-if="!newConstructor"/>
    </div>
</template>

<script>
import {mapState} from "vuex";
import requireFormS from "@/components/requireform/requireFormChild/requireFormS.vue";
import requireFormM from "@/components/requireform/requireFormChild/requireFormM.vue";
export default {
    name:"requireForm",
    props:["newConstructor"],
    components:{
        requireFormS,
        requireFormM
    },
    computed:{
        ...mapState({
            roleStore:state=>state.manageStore.role,
        })
    },
    data(){
        return {
           
        }
    },
    mounted(){
        if(this.newConstructor){
            $(".requireForm").css({
                width:"1200px",
                padding:"30px 40px 20px",
            })
        }else{
             $(".requireForm").css({
                width:"100%",
                padding:"30px 20px 20px",
            })
        }
    },
    methods:{
        newHandle(){
            this.$router.push({path:'/duocai/detail',query:{role:"user"}})
        }
    }
}
</script>

<style lang="less" scoped>
    .requireForm{
        // width:1200px;
        min-height: 600px;
        background:#FFFFFF;
        margin: 0 auto;
        box-sizing: border-box;
        margin-top: 15px;
        margin-bottom: 35px;
        // padding: 30px 40px 20px;
    }
    .requireTitle{
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        margin-bottom: 35px;
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
</style>