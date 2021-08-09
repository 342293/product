const {request} = require('../../request/index')
const { openLocation, JSONParseInt } = require('../../utils/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:0,
    latitude:0,
    address:[],
    markers:[]
  },
  async get_address(){
    const {markers} = this.data
    const { address } = await request({ url:"/address" })
    const {latitude,longitude} = address[0]
    this.data.address = address
    this.data.longitude = longitude
    this.data.latitude = latitude
    for (let i = 0; i < address.length; i++) {
      markers.push({
        id:address[i].id,
        iconPath:"",
        width:15,
        height:15,
        longitude:address[i].longitude,
        latitude:address[i].latitude,
      })
    }
    this.setData({
      address:this.data.address,
      longitude:this.data.longitude,
      latitude:this.data.latitude
    })
  },
  bindItemAddress(e){
    const { item } = e.currentTarget.dataset
    const Object = JSONParseInt(item,['latitude','longitude'])
    openLocation(Object)
  },
  bindPhone(){
    wx.makePhoneCall({
      phoneNumber:"13922206799"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_address()
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