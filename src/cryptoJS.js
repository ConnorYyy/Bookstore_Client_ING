const CryptoJS = require('crypto-js') // 引用AES源码js
const KEY = CryptoJS.enc.Utf8.parse('1234567812345678') // 十六位十六进制数作为密钥
const IV = CryptoJS.enc.Utf8.parse("1234567812345678"); //十六位十六进制数作为密钥偏移量
// 解密方法
export function decrypt(word, key, iv) {
    var key = key ? key : KEY;
    var iv = iv ? iv : IV;
    var encryptedHexStr = CryptoJS.enc.Base64.parse(word);
    var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    console.error(decrypt);
    console.error(decrypt.toString());
    console.error(decrypt.toString(CryptoJS.enc.Base64));
    console.error(decrypt.toString(CryptoJS.enc.Utf8).toString());
    return decrypt.toString(CryptoJS.enc.Utf8).toString();
}
 
// 加密方法
export function encrypt(word, key, iv) {
    var key = key ? key : KEY;
    var iv = iv ? iv : IV;
    let encrypted = CryptoJS.AES.encrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}