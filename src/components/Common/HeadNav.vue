<template>
  <div class="headNav">
    <div class="content">
      <el-row>
        <el-col :span="1" :offset="1"><el-image :src="logoImg"  fit="fill" height="60px"></el-image></el-col>
        <el-col :span="3" ><div class="name">中信书店</div></el-col>
        <el-col :span="10" :offset="9" class="search">
          <el-input placeholder="书名、作者、出版社、ISBN" v-model="input" class="input-with-select" style="width: 500px;height: 40px;">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="书名" value="1"></el-option>
              <el-option label="作者" value="2"></el-option>
              <el-option label="出版社" value="3"></el-option>
              <el-option label="ISBN" value="4"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchBook(input)"></el-button>
          </el-input>
        </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import {reqSearchBook} from "../../api/index";
    export default {
        name: "HeadNav",
        data() {
            return {
                input: "",
                select: '',
                logoImg: '/static/image/logo.png'
            }
        },
        methods: {
          searchBook(input) { //TODO
            reqSearchBook(input).then(response=>{
              console.log(response)
            })
            console.error(input);
          }
        }
    }
</script>

<style scoped>
  .headNav{
    margin: 0;
    width: 100%;
    background-color: #ffffff;
    clear: both;
  }
  .content{
    margin: 0px;
    width: 100%;
    height: 80px;
    background-color: #f2f2f2;
    padding: 10px;
  }
  .name{
    text-align: left;
    font-family: '微软雅黑', 'Microsoft Yahei', 'Myriad Pro', 'PingFang SC', 'Hiragino Sans GB', sans-serif; 
    font-size: 2vw;
    margin-left: 10px;
    line-height: 60px;
  }
  .search{
    height: 60px; 
    padding-top: 10px
  }
  .el-select {
    width: 110px;
  }
</style>
