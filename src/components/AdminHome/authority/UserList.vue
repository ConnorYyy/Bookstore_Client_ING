<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 25px">
        <el-form :inline="true" :model="search" size="small" label-width="140px">
          <el-form-item label="用户账号" prop="search">
            <el-input v-model="search.account" @keyup.enter.native="getUserInfo(search.account)"></el-input>
          </el-form-item>
        <el-button style="float: right;" type="primary" size="small" @click="getUserList(1,5)">全部</el-button>
        <el-button style="float: right;  margin:0 15px 0 0" type="primary" size="small" @click="getUserInfo(search.account)">查询</el-button>
        <el-button style="float: right; margin-right: 15px" size="small" @click="clearSearch()">重置</el-button>
      </el-form>
      </div>
    </el-card>

    <div v-if="userList.length">
      <div class="table_content" >
        <el-table ref="multipleTable" border :data="userList" tooltip-effect="dark" style="width: 100%" >
          <el-table-column prop="account" label="账号" width="250px" align="center">
          </el-table-column>
          <el-table-column prop="name" label="昵称" align="center">
          </el-table-column>
          <el-table-column prop="registerTime" label="注册时间" align="center">
          </el-table-column>
          <el-table-column label="是否可用" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enable" @change="handleStatus($event,scope.row,scope.$index)"></el-switch>
          </template>
        </el-table-column>
        </el-table>
      </div>
      <div style="margin-top: 20px;width: 100%;">
        <div class="block" style="float: right;padding: 0px 0px 10px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {reqGetUserList,reqModifyUserStatus,reqGetUserInfo} from "../../../api/user";

    export default {
        name: "UserList",
        data(){
            return{
                loading: true,
                currentPage: 1,
                page_size: 5,
                total:null,
                search: {
                    account: ""
                },
                multipleSelection: [],
                userList:[
                ]
            }
        },
        methods: {
            //处理选项框的操作，获取表格中哪些选项被选中
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //分页函数
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.page_size = val;
                this.getUserList(1,this.page_size);
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.currentPage = val;
                console.log(this.currentPage+":"+this.page_size);
                this.getUserList(this.currentPage,this.page_size);
            },
            //搜索用户
            getUserInfo(account){
              if(!account) {
                this.$message({
                  message: "请输入需要查询的账号",
                  type: "warning"
                })
                return;
              }
              reqGetUserInfo(account).then(response=>{
                if(response.data.code==200){
                  if(response.data.user) {
                    this.userList = [response.data.user];
                    this.$message({
                        message: response.data.message,
                        type: "success"
                    });
                  }else{
                    this.$message({
                        message: "请输入正确的用户名",
                        type: "info"
                    });
                  }
                }else{
                    this.$message({
                        message: response.data.message,
                        type: "warning"
                    })
                }
              }).catch(err=>{
                  this.$message({
                      message: "操作出错，请检查网络是否连接",
                      type: "warning"
                  })
              })
            },
            //得到用户列表
            getUserList(page,pageSize){
                this.loading=false;
                reqGetUserList(page,pageSize).then(response=>{
                    if(response.data.code==200){
                        this.total = response.data.total;
                        this.userList = response.data.userList;
                    }
                }).catch(err=>{
                    console.error(err);
                })
            },
            clearSearch(){
              this.userList = [];
            },
            //处理是否禁用
            handleStatus(event, row, index){
                reqModifyUserStatus(row.id,row.enable).then(response=>{
                    if(response.data.code==200){
                      this.$message({
                          message: response.data.message,
                          type: "success"
                      })
                    }else{
                        this.$message({
                            message: response.data.message,
                            type: "warning"
                        })
                    }
                }).catch(err=>{
                    this.$message({
                        message: "操作出错，请检查网络是否连接",
                        type: "warning"
                    })
                })
            },
        }

    }
</script>

<style scoped>
  .content{
    margin: 0px auto;
    width: 100%;
  }
  .box-card{
    margin-top: 20px;
    width: 100%;
  }
  .table_content{
    width: 100%;
    margin-top: 20px;
  }

  /deep/ .el-input__inner {
    padding-right: 0px;
  }

</style>
