<template>
  <div class="content">
    <div class="tab_content">
      <div class="first_tab">
        <el-form :model="publish" :rules="rules" ref="publish" label-width="100px">
          <el-form-item label="出版社名称" prop="name">
            <el-input v-model="publish.name"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="rank">
            <el-input v-model.number="publish.rank" @keyup.native="proving"></el-input>
          </el-form-item>
          <el-form-item label="是否显示">
              <el-switch v-model="publish.showPublish"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('publish')">确认</el-button>
            <el-button  @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import  {reqAddPublish,reqGetPublish,reqModifyPublish} from "../../../../../api/publish";

  export default {
        name: "PublishDetail",
        props: {
            value: Object,
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            let checkRank = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('排序不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 0) {
                            callback(new Error('数字值必须大于0'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            return {
                editId: null,
                publish: {
                    id: 1,
                    name: '',
                    rank: 1,
                    showPublish: false
                },
                rules: {
                    name: [
                        { required: true, message: '出版社名不能为空', trigger: 'blur' },
                        { min: 3, max: 10, message: '出版社长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    rank: [
                        { validator: checkRank, trigger: 'blur' }
                    ]
                }
            };
        },


        methods: {
            handleEditCreated(){
                console.log("this.$route.query.id"+this.$route.query.id);
                if(this.isEdit==true){
                    this.editId=this.$route.query.id;
                    reqGetPublish(this.editId).then(response=>{
                        if(response.data.code==200){
                            this.publish = response.data.publish;
                        }else{
                            this.$message({
                                message: response.data.message,
                                type: "warning"
                            })
                        }
                    }).catch(err=>{
                        console.error(err);
                    })
                }
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid)=>{
                    // console.log(this.publish.isShow);
                    if(valid){
                        if(this.isEdit){
                            this.modifyPublish();
                        }else {
                            this.addPublish();
                        }
                    }else {
                        this.$message.error("添加出版社失败");
                        return false;
                    }
                });
            },
            //点击取消  返回上一个页面
            cancel(){
            this.$router.push('/admin/publish')
            },

            addPublish(){
                console.log("提交的值为："+this.publish.showPublish);
                reqAddPublish(this.publish).then(response=>{
                    if(response.data.code==200){
                        this.$message.info("添加出版社成功");
                    }else{
                        this.$message({
                            message: response.data.message,
                            type: "warning"
                        })
                    }
                }).catch(err=>{
                    console.error(err);
                    this.$message.error("添加出版社失败");
                })
            },

            modifyPublish(){
                console.log("修改的值为："+this.publish.show);
                reqModifyPublish(this.publish).then(response=>{
                    if(response.data.code==200){
                        this.$message.info("修改出版社成功");
                    }else{
                        this.$message({
                            message: response.data.message,
                            type: "warning"
                        })
                    }
                }).catch(err=>{
                    console.error(err);
                    this.$message.error("修改出版社出错");
                })
            },

            proving(e){
                let keyNum = window.event ? e.keyCode : e.which;//获取键盘吗
                let keyChar = String.fromCharCode(keyNum);//获取键盘码对应的字符
                if(keyNum==189 || keyNum==190 || keyNum==110 || keyNum==109){
                    this.$message.warning("禁止输入小数以及负数");
                    e.target.value='';
                }
            },

        },
      created() {
            if(this.editId==false)
                return;
            else {
                this.handleEditCreated();
            }
      },
  }
</script>

<style scoped>
  .content{
    margin: 0px auto;
    width: 100%;
  }
  .tab_content{
    margin: 10px auto;
    width:800px;
    border: 1px #e8e8e8 solid;
    padding: 50px 25px;
  }

  .first_tab{
    margin: 10px auto 0px;
    width: 600px;
    padding: 20px 20px 0px;
  }

</style>
