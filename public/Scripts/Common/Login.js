function login() {
    if (validateView()) {
        $.ajax({
            url: '/LoginSubmit',
            type: 'POST',
            data: {
                userName: $('#userName').val(),
                password: $('#password').val()
            },
            traditional: true,
            success: function (result) {
                if (result) {
                    window.location.href = '/Index';
                }
                else {
                    alert('false');
                }
            }
        })
    }
}

function dropdownClick(str) {
    var atd = document.getElementById('at_adress');
    atd.innerHTML = str + " <span class='caret'></span>";
    $('#at_adress').attr('atad', str);
}

function sendMail() {
    if (validateView()) {
        var atad = $('#at_adress').attr('atad');
        var mailName = $('#mailName').val();
        $.ajax({
            url: '/SendMail',
            type: 'POST',
            data: {
                Email: mailName + "@" + atad
            },
            traditional: true,
            success: function (result) {
                if (result == 'NotFound') {
                    MessageShow("验证失败", "您输入的邮箱地址没有注册", "warning");
                }
                if (result == 'false') {
                    MessageShow("邮件发送失败", "可能是程序内部原因，请联系管理员", "warning");
                }
                if (result == 'success') {
                    MessageShow("邮件发送成功", "请你查看邮箱，并按指定顺序操作", "success", function () {
                        $('#cancel').click();
                    });
                }
            }
        })
    }
}

