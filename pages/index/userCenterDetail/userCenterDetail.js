

Page({
  data:{

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    taht.setData({
        indexID:options.index
    })
  },
  onReady:function(){

  },
  onShow:function(){
    // 页面显示

  },
  onHide:function(){
    // 页面隐藏

  },
  onUnload:function(){

  },
  overcount:function(){
      wx.removeStorage({
        key: 'userInfor',
        success: function(res){
          // success
          
        }
      })
  }
})