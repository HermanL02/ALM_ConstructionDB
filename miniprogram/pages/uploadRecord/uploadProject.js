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
                              name: 'parseProject',  // 替换为您云函数的名称
                              data: {
                                  fileID: res.fileID
                              },
                              success: res => {
                                  console.log('解析成功', res.result);

                                  // 展示弹窗
                                  const addedProjectsText = res.result.addedProjects.map(p => p['projectName']).join(", ");
                                  const unsuccessfulProjectsText = res.result.unsuccessfulProjects.map(p => p['projectName']).join(", ");
                                  
                                  wx.showModal({
                                      title: '上传结果',
                                      content: `成功添加的项目：${addedProjectsText}\n未成功的项目：${unsuccessfulProjectsText}`,
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
