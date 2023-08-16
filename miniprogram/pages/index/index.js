//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    a1src:'../../images/a1.png',
    a2src: '../../images/a2.png',
    a3src: '../../images/a3.png',
    a4src: '../../images/a4.png',
    signupimg:'../../images/signup.png',
    imgsrc:'',
    iconsrc:'../../images/usercount.png',
    jtsrc:'../../images/icon-jt.png',
    imgUrls: [

    ],
    keyword: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000 
  },
  bindSearchInput: function(e) {
    this.setData({
      keyword: e.detail.value
    });
  },

  onSearchTap: function() {
    wx.navigateTo({
      url: `/pages/results/results?keyword=${this.data.keyword}`
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '爱乐盟建设库首页',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        onsole.log("转发失败")
      }
    }
  }
})
