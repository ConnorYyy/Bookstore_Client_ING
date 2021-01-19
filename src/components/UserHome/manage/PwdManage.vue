<template>
  <div class="content">
    <h1>修改密码</h1>
    <div class="box_info">
      <div class="modify_box">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" size="medium">
          <el-form-item prop="oldPassword">
            <el-input type="text" v-model="ruleForm.oldPassword" autocomplete="off" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword">
            <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item prop="rePassword">
            <el-input type="password" v-model="ruleForm.rePassword" autocomplete="off" placeholder="密码确认"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" style="width: 40%;margin: 0px auto">修改密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
    // <!--用户订单页面-->
    import {reqModUserPwd} from "../../../api/user";

    export default {
        name: "PwdManage",
        data() {
            let validateRePass = (rule, value, callback) => {
                if (value !==this.ruleForm.newPassword){
                    callback(new Error('密码不一致'));
                }else{
                    callback();
                }
            }
            return {
                ruleForm: {
                    oldPassword: '',
                    newPassword: '',
                    rePassword: ''
                },
                rules: {
                    oldPassword: [
                        { required: true, message: '旧密码不能为空！', trigger: 'blur' },
                        { min: 8, message: '密码长度不能小于8位！', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '请输入新密码！', trigger: 'blur' },
                        { min: 8, message: '密码长度不能小于8位！', trigger: 'blur' }
                    ],
                    rePassword: [
                        { required: true, message: '请再次输入新密码！', trigger: 'blur' },
                        { validator: validateRePass, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("=====this.ruleForm.oldPassword:========"+this.ruleForm.newPassword+"====")
                        //数据校验成功，可以进行提交操作
                        reqModUserPwd(this.$store.getters.getUser.account,this.ruleForm.oldPassword,this.ruleForm.newPassword).then((response)=>{
                            if(response.data.code==200){
                                console.log("=====修改成功=====");
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
                                message: "修改密码失败",
                                duration: 1000
                            })
                        })
                    } else {
                        this.$message.error("数据不符合要求，不能进行注册");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style scoped>

  .content{
    margin: 10px auto;
    width:90%;
    background-color: white;
    padding: 30px 20px;
  }
  h1{
    color: #757575;
    font-family: 新宋体;
  }
  .box_info{
    width: 90%;
    margin: 10px auto;
  }
  .modify_box{
    margin: 30px auto;
    width: 50%;
    min-width: 300px;
    height: 100%;
    /*border: 1px solid #dfdfdf;*/
    text-align: center;
    padding: 15px;
  }

</style>
