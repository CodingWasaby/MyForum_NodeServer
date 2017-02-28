var mysql = require('mysql');
var config = require('../Config');
var connectionPool = mysql.createPool(config.MySQL_Config);

exports.Query = query;

function query(sql, parm, callBack, tran) {
    var conn = connectionPool;
    if (tran != undefined)
        conn = tran;

    var parmArray = [];
    var setSql = '';
    for (var n in parm) {
        setSql += ' set @' + n + '= ?;';
        parmArray.push(parm[n]);
    }
    setSql += ' SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;';
    sql = setSql + sql + ' commit;';

    conn.query(sql, parmArray, function (err, results, fields) {
        if (err) {
            if (tran != undefined) {
                tran.rollback();
            }
            throw err;
        };
        if (callBack != undefined) {
            callBack(results[results.length - 2]);
        }
    });
}

exports.PageQuery = function (sql, parm, page, callBack) {
    parm.pageIndex = page.pageIndex;
    parm.pageSize = page.pageSize;
    var pageSql = '';
    if (page.Order) {
        pageSql += ' ORDER BY ' + page.Order;
    }
    if (page.Desc) {
        pageSql += page.Desc;
    }
    pageSql += ` LIMIT (@pageIndex-1)*@pageSize,@pageSize ;`;
    sql += pageSql;

    var conn = connectionPool;
    var parmArray = [];
    var setSql = '';
    for (var n in parm) {
        setSql += ' set @' + n + '= ?;';
        parmArray.push(parm[n]);
    }
    setSql += ' SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;';
    sql = setSql + sql + ' commit;';

    conn.query(sql, parmArray, function (err, results, fields) {
        if (err) {
            if (tran != undefined) {
                tran.rollback();
            }
            throw err;
        };
        if (callBack != undefined) {
            var total = results[results.length - 3][0].total;
            var pageInfo = SetThePage(page, total);
            callBack(results[results.length - 2], pageInfo);
        }
    });
};

exports.Execute = function (sql, parm, callBack, tran) {
    var conn = connectionPool;
    if (tran != undefined)
        conn = tran;

    var parmArray = [];
    var setSql = '';
    for (var n in parm) {
        setSql += ' set @' + n + '= ?;';
        parmArray.push(parm[n]);
    }
    sql = setSql + sql;

    conn.query(sql, parmArray, function (err, results) {
        if (err) {
            if (tran != undefined) {
                tran.rollback();
            }
            throw err;
        };
        if (callBack != undefined) {
            callBack(results[results.length - 1]);
        }
    });
}

exports.Transaction = function (SqlParmEntitys, callBack) {
    connectionPool.getConnection(function (err, conn) {
        if (err) {
            throw err;
        }
        conn.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            for (var i = 0; i < SqlParmEntitys.length; i++) {
                var temp = SqlParmEntitys[i];
                conn.query(temp.sql, temp.parm, function (err, result) {
                    if (err) {
                        return connection.rollback(function () {
                            throw err;
                        });
                    }
                });
            }
            connection.commit(function (err) {
                if (err) {
                    return connection.rollback(function () {
                        throw err;
                    });
                }
                if (callBack != undefined) {
                    callBack();
                }
            });
        });
        conn.release();
    });
}

exports.getConnection = function (callBack) {
    connectionPool.getConnection(function (err, conn) {
        if (err) {
            throw err;
        }
        callBack(conn);
    });
}

function SetThePage(page, total) {
    page.tatol = total;
    page.pageCount = total / page.pageSize;
    if (total % page.pageSize > 0)
        page.pageCount++;
    return page;
}


