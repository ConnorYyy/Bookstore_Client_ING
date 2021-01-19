import ajax from "./ajax";

//添加图书分类
export const reqAddBookSort = (bookSort) => ajax('/addBookSort', {
  sortName: bookSort.sortName,
  upperName: bookSort.upperName,
  rank: bookSort.rank,
  level: bookSort.level
}, 'POST')

export const reqGetUpperName = ()=>ajax('/getUpperNames')

export const reqGetBookSort = (upperName,sortName) => ajax("/getBookSort",{upperName,sortName})

export const reqModifyBookSort = (bookSort) => ajax("/modifyBookSort",{
  id: bookSort.id,
  sortName: bookSort.sortName,
  upperName: bookSort.upperName,
  rank: bookSort.rank,
  level: bookSort.level
},'POST')

export const reqDelFirstSort = (sortName)=>ajax('/delFirstSort',{sortName})
export const reqDelSecondSort = (upperName,sortName)=>ajax('/delSecondSort',{upperName,sortName})

export const reqGetFirstSortList = (page,pageSize) => ajax("/getFirstSortList",{page,pageSize})
export const reqGetSecondSortList = (upperName,page,pageSize) => ajax("/getSecondSortList",{upperName,page,pageSize})
export const reqGetSortList = () => ajax("/getBookSortList")
