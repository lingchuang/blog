//登陆按钮
$('a[name=login]').on('click',function(){
	var userName = $('input[name = userName]').val();
	var userPwd = $('input[name = userPwd]').val();
	var params = { 
		userName : userName , 
		userPwd : userPwd
	};
	$.post('/blog/manage/func/app/login.php' , params , function(res){
		if(res == 1){//登陆成功
			location.href = '/blog/manage/editArticle.html';
		}
		else{//登陆失败
			layer.msg('媳妇儿，用户名或密码不正确哦~',{
				time : 2000
			});
			return false;
		}
	});
});

//登陆回车监听
$('input[name = userName],input[name = userPwd]').keyup(function(e){
	var keyCode = e.keyCode;
	if(keyCode == 13){//回车
		$('a[name = login]').click();
	}
});
