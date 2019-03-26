//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    open: false,
    hidden:true,
    scrollYHeight: 0,//scroll-view高度
    // start: "正常课程",
    // slist: [{ id: 1, name: "正常课程" },
    // { id: 2, name: "体验课" },
    // ],
    // isstart: false,
    // openimg: "/images/up.png",
    // offimg: "/images/down.png"
  },
  // 筛选
  // tap_ch: function (e) {
  //   if (this.data.open) {
  //     this.setData({
  //       open: false
  //     });
  //   } else {
  //     this.setData({
  //       open: true
  //     });
  //   }
  // },
  // opens: function (e) {
  //       if (this.data.isstart) {
  //         this.setData({
  //           isstart: false,
  //         });
  //       }
  //       else {
  //         this.setData({
  //           isstart: true,
  //         });
  //       }
  // },
  // onclicks: function (e) {
  //   var index = e.currentTarget.dataset.index;
  //   let name = this.data.slist[index].name;
  //   console.log(index);
  //   console.log(name);
  //   this.setData({
  //     isstart: false,
  //     start: this.data.slist[index].name,
  //   })
  // },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    
  },
  onReady: function () {
    wx.getSystemInfo({
      success: ({ windowHeight }) => {
        this.setData({ scrollYHeight: windowHeight })//设置scrill-view组件的高度为屏幕高度
      }
    })
    console.log("高度："+this.data.scrollYHeight);
  },
  authorization:function(){
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              if (app.globalData.studentDto == null) {
                console.log("第一次查询用户");
                that.queryStudentDto();
              } else {
                console.log("用户已查询过");
                console.log(app.globalData.studentDto);
                wx.navigateTo({
                  url: '/pages/persion/persion'
                })
              }
            }
          });
        } else {
          console.log("未授权");
          // 关闭所有页面，打开到应用内的某个页面。
          wx.navigateTo({
            url: '/pages/authorize/authorize'
          })
        }
      }
    })
  },
  //获取用户信息接口
  queryStudentDto: function () {
    //var openid = wx.getStorageSync('openid');
    var openid = app.globalData.openid;
    if (openid == null) {
      console.log("openId为空");
      app.reLaunch();
    }
    console.log(openid);
    wx.request({
      url: app.globalData.urlPath + 'student/getStudentByOpenId',
      data: {
        openId: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.status);
        if (res.data.status == '200') {
          console.log(res.data.data);
          app.globalData.studentDto = res.data.data;
          console.log(app.globalData.studentDto);
          //用户已经授权过
          wx.navigateTo({
            url: '/pages/persion/persion'
          })
        } else {
          //获取用户失败
          wx.showModal({
            title: '提示',
            content: '获取用户失败,为您重新获取',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                app.reLaunch();
              }
            }
          })
        }
      }
    });
  },

})
