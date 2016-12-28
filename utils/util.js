function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()    


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  console.log(n[1],n[1] ? n : '0' + n)
  return n[1] ? n : '0' + n
}
// 1测试 2局域网测试 其他为测试服

var AppVersion =  3
var baseDomain  = "http://54.222.163.123:8008/" //测试
var basePath    ="HiFitService.asmx/"     //测试
// var K_URL_HFIT ="http://54.222.163.123:8002/"  //测试
// var K_URL_MFIT ="http://54.222.163.123:8008/"  //测试

// #define baseDomain  @"http://192.168.1.16:8008/"//测试(局域网)
// #define basePath    @"HiFitService.asmx"        //测试(局域网)
// #define K_URL_HFIT @"http://192.168.1.16:8002/" //测试(局域网)
// #define K_URL_MFIT @"http://192.168.1.16:8008/" //测试(局域网)




 function kBaseUrl(name){

  if(AppVersion==1){  
    // 外网测试
    baseDomain  = "http://54.222.163.123:8008/"
    basePath    ="HiFitService.asmx/" 
  }else if (AppVersion==2){
    // 局域网测试
    baseDomain  = "http://192.168.1.16:8008/"
    basePath    ="HiFitService.asmx/" 
  }else{
    // 正式服
    baseDomain  = "http://www.8848fit.com/microweb/"
    basePath    ="HiFitService.asmx/" 
  }
  console.log(baseDomain+basePath+name)
  return  baseDomain+basePath+name
}

function baseUrl(){
  if(AppVersion==1){  
    // 外网测试
    baseDomain  = "http://54.222.163.123:8008/"
    
  }else if (AppVersion==2){
    // 局域网测试
    baseDomain  = "http://192.168.1.16:8008/"
    
  }else{
    // 正式服
    baseDomain  = "http://www.8848fit.com/microweb/"
    
  }
  console.log(baseDomain)
  return  baseDomain
}
function K_URL_HFIT(){
  if(AppVersion==1){  
    // 外网测试
    
    return   "http://54.222.163.123:8002/"
  }else if (AppVersion==2){
    // 局域网测试
    
    return  "http://192.168.1.16:8002/"
  }else{
    // 正式服
    
    return  "http://www.8848fit.com/hifitweb/"
  }
  
  
}
function K_URL_MFIT(){
  if(AppVersion==1){  
    // 外网测试
    
    return   "http://54.222.163.123:8008/"
  }else if (AppVersion==2){
    // 局域网测试
    
    return  "http://192.168.1.16:8008/"
  }else{
    // 正式服
    
    return  "http://www.8848fit.com/microweb/"
  }
  
  
}


// 获取uid
function GetUid(callBack) {
    wx.getStorage({
        key: 'userInfor',
        success: function (res) {
            callBack(res.data.data.uid)
        }
    })
}

module.exports = {
  formatTime: formatTime,
  kBaseUrl:kBaseUrl,
  baseDomain:baseUrl,
  basePath:basePath,
  GetUid:GetUid,
  K_URL_HFIT:K_URL_HFIT,
  K_URL_MFIT:K_URL_MFIT
}
// __global.kBaseUrl = kBaseUrl

