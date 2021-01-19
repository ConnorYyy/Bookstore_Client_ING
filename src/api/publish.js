import ajax from "./ajax";


//添加出版社
export const reqAddPublish = (publish) => ajax('/addPublish', {
  name: publish.name,
  showPublish: publish.showPublish,
  rank: publish.rank,
}, 'POST')

export const reqGetPublishList = (page,pageSize)=>ajax('/getPublishList',{page, pageSize})

export const reqGetPublishNames = ()=>ajax('/getPublishNames')

export const reqGetPublish = (id) => ajax("/getEditPublish",{id})

export const reqModifyPublish = (publish) => ajax("/modifyPublish",{
  id:publish.id,
  name: publish.name,
  showPublish: publish.showPublish,
  rank: publish.rank,
},'POST')

export const reqModifyShow = (id) => ajax("/modifyShowPublish",{id})
export const reqDelPublish = (id) => ajax("/delPublish",{id})
