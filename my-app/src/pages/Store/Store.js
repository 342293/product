const {request} = require('../../request/index')
const { openLocation } = require('../../utils/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[]
  },
  async get_address(){
    const { address } = await request({ url:"/address" })
    console.log(address)
    this.data.address = address
    this.setData({ address:this.data.address })
  },
  bindItemAddress(e){
    const option = e.currentTarget.dataset.item
    openLocation(option)
    wx.openLocation({
      latitude:Number(option.latitude),
      longitude:Number(option.longitude),
      name:option.company_detailed,
      title:option.company_detailed,
      success: h =>{
        console.log(h)
      },
      fail:e =>{
        console.log(e)
      }
    })
  },
  bindPhone(){
    wx.makePhoneCall({
      phoneNumber:"13076332293"
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