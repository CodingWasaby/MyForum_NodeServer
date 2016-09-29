
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

function validateView(id) {
    if (id) {
        return requiredVali('#' + id);
    }
    else {
        var result = true;
        $('[valitype]').each(function (index, ele) {
            var valitype = $(ele).attr('valitype');
            switch (valitype) {
                case 'required':
                    var r = requiredVali(this)
                    result = result ? r : result;
                    break;
            }
        });
        return result;
    }
}

function requiredVali(selector) {
    $(selector).css('border-color', '#e5e6e7');
    $(selector).attr('data-original-title', "");
    var str = $(selector).val();
    if (str == null || $.trim(str) == "") {
        $(selector).css('border-color', 'red');
        $(selector).attr('data-toggle', 'tooltip');
        $(selector).attr('data-placement', 'left');
        $(selector).attr('data-original-title', '请输入' + $(selector).attr('valiName'));
        $(selector).tooltip();
        return false;
    }
    return true;
}
