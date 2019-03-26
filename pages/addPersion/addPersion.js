
//获取应用实例
const app = getApp();
var adds = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_arr: [],
    imageFlg:false,
    openid: "",
  },
  upimg: function () {
    var that = this;
    if (this.data.img_arr.length < 1) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths),
            imageFlg:true,
          })
        }
      })
    } else {
      wx.showToast({
        title: '只上传一张头像',
        icon: 'loading',
        duration: 3000
      });
    }
  },
  deleteimg:function(){
    var that = this;
    that.setData({
      img_arr: [],
      imageFlg: false,
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var guardianName = e.detail.value.guardianName;
    var guardianPhone = e.detail.value.guardianPhone;
    var name = e.detail.value.name;
    var age = e.detail.value.age;
    var sex = e.detail.value.sex;
    var address = e.detail.value.address;
    var email = e.detail.value.email;
    var img_arr = this.data.img_arr;
    console.log(img_arr);
    if (guardianName == "" || guardianPhone == "" || name == "" || age == "" || sex == "" || address == "" || email == "" || img_arr.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入完整信息！',
        showCancel: false,//是否显示取消按钮
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      console.log("完整信息");
      adds = e.detail.value;
      this.upload();
    } 
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  upload: function () {
    var that = this
    for (var i = 0; i < this.data.img_arr.length; i++) {
      wx.uploadFile({
        url: app.globalData.urlPath + 'student/addStudentInfo',
        filePath: that.data.img_arr[i],
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: adds,
        success: function (res) {
          res.data = JSON.parse(res.data);
          if (res.data.status == '200') {
            console.log(res.data.data);
            wx.showToast({
              title: '授权成功！',
              duration: 3000
            });
            //用户授权成功
            wx.navigateTo({
              url: '/pages/persion/persion'
            })
          } else {
            //获取用户失败
            wx.showModal({
              title: '提示',
              content: '提交信息失败，请重新操作',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  app.reLaunch();
                }
              }
            })
          }
        }
      })
    }
    this.setData({
      formdata: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.setData({
      openid: app.globalData.openid,
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})