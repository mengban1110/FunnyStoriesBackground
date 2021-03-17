$(function() {
	// alert(getCookie("token"))
	pagezz()
	
})


function pagezz(){
	mypost(getInfoPartcount, {}, function(data) {
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
					getinfo(obj.curr)
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


/**
 * 获取推荐帖子信息
 */
function getinfo(page) {
	myget(getRecommendInfo, {
		token: getCookie("token"), 
		size:10,
		page:page
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var count = 1 + (page-1) * 10;
			data.data.postinfo.forEach(item => {
				
				var temp = count++;
				$("tbody").append(add(temp,item.userinfo.uname,item.userinfo.useravatar,item.place.placeid,item.place.placename,item.count.like,item.count.share,item.count.comment,item.postid,item.posttext,item.postimg,item.postvideo,item.isaudit,item.createtime))
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
		
	mypost(getInfoPart, {word:$("#placeholderInput").val()}, function(data) {
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
		myget(getRecommendInfoPart, {
			token: getCookie("token"),
			word: $("#placeholderInput").val(),
			size:10,
			page:page,
			
		}, function(data) {
			console.log(data)
			if (data.code == 200) {
				var count = 1;
				data.data.postinfo.forEach(item => {
					var temp = count++;
					$("tbody").append(add(temp,item.userinfo.uname,item.userinfo.useravatar,item.place.placeid,item.place.placename,item.count.like,item.count.share,item.count.comment,item.postid,item.posttext,item.postimg,item.postvideo,item.isaudit,item.createtime))
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
 * @param {Object} no
 * @param {Object} userid 
 * @param {Object} username
 * @param {Object} usersign
 * @param {Object} useravatar
 * @param {Object} dynamic
 * @param {Object} fans
 * @param {Object} concern
 * @param {Object} history
 * @param {Object} usersex
 * @param {Object} usermajor
 * @param {Object} userbir
 * @param {Object} ugraduate
 * @param {Object} uschool
 */
function add(no,uname,useravatar,placeid,placename,like,share,comment,postid,posttext,postimg,postvideo,isaudit,createtime) {
	

	
	var div = '<tr>'+
					'<th scope="row">' + no + '</th>'+
					'<td class="text-truncate">'+
						'<div class="navbar-custom-menu">'+
							'<ul class="nav navbar-nav">'+
								'<li class="dropdown user user-menu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img src="'+useravatar+'"'+
										'class="user-image" alt="User Image" id="Ravatar"> <span class="hidden-xs" id="Rname">'+uname+'</span> </a>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</td>'+
					'<td class="text-truncate">'+useravatar+'</td>'+
					'<td class="text-truncate">'+placeid+'</td>'+
					'<td class="text-truncate">'+placename+'</td>'+
					'<td class="text-truncate">'+like+'</td>'+
					'<td class="text-truncate">'+share+'</td>'+
					'<td class="text-truncate">'+comment+'</td>'+
					'<td class="text-truncate">'+postid+'</td>'+
					'<td class="text-truncate">'+posttext+'</td>'+
					'<td class="text-truncate">'+postimg+'</td>'+
					'<td class="text-truncate">'+postvideo+'</td>'+
					'<td class="text-truncate">'+isaudit+'</td>'+
					'<td class="text-truncate">'+createtime+'</td>'+
					'<td class="text-truncate"><button class="btn btn-primary" type="button" onclick="delrecommend('+postid+')">取消推荐</button></td>'+
			'</tr>'
	return div
}

/**
 * 判断是否在校生类型
 * 
 * @param {Object} type
 */
function istype(type){
	var typeStr;
	if(type == 1){
		typeStr = "在校生"
	}else if(type == 0){
		typeStr = "毕业生"
	}
	return typeStr;
}


/**
 * 取消推荐
 * 
 */
function delrecommend(postid) {
	mypost(setdelrecommend, {
		token: getCookie("token"),
		postid:postid,
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



