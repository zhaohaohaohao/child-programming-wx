// pages/persion/persion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textArr: ["购课历史", "报名课程", "收藏课程", "课程表"],
    imageArr: ["/images/list.png", "/images/list.png", '/images/list.png', '/images/course.png'],
    showModalStatus: false,
    telephone: "",
    code: "",
    buttonDisable: false,
    verifyCodeTime: '获取验证码'
  },
  myOrderList(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    // wx.navigateTo({
    //   url: '../myOrderList/myOrderList?index=' + index
    // })
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