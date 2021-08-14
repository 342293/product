const {request} = require('../../request/index')
const {previewImage,makePhoneCall} = require('../../utils/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Open:false,
    product:[],
    props:false,
    Category:[],
    Category_attr:[],
    category_index:0,
    info:{}
  },
  Query:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProduct()
    this.get_cartname()
  },
  async getProduct(){
    const { send } = this.data
    const {product} = await request({ url:"/product",method:"post",data:send })
    if(product.length > 0){
      this.data.Open = true
    }else{
      this.data.Open = false
    }
    this.data.product = product
    this.setData({
      product:this.data.product,
      Open:this.data.Open
    })
  },
  select(){
    this.data.props = !this.data.props
    this.setData({
      props:this.data.props
    })
  },
  async get_cartname(id=null){
    if(id !==null) this.Query.category_pid = id
    const { Category }  = await request({ url:"/Category",method:"post",data:this.Query })
    const {left,right} = Category
    this.data.Category_attr = Category
    if(id == null){
      this.data.Category = left
      this.data.Category_attr = right
    }
    this.setData({
      Category:this.data.Category ,
      Category_attr:this.data.Category_attr
    })
  },
  bindCategory(e){
    const { id,index } = e.currentTarget.dataset
    this.get_cartname(id)
    this.data.category_index = index
    this.setData({
      category_index:this.data.category_index
    })
  },
  setIndex(e){
    const {Category_attr} = this.data
    const {ida,indexa,indexb} = e.currentTarget.dataset
    if(this.data.info[ida] == indexb) {
      this.data.info = new Object()
      this.data.send = new Object()
    } else{
      this.data.send = new Object()
      this.data.info = new Object()
      this.data.info[ida] = indexb
      const id = Category_attr[indexa].child[indexb].id
      this.data.send.category_id = id
    }
    this.setData({
      info:this.data.info,
      send:this.data.send
    })
  },
  async submit(){
    const { send } = this.data
    this.getProduct()
    this.data.props = false
    this.setData({
      props:this.data.props
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