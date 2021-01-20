<template>
  <div class="navClass">
    <div class="content">
      <div class="nav_content">
        <div class="userName" v-if="store.getters.getUser">
            Hi，<router-link to="/user/userCenter">{{store.getters.getUser.name || "尊敬的用户"}}</router-link> !
        </div>
        <el-menu
          v-if="!store.getters.getUser.manage"
          :default-active="$route.path" 
          mode="horizontal"
          @select="handleSelect"
          background-color="#333333"
          text-color="#FFFFFF"
          active-text-color="#FF4950"
          router>
          <el-menu-item index="/">首页</el-menu-item>
          <!-- <el-submenu index="#" v-if="!store.getters.getUser"> -->
          <el-submenu index="#">
            <template slot="title">登录|注册</template>
            <el-menu-item index="/login">登录</el-menu-item>
            <el-menu-item index="/register">注册</el-menu-item>
          </el-submenu>
          <el-menu-item index="/cart">购物车</el-menu-item>
          <el-menu-item index="/user/userOrder">我的订单</el-menu-item>
          <el-menu-item index="/user/userCenter">个人中心</el-menu-item>
          <el-menu-item @click="logout(store.getters.getUser.account)">退出</el-menu-item>
        </el-menu>
        <el-menu
        v-if="store.getters.getUser.manage"
        :default-active="$route.path" 
        mode="horizontal"
        @select="handleSelect"
        background-color="#333333"
        text-color="#FFFFFF"
        active-text-color="#FF4950"
        router>
        <el-menu-item index="/">首页</el-menu-item>
        <!-- <el-submenu index="#" v-if="!store.getters.getUser"> -->
        <el-submenu index="#">
          <template slot="title">登录|注册</template>
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/register">注册</el-menu-item>
        </el-submenu>
        <el-menu-item index="/admin/home">管理</el-menu-item>
        <el-menu-item @click="logout()">退出</el-menu-item>
      </el-menu>
      </div>
      </div>
    </div>
</template>

<script>
    import $route from "element-ui/packages/cascader-panel/src/node";
    import store from "../../store/store";
    import {reqLogout} from "../../api/user";
    import {mapState,mapMutations,mapGetters} from 'vuex';

    export default {
        name: "Nav",
        data() {
          return {store}
        },
        methods: {
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            },
            logout(account) {
              this.$confirm("您确认要退出吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }).then((account) => {
                this.REMOVE_INFO();
                // reqLogout(account).then(response=>{
                //   if (response.data.code == 200) {
                //     this.REMOVE_INFO();
                //     this.$message({
                //       message: response.data.message,
                //       type: "success",
                //       duration: 1000
                //     });
                //     setTimeout(() => {
                //         this.$router.push({path:'/'});
                //     }, 1000);
                //   } else {
                //     this.$message({
                //       message: response.data.message,
                //       type: "warning",
                //     });
                //   }
                // }).catch((err) => {
                //   console.log(err);
                // });
              }).catch((err)=>{
                console.log(err)
                })
            },
            ...mapMutations(['REMOVE_INFO']),

        }
    }
</script>

<style scoped>
  .navClass{
    width: 100%;
    background-color: #333333;
    height: 40px;
  }
  .content{
    margin: 0px auto;
    width: 90vw;
    height: 40px;
    background-color: #333333;
  }
  .nav_content{
    float: right;
    width: auto;
  }
  .el-menu{
    float: right;
  }
  .el-menu-item,.el-submenu{
    height: 40px;
    font-size: 12px;
    line-height: 40px;
  }
 .el-submenu>>>.el-submenu__title {
   height: 40px;
   font-size: 12px;
   line-height: 40px;
  }
  .userName{
    height: 40px;
    float: left;
    position: relative; 
    right: 10px;
    color: #ffffff;
    font-style: italic;
    font-size: 17px;
    line-height: 40px;
  }
  
  a:hover { color: #FF4950; text-decoration: underline; }
  a:link, a:visited{ color: #ffffff; }
</style>
