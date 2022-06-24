// pages/dingdan/dingdan.js
wx.cloud.init({
    env: 'cloud1-7geyzojxf1a7d77c',
    traceUser: true,
  })
  const db = wx.cloud.database()
  const app = getApp();
  var myDate = new Date();
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
        openid: userid,
      })
      wx.cloud.callFunction({
        name: 'look',
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
      wx.showModal({
        title: '提示',
        content: '是否确认取消订单，会影响你的诚信度哦！',
        success(res) {
          if (res.confirm) {
            console.log('确定')
            console.log(e.currentTarget.id)
            db.collection('dd').doc(e.currentTarget.id).remove({
              success: function (res) {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }
            })
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
  
    },
    binxd: function (e) {
      wx.showModal({
        title: '取餐',
        content: '取餐号为' + e.currentTarget.id,
        success(res) {
          if (res.confirm) {
            db.collection('dd').doc(e.currentTarget.id).update({
              // data 传入需要局部更新的数据
              data: {
                // 表示将 done 字段置为 true
                qccg: 1,
                qcsj: myDate.toLocaleString(),
              },
              success: res => {
                wx.showToast({
                  title: '取餐成功',
                  icon: 'success',
                  duration: 2000
                })
                success: res => {
                  wx.navigateTo({
                    url: '/pages/index/index',
                  })
                }
              }
  
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
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
    onRefresh() {
      //在当前页面显示导航条加载动画
      wx.showNavigationBarLoading();
      //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
      wx.showLoading({
        title: '刷新中...',
      })
      this.getData();
      sxxxx();
    },
    getData() {
      wx.request({
        url: '',
        //网络请求执行完后将执行的动作
        complete(res) {
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