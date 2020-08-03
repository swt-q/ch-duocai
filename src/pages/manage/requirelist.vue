<template>
    <div class="requireList">
        <!--头-->
        <div v-if="flag == 'user' ? true:false">
            <loginHead/>
            <subjectHead/>
        </div>
        <manageHeader v-if="flag == 'manager' ? true:false" :newConstructor="newConstructor"/>
        <!--需求列表组件  （可复用）-->
        <requireForm :newConstructor="newConstructor"/>
        <subjectFooter/>
    </div>
</template>

<script>
import loginHead from '@/components/common/loginHead.vue'
import subjectHead from '@/components/common/subjectHead.vue'
import manageHeader from "@/components/managecommon/manageHeader.vue"
import subjectFooter from '@/components/common/subjectFooter.vue';
//需求列表组件
import requireForm from "@/components/requireform/requireForm.vue"

import {mapState} from "vuex";
export default {
    name:"requireList",
    components:{
        loginHead,
        subjectHead,
        requireForm,
        manageHeader,
        subjectFooter
    },
    created(){
        let {flag} = this.$route.params;

        this.flag = flag;
        this.newConstructor = flag === "user" ? true:false;
    },
    mounted(){
        var canvas = document.getElementsByTagName("canvas")[0];
        if(canvas){
            document.getElementsByTagName("body")[0].removeChild(canvas);
        }
    },
    computed: {
         ...mapState({
             usernameStore:state=>state.manageStore.username,
             passwordStore:state=>state.manageStore.password,
             roleStore:state=>state.manageStore.role,

             usernameTest:state=>state.testStore.username,
             roleStoreTest:state=>state.testStore.role,
         })
    },
    data: function() {
        return {
            headerTitle:"需求审核系统",
            newConstructor:true,  //根据身份判断
            flag:"manager",
        };
    },
    methods: {
       
    },
};
</script>

<style lang="less" scoped>
    body{
        background: #fff;
    }
</style>

