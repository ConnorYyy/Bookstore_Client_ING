<template>
  <div class="headNav">
    <div class="content">

      <div class="nameLogo">
        <!-- <img :src="imgS" style="height: 40px"/> -->
        <div style="font-family:'PingFang SC', 'Myriad Pro', 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', sans-serif; font-size: 30px;">
          中信书店
        </div>
      </div>

      <div style="float: right">
        <el-input placeholder="书名、作者、出版社、ISBN" v-model="input" class="input-with-select" style="width: 500px;height: 40px;">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="书名" value="1"></el-option>
            <el-option label="作者" value="2"></el-option>
            <el-option label="出版社" value="3"></el-option>
          </el-select>
          <!-- todo -->
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "HeadNav",
        data() {
            return {
                input: "",
                select: '',
                imgS: require('../../assets/image/CITICLogo.jpg')
            }
        }
    }
</script>

<style scoped>
  .headNav{
    width: 100%;
    background-color: #f2f2f2;
    clear: both;
  }
  .content{
    margin: 0px auto;
    width: 1240px;
    height: 100px;
    background-color: #f2f2f2;
    padding: 10px 0
  }
  .nameLogo{
    float: left;
  }
  .nameLogo div, .nameLogo img{
    display: inline-block;
  }
  .el-select {
    width: 110px;
  }
</style>
