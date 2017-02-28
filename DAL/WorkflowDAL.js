var mysql = require('../Tools/DBHandler/MysqlHandle');

module.exports = function () {
    var obj = {
        process: {
            GetProcessList: GetProcessList,
            GetProcessByKey: GetProcessByKey,
            InsertProcess: InsertProcess,
            UpdateProcess: UpdateProcess,
            DeleteProcess: DeleteProcess
        },
        node: {
            GetNodeListByProcessKey: GetNodeListByProcessKey,
        }
    };
    return obj;
}

//获取模板列表
function GetProcessList(page, searchModel, callback) {
    var countSql = ` SELECT 
                        COUNT(ProcessID) total
                    FROM
                        process
                    WHERE
                        IsDelete = 0 ;`;
    var sql = `SELECT 
            p.ProcessKey,
            p.ProcessName,
            p.ProcessType,
            p.CreateDate,
            COUNT(n.NodeID) nodeNum
        FROM
            process p
                JOIN
            node n ON p.ProcessKey = n.ProcessKey
                AND n.IsDelete = 0
        WHERE
            p.IsDelete = 0 `;
    sql = countSql + sql;
    if (serchModel.ProcessName) {
        sql += ' AND p.ProcessName LIKE @ProcessName';
        serchModel.ProcessName = '%' + serchModel.ProcessName + '%';
    }
    if (serchModel.ProcessType) {
        sql += ' AND p.ProcessType = @ProcessType';
    }
    if (serchModel.BeginDate) {
        sql += ' AND p.CreateDate >= @BeginDate';
    }
    if (serchModel.EndDate) {
        sql += ' AND p.CreateDate <= @EndDate';
    }
    sql += 'GROUP BY p.ProcessKey , p.ProcessName , p.ProcessType , p.CreateDate ';
    mysql.PageQuery(sql, serchModel, page, function (rows) {
        callback(rows, pageInfo);
    });

}

//获取模板
function GetProcessByKey(key, callback) {
    var sql = `SELECT 
            ProcessKey,
            ProcessName,
            ProcessType,
            CreateDate,
            Creator,
            Remark
        FROM
            process
        WHERE
            p.IsDelete = 0
                AND p.ProcessKey = @ProcessKey `;
    mysql.Query(sql, { ProcessKey: key }, function (result) {
        callback(result[0]);
    })
}

//新增模板
function InsertProcess(process, callback, tran) {
    var sql = `INSERT INTO process
                (ProcessName,
                ProcessKey,
                ProcessType,
                Creator,
                CreateDate,
                IsDelete,
                Remark)
                VALUES(@ProcessName,@ProcessKey,@ProcessType,@Creator,@CreateDate,@IsDelete,@Remark); `;
    mysql.Execute(sql, process, function (result) {
        callback(result.changedRows > 0);
    }, tran);
}

//编辑模板
function UpdateProcess(process, callback, tran) {
    var sql = `UPDATE process
            SET
            ProcessName = @ProcessName,
            ProcessType = @ProcessType,
            Remark = @Remark
            WHERE ProcessKey = @ProcessKey `;
    mysql.Execute(sql, process, function (result) {
        callback(result.affectedRows > 0);
    }, tran);
}

//删除模板
function DeleteProcess(key, callback, tran) {
    var sql = `UPDATE process 
        SET 
            IsDelete = 1
        WHERE
            ProcessKey = @ProcessKey`;
    mysql.Execute(sql, { ProcessKey: key }, function (result) {
        callback(result.changedRows > 0);
    }, tran);
}

//获取模板节点
function GetNodeListByProcessKey(processKey) {
    var sql = `SELECT 
                NodeName, NodeKey, ProcessKey, NodeType, SeqNo, Remark
            FROM
                MyFr.node
            WHERE
                IsDelete = 0
                    AND ProcessKey = @ProcessKey `;
    mysql.Query(sql, { ProcessKey: processKey }, function (rows) {
        callback(rows);
    });
}

//新增节点
function InsertNode(node, callback, tran) {
    var sql = `INSERT INTO node
                    (NodeName,
                    NodeKey,
                    ProcessKey,
                    NodeType,
                    SeqNo,
                    IsDelete,
                    Remark)
                    VALUES
                    (@NodeName,
                    @NodeKey,
                    @ProcessKey,
                    @NodeType,
                    @SeqNo,
                    @IsDelete,
                    @Remark) ;`
    mysql.Execute(sql, node, function (result) {
        callback(result.changedRows > 0);
    }, tran);
}

