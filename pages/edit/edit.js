import api from "../../http/api"
import area from "../../lib/js/area"
var time = require("../../utils/util.js")
    // pages/edit/edit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uid: '3227413678',

        name: '',
        gender: '',
        birthday: '',
        area: area,
        signature: '无',
        province: '',
        city: '',
        arr: '',
        genderList: ['保密', '男', '女'],
        maxDate: new Date().getTime(),
        minDate: new Date(1960, 1, 1).getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            } else if (type === 'day') {
                return `${value}日`;
            }
            return value;
        },
        //选择器的初始日期
        newtime: '',
        //性别的初始设置
        newgender: '',
        //控制性别
        showtoolbar: false,
        //时间
        showdata: false,
        //城市
        showarea: false

    },

    userDetail() {
        api.userDetail(this.data.uid).then(res => {
            console.log(res.profile.birthday);
            if (res.code === 200) {
                //性别
                if (res.profile.gender === 1) {
                    this.setData({
                        gender: '男',
                    })
                } else if (res.profile.gender === 2) {
                    this.setData({
                        gender: '女',
                    })
                } else {
                    this.setData({
                        gender: '保密',
                    })
                }
                //生日
                if (res.profile.birthday) {
                    this.setData({
                        birthday: time.formatTime(res.profile.birthday, 'Y/M/D'),
                        newtime: res.profile.birthday
                    })
                }
                //城市
                //存在省份
                if (res.profile.province) {
                    for (let i in this.data.area.province_list) {
                        if (i == res.profile.province) {
                            this.setData({
                                province: this.data.area.province_list[i]
                            })
                        }
                    }
                }
                //存在城市
                if (res.profile.city) {
                    for (let i in this.data.area.city_list) {
                        if (i == res.profile.city) {
                            this.setData({
                                city: this.data.area.city_list[i]
                            })
                        }
                    }
                }
                //个性签名
                if (res.profile.signature !== '') {
                    this.setData({
                        signature: res.profile.signature,
                    })
                }
                this.setData({
                    name: res.profile.nickname,

                    //area: res.profile.nickname,
                    //signature: res.profile.signature,
                    arr: this.data.province + this.data.city
                })
            }
        }).catch(err => {
            console.log(err);
        })
    },
    //城市
    areaIcon() {
        this.setData({
            showarea: true
        })
    },
    areaConfirm(e) {
        //console.log(e.detail.values);
        this.setData({
            arr: e.detail.values[0].name + e.detail.values[1].name,
            showarea: false
        })
    },
    areaCancel() {
        this.setData({
            showarea: false
        })
    },
    //时间
    dataIcon() {
        this.setData({
            showdata: true
        })
    },
    dateCancel() {
        this.setData({
            showdata: false
        })
    },
    dateConfirm(e) {
        // let birthday = time.formatTime(e.detail, 'Y/M/D')
        console.log(e.detail);
        this.setData({
            birthday: time.formatTime(e.detail, 'Y/M/D'),
            showdata: false
        })
    },
    //完成选择性别
    genderConfirm(e) {
        console.log(e.detail.index);
        this.setData({
            gender: e.detail.value,
            showtoolbar: false
        })
    },
    //关闭性别选择
    genderCancel() {
        this.setData({
            showtoolbar: false
        })
    },
    //genderIcon
    genderIcon() {
        this.setData({
            showtoolbar: true
        })
    },
    //修改所以信息
    logout() {
        let usermessage = {
            nickname: this.data.name,
            gender: this.data.gender,
            birthday: this.data.birthday,
            province: this.data.province,
            city: this.data.city,
            signature: this.data.signature
        };
        let uid = this.data.uid
        wx.setStorageSync(uid, JSON.stringify(usermessage));
        wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 1500,

        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //console.log(options.uid);
        // if (options.uid) {
        //     this.setData({
        //         uid: options.uid
        //     })
        //     this.userDetail()
        // }
        let uid = this.data.uid
        if (wx.getStorageSync(uid)) {
            let usermessage = JSON.parse(wx.getStorageSync(uid))
            console.log(usermessage.nickname);
        }

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
        //console.log(area.province_list);
        this.userDetail()
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