
wx.cloud.init({
    env: 'cloud1-7geyzojxf1a7d77c',
    traceUser: true,
  })
  const db = wx.cloud.database()
  const app = getApp();
  Page({
  
    /**
     * 页面的初始数据
     */
    data: {
      msgList: "",
      userid: '',
      username: "",
      openid: '',
      rmb: ''
    },
    showsq: function () {
      wx.switchTab({
        url: '../my/my',
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      const app = getApp()
      var userid = app.globalData.userid
      this.setData({
        userid: userid,
      })
      wx.cloud.callFunction({
        name: 'lookup',
        data: {
          userid: app.globalData.userid
        },
        complete: res => {
          console.log(res.result.list)
          this.setData({
            rmb: res.result.list
          })
        }
      })
    },
    getUserInfo(e) {
      console.log(e);
      this.setData({
        username: e.detail.userInfo.nickName
      })
    },
    getopenid() {
      var that = this;
      wx.cloud.callFunction({
        name: 'open',
        success: (res) => {
          var usid = res.result.openid
          console.log(usid)
          this.setData({
            openid: res.result.openid,
          })
          getApp().globalData.userid = res.result.openid
  
        },
        fail(res) {
          console.log("获取失败", res);
        }
      })
    },
    binqc: function (e) {
      console.log(e.currentTarget.id)
      db.collection('dd').doc(e.currentTarget.id).remove({
        success: function (res) {
          sxxxx();
        }
      })
    },
    gwc: function (e) {
      wx.navigateTo({
        url: '/pages/gwx/gwx',
      })
    },
    ddgl: function (e) {
      wx.navigateTo({
        url: '/pages/ddgl/ddgl',
      })
    },
    yqdd: function (e) {
      wx.navigateTo({
        url: '/pages/qccg/qccg',
      })
    },
    cxd: function (e) {
      wx.navigateTo({
        url: '/pages/xd/xd',
      })
    },
    xd: function (e) {
      wx.navigateTo({
        url: '/pages/xd/xd',
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
    onRefresh(){
      //在当前页面显示导航条加载动画
      wx.showNavigationBarLoading(); 
      //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
      wx.showLoading({
        title: '刷新中...',
      })
      this.getData();
      sxxxx();
    },
    getData(){
      wx.request({
            url: '',
            //网络请求执行完后将执行的动作
            complete(res){
                //隐藏loading 提示框
                wx.hideLoading();
                //隐藏导航条加载动画
                wx.hideNavigationBarLoading();
                //停止下拉刷新
                wx.stopPullDownRefresh();
            }
      })   
    },
    onPullDownRefresh: function () {
      //调用刷新时将执行的方法
    this.onRefresh();
  
  },
  sxxxx(e) {
    wx.cloud.callFunction({
      name: 'lookup',
      data: {
        userid: app.globalData.userid
      },
      complete: res => {
        console.log(res.result.list)
        this.setData({
          rmb: res.result.list
        })
      }
    })
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
  