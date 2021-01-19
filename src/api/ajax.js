import axios from 'axios';
import {TARGET_PATH} from '../../config/index';

function objPrinter(param, key) {
  if(param && typeof param != 'function') {
    if( typeof param == 'object') {
      Object.keys(param).forEach(k => {
        if(param[k] && typeof param[k] !=='object' && typeof param != 'function')
          console.log("\t"+(key?key+'.'+k:k)+'>>>>>'+param[k]);
        else
          objPrinter(param[k], key?key+'.'+k:k);
      });
    }
  }

}
// 包装的axios ajax请求接口
export default function ajax (url, data={}, method='GET') {

  return new Promise(function (resolve, reject) {
    let promise;
    console.log("=====开始发送"+method+"请求=====");
    console.log("请求地址>>>>>"+url);
    if(data){
      console.log("=====请求参数=====");
      objPrinter(data);
    }
    if (method === 'GET') {
      // 准备url query参数数据
      let dataStr = '';
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      });
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = TARGET_PATH + url + '?' + dataStr;
        console.log("拼接后的url>>>>>" + url)
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      if(response.status=='200') {
        console.log("=====请求成功=====");
        console.log("=====接收参数=====");
        objPrinter(response.data);
        // objPrinter(response);
      }else{
        console.log("=====请求失败=====");
        console.log(response.data);
      }
      resolve(response)
    }).catch(function (error) {
      console.log("=====请求报错=====");
      reject(error)
    })
  })
}


