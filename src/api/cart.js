import ajax from "./ajax";

//添加图书到购物车
export const reqAddCart = (account,id,num) => ajax('/addCart', {account,id,num})

//从购物车中删除指定商品
export const reqDelCart = (account,id) => ajax('/delCart', {account,id})

//批量删除购物车中的商品
export const reqBatchDelCart = (account,ids) => ajax('/batchDelCart', {account,ids})

//修改购物车中指定图书的数量
export const reqModCart = (account,id,num) => ajax('/modifyCart', {account,id,num})

//得到购物车中图书列表
export const reqGetCartList = (account,page,pageSize) => ajax('/getCartList', {account,page,pageSize})
