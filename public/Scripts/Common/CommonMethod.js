//提示信息
function MessageShow(title, text, type, callback) {
    swal({
        title: title,
        text: text,
        type: type,
        confirmButtonColor: "#1ab394",
        confirmButtonText: "确定",
        closeOnConfirm: true,        
    }, callback);
}