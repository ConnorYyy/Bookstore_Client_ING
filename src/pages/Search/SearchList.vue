<template>
  <div class="content">
    <Nav></Nav>
    <HeadNav></HeadNav>
    <div class="box_title" >
      <!-- <p>{{this.total}} 条结果 | <span style="color: #9d232c">{{this.sortName}}</span></p> -->
      <p>{{this.total}} 条结果</p>
    </div>
    <div class="box">
      <div class="book_info">
        <div class="book_content" v-for="book in bookList" :key="book.id">
          <router-link :to="{path: '/book',query:{id:book.id}}">
          <div class="book_content_img">
            <el-image
              style="width: 82%; height: 150px;margin:5px 9%"
              :src="book.coverImg"
              fit="fill"></el-image>
          </div>
          </router-link>
          <div class="book_content_info">
            <div class="book_name">{{book.bookName}}</div>
            <div class="book_list_content">作者: 	{{book.author}}</div>
            <div class="book_list_content">ISBN: 	{{book.isbn}}</div>
            <div class="book_list_content">出版社: 	{{book.publish}}</div>
            <div class="book_list_content">出版时间: 	{{book.birthday.slice(0,10)}}</div>
            <div class="book_list_content">原价: 	{{book.marketPrice}}</div>
            <div class="book_list_content">售价: 	{{book.price}}</div>
            <div>
                <el-button type="primary" icon="el-icon-shopping-cart-2" class="cartBtn" @click="addBookToCart(book.id)">加入购物车</el-button>
                <el-button class="plainBtn" @click="goBuyPage(book.id)">立即购买</el-button>
                <el-button class="plainBtn" @click="getInfo(book.id)">查看详情</el-button>
            </div>
          </div>
        </div>
        <div class="block" v-if="total>10" style="float: right;padding: 0px 30px 10px">
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
        <div v-if="!bookList.length" style="width:100%;height: 50px;line-height: 50px;padding: 0px 20px">
            不好意思，没有找到该书籍...
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
    import Nav from "../../components/Common/Nav";
    import HeadNav from "../../components/Common/HeadNav";
    import Footer from "../../components/Common/Footer";
    import {reqSearchBook} from "../../api/index";
    import {reqAddCart} from "../../api/cart";
    export default {
        name: "SearchList",
        components:{Nav,HeadNav,Footer},
        data(){
            return{
                currentPage: 1,
                page_size: 10,
                total:0,
                sortId:null,
                bookList: ""
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            //分页函数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page_size = val;
                this.getBookList(this.sortId,1,this.page_size);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                console.log(this.currentPage+":"+this.page_size);
                this.getBookList(this.sortId,this.currentPage,this.page_size);
            },
            searchBook(input) { //TODO
                reqSearchBook(input).then(response=>{
                    console.error(response.data.booklist)
                // if(response.data.code==200){
                    this.bookList = response.data.booklist;
                // }else{
                //   this.$message({
                //       message: response.data.message,
                //       type: "warning"
                //   })
                // }
                }).catch(err=>{
                    console.error(err);
                })
            },

            goBuyPage(id){
                let arr = [];
                arr.push(id);
                arr.push(0);
                // arr.push(2);
                let ids = JSON.stringify(arr);
                this.$router.push({
                    path: "/buyPage",
                    query: {
                        ids: ids
                    }
                })
            },

            addBookToCart(bookId){
                reqAddCart(this.$store.getters.getUser.account,bookId,1).then(response=>{
                    if(response.data.code==200){
                        this.$message({
                            message: response.data.message,
                            type: "success",
                            duration: 1000
                        });
                    }else{
                        this.$message({
                            message: response.data.message,
                            type: "warning",
                            duration: 1000
                        })
                    }
                }).catch(err=>{
                    console.error(err)
                })
            },
            getInfo(bookId){
                this.$router.push({path: '/book',query:{id:bookId}});
            }
        },
        created(){
            console.error(this.$route)
            this.searchBook(this.$route.params.filterParam);
        }
    }
</script>

<style scoped>
  .content{
    background-color: #ffffff;
  }
  .box_title{
    margin: 10px auto;
    height: 30px;
    width: 1240px;
    color: #545c64;
    padding: 5px 10px;
  }
  .box{
    margin: 10px auto;
    width: 100%;
  }
  .book_info{
    margin: 10px 10px;
    width: 100%;
    padding: 10px;
    min-height: calc(100vh - 230px);
    float: right;
    background-color: #f7f7f6;
  }
  .tab{
    width: 100%;
  }
  .tab_head{
    padding-left: 5px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f3f0e9;
    margin: 1px 0px;
  }
  .tab_list{
    padding-left: 5px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    margin: 1px 0px;
  }
  .tab_list:hover{
    background-color: #a0a9b1;
  }

  .book_content{
    border: 1px #f3f0e9 solid;
    padding: 5px;
    margin: 10px auto;
    width: 80%;
    height: 190px;
    max-height: 240px;
    line-height: 35px;
    border: 1px solid #cacaca;
    padding: 15px;
  }
  .book_content:hover{
    background-color: white;
  }

  .book_content_img{
    float: left;
    width: 150px;
    height: 160px;
    /*border: 1px solid black;*/
  }
  .book_content_info{
    float: right;
    width: 740px;
    height: 160px;
    color: black;
    /*border: 1px solid black;*/
  }


  .book_name{
    margin: 5px auto;
    width: 740px;
    line-height: 30px;
    font-size: 18px;
    color: #9d232c;
    overflow: hidden;
  }

  .book_list_content{
    width: 32%;
    display: inline-block;
    height: 20px;
    overflow: hidden;
    line-height: 18px;
    font-size: 14px;
  }

  .plainBtn{
    width: 100px;
    color: #9d232c;
    background-color: #f3f0e9;
    border: 1px #f3f0e9 solid;
    float: right;
    margin: 0px 5px;
    font-size: 14px;
  }
  .plainBtn:hover{
    background-color: white;
    color: #9d232c;
    border: 1px #b2bac2 solid;
  }
  .cartBtn{
    width: 140px;
    background-color: #9d232c;
    border: 1px #9d232c solid;
    float: right;
    margin: 0px 5px;
    font-size: 14px;
  }
  .cartBtn:hover{
    background-color: #f52b21;
  }
</style>

