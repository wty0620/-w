// pages/index/index.js
wx.cloud.init({
    env:'cloud1-7geyzojxf1a7d77c',
    traceUser:true,
})
const db=wx.cloud.database()
const app=getApp()
console.log(app);

Page({
    /**
     * 页面的初始数据
     */
    data: {
        mgList:'',
        ti:'',
        rmbs:"",
    },

    //生命周期函数--监听页面加载
    onLoad: function (options) {
        db.collection("banner").get({
            success:res=>{
                console.log(res)
                this.setData({
                    mgList:res.data
                })
            }
        })
        db.collection("title").get({
            success:res=>{
                console.log(res)
                this.setData({
                    ti:res.data
                })
            }
        })
        db.collection("mslb").get({
            success:res=>{
                console.log(res)
                this.setData({
                    rmbs:res.data
                })
            }
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
    showbs:function(e){
      console.log(e.currentTarget.id)
      wx.navigateTo({
        url:'/pages/fbgl/fbgl?list_id='+e.currentTarget.id,
    })
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
    aaa(){
        wx.navigateTo({
          url: '../gltl/gltl',
        })
    },
        
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})