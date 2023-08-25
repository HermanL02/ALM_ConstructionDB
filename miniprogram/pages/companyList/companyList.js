// pages/companyList/companyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    selectedCategory: "选择类别",
    sortingMethods: ['按成立时间排序', '按合作项目数量排序'],
    selectedSortingMethod: '排序（正在实现中）',
    totalCompanies: [],
    displayedCompanies: [],
    pageIndex: 0,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const companyType = options.companyType;

    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: companyType,
    })

    // 从bigCates2smallCates云函数获取小分类列表
    try {
      const smallCatesResponse = await wx.cloud.callFunction({
        name: 'bigCates2smallCates',
        data: {
          majorCategory: companyType
        }
      })
      console.log(smallCatesResponse);
      const smallCategories = smallCatesResponse.result.minorCategories;
      console.log(smallCategories);
      this.setData({
        categories: smallCategories
      });
      await this.searchCompanies();
      this.setData({
        displayedCompanies: this.data.totalCompanies,      
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
  searchCompanies: async function(){
    const smallCategories = this.data.categories;
    const pageIndex = this.data.pageIndex;
    console.log(smallCategories)
    try{
      this.setData({ loading: true });
      // 使用小分类列表查询对应的公司
      const companiesResponse = await wx.cloud.callFunction({
        name: 'categories2companies',
        data: {
          categories: smallCategories,
          pageIndex:pageIndex
        }
      });
      console.log(companiesResponse);
      const totalCompanies = companiesResponse.result.companies;

      this.setData({
        totalCompanies: this.data.totalCompanies.concat(totalCompanies),      
        pageIndex: this.data.pageIndex + 1,
        loading: false,
      });
     
    }catch (error) {
      this.setData({ loading: false });
      console.error('Error fetching data:', error);
      wx.showToast({
        title: '数据加载失败',
        icon: 'error',
        duration: 2000
      });
    }
  },
  // ... 其他代码不变
  onReachBottom: function() {
    // 当页面被拉到底部时调用
    this.searchCompanies();
    // 判断是否是默认值
    if (this.data.selectedCategory !== "选择类别") {
      this.filterCompany(this.data.selectedCategory);
    }
    
},

  onCategoryPickerChange: function (e) {
    this.setData({
      selectedCategory: this.data.categories[e.detail.value]
    });
    const selectedCategory =  this.data.categories[e.detail.value]
    this.filterCompany(selectedCategory);
  },

  filterCompany:function(selectedCategory){
    const filteredCompanies = this.data.totalCompanies.filter((company) => {
      return company.companyTypes.includes(selectedCategory);
    });
    
  // 更新totalCompanies数组
  this.setData({
    displayedCompanies: filteredCompanies
  });
  },

  onSortingPickerChange: function (e) {
    this.setData({
      selectedSortingMethod: this.data.sortingMethods[e.detail.value]
    });
  },

  // ... 其他代码不变
})
