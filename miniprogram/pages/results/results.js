Page({
  data: {
    keyword: '',
    companies: []
  },

  onLoad: function(options) {
    this.setData({
      keyword: options.keyword
    });

    // 立即执行搜索
    this.searchCompanies();
  },

  searchCompanies: async function() {
    try {
      // 假设你有一个调用云函数的工具或方法，这里简单模拟一下
      const result = await wx.cloud.callFunction({
        name: 'serachCompanies',
        data: {
          keyword: this.data.keyword
        }
      });

      if (result) {
        console.log("ss");
        this.setData({
          companies: result.result.data
        });
     
      }
    } catch (error) {
      wx.showToast({
        title: '搜索失败，请重试',
        icon: 'none'
      });
    }
  }
});
