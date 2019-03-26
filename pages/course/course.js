// pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg'],
    collect:'../../images/collect.png',
    collectFlg:true,
  },
  /** 
	 * 预览图片
	 */
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.imglist // 需要预览的图片http链接列表
    })
  },
  collect:function(){
    var that=this;
    if (that.data.collectFlg){
      that.setData({
        collectFlg: false,
        collect: '../../images/collectHL.png'
      });
    }else{
      that.setData({
        collectFlg: true,
        collect: '../../images/collect.png'
      });
    }
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