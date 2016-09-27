var mysql = require('../Tools/DBHandler/MysqlHandle');

module.exports = function () {
    var obj = {
        UserLogin: UserLogin,
        GetUserByEmail: GetUserByEmail
    };
    return obj;
}

function UserLogin(user, callback) {
    var sql = `SELECT 
                COUNT(1) num
            FROM
                MyFr.user
            WHERE
                (user.UserNo = ? or user.Email=? or user.NickName = ?)
                    AND user.Password = ? AND IsDelete = 0 ` ;
    var param = [user.UserNo, user.UserNo, user.UserNo, user.Password];
    mysql.Query(sql, param, function (rows) {
        callback(rows[0].num > 0);
    });
}

function GetUserByEmail(Email, callback) {
    var sql = `SELECT 
                user.UserKey, user.NickName, user.Password
            FROM
                MyFr.user
            WHERE
                Email = ? AND IsDelete = 0 ` ;
    mysql.Query(sql, [Email], function (rows) {
        callback(rows.length > 0);
    })
}