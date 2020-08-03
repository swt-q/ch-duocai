<template>
    <div class="login-wrap" id="canvesLine">
        <div class="logoImg">
            <img src="../../../static/images/logo.png"/>
        </div>
        <div class="ms-login">
            <el-form :model="loginUser" :rules="rules" ref="login" label-width="0px" class="ms-content" autocomplete="false">
                <el-form-item prop="loginName">
                    <el-input type="username" v-model="loginUser.loginName" placeholder="请输入用户名" autocomplete="false">
                        <el-button slot="prepend" class="el-icon-user"></el-button>
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
                        <el-button slot="prepend" class="el-icon-key"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button type="info" @click="clearForm()">重置</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import test from "@/components/managecommon/test";
import {mapState,mapActions,mapMutations} from "vuex";
export default {
    name:"Login",
    created(){

    },
    mounted(){
        document.getElementById("app").style.height = "100%";
        test()
    },
    computed: {
         ...mapState({
            usernameStore:state=>state.testStore.username,
            passwordStore:state=>state.testStore.password,
            roleStore:state=>state.testStore.role,
            passwordMd5:state=>state.passwordMd5,
         }),
    },
    data: function() {
        return {
            loginUser: {
                loginName:"",
                loginPassword:"",
                // loginTime:"909",
            },
            manageLoginApi : "/user/login",
            rules: {
                loginName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                loginPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            loginImg:"../../../../static/images/logo.png",
            // gblogin:'url(/static/images/bglogo.jpg) no-repeat',
        };
    },
    methods: {
        ...mapActions({
            setRoleT:"testStore/setRoleHandle",
        }),
        ...mapMutations({
            saveUsernameT:"testStore/saveUsernameHandle",
        }),
        //登录
        submitForm(e) {
            let userPassword = this.$md5(this.passwordMd5 + this.loginUser.loginPassword + "");
            this.$refs.login.validate(valid => {
                if (valid) {
                    //测试用
                    let userLoginApi = `${this.manageLoginApi}?loginName=${this.loginUser.loginName}&password=${userPassword}`
                    //element表单校验通过   ---   走登录接口！！！
                    this.axios.get(userLoginApi).then((response)=>{
                        let res = response.data;
                        if(res.code == "0"){
                            sessionStorage.setItem("role","user");
                            this.$store.commit('savePhone', res.user.phone);
                            this.$router.push({name:"duocailist",params:{flag:"user"}});
                            this.$message({
                                showClose: true,
                                message: '登录成功！',
                                type: 'success'
                            });
                            //存role
                            this.setRoleT(res.data.role);
                            this.saveUsernameT(this.loginUser.loginName);
                            //成功跳
                           
                        }
                        // else if(res.code == "1"){
                        //     this.$message({
                        //         showClose: true,
                        //         message: '登录名或密码错误！',
                        //         type: 'success'
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
        }
    },
};
</script>

<style lang="less" scoped>
    #canvesLine{
        width: 100%;
       
    }
    #app{
        height: 100%;
    }
    .logoImg{
        width:1200px;
        margin:0 auto;
        padding-top: 20px;
    }
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background: radial-gradient(black, transparent);
    }
    .ms-title {
        width: 200px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        margin:0 auto;
    }
    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
        box-shadow: 0 0 3px 3px #fff;
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

