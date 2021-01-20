import ajax from "./ajax";


//添加出版社newProduct: true,
//                 recommend

//添加书籍
export const reqAddBook = (book) => ajax('/book/addBook', {  
  author: book.author,
  isbn: book.isbn,
  publish: book.publish,
  birthday: book.birthday,
  marketPrice: book.marketPrice,
  price: book.price,
  stock: book.stock,
  description: book.description,
  put: book.put,
  bookName: book.bookName,
  rank: book.rank,
  newProduct: book.newProduct,
  recommend: book.recommend,
  bookSort: book.bookSort
}, 'POST')

//修改书籍信息
export const reqModifyBook = (book) => ajax('/book/modifyBook', {
  author: book.author,
  isbn: book.isbn,
  publish: book.publish,
  birthday: book.birthday,
  marketPrice: book.marketPrice,
  price: book.price,
  stock: book.stock,
  description: book.description,
  put: book.put,
  bookName: book.bookName,
  rank: book.rank,
  newProduct: book.newProduct,
  recommend: book.recommend,
  bookSort: book.bookSort,
  id: book.id
}, 'POST')


//获取书籍列表
export const reqGetBookList = (page,pageSize)=>ajax('/book/getBookList',{page, pageSize})
//根据id获取书籍
export const reqGetBook = (id)=>ajax('/book/getBook',{id})
export const reqGetRecBookList = (sort)=>ajax('/book/getRecBookList',{sort})

//删除书籍
export const reqDelBook = (bookId)=>ajax('/book/delBook',{bookId})
export const reqDelBookImg = (bookId,url)=>ajax('/book/delOneImg',{bookId,url})

export const reqGetBookImgPathList = (isbn)=>ajax('/book/getImgPaths',{isbn})
export const reqModifyPut = (bookId,put)=>ajax('/book/modifyPut',{bookId,put})
export const reqModifyRec = (bookId,recommend)=>ajax('/book/modifyRec',{bookId,recommend})
export const reqModifyNew = (bookId,newProduct)=>ajax('/book/modifyNew',{bookId,newProduct})

//getSortBookList
export const reqGetSortBookList = (sortId)=>ajax('/book/getSortBookList',{sortId})

//getSortBookListBySort
export const reqGetBookListBySort = (sortId,page,pageSize)=>ajax('/book/getBookListBySort',{sortId,page, pageSize})
