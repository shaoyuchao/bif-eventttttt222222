$.ajaxPrefilter(function(options) {
        // console.log(options.url)
        options.url = "http://api-breakingnews-web.itheima.net" + options.url;
        //   发起请求之前统一拼接请求的根路径
        // console.log(options.url)


        // 统一为有权限的 接口设置  headers请求头
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        options.complete = (res) => {
            // console.log(res)
            if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {

                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    })
    // 每次调用请求时   会先调用此函数    可拿到给ajax传递的配置对象