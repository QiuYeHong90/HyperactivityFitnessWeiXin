var util = require('../../utils/util.js');
var NetRq = require('../../utils/CircleNetRequest.js');

Page({
    data: {
        imgList: [],
        baseDomain: util.baseDomain(),
        isVideo:false
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数

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
        // 页面关闭

    },
    addpic: function () {

        wx.showActionSheet({
            itemList: ['图片',  '视频'],
            success: function (res) {
                if (!res.cancel) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                        openXiangJi(function (obj) {
                            that.setData({
                                imgList: obj,
                                isVideo:false
                            })
                        })
                    }else{
                        
                        openVideo(function (obj) {
                            that.setData({
                                imgList: [obj],
                                isVideo:true
                            })
                        })
                    }
                }
            }
        })

        var that = this;

    },

    EventHandle: function (dat) {
        var that = this;
        var content = dat.detail.value.input

        if (that.data.isVideo!=true) {
            NetRq.uploadFile(that.data.imgList[0], 'image', function (fileName) {
                console.log(fileName)
                GetUid(function (uid) {
                    var param = { "versionno": "2.7.2.0", "DynamicTagID": "15", "DynamicTagName": "骑行", "phonetype": "2", "uid": uid, "VideoImg": "", "FileUrlType": "0", "CircleID": "", "ImageListIDs": fileName, "DynamicInfo": content, "DynamicType": "0", "VideoUrl": "" }
                    NetRq.netRequest('AddDynamic', param, function (obj) {
                        console.log(obj)
                        if (obj.success == true) {
                            wx.showToast({
                                title: '发布动态成功',
                                icon: 'success',
                                duration: 10000
                            })

                            setTimeout(function () {
                                wx.hideToast()
                            }, 2000)
                        }
                    })
                })

            })
        } else {
            GetUid(function (uid) {
                var param = { "versionno": "2.7.2.0", "DynamicTagID": "15", "DynamicTagName": "骑行", "phonetype": "2", "uid": uid, "VideoImg": "", "FileUrlType": "0", "CircleID": "", "ImageListIDs": null, "DynamicInfo": content, "DynamicType": "0", "VideoUrl": "" }
                NetRq.netRequest('AddDynamic', param, function (obj) {
                    console.log(obj)
                    if (obj.success == true) {
                        wx.showToast({
                            title: '发布动态成功',
                            icon: 'success',
                            duration: 10000
                        })

                        setTimeout(function () {
                            wx.hideToast()
                        }, 2000)
                    }
                })
            })
        }





    }
})

function GetUid(callBack) {
    wx.getStorage({
        key: 'userInfor',
        success: function (res) {
            callBack(res.data.data.uid)
        }
    })
}

function openXiangJi(callBack) {
    wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {


            callBack(res.tempFilePaths)


        }
    })
}

function openVideo(callBack){
    wx.chooseVideo({
      sourceType: ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄
      // maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      camera: ['front', 'back'],
      success: function(res){
        // success
         callBack(res.tempFilePath)
      }
      
    })
}