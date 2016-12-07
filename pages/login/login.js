var netRq = require('../../utils/CircleNetRequest.js')


Page({
  data:{
    pageName:'',
    isShow:1
  },
  onLoad:function(options){
    wx.hideNavigationBarLoading(true)
    // 页面初始化 options为页面跳转所带来的参数
   var that = this
   that.setData({
     pageName:options.url
   })
   
    
  },
  onReady:function(){
    // 页面渲染完成
   
  },
  onShow:function(){
    console.log(this.data.pageName)
    var name = this.data.pageName
    var that = this
   // 获取是否登陆过
   

    wx.getStorage({
      key: 'userInfor',
      success: function(res){
        that.setData({
          isShow:0
        })
        wx.redirectTo({
           url: '../'+name+'/'+name
        })
      }
      
    })
  },
  onHide:function(){
    
  },
  onUnload:function(){
    // 页面关闭
 
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var param = {"pwd":e.detail.value.password,
    "deviceno":"3ed01affb4f644c7b4c73d24ce4c05c8",
    "useraccount":e.detail.value.count,
    "tel":e.detail.value.count,
    "accounttype":"1",
    "phonetype":"2",
    "RegistrationID":""}
    netRq.netPostRequest('Login',param,function(res){

        console.log(res)
        wx.redirectTo({
          url: '../userCenter/userCenter',
          success: function(res){
            // success
          },
          fail: function() {
            
          },
        
        })


    })

  }
})