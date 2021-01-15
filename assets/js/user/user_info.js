$(function() {
    var form = layui.form;

    var layer = layui.layer;


    form.verify({
        nickname: function(value) {
            if (value.length > 5) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })
    insettp();
    // 初始化用户信息
    function insettp() {

        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: (res) => {
                if (res.status !== 0)
                    return layer.msg(res.message);

                console.log(res);
                // 调用form.val()   快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })


    }
    // 重置表单信息
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        insettp();
    })


    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) { return layer.msg(res.message) }
                layer.msg('更新资料成功');
                // 调用首页js文件里面的方法
                window.parent.getuse1()
            }
        })
    })
})