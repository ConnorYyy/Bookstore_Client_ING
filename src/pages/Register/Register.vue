<template>
  <div>
    <Nav></Nav>
    <div class="content">
      <div class="login_content">
        <h2 style="margin: 10px auto">注册</h2>
        <div style="margin: 20px auto;width: 350px">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" 
            label-position="right" label-width="80px" :hide-required-asterisk="true" size="medium">
            <el-form-item prop="account" label="登录账号">
              <el-input type="text" v-model="ruleForm.account" autocomplete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="登录密码">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="rePassword" label="确认密码">
              <el-input type="password" v-model="ruleForm.rePassword" autocomplete="off" placeholder="密码确认" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
          </el-form>
            <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%; margin-bottom: 22px">注册</el-button>
            <center><el-checkbox v-model="checked">已阅读并同意：第七书店用户协议</el-checkbox></center>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
    import Nav from "../../components/Common/Nav";
    import Footer from "../../components/Common/Footer";
    import {reqRegister,reqAccountVerify} from "../../api/user";

    export default {
        name: "Register",
        components: {Nav,Footer},
        data() {
            let checkAccount = (rule, value, callback) => {
                reqAccountVerify(value).then((response)=>{
                    if(response.data.code == 200){
                        callback();
                    }else{
                        callback(new Error(response.data.message));
                    }
                }).catch(err=>{
                    callback();
                })
            };
            let validateRePass = (rule, value, callback) => {
                if (value !==this.ruleForm.password){
                    callback(new Error('密码不一致'));
                    this.ruleForm.rePassword = "";
                }else{
                    callback();
                }
            }
            return {
                checked: 0,
                ruleForm: {
                    account: '',
                    password: '',
                    rePassword: ''
                },
                rules: {
                    account: [
                        { required: true, message: "请输入账号！", trigger: 'blur' },
                        { type: 'email', message: '请输入正确格式邮箱！', trigger: 'blur'},
                        { validator: checkAccount, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码！', trigger: 'blur' },
                        { min: 8, message: '密码长度不能小于8', trigger: 'blur' }
                    ],
                    rePassword: [
                        { required: true, message: '请再次输入密码！', trigger: 'blur' },
                        { validator: validateRePass, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //数据校验成功，可以进行提交操作
                        if(this.checked) {
                            reqRegister(this.ruleForm.account,this.ruleForm.password).then((response)=>{
                                if(response.data.code==200){
                                    console.log("=====注册成功=====");
                                    this.$message({
                                        type: 'success',
                                        message: response.data.message,
                                        duration: 1000
                                    })
                                    setTimeout(() => {
                                        this.$router.push({path:'/login'});
                                    }, 1000);
                                }else{
                                    this.$message({
                                        type: 'waring',
                                        message: response.data.message,
                                        duration: 1000
                                    })
                                }
                            }).catch(err=>{
                                this.$message({
                                    type: 'waring',
                                    message: "注册失败",
                                    duration: 1000
                                })
                            }).finally(()=>{
                                this.ruleForm = {};
                            })
                        } else {
                            this.$message.error("请阅读并同意用户协议！");
                            return false;
                        }
                    } else {
                        this.$message.error("数据不符合要求，不能进行注册！");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style scoped>
  .content{
    background-color: #B3C0D1;
    height: calc(100vh - 81px);
    overflow: hidden;
    min-width: 100vw;
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

