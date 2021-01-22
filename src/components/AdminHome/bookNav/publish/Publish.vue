<!--出版社管理-->
<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProduct"
        style="float: right"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table_content">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="编号"
          width="120"
          prop="id"
          align="center">
          <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="出版社名称">
        </el-table-column>
        <el-table-column
          prop="rank"
          label="排序"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          label="图书数量"
          width="120"
          prop="num"
          align="center">
          <!--          <template slot-scope="scope">{{ scope.row.date }}</template>-->
        </el-table-column>
        <el-table-column
          label="是否显示"
          width="140"
          align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.showPublish" @change="handleShowChange($event,scope.row,scope.$index)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="editPublish(scope.$index, scope.row)"
              >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="delPublish(scope.$index,scope.row)"
              >删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 20px;width: 100%">
      <div class="block" style="float: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="page_size"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import {reqGetPublishList,reqModifyShow,reqDelPublish} from "../../../../api/publish";

  export default {
        name: "Publish",
        data(){
            return{
                loading: true,
                currentPage: 1,
                page_size: 5,
                tableData: [],
                total:null,
                tab:[{
                    id: '20',
                    name: "电子工业出版社",
                    showPublish: false,
                    num: 24,
                    rank: 35,
                },{
                    id: '20',
                    name: "电子工业出版社",
                    showPublish: '文学',
                    num: 24,
                    rank: 35,
                },{
                    id: '20',
                    name: "电子工业出版社",
                    showPublish: false,
                    num: 24,
                    rank: 35,
                },{
                    id: '20',
                    name: "电子工业出版社",
                    showPublish: false,
                    num: 24,
                    rank: 35,
                },{
                    id: '20',
                    name: "电子工业出版社",
                    showPublish: false,
                    num: 24,
                    rank: 35,
                },{
                    id: '20',
                    name: "电子工业出版社",
                    showPublish: false,
                    num: 24,
                    rank: 35,
                }
                ],
                multipleSelection: []
            }
        },

        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //分页函数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page_size = val;
                this.GetPublish(1,this.page_size);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                console.log(this.currentPage+":"+this.page_size);
                this.GetPublish(this.currentPage,this.page_size);
            },

            //处理添加分类的函数
            handleAddProduct() {
                this.$router.push({path:'/admin/addPublish'});
            },

            //得到出版社列表
            GetPublish(page,pageSize){
                this.loading=false;
                reqGetPublishList(page,pageSize).then(response=>{
                    if(response.data.code==200){
                        this.total = response.data.total;
                        this.tableData = response.data.publishList;
                    }else{
                        this.$message({
                            message: response.data.message,
                            type: "warning"
                        })
                    }
                }).catch(err=>{
                    console.error(err);
                })
            },

            editPublish(index, row){
                console.log("row.id:"+row.id);
                this.$router.push({
                    path: "/admin/updatePublish",
                    query: {
                        id: row.id
                    }
                })
            },

            //处理是否显示滑块的改变
            handleShowChange(e,row,index){
                reqModifyShow(row.id).then(response=>{
                    console.log(response);
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
                    console.error(err);
                })
            },

            //处理删除出版社
            delPublish(index,row){
                this.$confirm('是否要进行删除操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    reqDelPublish(row.id).then(response=>{
                        console.log(response);
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
                        this.GetPublish(this.currentPage,this.page_size);
                    }).catch(err=>{
                        console.error(err);
                    })
                }).catch(()=>{
                    console.log("取消删除了");
                });

            }
        },
        created() {
            console.log("init起作用了！")
            this.GetPublish(1,5);
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
</style>
