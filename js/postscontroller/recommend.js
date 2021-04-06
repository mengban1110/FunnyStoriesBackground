$(function() {
	// alert(getCookie("roottoken"))
	pagezz()
	
})


function pagezz(){
	mypost1(getInfoPartcount, {}, function(data) {
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage //分页 
			var layer = layui.layer //弹层
		
			
		
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
		token: getCookie("roottoken"), 
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
		
	mypost1(getInfoPart, {word:$("#placeholderInput").val()}, function(data) {
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage //分页 
			var layer = layui.layer //弹层
		
			
		
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
			token: getCookie("roottoken"),
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
	
	var postimg = toArrSrc(postimg) //将图片地址转换为数组
	var imgFlag = openimgDiv(postimg) //动态返回查看图片按钮状态

	var videoFlag = openvideoDiv(postvideo) //动态返回查看视频按钮状态
	
	var div = '<tr>'+
					'<th scope="row">' + no + '</th>'+
					
					'<td class="text-truncate">'+placename+'</td>'+
					'<td class="text-truncate">'+placeid+'</td>'+
					'<td class="text-truncate">'+
						'<div class="navbar-custom-menu">'+
							'<ul class="nav navbar-nav">'+
								'<li class="dropdown user user-menu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img src="'+useravatar+'"'+
										'class="user-image" alt="User Image" id="Ravatar"> <span class="hidden-xs" id="Rname">'+uname+'</span> </a>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</td>'+
		
					
					'<td class="text-truncate">'+like+'</td>'+
					'<td class="text-truncate">'+share+'</td>'+
					'<td class="text-truncate">'+comment+'</td>'+
					'<td class="text-truncate">'+postid+'</td>'+
					'<td class="text-truncate">'+posttext+'</td>'+
					'<td class="text-truncate">'+imgFlag+'</td>'+
					'<td class="text-truncate">'+videoFlag+'</td>'+
					'<td class="text-truncate">'+isaudit+'</td>'+
					'<td class="text-truncate">'+createtime+'</td>'+
					'<td class="text-truncate"><button class="btn btn-primary" type="button" onclick="delrecommend('+postid+')">取消推荐</button></td>'+
			'</tr>'
	return div
}

/**
 * 取消推荐
 * 
 */
function delrecommend(postid) {
	mypost1(setdelrecommend, {
		token: getCookie("roottoken"),
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

/**
 * 将图片链接动态展示出来
 * 
 * @param {Object} postimg
 */
function parseArrSrcToLi(postimg) {
	var label = "";

	var count = 1;
	postimg.forEach(item => {
		var temp = '<li><a href="' + item + '" target="_blank">第' + count + '张图片</a></li>'
		label += temp
		count++;
	})

	console.log(label)

	return label;
}


/**
 * 判断是否为空格
 */
function isNull(str) {
	if (str == "") return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}

/**
 * 动态返回查看图片按钮状态
 * 
 * @param {Object} postimg
 */
function openimgDiv(postimg) {
	if (!isNull(postimg) && postimg.length != 0 && postimg[0] != undefined) {
		var label = parseArrSrcToLi(postimg)

		var div = '<div class="btn-group">' +
			'<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"' +
			'aria-expanded="false">查看图片 ( ' + postimg.length + ' 张 ) <span class="caret"></span></button>' +
			'<ul class="dropdown-menu">' +
			label +
			'<li role="separator" class="divider"></li>' +
			'<li><a onclick="openImg(\'' + postimg + '\')">查看全部</a></li>' +
			'</ul>' +
			'</div>'
	} else {
		var div = '<div class="btn-group">' +
			'<button type="button" class="btn btn-primary btn-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"' +
			'aria-expanded="false">暂无图片 <span class="caret"></span></button>' +
			'<ul class="dropdown-menu">' +
			'<li role="separator" class="divider"></li>' +
			'<li>别看啦 没有图片</li>' +
			'</ul>' +
			'</div>'
	}

	return div
}

/**
 * 将图片地址转换成数组对象
 * 
 * @param {Object} postimg
 */
function toArrSrc(postimg) {
	if (postimg != null && postimg.indexOf("[") == 0) {
		var arr = JSON.parse(postimg);
	} else {
		var arr = []
		arr.push(postimg)
	}
	return arr
}
/**
 * 动态返回查看视频按钮状态
 * 
 * @param {Object} postimg
 */
function openvideoDiv(Video) {
	if (!isNull(Video) && Video != undefined) {
		var div = '<button class="btn btn-primary" type="button" onclick="openVideo(\'' + Video + '\')">查看视频</button>'
	} else {

		var div = '<button class="btn btn-primary btn-outline" type="button">暂无视频</button>'
	}
	return div
}



/**
 * 查看帖子视频
 * 
 * @param {Object} postimg
 */
function openVideo(video) {
	window.open(video);
}


/**
 * 查看帖子图片
 * 
 * @param {Object} postimg
 */
function openImg(postimgs) {
	var arr = postimgs.split(',')
	console.log(arr)
	arr.forEach(item => {
		window.open(item);
	})
	alert("已显示 " + arr.length + " 张图片")
}

