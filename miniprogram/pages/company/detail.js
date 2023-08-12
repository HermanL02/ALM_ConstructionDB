// pages/company/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   info:{
     detail: "【金罗盘建筑设计院】18年建筑工程设计经验,甲级资质,专业的市政建筑设计,景观观设计,房屋改造加固设计,工业厂区规划设计,效果图设计,室内装修设计,酒店设计公司。"
   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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

  },
  onScore: function() {
    wx.navigateTo({
      url: "/pages/evaluation/create?id=" + this.data.id + "&name=" + this.data.info.name
    });
  },
})