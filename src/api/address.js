import ajax from "./ajax";

//添加地址
export const reqAddAddress = (address) => ajax('/addUserAddress', {
  account: address.account,
  name: address.name,
  phone: address.phone,
  addr: address.addr,
  label: address.label
}, 'POST')

//修改地址
export const reqModAddress = (address) => ajax("/modifyUserAddress",{
  id: address.id,
  account: address.account,
  name: address.name,
  phone: address.phone,
  addr: address.addr,
  label: address.label
},'POST')

//删除地址
export const reqDelAddress = (id) => ajax("/delUserAddress",{id})

//得到某个用户的地址列表
export const reqGetAddressList = (account) => ajax("/getUserAddress",{account})
