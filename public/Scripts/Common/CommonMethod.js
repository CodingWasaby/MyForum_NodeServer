// $(function () {
//     $('[valitype]').blur(function () {
//         validateView();
//     })
// })

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

function validateView() {
    var result = true;
    $('[valitype]').each(function (index, ele) {
        var valitype = $(ele).attr('valitype');
        switch (valitype) {
            case 'required':
                $(ele).css('border-color', '#e5e6e7');
                $(ele).attr('data-original-title',"");
                var str = $(ele).val();
                
                if (str == null || $.trim(str) == "") {
                    $(ele).css('border-color', 'red');
                    $(ele).attr('data-toggle', 'tooltip');
                    $(ele).attr('data-placement', 'left');
                    $(ele).attr('data-original-title','请输入' + $(ele).attr('valiName'));
                    $(ele).tooltip();
                    result = false;
                }
                break;
        }
    });
    return result;
}