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
