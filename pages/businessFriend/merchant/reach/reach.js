import Api from '../../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    showMes:false,
    baseUrl: app.globalData.imageUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMession: function (data) {
    var _this = this
    Api.remakInfo(data)
      .then(res => {
        var obj = res.obj
        console.log(obj)
        if (obj != null) {
          _this.setData({
            buyAmount: obj.countData.buyAmount,
            buyTimes: obj.countData.buyTimes,
            recentBuy: obj.countData.recentBuy,
            name: obj.name,
            note: obj.note,
            birthday: obj.birthday,
            phone: obj.phone,
            headPic: obj.headPic,
            nickName: obj.nickName,
            wechart: obj.wechart,
          })
        }
      })
  },
  onLoad: function (options) {
    var accept = options.accept
    this.setData({
      userId: accept
    })
    this.getMession({purchaserUserId : accept})
    if (options.code){
      this.setData({
        showMes: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  urlHome: function () {
    wx.switchTab({
      url: '../../../page/home/home'
    })
  },
  passFunc: function () {

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