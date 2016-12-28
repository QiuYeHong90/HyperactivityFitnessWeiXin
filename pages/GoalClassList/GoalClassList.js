// pages/GoalClassList/GoalClassList.js
var NetRq = require('../../utils/CircleNetRequest.js');
var util = require('../../utils/util.js');
var pageNo = 1;
var appInstance = getApp();
var userID;
Page({
  data: {

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    refresh(this)
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




/**
 * 刷新接口
 */
function refresh(that) {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 10000
  })

  setTimeout(function () {
    wx.hideToast()
  }, 2000)
  // var that = this;
  pageNo = 1;
  var paramRefresh = { phonetype: "2", versionno: "2.8.0", pagesize: "100", pageno: pageNo };
  NetRq.netRequest('GetGoalTypeList', paramRefresh, function (obj) {
    // 不能用this 直接调用data 

    console.log(obj.data);
    
    obj.data.forEach(function(item){
      item.Img = NetRq.kShareImgUrl(item.Img)
    })
    that.setData({
      dataGoalList: obj.data,

      success: obj.success,
      msg: obj.msg
    });


    // console.log(that.data.dataDynamicList.length);
    // // listImg
    // for (var a = 0; a < that.data.dataDynamicList.length; a++) {
    //   var model = that.data.dataDynamicList[a];
    //   if (model.listImg) {
    //     console.log(model.listImg.length);
    //     model.imgCount = model.listImg.length;
    //   } else {
    //     model.imgCount = 0;
    //   }


    // }
    // that.setData({
    //   dataDynamicList: that.data.dataDynamicList
    // });
    // console.log(that.data.dataDynamicList);
    wx.stopPullDownRefresh();

  })
}