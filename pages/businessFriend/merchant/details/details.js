import Api from '../../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  // 0未知 1男 2女
  data: {
    sexData: [{ sex: "男", no: 1 }, { sex: "女", no: 2}, { sex: "未知", no: 0}],
    show: true,
    showAddress: false,
    name:'',
    nickName:'',
    sex: '未知',
    note:'',
    phone:'',
    wechart:'',
    birthday:'',
    province: '',
    city: '',
    area: '',
    detailAddress:'',
    userId:null,
  },
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getInfo:function(userId){
    var _this=this,
    sex=null
    Api.userInfo({userId: userId})
    .then(res=>{
      var obj=res.obj
      console.log(obj)
      if (obj.sex==0){
        sex='未知'
      } else if (obj.sex == 1) {
        sex = '男'
      } else if (obj.sex == 2){
        sex = '女'
      }
      _this.setData({
        name: obj.name,
        nickName: obj.nickName,
        sex: sex,
        note: obj.note,
        phone: obj.phone,
        wechart: obj.wechart,
        birthday: obj.birthday,
        province: obj.province,
        city: obj.city,
        area: obj.county,
        detailAddress: obj.detailAddress,
        userId: obj.userId
      })
    })
  },
  onLoad: function (options) {
    var userId = options.userId
    this.setData({
      userId: userId
    })
    this.getInfo(userId)
  },
  changeValue:function(e){
    var name=e.target.dataset.name,
        value=e.detail.value
    if(name=="name"){
      this.setData({
        name: value
      })
    } else if (name == "nickName") {
      this.setData({
        nickName: value
      })
    } else if (name == "note") {
      this.setData({
        note: value
      })
    } else if (name == "phone") {
      this.setData({
        phone: value
      })
    } else if (name == "wechart") {
      this.setData({
        wechart: value
      })
    } else if (name == "detailAddress") {
      this.setData({
        detailAddress: value
      })
    } else if (name == "birthday") {
      this.setData({
        birthday: value
      })
    }
  },
// 性别
  updataSex(e) {
    this.setData({
      show: false
    })
  },
  closeShow(e) {
    this.setData({
      show: true
    })
  },
  choseSex(e) {
    var text = e.target.dataset.text.sex
    this.setData({
      sex: text,
      show: true
    })
  },
  // 收获地址
  chooseAddress: function () {
    var that = this;
    that.setData({
      showAddress: true
    })
  },
  sureSelectAreaListener: function (e) {
    var that = this;
    that.setData({
      showAddress: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city,
      area: e.detail.currentTarget.dataset.area
    })
  },
  // 更新
  addDetails:function(){
    var _this=this,
      name=this.data.name,
      nickName = this.data.nickName,
      sex = this.data.sex,
      note = this.data.note,
      phone = this.data.phone,
      wechart = this.data.wechart,
      birthday = this.data.birthday,
      province = this.data.province,
      city = this.data.city,
      county = this.data.area,
      userId = this.data.userId,
      detailAddress = this.data.detailAddress,
      data={},
      no=null
    if (sex == '未知') {
      no = 0
    } else if (sex == '男') {
      no = 1
    } else if (sex == '女') {
      no = 2
    }
    data = { name: name, nickName: nickName, sex: no, note: note, phone: phone, wechart: wechart, birthday: birthday, province: province, city: city, county: county, detailAddress: detailAddress, userId: userId}
    Api.saveDetails(data)
    .then(res=>{
      wx.showToast({
        title: '保存成功',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      wx.navigateTo({
        url: '../newMerchant/newMerchant',
      })
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