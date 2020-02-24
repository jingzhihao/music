import api from "../../http/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeList: [],
        initialList: [],
        chooseType: 0,
        showIndex: 0,
        chooseIndex: 0,
        limit: 30,
        Code: 5001,
        initial: '',
        list: []
    },

    //一级标签的切换
    clickItem(e) {
        wx.showLoading({
            title: '加载中...',
        });
        //console.log(e.currentTarget.dataset.item);
        // console.log(e.currentTarget.dataset.item.id);
        let index = e.currentTarget.dataset.index
        let item = e.currentTarget.dataset.item
        this.setData({
            chooseType: index,
            showIndex: index,
            chooseIndex: 0,
            Code: item.id,
            limit: 30,
            initial: '',
        })
        this.artist()
    },
    //二级标签的切换
    clickLetter(e) {
        wx.showLoading({
            title: '加载中...',
        });
        //console.log(e.currentTarget.dataset.item);
        this.setData({
            chooseIndex: e.currentTarget.dataset.index,
            initial: e.currentTarget.dataset.item
        })
        if (this.data.initial === "热") {
            this.setData({
                initial: ''
            })
            this.artist()
        }
        this.artist()
    },
    //触底 limit + 30 返回重新加载
    limit(e) {
        console.log(e.detail);
        this.data.limit = e.detail
        this.setData({
            limit: this.data.limit,
        })
    },
    artist() {
        api.artist(this.data.limit, this.data.Code, this.data.initial).then(res => {
            //console.log(res);
            if (res.code === 200 && res.artists.length > 0) {
                this.setData({
                        list: res.artists
                    })
                    //console.log(res.artists);
                wx.hideLoading();
            } else {
                wx.hideLoading();
            }
        }).catch(err => {
            console.log(err);
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({
            title: '加载中...',
        });
        this.setData({
            typeList: api.typeList,
            initialList: api.initial
        })
        this.artist()
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
        //console.log(12);
        wx.showLoading({
            title: '加载中...',
        });
        this.selectComponent("#enter").limit();
        this.artist();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})