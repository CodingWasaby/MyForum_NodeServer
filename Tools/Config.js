exports.MySQL_Config = {
    connectionLimit: 50,
    host: 'localhost',
    user: 'aska',
    password: 'aska201228',
    database: 'FMDSTest',
    waitForConnections: true,
    multipleStatements: true
};
exports.MSSQL_Config = {
    user: 'sa',
    password: 'qazWSX12!@',
    server: '192.168.42.183',
    database: 'DB_FMDS',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

exports.ResponseHeader_Default = {
    'Content-Type': 'text/json',
    'Encodeing': 'utf8'
};

exports.CryptoParam = {
    algorithm: 'aes-256-cbc',
    key: 'zhaoxi@framedia.net'
};

exports.FilePath = './uploadFiles/';
exports.XMLPath = './XMLFiles/';

exports.MailConfig = {
    host: 'mail.framedia.net',
    port: 25,
    auth: {
        user: 'zhaoxi@framedia.net',
        pass: '050902zx@'
    }

}
