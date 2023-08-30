// evaluation/create.js
Page({
  data: {
      alelmengCertified: false ,// 默认不显示爱乐盟认证
      rating: 0,
      comment: ''
  },
  onCheckboxChange: function(e) {
    
    this.setData({
        alelmengCertified: e.detail.value && e.detail.value.length > 0  // 检查数组是否有内容
    });
    console.log(this.data.alelmengCertified);
},
onLoad: function(options) {
  this.setData({
      _id: options.id,  // 从跳转参数中获取id
  });
},

  setStarRating: function(e) {
      this.setData({
          rating: e.currentTarget.dataset.rating
      });
      console.log(this.data.rating);
  },

  onCommentChange: function(e) {
      this.setData({
          comment: e.detail.value
      });
  },

  submitEvaluation: function() {
    const { rating, comment, alelmengCertified, _id } = this.data;
    if (rating === 0) {
      wx.showToast({
        title: '请先给出评分',
        icon: 'none'
      });
      return; // 结束函数执行
    }
    // 调用云函数来添加评价
    wx.cloud.callFunction({
        name: 'addEvaluation',
        data: {
            _id: _id,
            alelmengCertified: alelmengCertified,
            rating: rating,
            comment: comment
        },
        success: res => {
            if (res.result && res.result.success) {
                wx.showToast({
                    title: '评价成功',
                    icon: 'success',
                    complete: function() {
                      // 成功后返回上一页
                      wx.navigateTo({
                        url: `/pages/company/detail?id=${_id}`
                      });
                  }
                });
            } else {
                wx.showToast({
                    title: '评价失败',
                    icon: 'none'
                });
            }
        },
        fail: err => {
            wx.showToast({
                title: '评价失败',
                icon: 'none'
            });
            console.error("云函数调用失败", err);
        }
    });
}


});
