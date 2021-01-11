$(function() {
        // 调用  函数  获取用户基本信息
        getuse1();

        var layer = layui.layer;
        $('#btnLogout').on('click', () => {
            // console.log('1')
            //提示用户是否退出
            layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function(index) {
                // console.log('1')
                localStorage.removeItem('token');
                location.href = '/login.html';

                layer.close(index);
            });
        })
    })
    // 获取用户的基本信息
function getuse1() {

    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //   请求头配置对象
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            // console.log(res)
            renderAvatar(res.data); //   调用渲染头像函数
        },
        // 不论成功还是失败  最终都会调用它   complete
        // complete: (res) => {
        //     // console.log(res)
        //     if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {

        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })


    function renderAvatar(user) {
        // 获取用户名
        var name = user.nickname || user.username
            // 设置欢迎文本
        $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
        }
    }

}