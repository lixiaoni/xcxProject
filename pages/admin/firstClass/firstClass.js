const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    parentCategoryCode:0,
    currentTab:0,
    dataListTwo: [],
    dataListThree:[],
    name:'',
    names:'' 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this,
      parentCategoryCode = this.data.parentCategoryCode
    app.http.getRequest('/admin/shop/category/sublist/{{parentCategoryCode}}', { parentCategoryCode: parentCategoryCode})
      .then(res => {
        const obj = res.obj
        console.log(obj)
        that.setData({
          dataList: obj
        })
      })
  },
  //点击切换
  clickTab: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  twoClass:function(e){
    var name=e.target.dataset.name,
        code=e.target.dataset.id,
        _this=this
    wx.setNavigationBarTitle({
      title: '选择二级分类'
    })
    app.http.getRequest('/admin/shop/category/sublist/{{parentCategoryCode}}', { parentCategoryCode: code })
      .then(res => {
        const obj = res.obj
        console.log(obj)
        _this.setData({
          dataListTwo:obj,
          name:name,
          currentTab:1,
        })
      })
  },
  twothreeClass:function(e){
    var name = e.target.dataset.name,
      code = e.target.dataset.id,
      _this = this
    wx.setNavigationBarTitle({
      title: '选择三级分类'
    })
    app.http.getRequest('/admin/shop/category/sublist/{{parentCategoryCode}}', { parentCategoryCode: code })
      .then(res => {
        const obj = res.obj
        console.log(obj)
        _this.setData({
          dataListThree: obj,
          names: name,
          currentTab: 2,
        })
      })
  },
  classFun: function (e) {
      var code=e.target.dataset.id
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];    // 上一个页面
    prevPage.setData({
      code: code
    })
    wx.navigateBack({
      data: 1
    })
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