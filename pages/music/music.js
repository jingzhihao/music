import api from "../../http/api";

// pages/music/music.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [],
        recommendSongSheet: [],
        hotTopic: [],
        newSong: [],
        newDisc: [],
        djprogram: [],
        recommend: [],
        list: ["新碟", "新歌"],
        selected: 0
    },

    //轮播图
    banner() {
        api.banner().then(res => {
            //console.log(res);
            if (res.code === 200) {
                this.setData({
                    bannerList: res.banners
                })
            }
        }).catch(err => {
            console.log(err);
        })

    },
    //推荐歌单
    personalized() {
        api.personalized().then(res => {
            //console.log(res.result);

            //console.log(newResult);
            if (res.code === 200) {
                this.setData({
                    recommendSongSheet: res.result.splice(0, 6)
                })
            }
        }).catch(err => {
            console.log(err);
        })

    },
    //新歌
    newSong() {
        api.newSong().then(res => {
            //console.log(res);
            if (res.code === 200) {
                this.setData({
                    newSong: res.result.splice(0, 6)
                })
            }
        }).catch(err => {
            console.log(err);
        })
    },
    //新碟 切换 新歌
    selected(e) {
        //console.log(e.currentTarget.dataset)
        let index = e.currentTarget.dataset.index
            //console.log(index + 1)
        if (index == 0) {
            this.setData({
                selected: 0
            })
        } else {
            this.setData({
                selected: 1
            })
        }
    },
    //新碟
    newDisc() {
        api.newDisc().then(res => {
            //console.log(res);
            if (res.code === 200) {
                this.setData({
                    newDisc: res.albums.splice(0, 6)
                })
            }
        }).catch(err => {
            console.log(err);
        })
    },
    //推荐电台
    djprogram() {
        api.djprogram().then(res => {
            //console.log(res);
            if (res.code === 200) {
                this.setData({
                    djprogram: res.result
                })
            }
        }).catch(err => {
            console.log(err);
        })
    },
    //推荐节目
    recommend() {
        api.recommend().then(res => {
            //console.log(res);
            if (res.code === 200) {
                this.setData({
                    recommend: res.programs.splice(0, 6)
                })
            }

        }).catch(err => {
            console.log(err);
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
        this.banner();
        this.personalized();
        this.newSong();
        this.newDisc();
        this.djprogram();
        this.recommend()
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
        let that = this;
        wx.showNavigationBarLoading();
        wx.request({
            url: 'http://49.233.66.125:3000/personalized',
            success(res) {
                if (res.data.code === 200) {
                    let newResult = that.getRandom(res.data.result, 6);
                    that.setData({
                        recommendSongSheet: newResult
                    })
                }
            },
            complete() {
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
            }
        })
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