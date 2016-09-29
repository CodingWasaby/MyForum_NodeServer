var mysql = require('../Tools/DBHandler/MysqlHandle');

module.exports = function () {
    var obj = {
        UserLogin: UserLogin,
        GetUserByEmail: GetUserByEmail,
        GetUserByKey: GetUserByKey,
        UpdatePassword: UpdatePassword
    };
    return obj;
}

function UserLogin(user, callback) {
    var sql = `set @loginName= ?;
                SELECT 
                    COUNT(1) num,
                    Email,
                    HeadPic,
                    NickName,
                    UserNo,
                    UserKey,
                    Remark,
                    Department,
                    Company,
                    Password
                FROM 
                    MyFr.user
                WHERE
                    (user.UserNo = @loginName
                        OR user.Email = @loginName
                        OR user.NickName = @loginName
                        OR user.UserKey = @loginName)
                        AND user.Password = ?
                        AND IsDelete = 0 ` ;
    var param = [user.UserNo, user.Password];
    mysql.Query(sql, param, function (rows) {
        callback(rows[1][0].num > 0, rows[1][0]);
    });
}

function GetUserByEmail(Email, callback) {
    var sql = `SELECT 
                    user.UserKey, user.NickName, user.Password, user.Email
                FROM
                    MyFr.user
                WHERE
                    Email = ? AND IsDelete = 0 ` ;
    mysql.Query(sql, [Email], function (rows) {
        callback(rows.length > 0, rows[0].UserKey, rows[0].Password);
    })
}

function GetUserByKey(key, callback) {
    var sql = `SELECT 
                    user.UserKey, user.NickName, user.Password, user.Email
                FROM
                    MyFr.user
                WHERE
                    UserKey = ? AND IsDelete = 0 ` ;
    mysql.Query(sql, [key], function (rows) {
        callback(rows[0]);
    })
}

function UpdatePassword(UserKey, Password, callback) {
    var sql = `UPDATE MyFr.user 
                    SET 
                        Password = ?
                    WHERE
                        UserKey = ? ` ;
    mysql.Execute(sql, [Password, UserKey], function (result) {
        callback(result.changedRows > 0);
    })
}