$(function() {
	// alert(getCookie("token"))
	pagezzz()
	
})


function pagezzz(){
	
	
	
	var getusercount ="/api/adv/GetHistoryPage";
	mypost(getusercount, {}, function(data) {
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
 * 获取后台日志信息
 */
function getinfo(page) {
	myget(getloginfo, {
		token: getCookie("token"),
		size:10,
		page:page
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var count = 1 + (page-1) * 10;
			data.data.logs.forEach(item => {
				
				var temp = count++;
				$("tbody").append(add(temp,item.rootid,item.rootname,item.rootavatar,item.content,item.ip))
			})
		} else {
			alert("请重新登录验证身份!")
			window.location.href = "../../index.html";
		}
	})
}

/**
 * 动态生成用户数据
 * 

 */
function add(no,rootid,rootname,rootavatar,content,ip) {
	
	
	var div = '<tr>'+
					'<th scope="row">' + no + '</th>'+
					'<td class="text-truncate">'+
						'<div class="navbar-custom-menu">'+
							'<ul class="nav navbar-nav">'+
								'<li class="dropdown user user-menu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img src="'+rootavatar+'"'+
										'class="user-image" alt="User Image" id="Ravatar"> <span class="hidden-xs" id="Rname">'+rootname+'</span> </a>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</td>'+
					'<td class="text-truncate">'+rootid+'</td>'+

					'<td class="text-truncate">'+content+'</td>'+
					'<td class="text-truncate">'+ip+'</td>'+
					
					
			'</tr>'
	return div
}



