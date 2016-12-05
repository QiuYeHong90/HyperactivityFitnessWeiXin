// pages/first/first.js
var NetRq = require('../../utils/CircleNetRequest.js');
var pageNo =1;
var appInstance = getApp();
Page({
  data: {

    dataA: [],
    dataDynamicList: [],
    success: true,
    msg: null,
    scaleImg:1

  },
  param1: {
    uid: 5517,
    phonetype: 1,
    versionno: "2.8.1",
  },

  DynamicListParam: { phonetype: "2", CircleID: "", versionno: "2.8.0", uid: "5834", pagesize: "10", pageno: "1" },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
    // 页面关闭
    var that = this;
    
    NetRq.netRequest('GetTopicDynamicTagList', that.param1, function (obj) {
      // 不能用this 直接调用data 
      that.setData({
        dataA: obj.data,
        success: obj.success,
        msg: obj.msg
      });

    }),


      // http://www.8848fit.com/microweb/HiFitService.asmx/GetCircleDynamicList 
      NetRq.netRequest('GetCircleDynamicList', that.DynamicListParam, function (obj) {
        // 不能用this 直接调用data 

        console.log(obj.data);
        that.setData({
          dataDynamicList: obj.data,

          success: obj.success,
          msg: obj.msg
        });

         console.log(that.data.dataDynamicList.length);
      // listImg
      for(var a=0;a<that.data.dataDynamicList.length;a++){
          var model = that.data.dataDynamicList[a];
          if(model.listImg){
             console.log(model.listImg.length);
             model.imgCount = model.listImg.length;
          }else{
            model.imgCount = 0;
          }
         
          
      }
      that.setData({
         dataDynamicList:that.data.dataDynamicList
      });
      console.log(that.data.dataDynamicList);


      }),
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
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


  },

  // 刷新
  onPullDownRefresh: function () {
    var that = this;
    pageNo = 1;
    var paramRefresh = { phonetype: "2", CircleID: "", versionno: "2.8.0", uid: "5834", pagesize: "10", pageno:pageNo  };
    NetRq.netRequest('GetCircleDynamicList',paramRefresh, function (obj) {
      // 不能用this 直接调用data 

      console.log(obj.data);
      that.setData({
        dataDynamicList: obj.data,

        success: obj.success,
        msg: obj.msg
      });

      console.log(that.data.dataDynamicList.length);
      // listImg
      for(var a=0;a<that.data.dataDynamicList.length;a++){
          var model = that.data.dataDynamicList[a];
          if(model.listImg){
             console.log(model.listImg.length);
             model.imgCount = model.listImg.length;
          }else{
            model.imgCount = 0;
          }
         
          
      }
      that.setData({
         dataDynamicList:that.data.dataDynamicList
      });
      console.log(that.data.dataDynamicList);
      wx.stopPullDownRefresh();

    })
  },

  // 加载更多
  

  onReachBottom: function (event) {
    var that = this;
     

    var paramMore = { phonetype: "2", CircleID: "", versionno: "2.8.0", uid: "5834", pagesize: "10", pageno:++pageNo};
    NetRq.netRequest('GetCircleDynamicList', paramMore, function (obj) {
      // 不能用this 直接调用data 
     
      
      that.setData({
        dataDynamicList:that.data.dataDynamicList.concat(obj.data),

        success: obj.success,
        msg: obj.msg
      });
      console.log(that.data.dataDynamicList);
       console.log(that.data.dataDynamicList.length);
      // listImg
      for(var a=0;a<that.data.dataDynamicList.length;a++){
          var model = that.data.dataDynamicList[a];
          if(model.listImg){
             console.log(model.listImg.length);
             model.imgCount = model.listImg.length;
          }else{
            model.imgCount = 0;
          }
         
          
      }
      that.setData({
         dataDynamicList:that.data.dataDynamicList
      });
      console.log(that.data.dataDynamicList);
    })
  },
  loadImgOver:function(event){
    var scaleImg = event.detail.height/event.detail.width;
    
    var that = this;
     var obj = that.data.dataDynamicList[event.currentTarget.dataset.hi].listImg[0];
     obj.scaleImg = scaleImg;
    that.setData({
        dataDynamicList:that.data.dataDynamicList

       
      });
      console.log(that.data.dataDynamicList[event.currentTarget.dataset.hi]);

  },
  imgTap:function(event){
      console.log(event.currentTarget.dataset.index,event.currentTarget.dataset.listindex);

      var imgArray = this.data.dataDynamicList[event.currentTarget.dataset.listindex].listImg;
      // var imgArray = "dataDynamicList[event.currentTarget.dataset.listindex].listImg";
      var curentIndex = event.currentTarget.dataset.index;
      appInstance.globalData.imgArray=imgArray;
      // wx.navigateTo({
      //       url: '../imgDetail/imgDetail?index='+curentIndex
      //   });
      var urlArrayImg=[];
      for(var i=0 ;i<imgArray.length;i++){
          urlArrayImg[i]='http://www.8848fit.com/microweb/file/'+imgArray[i].Thumbnail;
      }

      //展示图片
      wx.previewImage({
        current: urlArrayImg[curentIndex], // 当前显示图片的链接，不填则默认为 urls 的第一张
        urls: urlArrayImg,
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
  }

})

