// pages/editSmallCate/editSmallCate.js
Page({
  data: {
    bigCate: '',
    smallCate: []
  },
  onLoad: async function(options) {
    const bigCate = options.bigCate;
    this.setData({
      bigCate: options.bigCate
    });
    try {
      console.log("dd");
      const smallCatesResponse = await wx.cloud.callFunction({
        name: 'bigCates2smallCates',
        data: {
          majorCategory: bigCate
        }
      })
      console.log(smallCatesResponse);
      const smallCategories = smallCatesResponse.result.minorCategories;
      console.log(smallCategories);
      this.setData({
        smallCate: smallCategories
      });

    } catch (error) {
      console.error('Error fetching data:', error);
      wx.showToast({
        title: '数据加载失败',
        icon: 'error',
        duration: 2000
      });
    }
  },
  addSmallCate: function() {
    this.data.smallCate.push('');  // 添加一个空字符串作为新的 smallCate
    this.setData({
      smallCate: this.data.smallCate
    });
  },
  removeSmallCate: function(e) {
    const index = e.currentTarget.dataset.index;
    this.data.smallCate.splice(index, 1);
    this.setData({
      smallCate: this.data.smallCate
    });
  },
  updateSmallCateInput: function(e) {
    const index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.data.smallCate[index] = value;
    this.setData({
      smallCate: this.data.smallCate
    });
  },
  submit: function() {
    wx.cloud.callFunction({
      name: 'updateSmallCate', // 替换为你的云函数的名字
      data: {
        bigCate: this.data.bigCate,
        newSmallCate: this.data.smallCate
      },
      success: res => {
        console.log('更新成功：', res)
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: err => {
        console.log('更新失败：', err)
        wx.showToast({
          title: '更新失败',
          icon: 'error',
          duration: 2000
        });
      }
    })
  }
  
})
