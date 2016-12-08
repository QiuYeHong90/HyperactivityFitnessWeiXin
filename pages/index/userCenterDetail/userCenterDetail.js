var data

Page({
  data: {

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      indexID: options.index
    })
    data = that.data

  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {

  },
  overcount: function () {
    wx.removeStorage({
      key: 'userInfor',
      success: function (res) {
        // success

      }
    })
  },
  // 获取位置信息
  tap_001: function () {
    var that = this;
    //  wx.chooseLocation({
    //             success: function(res){
    //               // success
    //               console.log(res)
    //             },
    //             fail: function() {
    //               // fail
    //             },
    //             complete: function() {
    //               // complete
    //             }
    //           })

    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        // success
        // IRKBZ-UAERG-TW4QM-IWOBS-6YZUS-I7F45

        wx.request({
          url: 'http://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location:res.latitude+','+res.longitude,
            key:'IRKBZ-UAERG-TW4QM-IWOBS-6YZUS-I7F45'

          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res1){
            // success
            console.log(res1.data.result.address)
            that.setData({
              address:res1.data.result.address
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
    })




  }
})