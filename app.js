//app.js
const _ = require('./utils/underscore.js');
wx._ = _;

wx.setCookie = (key, value) => {
  wx.setStorageSync(key, value);
}

wx.getCookie = (key) => {
  return wx.getStorageSync(key);
}

App({
  onLaunch: function () {
    wx.setCookie('cathy', 123);
  },
  globalData: {
    userInfo: null
  }
})