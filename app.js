//app.js
App({
  onLaunch: function (options) {
    var that = this;
    console.log("[onLaunch] 本次场景值:", options.scene);
    that.reLaunch();
    // wx.checkSession({
    //   success: function (res) {
    //     console.log("处于登录态");
    //     console.log("open:"+that.globalData.openid);
    //     if (that.globalData.openid == "" && that.globalData.openid == null){
    //       console.log("已登录，获得openId");
    //       that.globalData.openid = wx.getStorageSync("openId");
    //       console.log(that.globalData.openid);
    //     }else{
    //       // 已登录，未获得openId
    //       console.log("已登录，未获得openId");
    //       that.reLaunch();
    //     }
    //   },
    //   fail: function (res) {
    //     that.reLaunch();
    //   }
    // })
  },
  // 登录
  reLaunch: function () {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId
        var code = res.code;//登录凭证
        console.log("code:"+code);
        wx.request({
          url: that.globalData.urlPath + 'student/getOpenId',
          method: 'get',
          header: {
            "Content-Type": "applciation/json"
          },
          data: { code: code },
          success: function (data) {
            if (data.data.status == 200) {
              // 获取到用户的 openid
              console.log("用户的openid:" + data.data.data);
              that.globalData.openid = data.data.data;
              console.log("用户的openid:" + that.globalData.openid);
              wx.setStorageSync("openId", data.data.data);
            } else {
              wx.showModal({
                title: '提示',
                content: '获取用户openid失败',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    that.reLaunch();
                  }
                }
              })
            }
          },
          fail: function () {
            console.log('获取用户信息失败')
          }
        });
      },
      fail: function () {
        console.log('登陆失败')
      }
    })
  },
  globalData: {
    userInfo: null,
    studentDto: null,
    urlPath: "http://192.168.1.105:8080/child-programming-background/app/web/",
    openid: ''
  },






})