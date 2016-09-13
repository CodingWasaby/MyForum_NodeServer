var sql = require('mssql');
var config = require('../Config');
//此处的Connection 类似于MySQL的Pool
var connection = new sql.Connection(config.MSSQL_Config, function (err) {
    if (err)
        throw err;
});

exports.Query = function (sqlStr, parms, callBack, transaction) {
    if (parms = undefined)
        parms = null;
    var request;
    if (transaction != undefined)
        request = new sql.Request(transaction);
    else
        request = new sql.Request(connection);
    if (parms != null)
        for (var i = 0; i < parms.length; i++) {
            var parm = parms[i];
            request.input(parm.name, parm.value);
        }
    request.query(sqlStr, function (err, recordset) {
        if (err) throw err;
        if (callBack != undefined)
            callBack(recordset);
    });
};

exports.Transaction = function () {
    var transaction = new sql.Transaction(connection);
    return transaction;
}

//var transaction = new sql.Transaction(/* [connection] */);
//transaction.begin(function (err) {
//    // ... error checks

//    var request = new sql.Request(transaction);
//    request.query('insert into mytable (mycolumn) values (12345)', function (err, recordset) {
//        // ... error checks

//        transaction.commit(function (err, recordset) {
//            // ... error checks

//            console.log("Transaction committed.");
//        });
//    });
//});
