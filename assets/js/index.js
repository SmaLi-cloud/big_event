$(function () {
    getUserInfo();


    var layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
            console.log(res);
        },
        error(err) { }

    })
}
// 渲染头像
function renderAvatar(user) {
    //渲染名字
    var name = user.nickname || user.username;
    $("#welcome").html(name);

    if (user.user_pic) {
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide();
    } else {
        const first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
        $(".layui-nav-img").hide();
    }
}