var domain = "http://localhost:8080/FunnyStories" //项目domin
var login = "/api/controller/login" //登录

// var homepageinfo = "/api/homepage/info" //获取首页数据

// var getRegister = "/api/controller/register/getstatus" //获取注册控制状态
// var setRegister = "/api/controller/register/poststatus" //设置注册控制状态
// var getLogin = "/api/controller/login/getstatus" //获取登录控制状态
// var setLogin = "/api/controller/login/poststatus" //设置登录控制状态
// var getAnnouncement = "/api/controller/announcement/getinfo" //获取公告信息
// var setAnnouncement = "/api/controller/announcement/postinfo" //设置公告信息
// var getVersion = "/api/controller/version/getinfo" //获取当前版本
// var setVersion = "/api/controller/version/postinfo" //设置当前版本
// var pushApk = "/api/controller/update/postinfo" //上传apk

// var getSchoolInfo = "/api/controller/school/getinfo" //获取所有学校信息
// var postSchoolInfo = "/api/controller/school/postinfo" //新增或新增学校信息

// var getPostsInfo = "/api/posts/getinfoed" //获取所有审核通过的帖子信息
// var getPostsInfoPart = "/api/posts/getinfoedpart" //获取所有审核通过的帖子信息

// var getPostingInfo = "/api/posts/getinfo" //获取所有正在审核中的帖子信息
// var getPostingInfoPart = "/api/posts/getinfopart" //获取所有正在审核中的帖子信息

// var auditPosting = "/api/post/audit" //审核指定帖子
// var delPostsInfo = "/api/post/delete" //删除指定帖子

// var getUserLogin = "/api/user/getlogin" //获取指定用户登录权限
// var setUserLogin = "/api/user/changelogin" //设置指定用户登录权限

// var getUserPost = "/api/user/getpost" //获取指定用户发帖权限
// var setUserPost = "/api/user/changepost" //设置指定用户发帖权限

// var getUserComment = "/api/user/getcomment" //获取指定用户评论权限
// var setUserComment = "/api/user/changecomment" //设置指定用户评论权限


// var restartServer = "/api/server/restart" //重启服务器
//2.主页数据
 var homepageinfo = "/api/home/getinfo"//获取文本数据
 var getpostpartcount = "/api/home/getpostpartcount"//各个板块帖子数
//4 : 注册用户管理
var getUsersInfo = "/api/user/getinfo" //获取所有用户信息
var getUserData = "/api/user/getdata" //获取指定用户信息
var eiditUserData = "/api/user/postdata"//修改用户指定数据
var delUserData = "/api/user/deluser"//删除指定用户

//5 : 帖子管理
var getCheckedInfo = "/api/post/checked/getinfo";//5.1.1 : 获取审核过的所有帖子
var getCheckedInfoPart = "/api/post/checked/getinfopart";//5.1.2 : 获取审核过的部分帖子
var commendPost = "/api/post/checked/commend";//5.1.3 : 推荐指定帖子
var delPostInfo = "/api/post/checked/delpost";//5.1.4 : 删除指定帖子
var getPostComment = "/api/post/checked/getcomment";//5.1.5 : 获取指定帖子的评论信息
var delPostComment= "/api/post/checked/delcomment";//5.1.6 : 删除指定帖子评论
var getCheckedCount ="/api/post/checked/getpostCount";//获取帖子数量

var getCheckingCount ="/api/post/checking/getpostCount"//获取未审核帖子数量
var getPostingInfo = "/api/post/checking/getinfo"//获取待审核的所有帖子
var auditPostInfo ="/api/post/checking/auditpost"//审核指定帖子
var getPostingInfoPart = "/api/post/checking/getinfopart" //获取待审核的部分帖子
var getInfopartpostCount ="/api/post/checking/getInfopartpostCount"//部分待审核帖子数量
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