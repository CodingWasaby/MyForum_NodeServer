function resetPass() {
    if (validateInput()) {
        $.ajax({
            url: '/ChangePassword',
            type: 'POST',
            data: {
                pass1: $('#password1').val(),
                userKey: $('#userKey').attr('keyVal')
            },
            traditional: true,
            success: function (result) {
                if (result) {
                    MessageShow("重置成功", "您的密码已经重置，请妥善保管", "success", function () {
                        window.location.href = '/index';
                    })
                }
                else {
                    MessageShow("重置失败", "请联系管理员", "warning")
                }
            }
        })
    }
}

function validateInput() {
    var pass1 = $('#password1');
    var pass2 = $('#password2');
    var oldPass = $('#password');

    pass1.css('border-color', '#e5e6e7');
    pass1.attr('data-original-title', "");
    pass2.css('border-color', '#e5e6e7');
    pass2.attr('data-original-title', "");
    if (pass1.val() == null || $.trim(pass1.val()) == "") {
        setTips(pass1, '请输入新密码！');
        return false;
    }
    if (pass1.val() != pass2.val()) {
        setTips(pass1, '两次密码输入不一致');
        setTips(pass2, '两次密码输入不一致');
        return false;
    }
    if (pass1.val() == oldPass.attr('keyval')) {
        setTips(pass1, '密码不能和以前密码一致');
        return false;
    }
    return true;
}

function setTips(dom, text) {
    dom.css('border-color', 'red');
    dom.attr('data-toggle', 'tooltip');
    dom.attr('data-placement', 'left');
    dom.attr('data-original-title', text);
    dom.tooltip();
}