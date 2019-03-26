// pages/authorize/authorize.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      var openid = app.globalData.openid;
      if (openid == "" && openid == null) {
        console.log('获取Openid失败,重新获取');
        app.reLaunch();
        return;
      }
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: app.globalData.urlPath + 'student/addStudent',
        data: {
          openid: openid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data.status);
          //从数据库获取用户信息
          app.globalData.userInfo = e.detail.userInfo;
          console.log("插入小程序登录用户信息成功！");
          //授权成功后，跳转进入小程序插入个人信息
          wx.navigateTo({
            url: '/pages/addPersion/addPersion'
          })
        }
      });

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }

})