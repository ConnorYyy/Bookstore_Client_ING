import ajax from "./ajax";

//登录
export const reqLogin = ({account, password}) => ajax('/login', {account, password}, 'POST')

// 检测该账号是否已经被注册
export const reqAccountVerify = (account)=>ajax('/user/accountVerify',{account})

// 注册账号
export const reqRegister = (account,password)=>ajax('/user/register',{account,password})

//getUserList得到用户列表
export const reqGetUserList = (page,pageSize)=>ajax('/getUserList',{page,pageSize})

//修改用户的的禁用状态
export const reqModifyUserStatus = (id,status)=>ajax('/modifyUserStatus',{id,status})

//得到用户的基本信息getUserInfo
export const reqGetUserInfo = (account)=>ajax('/getUserInfo',{account})

//修改密码
export const reqModUserPwd = (account,oldPassword,newPassword)=>ajax('/modifyUserPwd',{account,oldPassword,newPassword})

//用户登出
export const reqLogout = () => ajax('/logout')
