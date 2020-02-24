import api from "../../http/api";

//Page Object
Page({
    data: {
        activeIndex: 0,
        list: ['手机号登陆', '邮箱登陆'],
        phone: '',
        passphone: '',
        eamil: '',
        passeamil: ''

    },
    clickItem(e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            activeIndex: index
        })
    },
    //赋值
    phone(e) {
        // console.log(e.detail);
        this.setData({
            phone: e.detail
        })

    },
    passphone(e) {
        // console.log(e.detail);
        this.setData({
            passphone: e.detail
        })
    },
    eamil(e) {
        this.setData({
            eamil: e.detail
        })
    },
    passeamil(e) {
        this.setData({
            passeamil: e.detail
        })
    },


    //手机号码登录
    loginphone() {
        var pattern = /^1[3456789]\d{9}$/
        if (this.data.phone !== '' && this.data.passphone !== '') {
            if (pattern.test(this.data.phone)) {
                api.loginphone(this.data.phone, this.data.passphone).then(res => {
                    if (res.code === 200) {
                        wx.switchTab({
                            url: `../my/my`,
                        });

                        // wx.setStorageSync("uid", res.account.id);
                        //console.log(res);
                    } else if (res.code === 501) {
                        //账号不存在
                        wx.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 1500,
                        });
                        this.setData({
                            phone: '',
                        })
                    } else if (res.code === 502) {
                        //密码错误
                        wx.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 1500,
                        });
                        this.setData({
                            passphone: ''
                        })
                    }
                }).catch(err => {
                    if (err.status === 501) {
                        wx.showToast({
                            title: '您的手机号未注册',
                            icon: 'none',
                            duration: 1500,
                        });
                        this.setData({
                            phone: '',
                        })
                    }
                    console.log(err);
                });
            } else {
                wx.showToast({
                    title: '手机号格式错误',
                    icon: 'none',
                    duration: 1500,
                });
                this.setData({
                    phone: '',
                    passphone: ''
                })
            }

        } else {
            wx.showToast({
                title: '手机号和密码不能为空',
                icon: 'none',
                duration: 1500,
            });
        }

    },
    //邮箱登录
    loginEmail() {
        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            //pattern.test(this.data.email)
        if (this.data.email !== '' && this.data.passemail !== '') {
            if (true) {
                api.loginEmail(this.data.email, this.data.passemail).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        wx.switchTab({
                            url: `../my/my`,
                        });
                        //把用户的登录id存起来
                        wx.setStorageSync("uid", res.account.id);
                        console.log(res);
                    } else if (res.code === 502) {
                        wx.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 1500,
                        });
                        this.setData({
                            email: '',
                            passemail: ''
                        })
                    }
                }).catch(err => {
                    if (err.status === 501) {
                        wx.showToast({
                            title: '您的邮箱未注册',
                            icon: 'none',
                            duration: 1500,
                        });
                        this.setData({
                            email: '',
                        })
                    }
                    console.log(err);
                });
            } else {
                wx.showToast({
                    title: '邮箱格式错误',
                    icon: 'none',
                    duration: 1500,
                });
                this.setData({
                    email: '',
                    passemail: ''
                })
            }

        } else {
            wx.showToast({
                title: '邮箱和密码不能为空',
                icon: 'none',
                duration: 1500,
            });
        }

    },

    //检测手机号是否被注册
    checkTel() {
        api.checkTel(this.data.phone).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    //前往注册页
    Register() {
        wx.navigateTo({
            url: '../register/register',
        })
        this.setData({
                phone: '',
                passphone: '',
                eamil: '',
                passeamil: ''
            })
            // console.log(this.data.phoneNumber);
            // console.log(this.data.pass1word);
    },
    //options(Object)
    onLoad: function(options) {

    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});