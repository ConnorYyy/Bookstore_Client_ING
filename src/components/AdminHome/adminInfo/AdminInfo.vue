<template>
  <div class="content">
    <div class="info">
      <div class="user_card">
        <el-avatar shape="square" :size="100" :src="user.imgUrl"></el-avatar>
        <div class="user_card_info">
          <p style="font-size: 30px;color: #616161">{{user.name||'未知'}}</p>
        </div>
      </div>
      <div class="user_action">
        <p> <span>性别:</span><span>{{user.gender==null?'未知':(user.gender?'男':'女')}}</span></p>
        <p> <span>身份:</span><span>{{user.manage==null?'未知':(user.manage?'管理者':'普通用户')}}</span></p>
        <p> <span>id:</span><span>{{user.id||'未知'}}</span></p>
        <p> <span>邮箱:</span><span>{{user.account||'未知'}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
    // <!--用户中心-->
    import {reqGetUserInfo} from "../../../api/user";
    export default {
        name: "AdminInfo",
        data () {
            return {
                user:{
                    id: '',
                    account: '',
                    name: '',
                    manage: '',
                    gender: '',
                    enable: false,
                    info: '',
                    imgUrl: '',
                    registerTime: ''
                }
            }
        },
        mounted(){
        },
        created(){
            this.initUserCenter();
        },
        methods: {
            initUserCenter(){
                reqGetUserInfo(this.$store.getters.getUser.account).then(response=>{
                    if(response.data.code==200){
                        this.user = response.data.user;
                        this.user.imgUrl = this.user.imgUrl || '/static/image/head.jpg';
                    }else{
                        this.$message({
                            message: response.data.message,
                            type: "warning"
                        })
                    }
                }).catch(err=>{
                    this.$message({
                        message: "获取数据错误了，请检查网络是否连接",
                        type: "warning"
                    })
                })
            }
        }
    }
</script>

<style scoped>

  .content{
    width: 1000px;
    margin: 40px auto;
    background-color: white;
  }

  .info{
    width: 940px;
    height: 150px;
    margin: 0px auto;
    background-color: #ffffff;
    border-bottom: 1px solid #d9d9d9;
  }

  .user_card{
    width: 540px;
    float: left;
  }

  .user_card_info{
    margin:  0px;
    width: 200px;
    display: inline-block;
    line-height: 100px;
  }
  .user_action{
    float: left;
    width: 400px;
  }
  .link{
    font-size: 14px;
    color: #ff6700;
  }
  span{
    color: #757575;
    font-size: 15px;
    margin: 0px 5px;
    line-height: 30px;
  }

  .portal-sub{
    padding-top: 20px;
    width: 940px;
    height: 400px;
    margin: 0px auto;
  }

  .info-list{
    margin: 15px 4px;
    box-sizing: border-box;
    width: 460px;
    height: 150px;
    float: left;
  }
  .list_info{
    width: 300px;
    height: 150px;
    padding: 40px 10px;
    display: inline-block;
  }
  .num{
    color: #ff6700;
  }
  .title{
    font-size: 20px;
    color: #757575;
  }
</style>
