var netRq = require('../../../utils/CircleNetRequest.js');
var imgIndex = 0;
var timer;
var pageNo =  1;
var indexAgo = -1;


Page({
  data: {
    obj:{},
    VocieImgUrl: "",
    voiceIndex:-1,
    title: "",
    ArticleMenuID:""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.ArticleMenuID)

    var that = this
    that.setData({
      title: options.MenuName,
       ArticleMenuID:options.ArticleMenuID
    })
    
    // http://www.8848fit.com/microweb/HiFitService.asmx/GetArticleList
    var that = this;
    netRq.GetUid(function(uid){
        netRq.netRequest("GetArticleList", { ArticleTagID: "", uid: uid, pageno: "1", pagesize: "20", ArticleMenuID: options.ArticleMenuID }, function (data) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].ListPic = netRq.imgURL('article/' + data.data[i].ListPic)
        data.data[i].imgVoice = '../../../images/news/news_voicenormal.imageset/news_voicenormal@2x.png'
        data.data[i].ListPic = data.data[i].ListPic.split(";")[0]
         if(data.data[i].ImgList){
          data.data[i].ImgList = JSON.parse(data.data[i].ImgList)
        }
        
      }
      that.setData({
        obj: data
      })
    })
    })
  


  },
  onReady: function () {
    // 页面渲染完成
    this.audioCtx = wx.createAudioContext('myAudio')
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  onShow: function () {
    // 页面显示

    
  },
  onHide: function () {
    // 页面隐藏
     clearInterval(timer)
     timer = null
     wx.stopBackgroundAudio({
       success: function(res){
         // success
       },
       fail: function() {
         // fail
       },
       complete: function() {
         // complete
       }
     })

  },
  onUnload: function () {
    // 页面关闭
    clearInterval(timer)
     timer = null
     wx.stopBackgroundAudio({
       success: function(res){
         // success
       }
     })

  },
  videoTap: function (res) {

    var index = res.currentTarget.dataset.index;
    var obj = this.data.obj.data[index];
    wx.navigateTo({
      url: '../articleDetail/articleDetail?Title=' + obj.Title + '&SourceUrl=' + obj.SourceUrl + '&ArticleID=' + obj.ArticleID,
      success: function (res) {
        // success
      }
    })

  },

  // 播放音乐 

  playVoice: function (res) {
   
    var that = this
    var index = res.currentTarget.dataset.index
    console.log(res.currentTarget.dataset.index);

    if(indexAgo==index){
      wx.getBackgroundAudioPlayerState({
        success: function(res){
          // success
          var status = res.status
        var dataUrl = res.dataUrl
        var currentPosition = res.currentPosition
        var duration = res.duration
        var downloadPercent = res.downloadPercent
        if(status==1){
        clearInterval(timer)
        timer = null
        wx.stopBackgroundAudio({
       success: function(res){
         // success
       },
       fail: function() {
         // fail
       },
       complete: function() {
         // complete
       }
     })

     return
        }
        }
      })
      
      
    }
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

       clearInterval(timer)
        timer = null


        timer = setInterval(function () {
          
          that.setData({
            voiceIndex:index,
            VocieImgUrl: imgArray[imgIndex%3]
            
          })
          imgIndex++;
        }, 300)

        // 监听播放停止

        wx.onBackgroundAudioStop(function() {
          clearInterval(timer)
          that.setData({
            voiceIndex:index,
            VocieImgUrl: normal
            
          })
        })

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
  },

    // 刷新
  onPullDownRefresh: function () {
    var that = this;
    pageNo = 1;
    netRq.netRequest("GetArticleList", { ArticleTagID: "", uid: "5834", pageno: pageNo, pagesize: "20", ArticleMenuID: this.data.ArticleMenuID }, function (data) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].ListPic = netRq.imgURL('article/' + data.data[i].ListPic)
        data.data[i].imgVoice = '../../../images/news/news_voicenormal.imageset/news_voicenormal@2x.png'
        data.data[i].ListPic = data.data[i].ListPic.split(";")[0]
       if(data.data[i].ImgList){
          data.data[i].ImgList = JSON.parse(data.data[i].ImgList)
        }
      }
      that.setData({
        obj: data
      })
    })
  },

  // 加载更多
  
    
     
  onReachBottom: function (event) {
  
    var that = this
    netRq.GetUid(function(uid){
       var paramMore = { ArticleTagID: "", uid: uid, pageno: ++pageNo, pagesize: 20, ArticleMenuID: this.data.ArticleMenuID }
    netRq.netRequest('GetArticleList', paramMore, function (obj) {
      // 不能用this 直接调用data 
      
      for (var i = 0; i < obj.data.length; i++) {
        obj.data[i].ListPic = netRq.imgURL('article/' + obj.data[i].ListPic)
        obj.data[i].imgVoice = '../../../images/news/news_voicenormal.imageset/news_voicenormal@2x.png'
        obj.data[i].ListPic = obj.data[i].ListPic.split(";")[0]
        if(obj.data[i].ImgList){
          obj.data[i].ImgList = JSON.parse(obj.data[i].ImgList)
        }
      
      }

      var dataArray = that.data.obj.data;

    obj.data = dataArray.concat(obj.data)
      that.setData({
        
        obj:obj
        
      });
    })

    })
   
  }

})