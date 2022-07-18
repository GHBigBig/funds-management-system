const crypto = require('crypto');
const {hmacKey} = require('../config/keys');


/**
 * Hmac 加密，可以把Hmac理解为用随机数“增强”的哈希算法。
 * @param {string, Buffer, TypeArray, DataView} data 要加密的数据
 * @param {string} inputEncoding data 字符串的编码，默认 utf8
 * @return {string} 加密后密码
 */
function getCryptoStr(data, inputEncoding) {
    const hmac = crypto.createHmac('sha256', hmacKey);
    hmac.update(data, inputEncoding);
    return hmac.digest('hex');
}


module.exports = {getCryptoStr}