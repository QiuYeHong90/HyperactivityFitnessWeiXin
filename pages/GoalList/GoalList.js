// pages/GoalList/GoalList.js
var NetRq = require('../../utils/CircleNetRequest.js');
var util = require('../../utils/util.js');
var pageNo = 1;
var appInstance = getApp();
var userID
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      GoalTypeID:options.GoalTypeID
    })
    refresh(this)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
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
  var paramRefresh = { phonetype: "2", versionno: "2.8.0",GoalTypeID:that.data.GoalTypeID,uid:appInstance.globalData.GetUserInfo.uid };
  NetRq.netRequest('GetGoalList', paramRefresh, function (obj) {
    // 不能用this 直接调用data 
    
    // obj.data.forEach(function(item){
    //   item.Img = NetRq.kShareImgUrl(item.Img)
    // })
    that.setData({
      dataGoalList: obj.data,

      success: obj.success,
      msg: obj.msg
    });

    wx.stopPullDownRefresh();

  })
}