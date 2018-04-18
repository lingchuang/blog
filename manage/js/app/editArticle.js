var editor = editormd({
        id      : "editormd",
        width   : "99%",
        height  : 600,
        path    : "/blog/manage/js/lib/",
        saveHTMLToTextarea : true,
        emoji 	: true
    });
    
initTagsSel();

//加载标签
function initTagsSel(){
	$.ajaxSettings.async = false;//设置同步
	$.post('/blog/manage/func/app/inittagLists.php' , '' , function(res){
		res = eval(res);
		var opHtml = '';
		for(var i = 0;i < res.length;i ++){
			opHtml += '<option value="'+ res[i].tagName +'">'+ res[i].tagName +'</option>';
		}
		$('#tagsSel').empty().append(opHtml);
		$('select').select2();
	});
	$.ajaxSettings.async = true;//恢复至异步
}

isEdit();
function isEdit() {
	$.post('/blog/manage/func/app/isEdit.php', { type : 2 } , function(res) {
		if(res != 0){//编辑文章
			initData();
		}
	});
}

function initData () {
	$.post('/blog/manage/func/app/initArticle.php', '' , function(res) {
		if(res != 0){
			res = eval(res);
			var dataObj = res[0];
			$('input[name=articleTitle]').val(dataObj.articleTitle);
			$('input[name=articleImgLink]').val(dataObj.articleImgLink);
			$('textarea[name=articleDesc]').val(dataObj.articleDesc);

			editor.setMarkdown(dataObj.articleContent);
			
			var articleTag = dataObj.articleTag;
			setOpCkd(articleTag);//设置下拉选中项
			
			var isRecommend = dataObj.isRecommend;
			var recommendObj = $('input[data-type = recommend]');
			if(isRecommend == 0){
				recommendObj.eq(0).parent().removeClass('checked');
				recommendObj.eq(1).parent().addClass('checked');
			}

			var isShow = dataObj.isShow;
			var isShowObj = $('input[data-type = isShow]');
			if(isShow == 0){
				isShowObj.eq(0).parent().removeClass('checked');
				isShowObj.eq(1).parent().addClass('checked');
			}
		}
	});
}

//设置下拉选中项
function setOpCkd(articleTag){
	$('#s2id_tagsSel span').text(articleTag);
	/*var opsObj = $('#tagsSel').find('option');
	for(var i = 0;i < opsObj.size();i ++){
		var opText = opsObj[i].text;
		if(opText == articleTag){
			$('#s2id_tagsSel span').text(articleTag);
			break;
		}
	}*/
}

$('a[name=save]').on('click',function(){
	editor.setWatch = true;
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = initTime(myDate.getMonth() + 1);
	var day = initTime(myDate.getDate());
	var hours = initTime(myDate.getHours());
    var minutes = initTime(myDate.getMinutes());
    var seconds = initTime(myDate.getSeconds());
    var publishTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds; 
	var articleTitle = handleStr($.trim($('input[name=articleTitle]').val()));
	var articleImgLink = handleStr($.trim($('input[name=articleImgLink]').val()));
	var articleDesc = $.trim($('textarea[name=articleDesc]').val());
	var articleTag = $('#s2id_tagsSel span').text();
	var isRecommend = 1;
	var recommendObj = $('input[data-type = recommend]');
	var flag1 = recommendObj.eq(0).parent().hasClass('checked');
	if(!flag1){
		isRecommend = 0;
	}
	var isShow = 1;
	var isShowObj = $('input[data-type = isShow]');
	var flag2 = isShowObj.eq(0).parent().hasClass('checked');
	if(!flag2){
		isShow = 0;
	}
	var articleContent = editor.getMarkdown();
	var articleHtml = editor.getPreviewedHTML();
	if(!articleTitle){
		layer.msg('媳妇儿，还未输入文章标题哦~',{ time : 2000 });
		$('input[name=articleTitle]').focus();
		return false;
	}
	if(articleTitle.length > 37){
		layer.msg('媳妇儿，文章标题不能超过37个字符哦~',{ time : 2000 });
		$('input[name=articleTitle]').focus();
		return false;
	}
	if(!articleImgLink){
		layer.msg('媳妇儿，还未粘贴封面图片链接哦~',{ time : 2000 });
		$('input[name=articleImgLink]').focus();
		return false;
	}
	if(!articleDesc){
		layer.msg('媳妇儿，还未编辑摘要哦~',{ time : 2000 });
		$('textarea[name=articleDesc]').focus();
		return false;
	}
	if(articleDesc.length > 260){
		layer.msg('媳妇儿，文章摘要不能超过260个字符哦~',{ time : 2000 });
		$('textarea[name=articleDesc]').focus();
		return false;
	}
	if(!articleContent){
		layer.msg('媳妇儿，还未编辑文章哦~',{ time : 2000 });
		$('#editormd textarea').focus();
		return false;
	}

	var params = {
		articleTitle : articleTitle,
		articleImgLink : articleImgLink,
		articleTag : articleTag,
		isRecommend : isRecommend,
		isShow : isShow,
		articleDesc : articleDesc,
		articleContent : articleContent,
		articleHtml : articleHtml,
		publishTime : publishTime
	}

	$.post('/blog/manage/func/app/editArticle.php',params,function(res){
		if(res == 1){//修改成功
			layer.msg('文章修改成功！',{ time : 2000 },function(){
				location.href = '/blog/manage/articleLists.html';
			});
		}
		if(res == 2){//新增文章
			layer.msg('文章保存成功！',{ time : 2000 },function(){
				location.href = '/blog/manage/articleLists.html';
			});
		}
	});
});

function initTime(time){
    time = parseInt(time);
    return time = time < 10 ? '0' + time : time;
}
