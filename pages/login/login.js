var netRq = require('../../utils/CircleNetRequest.js')
var pageName
var MD5 = require("../../libs/js/md5.min.js")
Page({
  data: {
    pageName: '',
    isShow: 1
  },
  onLoad: function (options) {
    console.log(MD5("safdsafsda"))

    wx.hideNavigationBarLoading(true)
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.setData({
      pageName: options.url
    })
    pageName = options.url

  },
  onReady: function () {
    // 页面渲染完成
    console.log('渲染了么')
  },
  onShow: function () {
    console.log(this.data.pageName)
    var name = this.data.pageName
    var that = this
    // 获取是否登陆过

    wx.getStorage({
      key: 'userInfor',
      success: function (res) {
        that.setData({
          isShow: 0
        })
        wx.redirectTo({
          url: '../' + name + '/' + name
        })
      }

    })
  },
  onHide: function () {

  },
  onUnload: function () {
    // 页面关闭

  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var param = {
      "pwd": e.detail.value.password,
      "deviceno": "3ed01affb4f644c7b4c73d24ce4c05c8",
      "useraccount": e.detail.value.count,
      "tel": e.detail.value.count,
      "accounttype": "1",
      "phonetype": "2",
      "RegistrationID": ""
    }
    netRq.netPostRequest('Login', param, function (res) {
      // var name = this.data.pageName
      console.log(res, '../' + pageName + '/' + pageName)
      wx.showToast({
        title: '登陆中',
        icon: 'loading',
        duration: 10000
      })


      if (res.success == true) {
        var app = getApp()
        app.globalData.GetUserInfo= res
        wx.setStorage({
          key: 'userInfor',
          data: res,
          success: function (obj) {
            // success

            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000,
              mask: true
            })
            setTimeout(function () {
              wx.hideToast()
              wx.switchTab({
                url: '/pages/userCenter/userCenter'

              })
            }, 2000)
          }
        })



      } else {
        wx.hideToast()
        wx.showModal({
          title: res.msg,
          showCancel:false,
          content: "",
          success: function (res) {
            
          }
        })
      }






    })

  },

  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/pages/login/login'
    }
  },
  weixindl: function (res) {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  }

})