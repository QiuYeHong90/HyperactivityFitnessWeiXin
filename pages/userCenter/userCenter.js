var netRq = require('../../utils/CircleNetRequest.js')
var appInstance = getApp()

Page({
  data: {
    headArr: [],
    // 日
    dayArray: [],
    // 月
    monthArray: [],
    // 周
    weakArray: [],
    // 年
    yearArray: [],


    dataArray: [{
      text: "目标",
      color: "chartreuse"
    },
    {
      text: "训练",
      color: "#0eaaed"
    }],
    animationData: [],
    imgUrl: "../../images/circle_addDetail@3x.png",
    isOpen: false

  },
  onLoad: function (options) {

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
      },
      // numberOfSuccess4
      {
        num: 0,
        name: "坚持天数",
        unit: "天",
        ID: "numberOfSuccess4"
      }

    ];

    var that = this;
    that.setData({
      headArr: headArr
    })
    // 获取是否登陆过
    wx.getStorage({
      key: 'userInfor',
      success: function (res) {
        pageNetReq(res.data.data.uid, that, context)
      },
      fail: function () {
        wx.redirectTo({
          url: '../login/login?url=userCenter'
        })


      },
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

  },
  publishDy: function (res) {



    this.setData(
      {
        isOpen: this.data.isOpen == true ? false : true
      }
    )
    var index = parseInt(res.currentTarget.dataset.idex);

    animation(this, this.data.isOpen, index);


    if (index == 0) {

    } else if (index == 1) {
      wx.navigateTo({
        url: '../GoalClassList/GoalClassList'
      })
    } else if (index == 2) {
      //  TrainList
      wx.navigateTo({
        url: '../TrainList/TrainList'
      })
    } else if (index == 3) {

    }




  }




})



// 网络请求

function pageNetReq(uid, that, context) {

  // 网络请求 http://www.8848fit.com/microweb/HiFitService.asmx/GetExercise
  netRq.netRequest("GetExercise", { "phonetype": "2", "Type": "2", "versionno": "2.8.0", "uid": uid }, function (data) {

    that.setData({
      "headArr[0].num": data.data.CompletionNum,
      "headArr[1].num": data.data.CompletionRate,
      "headArr[2].num": data.data.PunchNum
    })

    // 在context上调用方法
    that.data.headArr.forEach(function (obj) {

      var num = parseFloat(obj.num / 100)
      // 蓝色弧度
      if (obj.ID == "numberOfSuccess1") {
        context.clearActions()
        context.setStrokeStyle("#0eaaed")
        context.setLineWidth(2)
        context.arc(50, 50, 50 - 2, -Math.PI / 2, Math.PI * 2 * num, false)
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

  var dayArray = []
  var monthArray = []
  var weakArray = []
  var yearArray = []
  // http://www.8848fit.com/microweb/HiFitService.asmx/GetMyGoalList 目标列表
  netRq.netRequest("GetMyGoalList", { "uid": uid, "versionno": "2.8.0", "phonetype": "2" }, function (data) {
    // item.MyGoalValue/item.GoalValue
    data.data.forEach(function (item) {
      item.successRate = item.MyGoalValue / item.GoalValue * 100;
      item.successRate = item.successRate.toFixed(1);
      if (item.Cycle == 0) {
        dayArray = dayArray.concat(item)
      } else if (item.Cycle == 1) {
        monthArray = monthArray.concat(item)
      } else if (item.Cycle == 2) {
        weakArray = weakArray.concat(item)
      } else {
        yearArray = yearArray.concat(item)
      }
    })
    that.setData({
      goalList: data.data,
      dayArray: dayArray,
      monthArray: monthArray,
      weakArray: weakArray,
      yearArray: yearArray == null ? [] : yearArray
    })
  })


  // http://www.8848fit.com/microweb/HiFitService.asmx/GetMyCourseListNew

  netRq.netRequest("GetMyCourseListNew", { "uid": uid }, function (data) {

    that.setData({
      myCourseList: data.data
    })
  })

}





// 动画的方法
function animation(that, isOpen, index) {
  var animation1 = wx.createAnimation({
    duration: 100,
    timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
    delay: 0,
    transformOrigin: '50% 50% 0',
    success: function (res) {
      // function code
    }
  })
  var animation2 = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-in-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
    delay: 0,
    transformOrigin: '50% 50% 0',
    success: function (res) {
      // function code
    }
  })


  if (isOpen == true) {

    animation1.translate(-45, -55).step()


    animation2.translate(-70, -10).step()




  } else {
    animation1.translate(0, 0).step()


    animation2.translate(0, 0).step()



  }
  var listArr = [animation1.export(), animation2.export(),]

  that.setData({
    animationData: listArr
  })
}