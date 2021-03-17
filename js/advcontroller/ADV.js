$(function() {
	pagezz();
})

/**
 * 获取广告信息
 */
function getinfo(page,size) {
	mypost(getADVInfo, {
		token: getCookie("token"),
		size:size,
		page:page
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var count = 1;
			console.log(data)
			data.data.advert.forEach(item => {
				var temp = count++;
				$("tbody").append(add(temp,item.aid,
											   item.aimg,
											   item.acontext,
											   item.createtime))
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
	
	$("#tbody").empty()
	
	if($("#placeholderInput").val().length == 0){
		getinfo();
	}else{
		mypost(getADVInfo, {
			token: getCookie("token"),
			word: $("#placeholderInput").val()
		}, function(data) {
			if (data.code == 200) {
				var count = 1;
			console.log(data)
			data.data.advert.forEach(item => {
				var temp = count++;
				$("tbody").append(add(temp,item.aid,
											   item.aimg,
											   item.acontext,
											   item.createtime))
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
 * 动态生成广告数据
 */
function add(no,aid,aimg,acontext,createtime) {
	
	
	var div = '<tr>'+
					'<th scope="row">' + no + '</th>'+
					'<td class="text-truncate">'+aid+'</td>'+
					'<td class="text-truncate">'+
						'<div class="navbar-custom-menu">'+
							'<ul class="nav navbar-nav">'+
								'<li class="dropdown user user-menu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img src="'+aimg+'"'+
										'class="user-image" alt="User Image" id="Ravatar"></a>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</td>'+
					'<td class="text-truncate">'+acontext+'</td>'+
					'<td class="text-truncate">'+createtime+'</td>'+
					'<td class="text-truncate"><button class="btn btn-primary" type="button" onclick="deladv('+aid+')">删除</button>'+
					'</td>'+
			'</tr>'
	return div
}



/**
 * 删除广告
 * 
 */
function deladv(aid) {
	mypost(delADV,{"aid":aid,"token":getCookie("token")},function(data){
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
	var size = 1
	mypost(getadvcount, {}, function(data) {
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
	var size = 1
	if($("#placeholderInput").val().length!=0){
	mypost(getadvcount, {word:$("#placeholderInput").val()}, function(data) {
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