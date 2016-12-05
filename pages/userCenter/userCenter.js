var netRq = require('../../utils/CircleNetRequest.js')
var appInstance = getApp()

Page({
  data: {
    headArr: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    appInstance.getUserInfo(function (infor) {
      console.log(infor)
    })
    wx.getUserInfo({
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


    var context = wx.createContext();

    var headArr = [
      {
        num: 0,
        name: "目标成功",
        unit: "项",
        ID: "numberOfSuccess"
      },
      {
        num: 0,
        name: "目标成功率",
        unit: "%",
        ID: "numberOfSuccess1"
      },
      {
        num: 0,
        name: "坚持天数",
        unit: "天",
        ID: "numberOfSuccess2"
      }


    ];

    var that = this;
    that.setData({
      headArr: headArr
    })




    // 网络请求 http://www.8848fit.com/microweb/HiFitService.asmx/GetExercise
    netRq.netRequest("GetExercise", { "phonetype": "2", "Type": "2", "versionno": "2.8.0", "uid": "5834" }, function (data) {

      that.setData({
        "headArr[0].num": data.data.CompletionNum,
        "headArr[1].num": data.data.CompletionRate,
        "headArr[2].num": data.data.PunchNum
      })

      // 在context上调用方法
      headArr.forEach(function (obj) {


        // 蓝色弧度
        if (obj.ID == "numberOfSuccess1") {
          context.clearActions()
          context.setStrokeStyle("#0eaaed")
          context.setLineWidth(2)
          context.arc(50, 50, 50 - 0.5, -Math.PI / 2, Math.PI * 2 * (0.5), false)
          context.stroke()

        } else {
          context.clearActions()
          context.setStrokeStyle("#dddddd")
          context.setLineWidth(2)
          context.arc(50, 50, 50 - 2, -Math.PI / 2, Math.PI * 2, false)
          context.stroke()
        }


        wx.drawCanvas({
          canvasId: obj.ID,
          actions: context.getActions()
        })




      })
    })
    // http://www.8848fit.com/microweb/HiFitService.asmx/GetMyGoalList 目标列表
    netRq.netRequest("GetMyGoalList", { "uid": "5834", "versionno": "2.8.0", "phonetype": "2" }, function (data) {
      // item.MyGoalValue/item.GoalValue
      data.data.forEach(function (item) {
        item.successRate = item.MyGoalValue / item.GoalValue * 100;
        item.successRate = item.successRate.toFixed(1);
      })
      that.setData({
        goalList: data.data
      })
    })
    // http://www.8848fit.com/microweb/HiFitService.asmx/GetMyCourseListNew

    netRq.netRequest("GetMyCourseListNew", { "uid": "5834" }, function (data) {

      that.setData({
        myCourseList: data.data
      })
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