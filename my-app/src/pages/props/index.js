const {request} = require('../../request/index')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Category:[],
        Category_attr:[],
        category_index:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.get_cartname()
        this.getcategory_arrt()
    },
    async get_cartname(){
        const { Category } = await request({ url:"/category" })
        this.data.Category = Category
        this.setData({ Category:this.data.Category })
    },
    async getcategory_arrt(id=null){
        const { list } = await request({ url:"/category_",method:"POST",data:{category_id:id}})
        this.data.Category_attr = list
        this.setData({
            Category_attr:this.data.Category_attr
        })
    },
    bindCategory(e){
        const { id,index } = e.currentTarget.dataset
        this.data.category_index = index
        this.getcategory_arrt(id)
        this.setData({
            category_index:this.data.category_index
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