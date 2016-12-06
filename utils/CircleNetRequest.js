
/**
 * 
 * 
 * 
 * callBack 这是函数
 * param  这是json 对象
 * name 
 */



function netRequest(name,param,callBack){
    // http://www.8848fit.com/microweb/HiFitService.asmx/GetCircleDynamicList
    wx.request({
      url: 'http://www.8848fit.com/microweb/HiFitService.asmx/'+name,
      data: {
          strJSon:JSON.stringify(param)

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'content-type': 'application/soap+xml;charset=utf-8',
        'accept':'application/soap+xml;charset=UTF-8'

      }, // 设置请求的 header
      success: function(res){
        // success
        var array =  res.data.split("<string xmlns=\"http://tempuri.org/\">");
        array = array[1].split("</string>");
        var str ="";
        str = array[0];
        
        if(str.match("&amp;")){
          var items=str.split("&amp;")
          str=items.join("&");
          
          // str.replace("&amp;","&"); 这个方法行不通

        }
       
       
         
        var obj = JSON.parse(str);
         

        callBack(obj);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
}
exports.netRequest = netRequest;

// module.exports.sayHello = sayHello
// exports.sayGoodbye = sayGoodbye

/**
 * 文件上传
 * http://www.8848fit.com/microweb/HiFitService.asmx/EditMyUser
 */

function updateFile(name,param,callBack){
    name='EditMyUser'
    // wx.uploadFile({
    //   url: 'http://www.8848fit.com/microweb/HiFitService.asmx/'+name,
    //   filePath:'../images/clock.png',
    //   name:'file',
    //   header: {

    //     'content-type': 'application/json',
    //     'content-type': 'application/soap+xml;charset=utf-8',
    //     'accept':'application/soap+xml;charset=UTF-8;application/x-www-form-urlencoded'
    //   }, // 设置请求的 header
    //   formData: {
    //     strJSon:JSON.stringify(param)

    //   }, // HTTP 请求中其他额外的 form data
    //   success: function(res){
    //     // success
    //     console.log(res)
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
     wx.request({
      url: 'http://www.8848fit.com/microweb/HiFitService.asmx/'+name,
      data: {
          strJSon:JSON.stringify(param)

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'content-type': 'application/soap+xml;charset=utf-8',
        'accept':'application/soap+xml;charset=UTF-8;application/x-www-form-urlencoded'

      }, // 设置请求的 header
      success: function(res){
        // success
        var array =  res.data.split("<string xmlns=\"http://tempuri.org/\">");
        array = array[1].split("</string>");
        var str ="";
        str = array[0];
        
        if(str.match("&amp;")){
          var items=str.split("&amp;")
          str=items.join("&");
          
          // str.replace("&amp;","&"); 这个方法行不通

        }
       
       
         
        var obj = JSON.parse(str);
         

        callBack(obj);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
}

exports.updateFile = updateFile;
// http://www.8848fit.com/microweb/file/
// http://www.8848fit.com/hifitweb/file/
function imgURL (img){
    return 'http://www.8848fit.com/hifitweb/file/'+img
}
exports.imgURL = imgURL;


// POST

function netPostRequest(name,param,callBack){
    // http://www.8848fit.com/microweb/HiFitService.asmx/Login
    wx.request({
      url: 'http://www.8848fit.com/microweb/HiFitService.asmx/'+name,
      data: {
          strJSon:JSON.stringify(param)

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        
        'content-type': 'application/x-www-form-urlencoded',

  
  
        'accept':'text/xml;application/soap+xml;charset=UTF-8;application/x-www-form-urlencoded'

      }, // 设置请求的 header text/xml; charset=utf-8
      success: function(res){
        // success
        var array =  res.data.split("<string xmlns=\"http://tempuri.org/\">");
        array = array[1].split("</string>");
        var str ="";
        str = array[0];
        
        if(str.match("&amp;")){
          var items=str.split("&amp;")
          str=items.join("&");
          
          // str.replace("&amp;","&"); 这个方法行不通

        }
        
        

       
         
        var obj = JSON.parse(str);
         wx.setStorage({
          key: 'userInfor',
          data: obj,
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

        callBack(obj);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
}
exports.netPostRequest = netPostRequest;




