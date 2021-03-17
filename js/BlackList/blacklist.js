$(function() {
	// alert(getCookie("token"))
	pagez()
	
})


function pagez(){
	
	
	

		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage //分页 
			var layer = layui.layer //弹层
		
		
			//分页
			laypage.render({
				elem: 'pageDemo', //分页容器的id
				count: 10, //总页数
				skin: '#1E9FFF', //自定义选中色值
				//,skip: true //开启跳页
				jump: function(obj, first) {
					$("#tbody").empty() 
					getinfo(obj.curr)
					if (!first) {
						layer.msg('第' + obj.curr + '页', {
							offset: 'b'
						});
					}
				}
			});
		
		});
	
	
	
	
}


/**
 * 获取黑名单信息
 */
function getinfo(page) {
	myget(getBlackInfo, {
		token: getCookie("token"),
		word: $("#placeholderInput").val(),
		size:10,
		page:page
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var count = 1 + (page-1) * 10;
			data.data.blacklist.forEach(item => {
				
				var temp = count++;
				$("tbody").append(add(temp,item.bid,item.userid,item.username,item.useravatar,item.createtime))
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
function search(){
	if($("#placeholderInput").val().length == 0){
		location.reload();
	}else{
		
	mypost1(getInfoblacklist, {word:$("#placeholderInput").val()}, function(data) {
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage //分页 
			var layer = layui.layer //弹层
		
			//向世界问个好
			layer.ready(function() {
				layer.msg('Hello World');
			});
		
			//分页
			
			laypage.render({
				elem: 'pageDemo', //分页容器的id
				count: data.data, //总页数
				skin: '#1E9FFF', //自定义选中色值
				//,skip: true //开启跳页
				jump: function(obj, first) {
					$("#tbody").empty()
					select(obj.curr)
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

}



function select(page){
	$("#tbody").empty()
	
	if($("#placeholderInput").val().length == 0){
		getinfo()
	}else{
		myget(getBlackInfo, {
			token: getCookie("token"),
			word: $("#placeholderInput").val(),
			size:10,
			page:page,
			
		}, function(data) {
			console.log(data)
			if (data.code == 200) {
				var count = 1;
				data.data.blacklist.forEach(item => {
					var temp = count++;
					$("tbody").append(add(temp,item.bid,item.userid,item.username,item.useravatar,item.createtime))
				})
			} else if(data.code == -1) {
				alert("暂无数据,将查询所有...")
				getinfo()
			} else {
				alert("请重新登录验证身份!")
				window.location.href = "../../index.html";
			}
		})
	}
	
}



/**
 * 动态生成用户数据
 * 

 */
function add(no,bid,userid,username,useravatar,createtime) {
	
	
	var div = '<tr>'+
					'<th scope="row">' + no + '</th>'+
					'<td class="text-truncate">'+
						'<div class="navbar-custom-menu">'+
							'<ul class="nav navbar-nav">'+
								'<li class="dropdown user user-menu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img src="'+useravatar+'"'+
										'class="user-image" alt="User Image" id="Ravatar"> <span class="hidden-xs" id="Rname">'+username+'</span> </a>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</td>'+
					'<td class="text-truncate">'+bid+'</td>'+
					'<td class="text-truncate">'+userid+'</td>'+
				
					'<td class="text-truncate">'+createtime+'</td>'+
					
					'<td class="text-truncate"><button class="btn btn-primary" type="button" onclick="delinfo('+userid+')">取消黑名单</button></td>'+
			'</tr>'
	return div
}


/**
 * 取消黑名单
 * 
 */
function delinfo(userid) {
	mypost1(setblack, {
		token: getCookie("token"),
		userid:userid,
	}, function(data) {
		
		if (data.code == 200) {
			alert("取消成功");
			location.reload();

		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}



