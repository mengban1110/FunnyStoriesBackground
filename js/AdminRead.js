$(function() {
	var managername = getCookie("managername")
	var manageravatar = getCookie("manageravatar")
	console.log("managername : " + managername)
	console.log("manageravatar : " + manageravatar)
	$("#Rname").text(managername)
	$("#Ravatar").attr('src', manageravatar)
	$("#Lname").text(managername)
	$("#Lavatar").attr('src', manageravatar)
})



/**
 * 重启服务器
 */
function restart() {
	var r = confirm("确定要重启服务器吗?");
	if (r == true) {
		$.ajax({
			url: domain + restartServer,
			data: {
				token: getCookie("token")
			},
			type: 'POST',
			dataType: 'JSON',
			timeout: 5000, //超时时间设置， 单位毫秒
			async: true, //是否异步
			success: function(data) {
				clearCookie("token")
				alert("正在重启 请稍后尝试登录后台服务...")
			},
			error: function() {
				//异常处理；  
				alert('error : 服务器内部错误');
			}
		});
	} else {

	}
}

/**
 * 退出登录
 */
function Logout() {
	var r = confirm("确定要退出登录吗?");
	if (r == true) {
		clearCookie("token")

		alert("退出成功")
		window.location.href = "../../index.html";;
	} else {

	}
}

/**
 * 上传文件
 */
function uploadApk() {
	var formzz = document.getElementById('form1');
	var formData = new FormData(formzz);
	formData.append("path", $("#myfile").get(0).files[0]);
	var formStr = JSON.stringify(getCookie("token"));
	formData.set('token', formStr);
	console.log(formData)
	$.ajax({
		url: domain + pushApk,
		type: "post",
		data: formData,
		processData: false,
		contentType: false,
		success: function(data) {
			if (data.code == 200) {
				alert("上传成功")
			} else {
				alert("上传失败")
			}
		}
	})
}

function eiditUser() {
	var formzz = document.getElementById('form1');
	var formData = new FormData(formzz);
	var useravatar = $("#myfile").get(0).files[0];
	if(useravatar != undefined){
		formData.append("path", useravatar);
	}
	var formStr = JSON.stringify(getCookie("token"));
	
	formData.set('token', getCookie("token"));
	formData.set('username',$("#input_username").val());
	formData.set('password',$("#input_password").val());
	formData.set('usersex',$("#input_usersex").val());
	formData.set('userbirth',$("#input_userbir").val());
	formData.set('usersign',$("#input_usersign").val());
	formData.set('userstatus',$("#input_userstatus").val());
	formData.set('uid',GetQueryString("userid"));
	console.log(formData)
	$.ajax({
		url: domain + eiditUserData,
		type: "post",
		data: formData,
		processData: false,
		contentType: false,
		success: function(data) {
			if (data.code == 200) {
				alert("修改成功");
				window.location.href = "users.html";
			} else {
				alert("修改失败");
			}
		}
	})
}

function addADV(){
	
	var formzz = document.getElementById('form1');
	var formData = new FormData(formzz);
	formData.append("path", $("#myfile").get(0).files[0]);
	formData.set('token', getCookie("token"));
	formData.set('acontext',$("#input_acontext").val());
	
	$.ajax({
		url: domain + postADV,
		type: "post",
		data: formData,
		processData: false,
		contentType: false,
		success: function(data) {
			if (data.code == 200) {
				alert("发布成功");
				$("#tbody").empty();
				getinfo();
			} else {
				alert("发布失败");
			}
		}
	})
}