import Vue from 'vue'; //
import Router from 'vue-router'; //
import Login from "../pages/Login/Login"; //
import Index from "../pages/Index/Index"; //
import UserHome from "../pages/UserHome/UserHome";
import SearchList from "../pages/Search/SearchList";
import Book from "../pages/Book/Book"; //
import Register from "../pages/Register/Register";
import Admin from "../pages/AdminHome/Admin";
import AdminInfo from "../components/AdminHome/adminInfo/AdminInfo";
import BookTopic from "../pages/BookList/BookTopic"; //
import BookList from "../components/AdminHome/bookNav/book/BookList"; //
import AddBook from "../components/AdminHome/bookNav/book/components/BookDetail";
import OrderList from "../components/AdminHome/orderNav/OrderList";
import OrderSet from "../components/AdminHome/orderNav/OrderSet";
import UserList from "../components/AdminHome/authority/UserList";
import Search from "../pages/Search/Search";
import Cart from "../pages/Cart/Cart";
import AddSort from "../components/AdminHome/bookNav/sort/components/SortDetail";
import Publish from "../components/AdminHome/bookNav/publish/Publish";
import AddPublish from "../components/AdminHome/bookNav/publish/AddPublish";
import UpdatePublish from "../components/AdminHome/bookNav/publish/UpdatePublish";
import UpdateFirstSort from "../components/AdminHome/bookNav/sort/UpdateFirstSort";
import UpdateSecondSort from "../components/AdminHome/bookNav/sort/UpdateSecondSort";
import FirstSortList from "../components/AdminHome/bookNav/sort/FirstSortList";
import SecondSortList from "../components/AdminHome/bookNav/sort/SecondSortList";
import UpdateBook from "../components/AdminHome/bookNav/book/UpdateBook";
import Address from "../components/UserHome/home/Address";
import UserCenter from "../components/UserHome/home/UserCenter";
import PwdManage from "../components/UserHome/manage/PwdManage";
import UserOrder from "../components/UserHome/order/UserOrder";
import BuyPage from "../pages/BuyPage/BuyPage";
import OrderDetail from "../components/AdminHome/orderNav/OrderDetail";
import Deliver from "../components/AdminHome/orderNav/Deliver";
import UserOrderDetail from "../components/UserHome/order/UserOrderDetail";

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  mode: 'history',
  routes: [
    { //"../pages/Index/Index"
      path: '/',
      name: 'Index',
      component: Index
    },
    { //"../pages/Login/Login"
      path: '/login',
      name: 'Login',
      component: Login
    },
    { //"../pages/Register/Register"
      path: "/register",
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        title: '首页',
        url: '/admin/home',
        requiresAuth: true,// 添加该字段，表示进入这个路由是需要登录的
        requiresManage: true,
      },
      children:[
        {
          path: 'bookList',
          name: 'BookList',
          component: BookList,
          meta: {
            title: '图书列表',
            url: '/admin/bookList',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'addBook',
          name: 'AddBook',
          component: AddBook,
          meta: {
            title: '添加图书',
            url: '/admin/addBook',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'updateBook',
          name: 'UpdateBook',
          component: UpdateBook,
          meta: {
            title: '更新图书',
            url: '/admin/updateBook',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'publish',
          name: 'Publish',
          component: Publish,
          meta: {
            title: '出版社列表',
            url: '/admin/publish',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'addPublish',
          name: 'AddPublish',
          component: AddPublish,
          meta: {
            title: '添加出版社',
            url: '/admin/addPublish',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'updatePublish',
          name: 'UpdatePublish',
          component: UpdatePublish,
          meta: {
            title: '更新出版社',
            url: '/admin/updatePublish',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'addSort',
          name: 'AddSort',
          component: AddSort,
          meta: {
            title: '添加分类',
            url: '/admin/addSort',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'updateFirstSort',
          name: 'UpdateFirstSort',
          component: UpdateFirstSort,
          meta: {
            title: '更新一级分类',
            url: '/admin/updateFirstSort',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'updateSecondSort',
          name: "UpdateSecondSort",
          component: UpdateSecondSort,
          meta: {
            title: '更新二级分类',
            url: '/admin/updateSecondSort',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'firstSortList',
          name: "FirstSortList",
          component: FirstSortList,
          meta: {
            title: '一级分类列表',
            url: '/admin/firstSortList',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: "secondSortList",
          name: "SecondSortList",
          component: SecondSortList,
          meta: {
            title: '二级分类列表',
            url: '/admin/secondSortList',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'orderList',
          name: 'OrderList',
          component: OrderList,
          meta: {
            title: '订单列表',
            url: '/admin/orderList',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'orderSet',
          name: 'OrderSet',
          component: OrderSet,
          meta: {
            title: '订单设置',
            url: '/admin/orderSet',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'orderDetail',
          name: 'OrderDetail',
          component: OrderDetail,
          meta: {
            title: '订单详情',
            url: '/admin/orderDetail',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'deliver',
          name: 'Deliver',
          component: Deliver,
          meta: {
            title: '发货',
            url: '/admin/deliver',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'adminInfo',
          name: 'AdminInfo',
          component: AdminInfo,
          meta: {
            title: '个人信息',
            url: '/admin/admininfo',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: 'userList',
          name: 'UserList',
          component: UserList,
          meta: {
            title: '用户列表',
            url: '/admin/userList',
            requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
        }
      ]
    },
    {
      path: '/user',
      name: 'UserHome',
      component: UserHome,
      meta: {
        title: '应用详情',
        url: '/user/userCenter', //用户登录后直接进入用户中心，可修改
        requiresAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        requiresUser: true,
      },
      children:[
        {
          path: 'address',
          name: "Address",
          component: Address
        },
        {
          path: 'userCenter',
          name: "UserCenter",
          component: UserCenter
        },
        {
          path: 'pwdManage',
          name: "PwdManage",
          component: PwdManage
        },
        {
          path: "userOrder",
          name: "UserOrder",
          component: UserOrder
        },
        {
          path: "userOrderDetail",
          name: "UserOrderDetail",
          component: UserOrderDetail
        }
      ]
    },
    {
      path: '/bookTopic',
      name: 'BookTopic',
      component: BookTopic
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },    
    {
      path: '/searchList',
      name: 'SearchList',
      component: SearchList,
      meta: {
        title: "搜索列表"
      }
    },
    //下面的是一些测试页面的路由

    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: {
        title: '购物车',
        requiresAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        requiresUser: true,
      },
    },
    {
      path: "/buyPage",
      name: 'BuyPage',
      component: BuyPage,
      meta: {
        title: '购买页面',
        requiresAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        requiresUser: true
      },
    }
  ]
})
