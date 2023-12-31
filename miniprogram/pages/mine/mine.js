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
  /**
   * Lifecycle function--Called when page load
   */
  navigateToUploadRecord: function() {
    wx.navigateTo({
        url: '/pages/uploadRecord/uploadRecord'
    });
},
navigateToDeleteRecord: function() {
  wx.navigateTo({
      url: '/pages/deleteRecord/deleteRecord'
  });
},
navigateToUploadProject: function() {
  wx.navigateTo({
      url: '/pages/uploadRecord/uploadProject'
  });
},
navigateToEditCate:function(){
  wx.navigateTo({
    url:'/pages/editCate/editCate'
  })
},
  onLoad: function() {
    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res);

        that.setData({
          openid: res.result.OPENID,
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
   
}

})