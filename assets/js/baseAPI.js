$.ajaxPrefilter(function(options) {
        // console.log(options.url)
        options.url = "http://api-breakingnews-web.itheima.net" + options.url;
        //   发起请求之前统一拼接请求的根路径
        console.log(options.url)
    })
    // 每次调用请求时   会先调用此函数    可拿到给ajax传递的配置对象