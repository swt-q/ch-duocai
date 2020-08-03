<template>
    <div class="login-wrap" style="background:url(./static/images/bglogo.jpg)">
        <div class="title_b">
            <div class="logoImg">
                <img src="../../../static/images/logo2.png"/>
            </div>
        </div>
        <div class="main_c">
            <div class="mange_img">
                <img src="../../../static/images/managebg.png"/>
            </div>
            <div class="ms-login">
                <div class="ms-title">哆采采购需求管理系统</div>
                <el-form :model="loginUser" :rules="rules" ref="login" label-width="0px" class="ms-content" autocomplete="false">
                    <el-form-item prop="loginName">
                        <el-input type="username" v-model="loginUser.loginName" placeholder="请输入用户名" autocomplete="false">
                            <i slot="prepend" class="el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="loginPassword">
                        <el-input
                            type="password"
                            placeholder="请输入密码"
                            autocomplete="false"
                            v-model="loginUser.loginPassword"
                            @keyup.enter.native="submitForm()"
                        >
                            <i slot="prepend" class="el-icon-key"></i>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">登录</el-button>
                        <el-button type="info" @click="clearForm()">重置</el-button>
                    </div>
                    <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
                </el-form>
            </div>
        </div>
        
    </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from "vuex";
export default {
    name:"Login",
    created(){

    },
    mounted(){
        document.getElementById("app").style.height = "100%";
        let md5P = this.$md5(this.passwordMd5 + this.loginUser.loginPassword + "");
    },
    computed: {
         ...mapState({
             usernameStore:state=>state.manageStore.username,
             roleStore:state=>state.manageStore.role,
             passwordMd5:state=>state.passwordMd5,
             passwordStore:state=>state.manageStore.password,
         }),
    },
    data: function() {
        return {
            loginUser: {
                loginName:"",
                loginPassword:"",
            },
            manageLoginApi : "/manager/login?loginName=",
            rules: {
                loginName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                loginPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            loginImg:"../../../static/images/logo2.png",
            gblogin:'url(../../../static/images/bglogo.jpg) no-repeat;background-size: cover',
            mange_img:"../../../static/images/managebg.png"
        };
    },
    methods: {
        ...mapActions({
            setRoleM:"manageStore/setRoleHandle",
        }),
        ...mapMutations({
            saveUsernameM:"manageStore/saveUsernameHandle", 
            savaPasswordM:"manageStore/savaPasswordHandle"
        }),
        //登录
        submitForm(e) {
            sessionStorage.clear();
            // let testPassword = this.$md5(this.passwordMd5 + this.loginUser.loginPassword + "");
            // let testUsename = this.$md5(this.passwordMd5 + this.loginUser.loginName + "");
            this.$refs.login.validate(valid => {
                if (valid) {
                    const loginUserMsg = this.loginUser;
                    const paramsDate = this.manageLoginApi + loginUserMsg.loginName + "&loginPassword=" + this.$md5(this.passwordMd5 + this.loginUser.loginPassword + "");
                    this.axios.post(paramsDate).then((respon)=>{
                        let res = respon.data;
                        if(res.code == "0"){
                            this.$message({
                                showClose: true,
                                message: '登录成功！',
                                type: 'success'
                            });
                            //存role
                            this.setRoleM(res.data.role);  //角色
                            this.saveUsernameM(this.loginUser.loginName);  //用户名
                            sessionStorage.setItem("role","manger");
                            // this.savaPasswordM(this.loginUser.loginName);
                            //成功跳
                            this.$router.push({name:"duocailist",params:{flag:"manager"}});
                        }
                        // else if(res.code == "1"){
                        //     this.$message({
                        //         showClose: true,
                        //         message: '登录名或密码错误！',
                        //         type: 'error'
                        //     });
                        // }

                    }).catch(error => {

                    });

                    
                } else {
                    this.$message({
                        showClose: true,
                        message: '请输入账号和密码！',
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        //重置信息
        clearForm(){
            this.loginUser.loginName = "";
            this.loginUser.loginPassword = "";
            // this.changeUserActionHandle
        }
    },
};
</script>

<style lang="less" scoped>
    #app{
        height: 100%;
    }
    .title_b{
        position: absolute;
        height: auto;
        width: 100%;
        background: rgba(233,247,255,0.06);
    }
    .logoImg{
        width:1200px;
        margin:0 auto;
        height: 70px;
        padding-top: 16px;
    }
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .ms-title {
        width: 200px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        margin:0 auto;
        color: #ffffff;
    }
    .main_c{
        width: @all-width;
        margin: 0 auto;
        height: 100%;
        position: relative;
    }
    .ms-login {
        position: absolute;
        left: 70%;
        top: 59%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
        box-shadow: 0 0 3px 3px #fff;
    }
    .mange_img{
        position: absolute;
        top: 55%;
        left: 26%;
        margin: -220px 0 0 -192px;
    }
    .mange_img img{
        width: 450px;
    }
    .ms-content {
        padding: 30px 30px;
        border-top: 1px solid #ddd;
    }
    .login-btn {
        margin-top: 35px;
        display: flex;
        justify-content: space-between;
        text-align: center;
    }
    .login-btn button {
        width: 45%;
        height: 36px;
        margin-bottom: 10px;
    }
    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>

