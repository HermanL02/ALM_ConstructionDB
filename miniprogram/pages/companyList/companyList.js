// pages/companyList/companyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    selectedCategory: "默认类别",
    categoryChanged:false,
    sortingMethods: ['公司名称升序排序',"创立时间升序排序"],
    selectedSortingMethod: '默认排序',
    totalCompanies: [],
    pageIndex: 0,
    loading: false,
    
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

    let smallCategories = this.data.categories;
    if (this.data.selectedCategory != "默认类别"){
      smallCategories = [this.data.selectedCategory];
    }
    let sortingMethod = this.data.selectedSortingMethod;
    const pageIndex = this.data.pageIndex;

    try{
      this.setData({ loading: true });
      // 使用小分类列表查询对应的公司
      const companiesResponse = await wx.cloud.callFunction({
        name: 'categories2companies',
        data: {
          categories: smallCategories,
          pageIndex:pageIndex,
          sortingMethod:sortingMethod,
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
},

  onCategoryPickerChange: async function (e) {
    await this.setData({
      selectedCategory: this.data.categories[e.detail.value],
      pageIndex:0,
      totalCompanies:[]
    });
    this.searchCompanies();
  },

  

  onSortingPickerChange: async function (e) {
    await this.setData({
      selectedSortingMethod: this.data.sortingMethods[e.detail.value],
      pageIndex:0,
      totalCompanies:[]
    });
    this.searchCompanies();
  },

  // ... 其他代码不变
})
