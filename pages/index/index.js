//index.js
//获取应用实例
var app = getApp()
var NetRq = require('../../utils/CircleNetRequest.js');
var Base64 = require('../../libs/js-base64/base64.modified.js');
var userID


Page({


    data: {
        motto: 'Hello World',


        userInfo: {},
        list: [{
            "icon": "member_sign",
            "title": "个性签名",
            "storyboard": "MyJob",
            "identifier": "MyCustomerVC",
        },
        {
            "icon": "member_info",
            "title": "个人信息",
            "storyboard": "MemberCenter",
            "identifier": "FTMenuInfoMationViewController",
        },
        {
            "icon": "member_practise",
            "title": "训练记录",
            "storyboard": "MemberCenter",
            "identifier": "calendar",
        },
        {
            "icon": "member_collection",
            "title": "我的收藏",
            "storyboard": "News",
            "identifier": "articleCollection",
        },
        {
            "icon": "member_dynamic",
            "title": "我的动态",
            "storyboard": "Dynamic",
            "identifier": "MyDynamic_VC",
        },
        {
            "icon": "member_settings",
            "title": "设置",
            "storyboard": "MemberCenter",
            "identifier": "PerSettingViewController",
        },
        {
            "icon": "member_msg",
            "title": "系统通知",
            "storyboard": "MessageCenter",
            "identifier": "MessageCenter_VC",
        },
        {
            "icon": "member_feedback",
            "title": "意见反馈",
            "storyboard": "MemberCenter",
            "identifier": "FitSecretaryVC",
        }]
    },

    //事件处理函数
    bindViewTap: function (da) {
        wx.chooseImage({
            count: 9, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function (res) {
                // success
                console.log(res)
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })

        var that = this;
        var imagePath = '../../images/clock.png'

        that.setData({
            'userInfo.avatarUrl': imagePath
        })

        console.log(Base64.encode('Wechat'));
        console.log(da)
        var reader = new FileReader()


        wx.getImageInfo({
            src: imagePath,
            success: function (res) {
                // success
                var myBlob = new Blob([res], { type: "image/png" });
                reader.readAsDataURL(myBlob);
                reader.onloadend = function (e) {
                    console.log(e);


                }
            }
        })
        reader.readAsDataURL(file);


        var param = {

        }
        NetRq.updateFile('EditMyUser', param, function (obj) {

        });
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this

        // 获取是否登陆过
        wx.getStorage({
            key: 'userInfor',
            success: function (res) {
                that.setData({
                    userInfo: res.data.data
                })
                userID = res.data.data.uid
            },
            fail: function () {

                wx.redirectTo({
                    url: '../login/login?url=index'
                })

            },
        })
    }
})




