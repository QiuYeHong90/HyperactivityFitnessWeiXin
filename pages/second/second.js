var netRq = require('../../utils/CircleNetRequest.js')




Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // http://www.8848fit.com/microweb/HiFitService.asmx/GetArticleMenuList
    var that = this;
    netRq.netRequest("GetArticleMenuList",{uid:"5834"},function(data){
      for(var i =0;i<data.data.length;i++){
          data.data[i].Img= netRq.imgURL(data.data[i].Img)
      }
      that.setData({
          obj:data
      })
    })
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

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  // 录音 更新了
  // record:function(){
  //   wx.navigateTo({
  //     url: '../record/record',
  //     success: function(res){
  //       // success
  //     }
  //   })
  // }


})