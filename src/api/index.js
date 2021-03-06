import ajax from './ajax.js'

// 1、登录
export const reqLogin = ({account, password}) => ajax('/login', {account, password}, "POST")

// 2、注册
export const reqSignup = ({account, name, password, code, mail}) => ajax('/user/signup', {account, name, password, code, mail}, 'POST')

// 3、改变用户状态
export const reqChangeUser = (account) => ajax('/user/change', {account}, 'POST')

// 4、获取所有用户状态
export const reqGetUserState = () => ajax('/user/states')

// 5、获取所有书籍
export const reqGetAllBook = () => ajax('/book/get')

// 7、修改书籍
export const reqModifyBook = (book,newisbn,cover) => ajax('/book/modify', {
    name: book.name,
    author: book.author,
    isbn: book.isbn,
    newisbn: newisbn,
    outline: book.outline,
    price: book.price,
    stock: book.stock,
    cover: cover,
    press: book.press,
    year: book.year,
    pages: book.pages,
}, 'POST')

// 8、获得相应用户订单
export const reqGetOrder = (account) => ajax('/order/get',{account}, 'POST')

// 10、获得所有订单
export const reqGetAllOrder = () => ajax('/order/getall')

// 11、搜索书籍
export const reqSearchBook = (searchParam) => ajax('/book/searchBook', {searchParam})

// 12、删除上传的书籍图片
export const reqDeleteImg = (filename) => ajax('/delete', {filename})

// 13、获得书籍详情
export const reqGetBookDetail = (ISBN) => ajax('/book/detail', {ISBN})

// 14、删除书籍
export const reqDeleteBook = (ISBN) => ajax('/book/delete', {ISBN})

// 15、判断用户最近是否登录
export const reqInitLogin = () => ajax('/user/init')

// 16、用户登出
export const reqLogout = () => ajax('/logout')

// 17、搜索订单
export const reqSearchOrder = (filter) => ajax('/order/search', {filter})

// 18、日期筛选订单
export const reqDateOrderFilter = (beginDate, endDate, account) => ajax('/order/date', {beginDate, endDate, account})

// 19、日期筛选订单详情
export const reqDateDetailOrderFilter = (beginDate, endDate, account) => ajax('/order/dateDetail', {beginDate, endDate, account})

// 20、请求手机短信验证码
export const reqPhoneCode = (phoneNumber) => ajax('/user/code', {phoneNumber})

// 21、请求发送找回密码的电子邮件
export const reqSendMail = (phoneNumber) => ajax('/mail', {phoneNumber})
