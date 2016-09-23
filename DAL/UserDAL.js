var mysql = require('../Tools/DBHandler/MysqlHandle');

module.exports = function () {
    var obj = {
        UserLogin: UserLogin
    };
    return obj;
}

function UserLogin(user, callback) {
    var sql = `SELECT 
                COUNT(1) num
            FROM
                MyFr.user
            WHERE
                user.UserNo = ?
                    AND user.Password = ?` ;
    var param = [user.UserNo, user.Password];
    return mysql.Query(sql, param, function (rows) {
            callback(rows[0].num > 0);        
    });
}