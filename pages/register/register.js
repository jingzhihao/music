import api from "../../http/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: '',
        captcha: '',
        username: ''
    },
    // 发送验证码
    sendCaptcha() {
      var pattern = /^1[3456789]\d{9}$/
      if (this.data.phone !== '') {
          if (pattern.test(this.data.phone)) {
              api.checkTel(this.data.phone).then(res => {
                  if (res.exist === -1) {
                      let timer = null;
                      clearInterval(timer);
                      let time = 5;
                      timer = setInterval(() => {
                          if (time <= 0) {
                              this.data.btnValue = "";
                              this.data.btnValue = "点击重新发送";
                              this.data.disabled = false;
                              this.setData({
                                  btnValue: this.data.btnValue,
                                  disabled: this.data.disabled
                              })
                              clearInterval(timer);
                          } else {
                              this.data.disabled = true;
                              this.data.btnValue = "";
                              this.data.btnValue = "剩余时间" + time + "秒";
                              this.setData({
                                  btnValue: this.data.btnValue,
                                  disabled: this.data.disabled
                              })
                              time--;
                              // console.log(time);
                          }
                      }, 1000);
                      api.sendCaptcha(this.data.phoneNumber).then(res => {
                          if (res.code === 200) {
                              wx.showToast({
                                  title: "验证码正在赶来的路上",
                                  icon: 'none',
                                  duration: 1500,
                              });
                          }
                      }).catch(err => {
                          console.log(err);
                      });
                  }
                  if (res.exist === 1) {
                      wx.showToast({
                          title: "该手机号已注册",
                          icon: 'none',
                          duration: 1500,
                      });
                  }

              }).catch(err => {
                  console.log(object);
              });

          } else {
              wx.showToast({
                  title: "您输入的手机号有误！",
                  icon: 'none',
                  duration: 1500,
              });
              this.setData({
                  phone: ''
              })
          }
      } else {
          wx.showToast({
              title: "您还没输入手机号呢！",
              icon: 'none',
              duration: 1500,
          });
      }
  },
    //判断密码的复杂程度
    verify(str) {
      // let a = /[\u4e00-\u9fa5]/; //汉字正则
      let a = /[a-z]/; //小写验证
      let b = /[A-Z]/; //大写验证
      let c = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"); //特殊符号验证
      let d = /[0-9]/; //数字验证
      let zx = [a, b, c, d] //方便遍历
      let nx = 0;
      for (let i in zx) {
          if (zx[i].test(str)) {
              nx++
          }
      }
      if (nx > 2) {
          return true;
      } else if (nx <= 2) {
          return false
      }
  },
    //前往注册页
    login() {
        wx.navigateTo({
            url: '../logs/logs'
        })
        this.setData({
                phone: '',
                passphone: '',
                eamil: '',
                username: ''
            })
            // console.log(this.data.phoneNumber);
            // console.log(this.data.pass1word);
    },
    // 绑定手机号
    phone(e) {
        this.setData({
          phone: e.detail
        })
    },
    //绑定密码
    password(e) {
        this.setData({
          password: e.detail
        })

    },
    //绑定验证码
    captcha(e) {
        this.setData({
          captcha: e.detail
        })
    },
    //绑定昵称
    username(e) {
        this.setData({
          username: e.detail
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