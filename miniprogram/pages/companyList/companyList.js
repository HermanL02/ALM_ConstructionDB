// pages/companyList/companyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: ['设计', '监理', '可研', '造价', '项目管理', '测绘'],
    selectedCategory: "类别",
    sortingMethods: ['按成立时间排序', '按合作项目数量排序'],
    selectedSortingMethod: '排序方式',
    companies: [
      {
        logo: "...",
        name: "沈阳市金罗盘建筑设计有限公司",
        cityName: "沈阳市",
        foundedYear: "2007",
        tagNames: ["设计","监理","测绘"],
      },
      // ... 其他公司
    ]
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const companyType = options.companyType;
    // 根据 companyType 获取和显示公司列表
    wx.setNavigationBarTitle({
      title: companyType,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  onCategoryPickerChange: function(e) {
    this.setData({
        selectedCategory: this.data.categories[e.detail.value]
    });
},

onSortingPickerChange: function(e) {
    this.setData({
        selectedSortingMethod: this.data.sortingMethods[e.detail.value]
    });
},

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})