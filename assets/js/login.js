$(function() {
    $('.l-i').click(function() {
        $('[class=l-bo]').hide().siblings().show();
    });
    $('.l-l').click(function() {
        $('[class=i-bo]').hide().siblings().show();
    })

    // 获取到form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            // 自定义了一个   pwd   校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var dpp1 = $('.i-bo [name=password]').val();
                if (dpp1 !== value) {
                    return "两次不一致"
                }
            }
        })
        // 监听注册表单的 提交事件
    $('#dp2').on('submit', function(e) {
        e.preventDefault();
        // console.log(99);
        var data = {
            username: $('#dp2 [name=username]').val(),
            password: $('#dp2 [name=password]').val()
        };
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message);
            $('#22dpdp1').click();
        })

    });

    // 监听表单的登录   提交事件

    $('#dp1').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            //  快速获取表单中的数据
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功');
                console.log(res.token);
                localStorage.setItem('token', res.token);
                //跳转到后台主页
                location.href = '/index.html';
            }
        })
    })
})