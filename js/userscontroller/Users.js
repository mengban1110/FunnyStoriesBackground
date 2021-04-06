$(function() {

	// getinfo()
	pagezz()
})

/**
 * 获取帖子信息
 */
function getinfo(page,size) {
	mypost(getUsersInfo, {
		token: getCookie("roottoken"),
		size:size,
		page:page
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var count = 1;
			console.log("获取用户信息")
			console.log(data)
			data.data.users.forEach(item => {
				var temp = count++;
				$("tbody").append(add(temp,item.userid,
											   item.username,
											   item.useravatar,
											   item.usersex,
											   item.userbir,
											   item.email,
											   item.usersign))
			})
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}

/**
 * 条件查询
 */
function search(page,size){
	
	$("#tbody").empty()
	
	if($("#placeholderInput").val().length == 0){
		getinfo();
	}else{
		mypost(getUsersInfo, {
			token: getCookie("roottoken"),
			word: $("#placeholderInput").val(),
			size:size,
			page:page
		}, function(data) {
			if (data.code == 200) {
				var count = 1;
				data.data.users.forEach(item => {
					var temp = count++;
					$("tbody").append(add(temp,item.userid,
											   item.username,
											   item.useravatar,
											   item.usersex,
											   item.userbir,
											   item.email,
											   item.usersign))
				})
			} else if(data.code == -1) {
				alert("暂无数据,将查询所有...")
				getinfo()
			} else {
				alert("请重新登录验证身份!")
				window.location.href = "../../index.html";
			}
		},"GET")
	}
}

/**
 * 动态生成用户数据
 */
function add(no,userid,username,useravatar,usersex,userbir,email,usersign) {
	
	
	var div = '<tr>'+
					'<th scope="row">' + no + '</th>'+
					'<td class="text-truncate">'+userid+'</td>'+
					'<td class="text-truncate">'+
						'<div class="navbar-custom-menu">'+
							'<ul class="nav navbar-nav">'+
								'<li class="dropdown user user-menu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img src="'+useravatar+'"'+
										'class="user-image" alt="User Image" id="Ravatar"> <span class="hidden-xs" id="Rname">'+username+'</span> </a>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</td>'+
					'<td class="text-truncate">'+usersex+'</td>'+
					'<td class="text-truncate">'+userbir+'</td>'+
					'<td class="text-truncate">'+email+'</td>'+
					'<td class="text-truncate">'+usersign+'</td>'+
					'<td class="text-truncate"><button class="btn btn-primary" type="button" onclick="goPage('+userid+')">修改</button>'+
					'<button class="btn btn-primary" type="button" onclick="godel('+userid+')">删除</button>'+
					'</td>'+
			'</tr>'
	return div
}



/**
 * 跳转修改页面
 * 
 */
function goPage(userid) {
	window.location.href = 'Page.html?userid='+userid;
}

function godel(userid){
	mypost(delUserData,{"uid":userid,"token":getCookie("roottoken")},function(data){
		console.log(data);
		if(data.code == 200){
			alert("删除成功");
		}else{
			alert("删除失败")
		}
		$("#tbody").empty();
		getinfo();
	},"POST");
}


function pagezz(){
	var size = 10
	mypost(getusercount, {}, function(data) {
		console.log("获取总用户数")
		console.log(data)
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage //分页 
			var layer = layui.layer //弹层
			//分页
			laypage.render({
				elem: 'pageDemo', //分页容器的id
				count: data.data, //数据总数量
				limit: size,
				skin: '#1E9FFF', //自定义选中色值
				//,skip: true //开启跳页
				jump: function(obj, first) {
					$("#tbody").empty()
					getinfo(obj.curr,size)
					if (!first) {
						layer.msg('第' + obj.curr + '页', {
							offset: 'b'
						});
					}
				}
			});
		});
	})
}
function pageword(){
	var size = 10
	if($("#placeholderInput").val().length!=0){
	mypost(getusercount, {word:$("#placeholderInput").val()}, function(data) {
		console.log("获取总用户数")
		console.log(data)
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage //分页 
			var layer = layui.layer //弹层
			//分页
			laypage.render({
				elem: 'pageDemo', //分页容器的id
				count: data.data, //数据总数量
				limit: size,
				skin: '#1E9FFF', //自定义选中色值
				//,skip: true //开启跳页
				jump: function(obj, first) {
					$("#tbody").empty()
					search(obj.curr,size)
					if (!first) {
						layer.msg('第' + obj.curr + '页', {
							offset: 'b'
						});
					}
				}
			});
		});
	})
	}else{
		pagezz()
	}
}