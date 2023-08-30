Page({
  data: {
  },

  uploadCSV: function() {
      const that = this;

      // 选择文件
      wx.chooseMessageFile({
          count: 1,
          type: 'file',
          success(res) {
              const tempFilePaths = res.tempFiles;
              if (tempFilePaths[0].name.endsWith('.xlsx')) {
                  wx.cloud.uploadFile({
                      cloudPath: 'csvFiles/' + Date.now() + '.xlsx',
                      filePath: tempFilePaths[0].path,
                      success: res => {
                          console.log('上传成功', res)
                          wx.cloud.callFunction({
                            name: 'deleteCompanies',  // 更改为你更新后的云函数的名称
                            data: {
                                fileID: res.fileID
                            },
                            success: res => {
                                console.log('删除成功', res.result);
                    
                                // 展示弹窗
                                const deletedCompaniesText = res.result.deletedCompanies.join(", ");
                                const notFoundCompaniesText = res.result.notFoundCompanies.join(", ");
                                
                                wx.showModal({
                                    title: '删除结果',
                                    content: `成功删除的公司：${deletedCompaniesText}\n未找到的公司：${notFoundCompaniesText}`,
                                    showCancel: false
                                });
                            },
                            fail: error => {
                                console.error('删除失败', error);
                                wx.showToast({
                                    title: '删除失败，请重试。',
                                    icon: 'none',
                                    duration: 2000
                                });
                            }
                        });
                    },

             
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
