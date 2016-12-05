var netRq = require('../../../utils/CircleNetRequest.js')
var imgIndex = 0
var timer
Page({
  data: {

    VocieImgUrl: "",
    voiceIndex:-1,
    title: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.ArticleMenuID)
    var that = this
    that.setData({
      title: options.MenuName
    })
    wx.setNavigationBarTitle({
      title: that.data.title,
      success: function (res) {
        // success

      }
    })
    // http://www.8848fit.com/microweb/HiFitService.asmx/GetArticleList
    var that = this;
    netRq.netRequest("GetArticleList", { ArticleTagID: "", uid: "5834", pageno: "1", pagesize: "100", ArticleMenuID: options.ArticleMenuID }, function (data) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].ListPic = netRq.imgURL('article/' + data.data[i].ListPic)
        data.data[i].imgVoice = '../../../images/news/news_voicenormal.imageset/news_voicenormal@2x.png'
      }
      that.setData({
        obj: data
      })
    })


  },
  onReady: function () {
    // 页面渲染完成
    this.audioCtx = wx.createAudioContext('myAudio')
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
  videoTap: function (res) {

    var index = res.currentTarget.dataset.index;
    var obj = this.data.obj.data[index];



    wx.navigateTo({
      url: '../articleDetail/articleDetail?Title=' + obj.Title + '&SourceUrl=' + obj.SourceUrl + '&ArticleID=' + obj.ArticleID,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },

  // 播放音乐 

  playVoice: function (res) {
   
    var that = this
    var index = res.currentTarget.dataset.index
    console.log(res.currentTarget.dataset.index);
    wx.playBackgroundAudio({
      dataUrl: res.currentTarget.dataset.voice,
      success: function (res) {
        // success
        var imgArray = [
          "../../../images/news/news_voiceimage0.imageset/news_voiceimage0@2x.png",
          "../../../images/news/news_voiceimage1.imageset/news_voiceimage1@2x.png",
          "../../../images/news/news_voiceimage2.imageset/news_voiceimage2@2x.png"
        ]
        var normal = '../../../images/news/news_voicenormal.imageset/news_voicenormal@2x.png'

       clearInterval
        timer = null
        timer = setInterval(function () {
          
          that.setData({
            voiceIndex:index,
            VocieImgUrl: imgArray[imgIndex%3]
            
          })
          imgIndex++;
        }, 300)



      },






      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },


  
  webViewTap:function (res){
      wx.openDocument({
        filePath: res.currentTarget.dataset.url,
        success: function(res){
          // success
        }
       
      })
      // wx.navigateTo({
      //   url:res.currentTarget.dataset.url,
      //   success: function(res){
      //     // success
      //   }
        
      // })
  }

})