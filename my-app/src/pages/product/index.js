const {request} = require('../../request/index')
const {previewImage,makePhoneCall} = require('../../utils/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Open:false,
    product:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProduct()
  },
  async getProduct(){
    const product = await request({ url:"/product" })
    if(product.product.length > 0){
      this.data.product = product.product
      this.data.Open = true
    }
    this.setData({
      product:this.data.product,
      Open:this.data.Open
    })
  },
  makePhone(){
    makePhoneCall('13922206799')
  },
  lookup(e){
    const {list,item} = e.currentTarget.dataset
    previewImage(item,list)
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