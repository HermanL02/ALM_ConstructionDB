// pages/company/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company:{

    },
   totalEvaluation:0,
   evaluationData: {
    anonymous: false,
    createAvatar: "https://path-to-avatar.jpg",
    createName: "John Doe",
    content: "这是一条评价内容。",
},
evaluationCreatedTime: "2023-08-07 15:00",
evaluationTotalCommentCount: 5

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options 中包含了传递给该页面的参数
    this.setData({
      _id: options.id,  // 获取_id
      name: options.name,  // 获取name
    });
  },

  onReady: async function() {
    // 当页面准备完毕后，你可以使用 this.data._id 和 this.data.name
    await this.fetchCompanyDetails();
  },

  fetchCompanyDetails: async function() {
    const that = this;
    await wx.cloud.callFunction({
      name: 'getCompanyDetail',
      data: {
        _id: that.data._id
      },
      success: function(res) {
        if (res.result.code === 0) {
          const companyDetail = res.result.data;
          that.setData({
            company:companyDetail,
          });
          that.setData({
            totalEvaluation: that.data.company.evaluations.length,
          })
          // 使用 companyDetail 数据进行操作
          // 可能还需要使用 setData 更新其他页面数据
        } else {
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          });
        }
      },
      fail: function(err) {
        wx.showToast({
          title: '云函数调用失败',
          icon: 'none'
        });
      }
    });
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
      url: "/pages/evaluation/create?id=" + this.data.company._id + "&name=" +  this.data.company.name
    });
  },
  makePhoneCall: function() {
    let that = this;
    let contactStr = String(that.data.company.contact); // 确保它是一个字符串

    wx.makePhoneCall({
        phoneNumber: contactStr  // 这里替换为你要拨打的公司电话号码
    })
}

})