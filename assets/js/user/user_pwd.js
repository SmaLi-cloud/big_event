


$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: "/my/updatepwd",
        method: "POST",
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("更新密码失败")
            }
            layui.layer.msg("更新密码成功");
            $(".layui-form")[0].reset();

        }
    })
})

$(function () {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须是6到12位，且不能有空格"],
        samepwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "密码不能相同"
            }
        },
        rePwd: function (value) {
            if (value != $("[name=newPwd]").val()) {
                return "密码两次不一致"
            }
        }
    })
})