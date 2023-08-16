// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env:"almjsk-9g11g4r8f64baa11",
        traceUser: true,
      });
    }

    this.globalData = {

    };
  }
});
