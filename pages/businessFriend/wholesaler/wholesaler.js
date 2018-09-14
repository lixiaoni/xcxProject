import Api from '../../../utils/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: [],
    value: '',
    totalCount:0
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
  changeValue:function(e){
    var val = e.detail.value
    this.setData({
      value:val
    })
  },
  searchBtn: function (e) {
    console.log(888)
    var val = this.data.value
    console.log(val)
    app.pageRequest.pageData.pageNum = 0
    this.setData({
      detailList: []
    })
    this.getList({purchaserUserId: wx.getStorageSync('purchaserUserId'),keyword:val})
  },
  getList: function (data) {
    var _this = this
    Api.wholesalerAll(data)
      .then(res => {
        var detailList = res.obj.result,
          totalCount = res.obj.totalCount
        console.log(detailList)
        _this.setData({
          totalCount: totalCount
        })
        if (detailList != null) {
          var datas = _this.data.detailList,
            newArr = app.pageRequest.addDataList(datas, detailList)
          _this.setData({
            detailList: newArr,
          })
        } else {
          wx.showToast({
            title: '暂无更多了',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }

      })
  },
  onShow: function () {
    this.getList({ purchaserUserId: wx.getStorageSync('purchaserUserId')})
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
    this.setData({
      detailList: [],
      value: ''
    })
    app.pageRequest.pageData.pageNum = 0
    this.getList({ purchaserUserId: wx.getStorageSync('purchaserUserId') })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var val = this.data.value
    if (val == '') {
      this.getList({ purchaserUserId: wx.getStorageSync('purchaserUserId') })
    } else {
      this.getList({ purchaserUserId: wx.getStorageSync('purchaserUserId'), keyword: val })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})