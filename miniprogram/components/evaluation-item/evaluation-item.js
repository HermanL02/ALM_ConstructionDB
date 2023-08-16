// components/evaluation-item/evaluation-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    evaluation: {
      type: Object,
      value: {
        _openid: '',  // 用户的OPENID
        alelmengCertified: '',
        date: '',  // 评价日期
        rating: '',
        comment: '',
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 你可以定义一些组件的初始数据，如果需要的话
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onEvaluation(event) {
      // 获取传递的数据
      // TODO: 执行你需要的操作
      // 如果需要，可以触发一个自定义事件，让使用该组件的页面知道
      this.triggerEvent('evaluationTap', { uid, eid });
    },
    
    onPreviewImg(event) {
      const index = event.currentTarget.dataset.index;
      const images = this.data.evaluation.images;
      wx.previewImage({
        current: images[index],
        urls: images
      });
    },
    
    onCommentTap(event) {
      const id = event.currentTarget.dataset.id;

      // TODO: 执行你需要的操作

      // 如果需要，可以触发一个自定义事件
      this.triggerEvent('commentTap', { id });
    },

    onMoreComments() {
      // TODO: 加载更多评论

      // 如果需要，可以触发一个自定义事件
      this.triggerEvent('moreComments');
    }
  }
});
