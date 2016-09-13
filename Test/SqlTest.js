var mysql = require("../Tools/DBHandler/MysqlHandle");

function GetTestDate() {
    var sql = `select * from FMDS_tb_b_Movie` ;
    return mysql.Query(sql, null, function (rows) {
        console.log(rows[0].MovieID);
        console.log(rows[1]);
    });
}
GetTestDate();