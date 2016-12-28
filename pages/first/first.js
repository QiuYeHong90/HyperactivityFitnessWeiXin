// pages/first/first.js
var NetRq = require('../../utils/CircleNetRequest.js');
var util = require('../../utils/util.js');
var pageNo = 1;
var appInstance = getApp();
var userID;
Page({
  data: {
    uid:appInstance.globalData.GetUserInfo==null?null: appInstance.globalData.GetUserInfo.uid,
    dataA: [],
    dataDynamicList: [],
    success: true,
    msg: null,
    scaleImg: 1,
    baseDomain: util.baseDomain(),
    isOpen: false,
    animationData: [],
    dataArray:
    [{
      text: "视频",
      color: "#075ba4"
    },
    {
      text: "相册",
      color: "chartreuse"
    },
    {
      text: "拍照",
      color: "#0eaaed"
    }],
    imgUrl: "../../images/dynamic/circle_adddynamic@3x.png"

  },
  param1: {
    uid: null,
    phonetype: 1,
    versionno: "2.8.1",
  },

  DynamicListParam: { phonetype: "2", CircleID: "", versionno: "2.8.0", uid: "", pagesize: "10", pageno: "1" },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
    // 页面关闭
    var that = this;

    // 获取是否登陆过
    wx.getStorage({
      key: 'userInfor',
      success: function (res) {
        pageNetReq(res.data.data.uid, that)
        userID = res.data.data.uid
      },
      fail: function () {

        wx.redirectTo({
          url: '../login/login?url=first'
        })

      },
    })





  },

  // 刷新
  onPullDownRefresh: function () {
    var that = this
    refresh(that)
  },

  // 加载更多


  onReachBottom: function (event) {

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    setTimeout(function () {
      wx.hideToast()
    }, 2000)
    var that = this;


    var paramMore = { phonetype: "2", CircleID: "", versionno: "2.8.0", uid: userID, pagesize: "10", pageno: ++pageNo };
    NetRq.netRequest('GetCircleDynamicList', paramMore, function (obj) {
      // 不能用this 直接调用data 


      that.setData({
        dataDynamicList: that.data.dataDynamicList.concat(obj.data),

        success: obj.success,
        msg: obj.msg
      });
      console.log(that.data.dataDynamicList);
      console.log(that.data.dataDynamicList.length);
      // listImg
      for (var a = 0; a < that.data.dataDynamicList.length; a++) {
        var model = that.data.dataDynamicList[a];
        if (model.listImg) {
          console.log(model.listImg.length);
          model.imgCount = model.listImg.length;
        } else {
          model.imgCount = 0;
        }


      }
      that.setData({
        dataDynamicList: that.data.dataDynamicList
      });
      console.log(that.data.dataDynamicList);
    })
  },
  loadImgOver: function (event) {
    var scaleImg = event.detail.height / event.detail.width;

    var that = this;
    var obj = that.data.dataDynamicList[event.currentTarget.dataset.hi].listImg[0];
    obj.scaleImg = scaleImg;
    that.setData({
      dataDynamicList: that.data.dataDynamicList


    });
    console.log(that.data.dataDynamicList[event.currentTarget.dataset.hi]);

  },
  imgTap: function (event) {
    var that = this
    console.log(event.currentTarget.dataset.index, event.currentTarget.dataset.listindex);

    var imgArray = this.data.dataDynamicList[event.currentTarget.dataset.listindex].listImg;
    // var imgArray = "dataDynamicList[event.currentTarget.dataset.listindex].listImg";
    var curentIndex = event.currentTarget.dataset.index;
    appInstance.globalData.imgArray = imgArray;
    // wx.navigateTo({
    //       url: '../imgDetail/imgDetail?index='+curentIndex
    //   });
    var urlArrayImg = [];
    for (var i = 0; i < imgArray.length; i++) {
      urlArrayImg[i] = that.data.baseDomain + 'file/' + imgArray[i].Thumbnail;
    }

    //展示图片
    wx.previewImage({
      current: urlArrayImg[curentIndex], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: urlArrayImg,
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
  // 小球球的动画
  publishDy: function (res) {



    this.setData(
      {
        isOpen: this.data.isOpen == true ? false : true
      }
    )
    var index = parseInt(res.currentTarget.dataset.idex);

    animation(this, this.data.isOpen, index);


    if (index == 0) {

    } else if (index == 1) {
      // 视频
      wx.navigateTo({
        url: '../publishpDyanmic/publishpDyanmic?type=video',
        success: function (res) {
          // success
        }
      })
    } else if (index == 2) {
      // 照片
      wx.navigateTo({
        url: '../publishpDyanmic/publishpDyanmic?type=image',
        success: function (res) {
          // success
        }
      })
    } else if (index == 3) {
      // 拍照相册
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // success
          wx.navigateTo({
            url: '../publishpDyanmic/publishpDyanmic?type=image',
            success: function (res) {
              // success
            }
          })
        }
      })
    }




  },
  /**
   * 删除动态点击事件
   */
  DeleteDynamicTap: function (res) {
    // index
    var index = res.currentTarget.dataset.index;
    var that = this
    var DynamicID = that.data.dataDynamicList[index].DynamicID
    NetRq.showModel("确定删除么", "", function () {
      DeleteDynamic(that.data.uid, DynamicID, function (obj) {
        console.log(obj)
        if (obj.success == true) {

          var dataArr = that.data.dataDynamicList
          dataArr.splice(index,1) 

          that.setData({
            dataDynamicList: dataArr
          })

        }
      })
    })







  }



})


function pageNetReq(uid, that) {
  that.param1.uid = uid;
  NetRq.netRequest('GetTopicDynamicTagList', that.param1, function (obj) {
    // 不能用this 直接调用data 
    that.setData({
      dataA: obj.data,
      success: obj.success,
      msg: obj.msg
    });

  }),

    that.DynamicListParam.uid = uid;
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
    for (var a = 0; a < that.data.dataDynamicList.length; a++) {
      var model = that.data.dataDynamicList[a];
      if (model.listImg) {
        console.log(model.listImg.length);
        model.imgCount = model.listImg.length;
      } else {
        model.imgCount = 0;
      }


    }
    that.setData({
      dataDynamicList: that.data.dataDynamicList
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



}

// 动画的方法
function animation(that, isOpen, index) {
  var animation1 = wx.createAnimation({
    duration: 100,
    timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
    delay: 0,
    transformOrigin: '50% 50% 0',
    success: function (res) {
      // function code
    }
  })
  var animation2 = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-in-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
    delay: 0,
    transformOrigin: '50% 50% 0',
    success: function (res) {
      // function code
    }
  })

  var animation3 = wx.createAnimation({
    duration: 300,
    timingFunction: 'ease-in-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
    delay: 0,
    transformOrigin: '50% 50% 0',
    success: function (res) {
      // function code
    }
  })
  if (isOpen == true) {

    animation1.translate(5, -80).step()


    animation2.translate(-50, -50).step()


    animation3.translate(-80, 5).step()

  } else {
    animation1.translate(0, 0).step()


    animation2.translate(0, 0).step()


    animation3.translate(0, 0).step()
  }
  var listArr = [animation1.export(), animation2.export(), animation3.export()]

  that.setData({
    animationData: listArr
  })
}


// 删除动态
function DeleteDynamic(uid, DynamicID, callBack) {
  var param = {
    uid: uid,
    Reason: "",
    phonetype: "2",
    versionno: "2.7.2.0",
    DynamicID: DynamicID
  }
  NetRq.netRequest("DeleteDynamic", param, function (obj) {
    callBack(obj)
  })
}

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
  var paramRefresh = { phonetype: "2", CircleID: "", versionno: "2.8.0", uid: userID, pagesize: "10", pageno: pageNo };
  NetRq.netRequest('GetCircleDynamicList', paramRefresh, function (obj) {
    // 不能用this 直接调用data 

    console.log(obj.data);
    that.setData({
      dataDynamicList: obj.data,

      success: obj.success,
      msg: obj.msg
    });

    console.log(that.data.dataDynamicList.length);
    // listImg
    for (var a = 0; a < that.data.dataDynamicList.length; a++) {
      var model = that.data.dataDynamicList[a];
      if (model.listImg) {
        console.log(model.listImg.length);
        model.imgCount = model.listImg.length;
      } else {
        model.imgCount = 0;
      }


    }
    that.setData({
      dataDynamicList: that.data.dataDynamicList
    });
    console.log(that.data.dataDynamicList);
    wx.stopPullDownRefresh();

  })
}