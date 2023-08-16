// 假设你的页面代码结构如下：

Page({
  data: {
      addedCompanies: [],
      duplicateCompanies: []
  },

  uploadCSV: function() {
      const self = this; // 使用self代替that，更符合一些开发者的习惯

      // 选择文件
      wx.chooseMessageFile({
          count: 1,
          type: 'file',
          success(res) {
              const tempFilePaths = res.tempFiles;
              if (tempFilePaths[0].name.endsWith('.xlsx')) { 
                  wx.cloud.uploadFile({
                      cloudPath: 'csvFiles/' + Date.now() + '.xlsx', // 文件名
                      filePath: tempFilePaths[0].path,
                      success: res => {
                          console.log('上传成功', res)

                          wx.cloud.callFunction({
                              name: 'parseCSV',
                              data: {
                                  fileID: res.fileID
                              },
                              success: res => {
                                  console.log('解析成功', res.result);

                                  // 更新数据到页面
                                  self.setData({
                                      addedCompanies: res.result.addedCompanies,
                                      duplicateCompanies: res.result.duplicateCompanies
                                  });

                                  // 将数据构造成字符串格式，方便展示
                                  const addedCompaniesStr = self.data.addedCompanies.join('\n');
                                  const duplicateCompaniesStr = self.data.duplicateCompanies.join('\n');

                                  // 显示模态对话框
                                  wx.showModal({
                                      title: '上传结果',
                                      content: `成功上传的公司：\n${addedCompaniesStr}\n\n重复的公司：\n${duplicateCompaniesStr}`,
                                      showCancel: false
                                  });

                              },
                              fail: error => {
                                  console.error('解析失败', error);
                                  wx.showToast({
                                      title: '解析失败，请重试。',
                                      icon: 'none',
                                      duration: 2000
                                  });
                              }
                          });
                      },
                      fail: error => {
                          console.error('上传失败', error);
                          wx.showToast({
                              title: '上传失败，请重试。',
                              icon: 'none',
                              duration: 2000
                          });
                      }
                  });
              } else {
                  wx.showToast({
                      title: '请选择CSV文件',
                      icon: 'none',
                      duration: 2000
                  });
              }
          },
          fail: error => {
              console.error('文件选择失败', error);
          }
      });
  }
});
