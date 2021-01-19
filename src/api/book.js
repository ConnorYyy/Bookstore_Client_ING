import ajax from "./ajax";


//添加出版社newProduct: true,
//                 recommend

//添加书籍
export const reqAddBook = (book) => ajax('/addBook', {  
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
export const reqModifyBook = (book) => ajax('/modifyBook', {
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
export const reqGetBookList = (page,pageSize)=>ajax('/getBookList',{page, pageSize})
//根据id获取书籍
export const reqGetBook = (id)=>ajax('/getBook',{id})


export const reqGetRecBookList = (sort)=>ajax('/getRecBookList',{sort})



//删除书籍
export const reqDelBook = (bookId)=>ajax('/delBook',{bookId})
export const reqDelBookImg = (bookId,url)=>ajax('/delOneImg',{bookId,url})


export const reqGetBookImgPathList = (isbn)=>ajax('/getImgPaths',{isbn})


export const reqModifyPut = (bookId,put)=>ajax('/modifyPut',{bookId,put})
export const reqModifyRec = (bookId,recommend)=>ajax('/modifyRec',{bookId,recommend})
export const reqModifyNew = (bookId,newProduct)=>ajax('/modifyNew',{bookId,newProduct})

//getSortBookList
export const reqGetSortBookList = (sortId)=>ajax('/getSortBookList',{sortId})

//getSortBookListBySort
export const reqGetBookListBySort = (sortId,page,pageSize)=>ajax('/getBookListBySort',{sortId,page, pageSize})
