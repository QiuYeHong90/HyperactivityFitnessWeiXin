var util = require('util.js');
/**
 * 
 * 
 * 
 * callBack 这是函数
 * param  这是json 对象
 * name 
 */



function netRequest(name, param, callBack) {
  // http://www.8848fit.com/microweb/HiFitService.asmx/GetCircleDynamicList

  wx.request({
    // url: "http://www.8848fit.com/microweb/HiFitService.asmx/"+name,
    url: util.kBaseUrl(name),
    data: {
      strJSon: JSON.stringify(param)

    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json',
      'content-type': 'application/soap+xml;charset=utf-8',
      'accept': 'application/soap+xml;charset=UTF-8'

    }, // 设置请求的 header
    success: function (res) {
      // success
      var array = res.data.split("<string xmlns=\"http://tempuri.org/\">");
      array = array[1].split("</string>");
      var str = "";
      str = array[0];

      if (str.match("&amp;")) {
        var items = str.split("&amp;")
        str = items.join("&");

        // str.replace("&amp;","&"); 这个方法行不通

      }



      var obj = JSON.parse(str)

      callBack(obj);
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}
exports.netRequest = netRequest;

// module.exports.sayHello = sayHello
// exports.sayGoodbye = sayGoodbye

/**
 * 文件上传
 * 
 */

function uploadFile(filePath, name,Type, callBack) {
  wx.showToast({
    title: '上传中',
    icon: 'loading',
    duration: 10000
  })

  setTimeout(function () {
    wx.hideToast()
  }, 2000)


  wx.uploadFile({
    url: util.baseDomain() + 'IOSFile.ashx/' + name,
    filePath: filePath,
    name: 'image',
    header: {
      "Content-Type": "image/jpeg",
    }, // 设置请求的 header
    formData: {
      versionno: '2.7.2.0',
      phonetype: "2",
      "Content-Type": "image/jpeg"
    }, // HTTP 请求中其他额外的 form data
    success: function (res) {
      // success
      console.log(res)
      var obj = JSON.parse(res.data)
      callBack(obj.info.FileName)
    },
    fail: function () {
      // fail
    },

  })
}

exports.uploadFile = uploadFile;

// *********************************************************
// http://www.8848fit.com/microweb/file/
// http://www.8848fit.com/hifitweb/file/
function imgURL(img) {
  // return util.baseDomain() + 'file/' + img
  return util.K_URL_HFIT() + 'file/' + img
}
exports.imgURL = imgURL;
// K_URL_MFIT
function kShareImgUrl(img) {
  // return util.baseDomain() + 'file/' + img
  return util.K_URL_MFIT() + 'file/' + img
}
exports.kShareImgUrl = kShareImgUrl;


/**
 * 
 * 
 * 
 * post方法
 */
// POST

function netPostRequest(name, param, callBack) {
  wx.request({
    url: util.kBaseUrl(name),
    data: {
      strJSon: JSON.stringify(param)

    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'text/xml;application/soap+xml;charset=UTF-8;application/x-www-form-urlencoded'

    }, // 设置请求的 header text/xml; charset=utf-8
    success: function (res) {
      // success
      var array = res.data.split("<string xmlns=\"http://tempuri.org/\">");
      array = array[1].split("</string>");
      var str = "";
      str = array[0];

      if (str.match("&amp;")) {
        var items = str.split("&amp;")
        str = items.join("&");

        // str.replace("&amp;","&"); 这个方法行不通

      }

      var obj = JSON.parse(str);


      callBack(obj);
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}
exports.netPostRequest = netPostRequest;



// 获取uid
function GetUid(callBack) {
  wx.getStorage({
    key: 'userInfor',
    success: function (res) {
      callBack(res.data.data.uid)
    }
  })
}

exports.GetUid = GetUid

function showModel(title,content,callBack) {
  wx.showModal({
    title: title,
    content: content,
    success: function (res) {
      if (res.confirm) {
        callBack()
      }
    }
  })
}

exports.showModel = showModel