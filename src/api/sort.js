import ajax from "./ajax";

//添加图书分类
export const reqAddBookSort = (bookSort) => ajax('/sort/addBookSort', {
  sortName: bookSort.sortName,
  upperName: bookSort.upperName,
  rank: bookSort.rank,
  level: bookSort.level
}, 'POST')

export const reqGetUpperName = ()=>ajax('/sort/getUpperNames')

export const reqGetBookSort = (upperName,sortName) => ajax("/sort/getBookSort",{upperName,sortName})

export const reqModifyBookSort = (bookSort) => ajax("/sort/modifyBookSort",{
  id: bookSort.id,
  sortName: bookSort.sortName,
  upperName: bookSort.upperName,
  rank: bookSort.rank,
  level: bookSort.level
},'POST')

export const reqDelFirstSort = (sortName)=>ajax('/sort/delFirstSort',{sortName})
export const reqDelSecondSort = (upperName,sortName)=>ajax('/sort/delSecondSort',{upperName,sortName})

export const reqGetFirstSortList = (page,pageSize) => ajax("/sort/getFirstSortList",{page,pageSize})
export const reqGetSecondSortList = (upperName,page,pageSize) => ajax("/sort/getSecondSortList",{upperName,page,pageSize})
export const reqGetSortList = () => ajax("/sort/getBookSortList")
