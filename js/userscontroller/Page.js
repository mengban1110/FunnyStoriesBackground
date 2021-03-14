var useridz = GetQueryString("userid"); //储存userid
var user = null;

$(function() {
	$("#codezz").text(" userid : " + useridz)
	getLoginstatus();
})

/**
 * 修改密码
 */
// function changePassword() {
// 	mypost(setUserKey, {
// 		token: getCookie("token"),
// 		uid: useridz,
// 		password: $("#basicInput").val()
// 	}, function(data) {
// 		console.log(data)
// 		if (data.code == 200) {
// 			alert("修改成功")
// 		} else if (data.code == -1) {
// 			alert("请勿与原密码相同")
// 		} else {
// 			alert("修改失败")
// 		}

// 	})
// }



/**
 * 获取登录权限
 */
function getLoginstatus() {
	mypost(getUserData, {
		token: getCookie("token"),
		uid: useridz
	}, function(data) {
		if (data.code == 200) {
			user = data.data;
			console.log(user)
			$("#input_username").attr("placeholder",user.username);
			$("#input_usersex").attr("placeholder",user.usersex);
			$("#input_userbir").attr("placeholder",user.userbir);
			$("#input_usersign").attr("placeholder",user.usersign);
			$("#input_userstatus").attr("placeholder",user.userstatus);
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}



/**
 * 登录控制
 */
// function Login(type) {
// 	console.log("type" + type)
// 	mypost(setUserLogin, {
// 		token: getCookie("token"),
// 		userid: useridz,
// 		status: type
// 	}, function(data) {
// 		alert("修改成功")
// 		getLoginstatus()
// 	})
// }



/**
 * 获取发帖权限
 */
// function getPoststatus() {
// 	mypost(getUserPost, {
// 		token: getCookie("token"),
// 		userid: useridz
// 	}, function(data) {
// 		console.log(data)
// 		if (data.code == 200) {
// 			var status;
// 			if (data.data.status == 0) {
// 				status = "未限制发帖..."
// 			} else {
// 				status = "限制发帖中..."
// 			}
// 			$("#Poststatus").text(status)
// 		} else {
// 			alert("请重新登录验证身份!")
// 			window.location.href = "../../index.html";
// 		}
// 	})
// }



/**
 * 发帖控制
 */
// function Post(type) {
// 	console.log("type" + type)
// 	mypost(setUserPost, {
// 		token: getCookie("token"),
// 		userid: useridz,
// 		status: type
// 	}, function(data) {
// 		alert("修改成功")
// 		getPoststatus()
// 	})
// }



// /**
//  * 获取评论权限
//  */
// function getCommentstatus() {
// 	mypost(getUserComment, {
// 		token: getCookie("token"),
// 		userid: useridz
// 	}, function(data) {
// 		console.log(data)
// 		if (data.code == 200) {
// 			var status;
// 			if (data.data.status == 0) {
// 				status = "未限制评论..."
// 			} else {
// 				status = "限制评论中..."
// 			}
// 			$("#Commentstatus").text(status)
// 		} else {
// 			alert("请重新登录验证身份!")
// 			window.location.href = "../../index.html";
// 		}
// 	})
// }



// /**
//  * 评论控制
//  */
// function Comment(type) {
// 	console.log("type" + type)
// 	mypost(setUserComment, {
// 		token: getCookie("token"),
// 		userid: useridz,
// 		status: type
// 	}, function(data) {
// 		alert("修改成功")
// 		getCommentstatus()
// 	})
// }
