$(function() {
	// alert(getCookie("roottoken"))
	// getinfo();
	pagezz();
	var postid = GetQueryString("postid")
	$("#codezz").text(" postid : " +postid)
})

/**
 * 获取帖子信息
 */
function getinfo(page,size) {
	mypost(getPostComment, {
		token: getCookie("roottoken"),
		size:size,
		page:page,
		postid:GetQueryString("postid")
	}, function(data) {
		console.log(data)
		if (data.code == 200) {
			var count = 1;
			data.data.comments.forEach(item => {
				var temp = count++;
				$("tbody").append(add(temp, item.commentid,item.commenttext,item.createtime,item.likecount,item.userinfo.uname,item.userinfo.useravatar));
			})
		} else if (data.code == -1) {
			alert("暂无数据!")
		}
	})
}

/**
 * 条件查询
 */
function search() {

	$("#tbody").empty()

	if ($("#placeholderInput").val().length == 0) {
		getinfo()
	} else {
		mypost(getPostComment, {
			token: getCookie("roottoken"),
			word: $("#placeholderInput").val(),
			postid:GetQueryString("postid")
		}, function(data) {
			console.log(data)
			if (data.code == 200) {
				var count = 1;
			data.data.comments.forEach(item => {
				var temp = count++;
				$("tbody").append(add(temp, item.commentid,item.commenttext,item.createtime,item.likecount,item.userinfo.uname,item.userinfo.useravatar));
			})
			} else if (data.code == -1) {
				alert("暂无数据,将查询所有...")
				getinfo()
			}
		})
	}


}

/**
 * 动态生成帖子数据
 * 
 * @param {Object} no
 * @param {Object} type 帖子类型
 * @param {Object} posttext
 * @param {Object} postimg
 * @param {Object} postvideo
 * @param {Object} createtime
 * @param {Object} postid
 * @param {Object} placaname
 * @param {Object} uname
 * @param {Object} uavatar
 */
function add(no, commentid,commenttext,createtime,likecount,uname,useravatar) {



	var div = '<tr>'+
					'<th scope="row">' + no + '</th>'+
					'<td class="text-truncate">'+commentid+'</td>'+
					'<td class="text-truncate">'+
						'<div class="navbar-custom-menu">'+
							'<ul class="nav navbar-nav">'+
								'<li class="dropdown user user-menu"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img src="'+useravatar+'"'+
										'class="user-image" alt="User Image" id="Ravatar"> <span class="hidden-xs" id="Rname">'+uname+'</span> </a>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</td>'+
					'<td class="text-truncate">'+commenttext+'</td>'+
					'<td class="text-truncate">'+createtime+'</td>'+
					'<td class="text-truncate">'+likecount+'</td>'+
					'<td class="text-truncate">' +
					'<button class="btn btn-danger" type="button" onclick="delComment(' + commentid + ')">删除</button>' +
					'</td>' +
			'</tr>'
	return div
}

/**
 * 删除指定评论
 * 
 * @param {Object} no
 */
function delComment(no) {
	mypost(delPostComment, {
		token: getCookie("roottoken"),
		commentid: no
	}, function(data) {
		console.log(data);
		if(data.code==200){
			alert("删除成功")
			location.reload(true);
		}else{
			alert("删除失败");
		}
	},"POST")
}

function pagezz(){
	var size = 10
	mypost(getPostCommentCount, {postid:GetQueryString("postid")}, function(data) {
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
	mypost(getPostCommentCount, {word:$("#placeholderInput").val(),postid:GetQueryString("postid")}, function(data) {
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


function add0(m){return m<10?'0'+m:m }
function format(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
var time = new Date(shijianchuo);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}