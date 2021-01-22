<template>
  <div class="content">
    <div class="tab_content">
      <div class="first_tab">
        <el-form ref="bookSort" :model="bookSort" :rules="rules" label-width="80px">
          <el-form-item label="分类名称" prop="sortName">
            <el-input v-model="bookSort.sortName"></el-input>
          </el-form-item>
          <el-form-item v-show="!isFirst" label="分类上级">
            <el-select v-model="bookSort.upperName" placeholder="请选择分类上级">
              <el-option
                v-for="item in publishList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="rank">
            <el-input v-model.number="bookSort.rank" @keyup.native="proving"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('bookSort')">确认</el-button>
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {reqGetUpperName,reqGetBookSort,reqAddBookSort,reqModifyBookSort} from "../../../../../api/sort";

  export default {
        name: "SortDetail",
        props: {
            value: Object,
            isEdit: {
                type: Boolean,
                default: false
            },
            isFirst: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                bookSort: {
                    id: 1,
                    sortName: '',
                    upperName: '',
                    rank: '',
                    level: ''
                },
                rules: {
                    sortName: [
                        { required: true, message: '分类名不能为空', trigger: 'blur' },
                        { min: 1, max: 10, message: '分类长度在 1 到 15 个字符', trigger: 'blur' }
                    ],
                    rank: [
                        { required: true, message: '排序不能为空', trigger: 'blur' },
                        { type: 'number', message: '排序必须为数字值', trigger: 'blur'},
                    ]
                },
                publishList: [],
                publishLists: [
                    {
                        label: "批量删除",
                        value: "recommendOn"
                    },
                    {
                        label: "批量上架",
                        value: "publishOn"
                    },
                    {
                        label: "批量下架",
                        value: "publishOff"
                    },
                    {
                        label: "设为推荐",
                        value: "recommendOff"
                    },
                    {
                        label: "取消推荐",
                        value: "newOn"
                    },
                    {
                        label: "设为新品",
                        value: "transferCategory"
                    },
                    {
                        label: "取消新品",
                        value: "recycle"
                    }
                ],
            };
        },

        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        if(this.isEdit){
                             this.modifySort();
                        }else {
                             this.addSort();
                        }
                    }else {
                        this.$message.error("添加分类失败");
                    }
                });
            },
            cancel(){
                this.$router.go(-1)
            },
            addSort(){
                if(this.bookSort.upperName=="无"){
                    this.bookSort.level="级别一";
                }else {
                    this.bookSort.level="级别二";
                }
                console.log(this.bookSort.level);
                reqAddBookSort(this.bookSort).then(response=>{
                    if(response.data.code==200){
                        this.$message({
                            message: response.data.message,
                            type: "success"
                        })
                    }else {
                        this.$message({
                            message: response.data.message,
                            type: 'warning'
                        })
                    }
                }).catch(err=>{
                    console.error(err);
                    this.$message.error("添加分类名失败");
                })
            },

            modifySort(){
                reqModifyBookSort(this.bookSort).then(response=>{
                    if(response.data.code==200){
                        this.$message({
                            message: response.data.message,
                            type: "success"
                        })
                    }else {
                        this.$message({
                            message: response.data.message,
                            type: 'warning'
                        })
                    }
                }).catch(err=>{
                    console.error(err);
                    this.$message.error("修改分类名失败");
                })
            },


            handleChange(value) {
                console.log(value);
            },
            hhh(){
                console.log("哈哈哈");
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
            if(this.isEdit){
                let upperName=this.$route.query.upperName;
                let sortName=this.$route.query.sortName;
                console.log(upperName+sortName);
                if(!this.isFirst){
                    reqGetUpperName().then(response=>{
                        if(response.data.code==200){
                            this.publishList = response.data.upperNames;
                            this.bookSort.upperName = "无";
                        }else{
                            this.$message({
                                message: response.data.message,
                                type: 'warning'
                            })
                        }
                    }).catch(err=>{
                        console.error(err);
                    })
                    reqGetBookSort(upperName,sortName).then(response=>{
                        if(response.data.code==200){
                           this.bookSort=response.data.bookSort;
                        }else{
                            this.$message({
                                message: response.data.message,
                                type: 'warning'
                            })
                        }
                    }).catch(err=>{
                        console.error(err);
                    })
                }else {
                    reqGetBookSort(upperName,sortName).then(response=>{
                        if(response.data.code==200){
                            this.bookSort=response.data.bookSort;
                            console.log(this.bookSort);
                        }else{
                            this.$message({
                                message: response.data.message,
                                type: 'warning'
                            })
                        }
                    }).catch(err=>{
                        console.error(err);
                    })
                }
            }else {
                reqGetUpperName().then(response=>{
                    if(response.data.code==200){
                        this.publishList = response.data.upperNames;
                        this.bookSort.upperName = "无";
                    }else{
                        this.$message({
                            message: response.data.message,
                            type: 'warning'
                        })
                    }
                }).catch(err=>{
                    console.error(err);
                })
            }

        }
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

