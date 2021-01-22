<template>
  <div>
    <Nav></Nav>
    <div class="content">
      <div class="login_content">
        <h2 style="margin: 10px auto">登录</h2>
        <div style="margin: 20px auto;width: 350px">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
            label-position="right" label-width="80px" :hide-required-asterisk="true" size="medium">
            <el-form-item prop="account"  label="登录账号">
              <el-input type="text" v-model="ruleForm.account" autocomplete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="登录密码">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"  @keyup.enter.native="login('ruleForm')"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="login('ruleForm')" style="width: 100%; margin-bottom:22px">登录</el-button>
          <div style="font-size: 15px">
              <span style="float:left;">没有账号？<a href="/register">去注册</a></span>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

    import {reqLogin} from "../../api/user";
    import Nav from "../../components/Common/Nav";
    import Footer from "../../components/Common/Footer";
    import axios from 'axios';

    import CryptoJS from "crypto-js";

    export default {
        name: "Login",
        components: {Nav,Footer},
        data() {
            return {
                ruleForm: {
                    account: '',
                    password: '',
                },
                rules: {
                    account: [
                        { required: true, message: "请输入账号！", trigger: 'blur' },
                        { type: 'email', required: true, message: '请输入正确格式邮箱！', trigger: 'blur'},
                    ],
                    password: [
                        { required: true, message: '请输入密码！', trigger: 'blur' },
                        { min: 8, message: '密码长度不能小于8！', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            login(formName) {
                // var a = encrypt(formName.password);
                // var b = decrypt(a);
                // console.error("加密后--->" + a);
                // console.error("解密后--->" + b);
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("=====开始登录=======")
                        var cipherText = CryptoJS.AES.encrypt(
                            this.ruleForm.password,
                            "secretkey123"
                        ).toString();
                        console.error(cipherText);
                        console.error(CryptoJS.AES.decrypt(cipherText, "secretkey123").toString(CryptoJS.enc.Utf8));
                        reqLogin({
                            account: this.ruleForm.account,
                            password: this.ruleForm.password
                        }).then((response) => {
                            console.log("登录后的response："+response.data);
                            let user  = response.data.user;
                            console.log("=====user:==="+user+"=========");
                            const jwt = response.headers['authorization']
                            console.log("====jwt:=== "+jwt);
                            if(response.data.code == 200){
                                console.log("登录成功");
                                console.log(response);
                                const jwt = response.headers['authorization']
                                console.log("====jwt:=== "+jwt);
                                // //把数据共享出去
                                _this.$store.commit("SET_TOKEN", jwt)
                                console.log("===localStorage.getItem(\"token\")==="+localStorage.getItem("token")+"==");
                                _this.$store.commit("SET_USERINFO", response.data.user);
                                console.log("=====response.data.user====="+response.data.user+"========");
                                if(response.data.user.manage){
                                    this.$message({
                                        type: 'success',
                                        message: "登录成功！",
                                        duration: 1000
                                    })
                                    setTimeout(() => {
                                        this.$router.push({path:'/admin/home'});
                                    }, 1000);
                                }else {
                                    this.$message({
                                        type: 'success',
                                        message: "登录成功！",
                                        duration: 1000
                                    })
                                    setTimeout(() => {
                                        this.$router.push({path:'/user/userCenter'});
                                    }, 1000);
                                }
                                // console.log("返回来的SET_USERINFO:"+response.data.userInfo)
                                // this.$router.push({path:'/devHome/appList'});
                            }else {
                                this.$message({
                                    type: 'waring',
                                    message: "登录失败"
                                });
                            }
                        }).catch(() => {
                            this.$message.error("登录失败")
                        }).finally(()=>{
                            this.ruleForm = {};
                        })
                    } else {
                        this.$message.error("账号密码不符合要求，登录失败");
                    }
                });
            },
            // login(formName) {
            //     // var a = encrypt(formName.password);
            //     // var b = decrypt(a);
            //     // console.error("加密后--->" + a);
            //     // console.error("解密后--->" + b);
            //     let _this = this;
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             setTimeout(() => {
            //                 this.$router.push({path: '/user/userCenter'});
            //             })
            //         }
            //     })
            // },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
  body{
    height: 100vh
  }
  .content{
    height: calc(100vh - 81px);
    width: 100%;
    min-width: 100vw;
    overflow: hidden;
    background-color: #B3C0D1;
    background-image: url("/static/image/CITICBuilding.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }
  .login_content{
    margin: 130px auto;
    padding: 15px;
    width: 500px;
    height: 350px;
    background-color: white;
    border-radius: 10px;
  }
  h2{
    text-align: center;
    margin-bottom: 30px;
  }
</style>
