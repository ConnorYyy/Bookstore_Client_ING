import ajax from "./ajax";

//初始化订单
export const reqInitOrder = (ids,from,account) => ajax("/initOrder",{ids,from,account})

//提交订单 addOrder
export const reqAddOrder = (orderInitDto) => ajax("/addOrder", {
  account: orderInitDto.account,
  bookList: orderInitDto.bookList,
  expense: orderInitDto.expense,
  addressList: orderInitDto.addressList,
  address: orderInitDto.address
},"POST")

//管理员得到订单列表
export const reqAdminGetOrderList = (page,pageSize) => ajax("/getAdminOrderList",{page,pageSize})

//管理员批量处理订单
export const reqBatchDel = ({ids, operator}) => ajax("/book/batchDel", {ids, operator}, post)
//管理员得到订单的明细getOrderDto
export const reqAdminGetOrderDetail = (id) => ajax("/getOrderDto",{id})

//删除订单
export const reqDelOrder = (id) => ajax("/delOrder",{id})

//发货deliverOrder
export const reqDeliverOrder = (id,logisticsCompany,logisticsNum) => ajax("/deliverOrder",{id,logisticsCompany,logisticsNum})

//普通用户得到自己的订单列表getUserOrderList
export const reqUserGetOrderList = (account,page,pageSize,orderStatus,beUserDelete) => ajax("/getUserOrderList",{account,page,pageSize,orderStatus,beUserDelete})

//修改订单状态modifyOrderStatus
export const reqModOrderStatus = (id,orderStatus) => ajax("/modifyOrderStatus",{id,orderStatus})

//得到时间筛选后的订单统计信息
export const reqGetOrderStatistic = (beginDate,endDate) => ajax("/order/date",{beginDate,endDate})
