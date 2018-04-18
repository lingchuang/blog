var showData = 3;		//每页显示数据条数
var currentPage = 1;	//当前页码
var pageCount = 0;		//初始化总页数为0
var articleTag = getArticleTag();	//获取地址栏标签
articleTag = articleTag == '' || articleTag == undefined || articleTag == null ? 'all' : getArticleTag();

isArticleTag();		//是否是录入的标签
initPageCount();	//总页数
initArticleLists(showData,currentPage);		//加载文章列表

function isArticleTag () {
	$.ajaxSettings.async = false;
	$.get('/blog/func/app/isArticleTag.php',{ articleTag : articleTag },function(res){
		res = Number(res);
		if(res != 0){
			var position = '> <span>'+ articleTag +'</span>';
			$('#position').append(position);
		}
		else{
			articleTag = 'all';
		}
	});
	$.ajaxSettings.async = true;
}

//返回总页数
function initPageCount () {
	var params = {
		showData : showData,
		articleTag : articleTag
	}
	$.ajaxSettings.async = false;
	$.get('/blog/func/app/initPageCount.php',params,function(res) {
		pageCount = res;
	});
	$.ajaxSettings.async = true;
}

//分页
$('#paging').pagination({
    pageCount : pageCount,
    current : currentPage,
    jump : true,
    coping : true,
    homePage : '首页',
    endPage : '末页',
    prevContent : '上页',
    nextContent : '下页',
    callback : function(api){
    	currentPage = api.getCurrent();
    	initArticleLists(showData,currentPage);
    }
});

//加载文章列表
function initArticleLists (showData,currentPage) {
	var params = {
		showData : showData , 
		currentPage : currentPage ,
		articleTag : articleTag
	}
	$.get('/blog/func/app/articleLists.php' , params , function(res){
		res = eval(res);
		var articleHtml = '';
		var tempResultObj = '';
		for(var i = 0;i < res.length;i ++){
			tempResultObj = res[i];
			articleHtml += '<div class="blogs">';
			articleHtml += 
					'<h2>' +
				 		'<a href="details.html?articleId=' + tempResultObj.id + '" target="_blank">' + tempResultObj.articleTitle + '</a>' +
					'</h2>';
			articleHtml += 
					'<figure>' +
						'<a href="details.html?articleId=' + tempResultObj.id + '" class="block" target="_blank">' +
							'<img src="'+ tempResultObj.articleImgLink +'" class="w-240 h-160">' +
						'</a>' +
					'</figure>';
			articleHtml += 
					'<ul>' +
						'<p class="h-106">'+ tempResultObj.articleDesc +'</p>' +
						'<a href="details.html?articleId=' + tempResultObj.id + '" target="_blank" class="readmore">阅读全文&gt;&gt;</a>' +
					'</ul>';
			articleHtml += 
					'<p class="autor">' +
						 '<span>发布时间：'+ tempResultObj.publishTime +'</span>' +
			             '<span>作者：'+ tempResultObj.articleAuthor +'</span>'+
			             '<span>标签：【<a href="gossip.html?articleTag='+ tempResultObj.articleTag +'">'+ tempResultObj.articleTag +'</a>】</span>' +
			             '<span>历史阅读（'+ tempResultObj.viewCount +'）</span>' +
                    '</p>';
			articleHtml += '</div>';
		}
		$('#blogList').empty().append(articleHtml).show();
		if(pageCount > 1){
			$('#paging').show();
		}
		else{
			$('#paging').parents('.wrap:eq(0)').removeClass('m-t-20');
		}
		$('body,html').animate({scrollTop:0},200);
	});
}