//返回文章Id
function getArticleId () {
	var href = location.href;
	var articleId = href.split('=')[1];
	articleId = parseInt(articleId);
	if(isNaN(articleId)){
		articleId = 0;
	}
	return articleId;
}

initDetails();
function initDetails(){
	$.get('/blog/func/app/initDetails.php',{ articleId : getArticleId() },function(res){
		res = eval(res);
		var resultObj = res[0];
		if(resultObj){
			$('#articleTag').attr('href','/blog/article/gossip.html?articleTag=' + resultObj.articleTag);
			$('#articleTag').text(resultObj.articleTag);
			$('#articleTag').prev().show();
			$('#articleTitleNav,#articleTitle').text(resultObj.articleTitle);
			$('#articleTitleNav').prev().show();
			$('#publishTime').text(resultObj.publishTime);
			$('#articleAuthor').text(resultObj.articleAuthor);
			$('#viewCount').text(resultObj.viewCount);
			$('#articleContent').html(resultObj.articleHtml);
			addViewCount(getArticleId());
		}
		else{
			$('loading').empty();
			layer.msg('客官，该文章不存在或者已被管理员删除，看看别的文章吧！',{
				time : 3000
			},function(){
				location.href = '/blog/article/gossip.html';
			});
		}
	})
}


