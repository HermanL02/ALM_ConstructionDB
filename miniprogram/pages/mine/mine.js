// pages/profile/profile.js
Page({

  /**
   * Page initial data
   */
  data: {
      openid:'',
      role:'',
      
  }, 

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function() {
    let that = this;
    var c1 = new wx.cloud.Cloud({
      // 资源方 AppID
      resourceAppid: 'wx4b16522af9b67ce5',
      // 资源方环境 ID
      resourceEnv: 'try-2g1q2qche750e59c',
    })
    await c1.init()
    // 跨账号调用，必须等待 init 完成
    // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
    

    await c1.callFunction({
      name: 'jsk_login',
      complete: res => {
        console.log('callFunction test result: ', res);

        that.setData({
          openid: res.result.FROM_OPENID,
          role: res.result.ROLE,
        });
  
        //设置全局变量role
        getApp().globalData.role = that.data.role;
        getApp().globalData.openid = that.data.openid;
        console.log(getApp().globalData.role);
      }
     
    });
  },
  
  copyOpenId: function () {
    wx.setClipboardData({
        data: this.data.openid,
        success (res) {
            wx.getClipboardData({
                success (res) {
                    console.log(res.data) // data
                    wx.showToast({
                        title: '已复制',
                        icon: 'success',
                        duration: 2000
                    })
                }
            })
        }
    })
},

  // Todo: 需要设置getRole

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },
  bindInputOpenId: function(e) {
    this.setData({
      useropenid: e.detail.value
    });
  },
  onAddviceadminTap: async function() {
    wx.showLoading({
      title: '正在上传',
    });
    var c1 = new wx.cloud.Cloud({
      // 资源方 AppID
      resourceAppid: 'wx4b16522af9b67ce5',
      // 资源方环境 ID
      resourceEnv: 'try-2g1q2qche750e59c',
    })
    await c1.init()
    // 跨账号调用，必须等待 init 完成
    // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
    await c1.callFunction({
      name: 'addViceAdmin',
      data: {
        useropenid: this.data.useropenid
      },
      success: res => {
        wx.hideLoading();
        
        // 检查云函数返回的结果
        if (res.result.code && res.result.code < 0) {
          // 如果云函数返回了错误码，显示错误信息
          wx.showToast({
            title: res.result.message,
            icon: 'none'
          });
        } else {
          // 如果云函数成功执行，显示上传完成信息
          wx.showToast({
            title: '上传完成',
          });
          this.setData({
            openid: ''
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        wx.showToast({
          title: '上传失败',
        });
        console.error('[云函数] [addViceAdmin] 调用失败', err);
      }
    });
}

})