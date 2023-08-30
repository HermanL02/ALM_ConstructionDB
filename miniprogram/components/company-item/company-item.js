Component({
  properties: {
      company: {
          type: Object,
          value: {
              _id:"",
              logo: "",
              companyName: "",
              companyCity: "",
              foundYear: "",
              companyTypes: [],
              evaluations:[],
          }
      },
      mainProduct: {
          type: String,
          value: ""
      },
      score: {
          type: String,
          value: ""
      }
  },
  observers: {
    'company.evaluations': function(evaluations) {
      if (Array.isArray(evaluations)) {
        const total = evaluations.reduce((sum, evaluation) => sum + Number(evaluation.rating), 0);
        console.log(total);
        const score = total / evaluations.length;
        this.setData({
          score: score.toFixed(2) // 保留两位小数
        });
      }
    }
  },
  data: {
      // 你可以在这里放置组件的内部数据
  },

  methods: {
      onCompanyInfo: function(e) {
        const _id = this.data.company._id;
        const name = this.data.company.companyName;
        wx.navigateTo({
          url: `/pages/company/detail?id=${_id}&name=${name}`
        });
      }
  }
});
