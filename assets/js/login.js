$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    var layer = layui.layer;
    // $('#form_reg').on('submit', function (e) {
    //     // 1. 阻止默认的提交行为
    //     e.preventDefault()
    //     console.log(123);
    //     // 2. 发起Ajax的POST请求
    //     var data = {
    //         username: $('#form_reg [name=username]').val(),
    //         password: $('#form_reg [name=password]').val()
    //     }
    //     $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
    //         if (res.status !== 0) {
    //             return layer.msg(res.message)
    //         }
    //         layer.msg('注册成功，请登录！')
    //         // 模拟人的点击行为
    //         $('#link_login').click()
    //     })
    // })
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功,请登录");
                // 模拟人的点击行为
                $('#link_login').click()
            }
        })
    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        // console.log(e);
        console.log($(this).serialize()); // 打印的是序列化表单值
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功');
                localStorage.setItem('token', res.token); // localStorage.setItem(key,value)：将value存储到本地key字段
                location.href = '/index.html'
            }
        })
    })
})