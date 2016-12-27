var data

var netRQ = require("../../../utils/CircleNetRequest.js")


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
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
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
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function(res){
            // success
             wx.redirectTo({
              url: '../../login/login',

            })
          }
        })

        // wx.switchTab({
        //   url: '/pages/first/first',
        //   success: function (res) {
        //     // success
        //     wx.redirectTo({
        //       url: '../../login/login',

        //     })

        //   }
        // })
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
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        // IRKBZ-UAERG-TW4QM-IWOBS-6YZUS-I7F45

        wx.request({
          url: 'http://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location: res.latitude + ',' + res.longitude,
            key: 'IRKBZ-UAERG-TW4QM-IWOBS-6YZUS-I7F45'

          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res1) {
            // success
            console.log(res1.data.result.address)
            that.setData({
              address: res1.data.result.address
            })
          }
        })
      }
    })




  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  dakawz:function(){
  var date  = new Date();
  var ts = date.getTime()
  console.log(ts)
  // key 169c5a52e8f314ae7b617a6bb925c2d6
  // custom 26260A1F00020002
  // scode 19884d09d5e7f1f0f672bce420766f69
  dakaPost(ts)
  }
})

function dakaPost(ts){
  wx.request({
    url: 'http://restapi.amap.com/v3/geocode/regeo',
    data: {
      key:"169c5a52e8f314ae7b617a6bb925c2d6",
      custom:"26260A1F00020002",
      scode:"548ad9f474aefc31cc41d50041d8edb6",
      ts:"1482805394118"
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      // success
      console.log(res)
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}
