// src/pages/Home/Home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Height:0,
    list:[
      {
        id:1,
        pic:[
          {
            id:2,
            url:"../../public/image/11.jpg",
            type:2
          },
          {
            id:2,
            url:"../../public/image/22.jpg",
            type:2
          },
          {
            id:3,
            url:"../../public/image/33.jpg",
            type:2
          },
          {
            id:4,
            url:"../../public/image/44.jpg",
            type:2
          },
          {
            id:5,
            url:"../../public/image/55.jpg",
            type:2
          },
          {
            id:6,
            url:"../../public/image/66.jpg",
            type:2
          },
        ]
      }
    ]
  },
  getSystemInfo(){
    wx.getSystemInfo({
      success:h => {
        let custom = wx.getMenuButtonBoundingClientRect();
        const customButton = custom.bottom + custom.top - h.statusBarHeight;
        this.setData({
          Height:customButton
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo()
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