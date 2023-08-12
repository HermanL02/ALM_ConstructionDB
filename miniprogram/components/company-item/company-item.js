Component({
  properties: {
      company: {
          type: Object,
          value: {
              id:"",
              logo: "",
              name: "",
              cityName: "",
              foundedYear: "",
              tagNames: [],
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
        const id = this.data.company.id;
        const name = this.data.company.name;
        wx.navigateTo({
          url: `/pages/company/detail?id=${id}&name=${name}`
        });
      }
  }
});
