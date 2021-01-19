<template>
  <div class="content">
    <el-container style="height:100vh;">
      <el-aside style="height:100vh;" :width="tabWidth+'px'">
          <el-menu :default-active="$route.path"
                   :default-openeds="open"
                   :unique-opened="unique_open"
                   class="el-menu-vertical-demo el_muen_class"
                   @open="handleOpen"
                   @close="handleClose"
                   background-color="#304156"
                   text-color="#fff"
                   active-text-color="#409eff"
                   :collapse="isCollapse"
                   router>

          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="#1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span slot="title">图书</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/bookList">图书列表</el-menu-item>
              <el-menu-item index="/admin/addBook">添加图书</el-menu-item>
              <el-menu-item index="/admin/FirstSortList">图书分类</el-menu-item>
              <el-menu-item index="/admin/publish">出版社管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/admin/orderList">
            <i class="el-icon-setting"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          
          <el-menu-item index="/admin/admininfo">
            <i class="el-icon-user-solid"></i>
            <span>个人信息</span>
          </el-menu-item>

          <el-submenu index="#2">
            <template slot="title">
              <i class="el-icon-lock"></i>
              <span slot="title">权限</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/userList">用户列表</el-menu-item>
             <el-menu-item index="/admin/rolesList">角色列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 14px">
          <div @click="isClossTabFun" style="background-color: white;height: 40px;text-align: center;float: left;font-size: 25px">
            <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
          </div>

          <div style="height: 60px;float: left;margin-left: 12px">
            <el-breadcrumb separator=">">
              <el-breadcrumb-item
                v-for="(item,index) in breadList"
                :key="index"
                :to="{ path: item.path }"
              >
                <span style="font-size: 16px;line-height: 60px">{{item.meta.title}}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <span>{{this.getUser.user || '亲爱的管理员'}}</span>
        </el-header>

        <el-main>
          <div style="width: 100%">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import {mapState,mapMutations,mapGetters} from 'vuex';
    import {reqLogout} from "../../api/user";

    export default {
        name: "Admin",
        data() {
            return {
                screenWidth: 0,
                open: ['1'],
                unique_open: false,
                isCollapse: false,
                tabWidth: 200,
                intel: null,
                breadList: [] // 路由集合
            }
        },
        created(){
            this.getBreadcrumb();
        },
        watch:{
            $route(){
                this.getBreadcrumb();
            }
        },
        mounted() {
            this.screenWidth = document.body.clientWidth;
            window.onresize = () => {
                if(this.isCollapse==false){
                    this.screenWidth = document.body.clientWidth;
                    if(this.screenWidth<800){
                        this.tabWidth = 64;
                        this.isCollapse = true;
                    }
                }
            };
        },
        computed: function(){
            this.height = window.innerHeight;
            console.log("computed执行了")
        },
        methods: {
            isHome(route) {
                return route.name === "首页";
            },
            getBreadcrumb() {
                let matched = this.$route.matched;
                if (!this.isHome(matched[0])) {
                    // matched = [{ path: "/admin", meta: { title: "首页" } }].concat(matched);
                    matched = matched;
                }
                matched[0].path="/";
                this.breadList = matched;

                console.log("this.breadList:"+this.breadList);
            },

            logout() {
              this.$confirm("您确认要退出吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }).then(() => {
                reqLogout().then(response=>{
                  if (response.data.code == 200) {
                    this.REMOVE_INFO();
                    this.$message({
                      message: response.data.message,
                      type: "success",
                      duration: 1000
                    });
                    setTimeout(() => {
                        this.$router.push({path:'/'});
                    }, 1000);
                  } else {
                    this.$message({
                      message: response.data.message,
                      type: "warning",
                    });
                  }
                }).catch((err) => {
                  console.log(err);
                });
              }).catch((err)=>{
                console.log(err)
                })
            },

            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            isClossTabFun(){
                clearInterval(this.intel);
                if(!this.isCollapse){
                    this.intel = setInterval(()=>{
                        if(this.tabWidth<= 64)
                            clearInterval(this.intel);
                        this.tabWidth -= 4;
                    }, 1);
                }else{
                    this.tabWidth = 200;
                }
                this.isCollapse = !this.isCollapse;
            },
            ...mapMutations(['REMOVE_INFO']),
            ...mapGetters(['getUser'])
        },
        computed: {
        }
    }
</script>

<style scoped>
  .el-header {
    color: #333;
    line-height: 60px;
    border-bottom: 1px #B3C0D1 solid;
  }
  .el-aside {
    color: #333;
    border: none;
  }
  .el-aside::-webkit-scrollbar {display:none}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el_muen_class{
    height: 100vh;
  }
</style>

