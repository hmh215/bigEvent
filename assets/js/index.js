$(function () {
    // 调用函数 获取基本信息
    getUserInfo();

    // 获取用户基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // 以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
            // headers 就是请求头配置对象
            // localStorage.getItem('token') 获取本地存储的 token 值 即身份认证信息
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                console.log(res, '------');
                if (res.status !== 0) {
                    return layui.layer.msg('获取信息失败')
                }
                // 调用函数 渲染用户头像
                renderAvatar(res.data)
            },
            // 不论成功还是失败,最终都会调用 complete 回调函数
            // complete: function (res) {
            //     console.log(res, '``````');
            //     // 在 complete 回调函数中,可以使用 res.responseJSON 拿到服务器响应回来的数据
            //     if (res.responseJSON.status !== 0 && res.responseJSON.message !== '获取用户基本信息成功!') {
            //         // 强制清空 token 
            //         localStorage.removeItem('token')
            //         // 强制跳转到登录页面
            //         location.href = '/login.html'
            //     }
            // }
        })
    }

    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登陆吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 1.清空本地存储中 token 防止非法进入首页的,即跳过登陆直接输入首页网址进入首页的也会被退出首页
            localStorage.removeItem('token');

            // 2.重新跳转登录页
            location.href = '/login.html';

            // 关闭 confirm 询问框 index=1 确认按钮获得值为1
            layer.close(index);

        });

    })
    // 渲染用户头像
    function renderAvatar(user) {
        // 1.获取用户名称
        var name = user.nickname || user.username;
        // console.log(name);

        // 2.设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

        // 3.按需渲染用户头像
        if (user.user_pic !== null) {
            // 3.1 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide()
        } else {
            // 3.2 渲染文本头像
            $('.layui-nav-img').hide()
            // toUpperCase 字符转成大写
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
})