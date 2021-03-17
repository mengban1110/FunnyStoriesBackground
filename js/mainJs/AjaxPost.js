var domain = "http://localhost:8080/FunnyStories" //项目domin

//2.主页数据
 var homepageinfo = "/api/home/getinfo"//获取文本数据
 var getpostpartcount = "/api/home/getpostpartcount"//各个板块帖子数
 
 
 
var getpoststatus ="/api/controller/getstatus" //获取网站开关控制状态
var setpoststatus ="/api/controller/web/poststatus" //设置网站开关控制状态
var getRegister = "/api/controller/getstatus" //获取注册控制状态
var setRegister = "/api/controller/register/poststatus" //设置注册控制状态
var getLogin = "/api/controller/getstatus" //获取登录控制状态
var setLogin = "/api/controller/login/poststatus" //设置登录控制状态

var getRecommendInfo = "/api/post/recommend/getinfo" //获取所有推荐帖子
var getRecommendInfoPart = "/api/post/recommend/getinfopart" //获取部分推荐帖子


var getUserLogin = "/api/user/getlogin" //获取指定用户登录权限
var setUserLogin = "/api/user/changelogin" //设置指定用户登录权限

var getUserPost = "/api/controller/getstatus" //获取指定用户发帖权限
var setUserPost = "/api/controller/post/poststatus" //设置指定用户发帖权限

var getUserComment = "/api/controller/getstatus" //获取指定用户评论权限
var setUserComment = "/api/controller/comment/poststatus" //设置指定用户评论权限

var setdelrecommend ="/api/post/recommend/delrecommend";  //取消推荐

var getBlackInfo ="/api/blacklist/getinfo";  //获取黑名单信息

var setblack ="/api/blacklist/delinfo"; //取消黑名单

var getloginfo = "/api/history/getloginfo"; //获取后台日志
var getInfoPartcount="/api/adv/GetGetInfoPage"; //获取推荐帖子的总页数
var getInfoPart="/api/adv/GetInfoPart"; //获取推荐的部分帖子总页数

var getInfoblacklist ="/api/adv/GetBlackList"; //获取黑名单条件查询后总页数


//4 : 注册用户管理
var getUsersInfo = "/api/user/getinfo" //获取所有用户信息
var getUserData = "/api/user/getdata" //获取指定用户信息
var eiditUserData = "/api/user/postdata"//修改用户指定数据
var delUserData = "/api/user/deluser"//删除指定用户
var getusercount = "/api/user/getcount";//获取用户个数
//5 : 帖子管理
var getCheckedInfo = "/api/post/checked/getinfo";//5.1.1 : 获取审核过的所有帖子
var getCheckedInfoPart = "/api/post/checked/getinfopart";//5.1.2 : 获取审核过的部分帖子
var commendPost = "/api/post/checked/commend";//5.1.3 : 推荐指定帖子
var delPostInfo = "/api/post/checked/delpost";//5.1.4 : 删除指定帖子
var getPostComment = "/api/post/checked/getcomment";//5.1.5 : 获取指定帖子的评论信息
var delPostComment= "/api/post/checked/delcomment";//5.1.6 : 删除指定帖子评论
var getCheckedCount ="/api/post/checked/getpostCount";//获取帖子数量
//5 .2
var getCheckedCount ="/api/post/checked/getpostCount";//获取帖子数量
var getCheckingCount ="/api/post/checking/getpostCount"//获取未审核帖子数量
var getPostingInfo = "/api/post/checking/getinfo"//获取待审核的所有帖子
var auditPostInfo ="/api/post/checking/auditpost"//审核指定帖子
var getPostingInfoPart = "/api/post/checking/getinfopart" //获取待审核的部分帖子
var getInfopartpostCount ="/api/post/checking/getInfopartpostCount"//部分待审核帖子数量

//6 : 广告管理
var getADVInfo = "/api/adv/getinfo";//6.1 : 获取广告信息
var delADV = "/api/adv/deladv";//6.2 : 删除指定广告
var postADV = "/api/adv/postadv";//6.3 : 发布广告
var getadvcount = "/api/adv/getadvCount"//获取广告个数
// 9 ： 服务器
var osRestart= "/api/os/restart"//重启服务器

var tomcatRestart="/api/server/restart"//重启Tomcat
/**
 * 封装ajax
 * 
 * @param {Object} api
 * @param {Object} parameters
 * @param {Object} callback
 */
function mypost(api, parameters, callback,type) {
	console.log(api)
    console.log("-------------------------")
    console.log("请求地址 : " + domain + api)
    $.ajax({
        url: domain + api,
        data: parameters,
        type: type,
        dataType: 'JSON',
        timeout: 5000, //超时时间设置， 单位毫秒
        async: false, //是否异步
        success: callback,
        error: function() {
            //异常处理；  
            console.log('error : 服务器内部错误');
            console.log("-------------------------")
        }
    });
}


/**
 * 封装ajax
 * 
 * @param {Object} api
 * @param {Object} parameters
 * @param {Object} callback
 */
function myget(api, parameters, callback) {
    console.log("-------------------------")
    console.log("请求地址 : " + domain + api)
    $.ajax({
        url: domain + api,
        data: parameters,
        type: 'GET',
        dataType: 'JSON',
        timeout: 5000, //超时时间设置， 单位毫秒
        async: true, //是否异步
        success: callback,
        error: function() {
            //异常处理；  
            console.log('error : 服务器内部错误');
            console.log("-------------------------")
        }
    });
}
/**
 * 封装ajax
 * 
 * @param {Object} api
 * @param {Object} parameters
 * @param {Object} callback
 */
function mypost1(api, parameters, callback) {
    console.log("-------------------------")
    console.log("请求地址 : " + domain + api)
    $.ajax({
        url: domain + api,
        data: parameters,
        type: 'POST',
        dataType: 'JSON',
        timeout: 5000, //超时时间设置， 单位毫秒
        async: true, //是否异步
        success: callback,
        error: function() {
            //异常处理；  
            console.log('error : 服务器内部错误');
            console.log("-------------------------")
        }
    });
}



/**
 * 封装ajax
 * 
 * @param {Object} api
 * @param {Object} parameters
 * @param {Object} callback
 */
function mypost2(api, parameters, callback) {
    console.log("-------------------------")
    console.log("请求地址 : " + domain2 + api)
    $.ajax({
        url: domain2 + api,
        data: parameters,
        type: 'POST',
        dataType: 'JSON',
        timeout: 5000, //超时时间设置， 单位毫秒
        async: true, //是否异步
        success: callback,
        error: function() {
            //异常处理；  
            console.log('error : 服务器内部错误');
            console.log("-------------------------")
        }
    });
}


/**
 * 获取Param参数
 * 
 * @param {Object} name
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return null;
}