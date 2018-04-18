$('aside').load('/blog/manage/common/aside.html');

//设置导航高亮
function setNavActive(){
	var pageName = getPageName();
	$('#sidebar li').removeClass('active');
	$('#sidebar li a[href="'+ pageName +'"]').parent().addClass('active');
}

//返回页面名称
function getPageName(){
	var href = location.href;
	var pageArr = href.split('.')[0].split('/');
	var pageName = pageArr[pageArr.length - 1] + '.html';
	return pageName;
}

//load当前登录用户名
function initUser(){
	//$.ajaxSettings.async = false;//设置同步
	$.post('/blog/manage/func/app/initUser.php' , '' , function(res){
		if(res == -1){
			location.href = '/blog/manage/login.html';
		}
		else{
			$('#userName').text(res);
			$('body').show();
			if($('input[name=tagName]')){
				$('input[name=tagName]').focus();
			}
		}
	});
	//$.ajaxSettings.async = true;//恢复至异步
}

function handleStr(str){
	var newStr = '';
	var pattern = new RegExp("[`~!@#$^&*()=|{}\"':;',\\[\\]<>?~！@#￥……&*（）&;—|{}【】‘；：”“'。、？]");        
	for(var i = 0; i < str.length; i++) {   
	    newStr += str.substr(i, 1).replace(pattern, '');
	}
	str = newStr;
	newStr = '';
	for(var i = 0; i < str.length; i++) {   
	    newStr += str.substr(i, 1).replace(new RegExp('\''), '');
	}
	return newStr;
}

