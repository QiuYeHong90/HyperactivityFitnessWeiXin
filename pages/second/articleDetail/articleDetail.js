
var netRq = require('../../../utils/CircleNetRequest.js')
var formatTime1 = require('../../../utils/util.js')
Page({
  data: {

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    var obj = options;
    var that = this

    that.setData({
      Title: obj.Title,
      topic_url: obj.SourceUrl,
      topic_source_id: obj.ArticleID,
    })

    wx.request({
      url: 'http://changyan.sohu.com/api/2/topic/load',
      data: {
        depth: 1,
        sub_size: 5,

        topic_title: obj.Title,
        hot_size: 0,

        topic_url: obj.SourceUrl,

        topic_source_id: obj.ArticleID,
        client_id: "cysnUgiUv",
        page_size: 10




      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        
        res.data.comments.forEach(function (obj) {
// var myDate=new Date()
          


          var date =new Date(obj.create_time)

          formatTime1.formatTime(date);
          var year = date.getFullYear()
          var month = date.getMonth()
          var day = date.getDate()

          var hour = date.getHours()
          var minute = date.getMinutes()
          var second = date.getSeconds()
          
          obj.create_time= formatTime1.formatTime(date)

          console.log(formatTime1.formatTime(date))

        })


        that.setData({
          Adata: res.data
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }

  
})