<!--书籍详情页面-->
<template>
  <div class="content">
    <Nav></Nav>
    <HeadNav></HeadNav>
    <div class="box book_box">
      <div class="book_img">
        <CarouselBtn :imgList="book.imgSrc"></CarouselBtn>
      </div>
      <div class="book_buy">
        <div class="book_name">{{book.bookName}}</div>
        <div class="book_content book_buy_content">
          <div class="book_list_content">作者: 	{{book.author}}</div>
          <div class="book_list_content">ISBN: 	{{book.isbn}}</div>
          <div class="book_list_content">出版社: 	{{book.publish}}</div>
          <div class="book_list_content">出版时间: 	{{book.birthday.slice(0,10)}}</div>
        </div>
        <div class="book_content book_buy_price">
          <div class="book_buy_info">
            <span class="labelSpan">售价</span>
            <span class="labelPrice">￥{{book.price}}</span>
          </div>
          <div class="book_buy_info">
            <span class="labelSpan">市场价</span>
            <s>￥{{book.marketPrice}}</s>
          </div>
        </div>
        <div class="book_content">
          <span class="labelSpan">运费</span>
          ￥6.00
        </div>
        <div class="book_content">
          <span class="labelSpan">上架时间</span>
          2020-03-26
        </div>
        <div class="book_content">
          <span class="labelSpan">库存</span>
          {{book.stock}}件
        </div>
        <div class="book_content">
          <el-button class="plainBtn" plain @click="goBuyPage(book.id)">立即购买</el-button>
          <el-button type="primary" icon="el-icon-shopping-cart-2" class="cartBtn" @click="addBookToCart">加入购物车</el-button>
        </div>
      </div>
    </div>
    
    <div class="book_info">
        <h2 class="infoTitle">书籍概要</h2>
        <div class="infoBox">
          <div class="info" v-html="book.description"></div>
        </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
    import Nav from "../../components/Common/Nav";
    import HeadNav from "../../components/Common/HeadNav";
    import Footer from "../../components/Common/Footer";
    import CarouselBtn from "../../components/Index/CarouselBtn";
    import {reqGetBook} from "../../api/book";
    import {reqGetSortList} from "../../api/sort";
    import {reqAddCart} from "../../api/cart";
    import 'github-markdown-css'
    export default {
        name: "Book",
        components:{CarouselBtn, Nav,HeadNav,Footer,CarouselBtn},
        data(){
            return{
                result: "",
                book: {
                    id: null,
                    bookName: '',
                    author: '',
                    isbn: '',
                    publish: '',
                    birthday: '',
                    marketPrice: '',
                    price: '',
                    stock: '',
                    description: '',
                    imgSrc: [],
                    put: true,
                    coverImg: '',
                    rank: '',
                    newProduct: true,
                    recommend: true,
                    bookSort: [],//图书分类的绑定值
                },
                fileList:null,
                bookId: null,
                sortList:[
                    {
                        upperSort: {
                            sortName: null,
                        },
                        children:null
                    }
                ],
                activeName: 'first'
            }
        },
        methods: {

            getSortList() {
                reqGetSortList().then(response => {
                    if(response.data.code==200){
                        this.sortList = response.data.sortResponseList;
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

            getBook(bookId){
                reqGetBook(bookId).then(response=>{
                  if(response.data.code==200){
                    // console.log(response.data.book);
                      this.book = response.data.book;
                      // console.log("this.book.imgSrc:"+response.data.book.imgSrc);
                      let MarkdownIt = require("markdown-it");
                      let md = new MarkdownIt();
                      let result = md.render(this.book.description);
                      this.book.description = result;
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

            //添加图书到购物车
            addBookToCart(){
                reqAddCart(this.$store.getters.getUser.account,this.bookId,1).then(response=>{
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
            }
        },
        created() {
            this.bookId = this.$route.query.id;
            this.getBook(this.bookId);
            this.getSortList();
        }
    }
</script>

<style scoped>
  .content{
    background-color: #ffffff;
  }
  .box{
    margin: 10px auto;
    width: 85vw;
  }
  .book_box{
    height: 500px;
  }
  .book_img{
    margin: 10px;
    width: 1/3;
    height: 480px;
    float: left;
  }
  .book_buy{
    margin: 10px;
    width: 2/3;
    height: 480px;
    float: right;
    padding: 1px;
  }
  .book_buy_content{
    border: 1px #f3f0e9 solid;
    padding: 5px;
  }
  .book_content{
    margin: 10px auto;
    width: 740px;
    max-height: 120px;
    line-height: 35px;
  }

  .book_name{
    margin: 10px auto;
    width: 740px;
    line-height: 35px;
    font-size: 18px;
    overflow: hidden;
  }

  .book_list_content{
    width: 32%;
    display: inline-block;
    height: 20px;
    overflow: hidden;
    line-height: 20px;
    font-size: 15px;
  }
  .book_buy_info{
    width: 100%;
    line-height: 40px;
    font-size: 15px;
  }
  .book_buy_price{
    background-color: #f3f0e9;
    padding: 5px;
  }
  .labelSpan{
    color: #999;
  }
  .labelPrice{
    color: #9d232c;
    font-size: 17px;
  }
  .plainBtn{
    width: 150px;
    color: #9d232c;
    background-color: #f3f0e9;
    border: 1px #f3f0e9 solid;
  }
  .plainBtn:hover{
    background-color: white;
    color: #9d232c;
    border: 1px #b2bac2 solid;
  }
  .cartBtn{
    width: 150px;
    background-color: #9d232c;
    border: 1px #9d232c solid;
  }
  .cartBtn:hover{
    background-color: #f52b21;
  }

  .book_sort{
    margin: 10px 10px;
    width: 200px;
    /*height: 780px;*/
    float: left;
    border-right: 1px #f3f0e9 solid;
  }

  .book_info{
    margin: auto;
    width: 85vw;
    background-color: #f7f7f6;
    padding: 15px;
    min-height: 300px;
    margin-bottom: 20px;
  }
  .infoTitle{
    padding: 10px;
  }
  .infoBox{
    border: 2px solid #cacaca;
    min-height: 250px;
    margin: auto;
    padding: 10px;
    vertical-align: top;
  }
  .info{
  }
</style>
