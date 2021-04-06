
	
	

$(function() {
	var token = getCookie("roottoken")
	console.log(token)
	mypost(getpostpartcount, {
		token: token
	}, function(data) {
		console.log(getCookie("roottoken"))
		console.log(data)
		if (data.code == 200) {
			var thiz = data.data
			
			var dateList = []
			for( var i = 0 ;i < thiz.length ;i++){
				var list = []
				list[0]=thiz[i].name
				list[1]=parseInt(thiz[i].value)
				$("#num-box").append(addnum(thiz[i].name+" "+thiz[i].value))
				dateList[i]=list
			}
	
			   var chart = {
			       plotBackgroundColor: null,
			       plotBorderWidth: null,
			       plotShadow: false
			   };
			   var title = {
			      text: '各个板块帖子数比例图'   
			   };      
			   var tooltip = {
			      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			   };
			   var plotOptions = {
			      pie: {
			         allowPointSelect: true,
			         cursor: 'pointer',
			         dataLabels: {
			            enabled: false           
			         },
			         showInLegend: true
			      }
			   };
			   var series= [{
			      type: 'pie',
			      name: 'Browser share',
			      data: dateList
			   }];     
			      
			   var json = {};   
			   json.chart = chart; 
			   json.title = title;     
			   json.tooltip = tooltip;  
			   json.series = series;
			   json.plotOptions = plotOptions;
			   $('#container').highcharts(json);  


		}
	},"GET")
})

/**
 * 动态生成 热词搜索榜
 * 
 * @param {Object} hotword
 */
function addnum(hotword) {
	var a = '<a href="#">'+
				'<span class="profile-status invisable pull-right"></span>'+
				'<div class="mail-contnet">'+
					'<span class="mail-desc">'+hotword+'</span>'+
				'</div>'+
			'</a>'
	return a
}