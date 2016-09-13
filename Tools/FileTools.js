var fs = require('fs');
var config = require('./Config');

function upload(files, callBack) {
    //创建文件夹
    createTheFolder(config.FilePath);
    // 获得文件的临时路径
    var tmp_path = files.path;
    var target_path = config.FilePath + files.name;

    // 移动文件
    fs.rename(tmp_path, target_path, function (err) {
        if (err) throw err;
        // 删除临时文件夹文件, 
        fs.unlink(tmp_path, function () {
            if (err) throw err;
            if (callBack != undefined)
                callBack(target_path);
            //res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
    });
}

function createTheFolder(path) {
    if (fs.existsSync(path)) {
        //console.log('已经创建过此目录了');
        return;
    } else {
        fs.mkdirSync(path);
        console.log('目录已创建成功\n');
    }
}
exports.upload = upload;
exports.createTheFolder = createTheFolder;
