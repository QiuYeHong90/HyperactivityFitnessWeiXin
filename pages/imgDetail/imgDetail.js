var appInstance = getApp();

Page({
  data:{
      title:null,
      imgArray:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
        title:options.index,
        imgArray:appInstance.globalData.imgArray
    });
    console.log(that.data)
  },
  onReady:function(){
    // 页面渲染完成
   wx.setNavigationBarTitle({
     title: "图片",
     success: function(res) {
       // success
     }
   })
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