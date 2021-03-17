$(function() {
	// alert(getCookie("token"))
	getstatus()
})

/**
 * 获取注册状态
 */
function getstatus() {

	myget(getLogin, {
		token: getCookie("token")
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
		
			var status;
			if (data.data.login == 0) {
				status = "未限制登录..."
			} else {
				status = "限制登录中..."
			}
			
			
			$("#Loginstatus").text(status)
			if (data.data.open == 0) {
				status = "未限制网站运营..."
			} else {
				status = "限制网站运营中..."
			}
			$("#poststatusstatus").text(status)
			
			
			if (data.data.register == 0) {
				status = "未限制注册..."
			} else {
				status = "限制注册中..."
			}
			$("#Registerstatus").text(status)
			
			if (data.data.post == 0) {
				status = "未限制发帖..."
			} else {
				status = "限制发帖中..."
			}
			$("#Poststatus").text(status)
			
			if (data.data.comment == 0) {
				status = "未限制评论..."
			} else {
				status = "限制评论中..."
			}
			$("#Commentstatus").text(status)
			
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}


/**
 * 注册控制
 */
function Login(type) {
	console.log("type" + type);
	
	mypost1(setLogin, {
		token: getCookie("token"),
		status: type,
	}, function(data) {
		alert("修改成功")
		getstatus()
	})
}

/**
 * 发帖控制
 */
function Post(type) {
	console.log("type" + type)
	mypost1(setUserPost, {
		token: getCookie("token"),

		status: type
	}, function(data) {
		alert("修改成功")
		getstatus()
	})
}



/**
 * 评论控制
 */
function Comment(type) {
	console.log("type" + type)
	mypost1(setUserComment, {
		token: getCookie("token"),
	
		status: type
	}, function(data) {
		alert("修改成功")
		getstatus()
	})
}

/**
 * 注册控制
 */
function poststatus(type) {
	console.log("type" + type);
	
	mypost1(setpoststatus, {
		token: getCookie("token"),
		status: type,
	}, function(data) {
		alert("修改成功")
		getstatus()
	})
}

/**
 * 注册控制
 */
function Register(type) { 

	console.log("type" + type)
	mypost1(setRegister, {
		token: getCookie("token"),
		status: type,
	}, function(data) {
		getstatus()
		alert("修改成功")
	})
}
