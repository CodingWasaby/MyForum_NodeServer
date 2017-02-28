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

//人员登录
function UserLogin(user, callback) {
    var sql = ` SELECT 
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
                        AND user.Password = @Password
                        AND IsDelete = 0 ;` ;
    var param = { loginName: user.UserNo, Password: user.Password };
    mysql.Query(sql, param, function (rows) {
        callback(rows[0].num > 0, rows[0]);
    });
}

//检查邮件地址
function GetUserByEmail(Email, callback) {
    var sql = `SELECT 
                    user.UserKey, user.NickName, user.Password, user.Email
                FROM
                    MyFr.user
                WHERE
                    Email = @Email AND IsDelete = 0 ` ;
    mysql.Query(sql, { Email: Email }, function (rows) {
        if (rows.length > 0) {
            callback(rows.length > 0, rows[0].UserKey, rows[0].Password);
        } else {
            callback(false);
        }
    })
}

//获取人员BY KEY
function GetUserByKey(key, callback) {
    var sql = `SELECT 
                    user.UserKey, user.NickName, user.Password, user.Email
                FROM
                    MyFr.user
                WHERE
                    UserKey = @UserKey AND IsDelete = 0 ` ;
    mysql.Query(sql, { UserKey: key }, function (rows) {
        callback(rows[0]);
    })
}

//更新密码
function UpdatePassword(UserKey, Password, callback) {
    var sql = `UPDATE MyFr.user 
                    SET 
                        Password = @Password
                    WHERE
                        UserKey = @UserKey ` ;
    mysql.Execute(sql, { Password: Password, UserKey: UserKey }, function (result) {
        callback(result.changedRows > 0);
    })
}