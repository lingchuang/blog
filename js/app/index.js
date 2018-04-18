	
	var offsetX = $("#loveHeart").width() / 2;
	var offsetY = $("#loveHeart").height() / 2 - 55;
	var together = new Date();
	//together.setFullYear(2017, 04, 29);
	together.setFullYear(2017, 00, 00);
	together.setHours(0);
	together.setMinutes(0);
	together.setSeconds(0);
	together.setMilliseconds(0);
	if (!document.createElement('canvas').getContext) {
	    var msg = document.createElement("div");
	    msg.id = "errorMsg";
	    msg.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
	    document.body.appendChild(msg);
	    document.execCommand("stop");
	}
	else {
	    setTimeout(function () {
	        startHeartAnimation();
	    }, 500);
	    timeElapse(together);
	
	    setInterval(function () {
	
	        timeElapse(together);
	
	    }, 500);
	    adjustCodePosition();
	}
	
initArticleLists('admin1');
initArticleLists('admin2');

//加载文章列表
function initArticleLists(userName){
	$.post('/blog/func/app/initIndex.php' , { articleAuthor :  userName} , function(res){
		var dataHtml = initData(res,'#cont-article-list-tp');
		if(userName == 'admin1'){
			$('#cont-article-list-boy').empty().html(dataHtml).fadeIn(200);
		}
		if(userName == 'admin2'){    
			$('#cont-article-list-girl').empty().html(dataHtml).fadeIn(200);
		}
		$('loading').empty();
	});
}