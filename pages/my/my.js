import api from "../../http/api";

// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uid: '',
        profile: {},
        level: '',
    },
    //去登录
    goLogs() {
        wx.navigateTo({
            url: '../logs/logs',
        });

    },
    //获取用户信息
    userDetail() {
        //console.log(this.data.uid);
        api.userDetail(this.data.uid).then(res => {
            //console.log(res);
            if (res.code === 200) {
                this.setData({
                    profile: res.profile,
                    level: res.level,
                })
            }
        }).catch(err => {
            console.log(err);
        })

    },
    //退出登录
    logout() {
        wx.showModal({
            title: '提升',
            content: '你确定要退出登录',
            cancelText: '取消',
            success: (result) => {
                if (result.confirm) {
                    this.setData({
                        uid: '',
                    })
                    wx.removeSavedFile("uid");
                }
            },
        });

        // api.logout().then(res => {
        //     if (res.code === 200) {

        //         this.setData({
        //             uid: '',
        //         })
        //         wx.removeSavedFile("uid");
        //         //console.log(wx.getStorageSync("uid"));
        //     }
        //     //console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // })
    },
    edit() {
        wx.navigateTo({
            url: `../edit/edit?uid=${this.data.uid}`
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        //从本地把用户的id取出来
        if (wx.getStorageSync("uid")) {
            let arr = wx.getStorageSync("uid");
            this.setData({
                    uid: arr
                })
                //console.log(this.data.uid);
            this.userDetail()
        }
        //this.userDetail()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})