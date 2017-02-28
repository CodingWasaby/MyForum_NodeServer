var crypto = require('crypto');
var config = require('./Config').CryptoParam;

exports.encrypt = function (text, algorithm) {
    var alg = (algorithm) ? algorithm : config.algorithm;
    var cipher = crypto.createCipher(alg, config.key);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = function (crypted, algorithm) {
    var alg = (algorithm) ? algorithm : config.algorithm;
    var decipher = crypto.createDecipher(alg, config.key)
    var dec = decipher.update(crypted, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

exports.getuuid = function (uuidType) {
    var uuid = require('node-uuid');
    if (uuidType == 'v1') {
        return uuid.v1();
    }
    else{
        return uuid.v4();
    }
}