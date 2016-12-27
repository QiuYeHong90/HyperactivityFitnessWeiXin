

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow: function () {
    console.log('我显示出来了');
  },
  onHide: function () {
    console.log('我被隐藏了');
  },


  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    imgArray: [],
    GetUid: GetUid()
  }





});
// 获取uid
function GetUid(callBack) {
    wx.getStorage({
        key: 'userInfor',
        success: function (res) {
            callBack(res.data.data.uid)
        }
    })
}