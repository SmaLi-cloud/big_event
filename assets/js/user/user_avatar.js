$(function () {

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    console.log("sssssss");

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    $('#file').change(function (e) {
        console.log(e);
        if (e.target.files.lenght === 0) {
            layui.layer.msg("请上传图片")
        }
        var file = e.target.files[0];
        var imgUrl = URL.createObjectURL(file);
        $image.cropper("destroy").attr("src", imgUrl).cropper(options)
    })


    $("#btnupload").on("click", function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL,
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("更换头像失败")
                }
                layui.layer.msg("更换头像成功 ");
                window.parent.getUserInfo();
            }
        })
    })
})