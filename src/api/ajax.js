import axios from 'axios';
import {TARGET_PATH} from '../../config/index';

// 包装的axios ajax请求接口
export default function ajax (url, data={}, method='GET') {

  return new Promise(function (resolve, reject) {
    let promise
    if (method === 'GET') {
      // 准备url query参数数据
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = TARGET_PATH + url + '?' + dataStr;
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }

    promise.then(function (response) {
      resolve(response)
    }).catch(function (error) {
      reject(error)
    })
  })
}


