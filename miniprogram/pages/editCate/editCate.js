// pages/editCate/editCate.js
Page({
  data: {
    bigCateList: []  // 从数据库中获取的 bigCate 列表
  },
  onLoad: function() {
    wx.cloud.callFunction({
      name: 'getAllBigCate',
      success: res => {
        if (res.result.code === 0) {
          this.setData({
            bigCateList: res.result.data
          })
          console.log(res.result.data)
        } else {
          console.error('获取失败：', res.result.message)
        }
      },
      fail: err => {
        console.error('调用失败：', err)
      }
    })
  },
  goToEditPage: function(event) {
    console.log(event);

    const bigCate = event.currentTarget.dataset.bigcate;
    console.log(bigCate);
    wx.navigateTo({
      url: `/pages/editCate/bigSmall?bigCate=${bigCate}`
    });
  }
})
