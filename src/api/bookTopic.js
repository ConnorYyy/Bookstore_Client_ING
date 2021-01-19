import ajax from "./ajax";

export const reqGetTopicList = (page,pageSize)=>ajax('/getTopicList',{page, pageSize})

export const reqGetTopic = (id) => ajax("/getTopic",{id})

export const reqModifyTopic = (bookTopic) => ajax('/modifyTopic', {
  id: bookTopic.id,
  topicName: bookTopic.topicName,
  subTitle: bookTopic.subTitle,
  rank: bookTopic.rank,
  put: bookTopic.put
}, 'POST')

export const reqModifyRank = (id,rank) => ajax("/modifyTopicRank",{id,rank})
export const reqModifyPut = (id,put) => ajax("/modifyTopicPut",{id,put})

export const reqDelTopic = (id) => ajax("/delTopic",{id})
export const reqDelTopicImg = (id,url)=>ajax('/delTopicImg',{id,url})

//得到所有未添加到书单的图书
export const reqGetNoAddBookList = (topicId,page,pageSize)=>ajax('/getNoAddBookList',{topicId,page, pageSize})



export const reqAddSubTopic = (id,bookId)=>ajax('/addSubTopic',{id,bookId})
export const reqDelSubTopic = (id,bookId)=>ajax('/delSubTopic',{id,bookId})
export const reqModifySubTopic = (id,bookId,recReason)=>ajax('/modifySubTopic',{id,bookId,recReason})
export const reqGetSubTopicList = (id,page,pageSize)=>ajax('/getSubTopicList',{id,page, pageSize})
export const reqGetReason = (topicId,bookId)=>ajax('/getReason',{topicId,bookId})
export const reqGetTopicBookList = (id)=>ajax('/getTopicBookList',{id})

//getReason
