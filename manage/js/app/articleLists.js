initArticleLists();

//加载文章列表
function initArticleLists(){
	$.post('/blog/manage/func/app/initArticleLists.php' , '' , function(res){
		var dataHtml = initData(res,'#articleListsBody-tp');
		$('#articleListsBody').empty().html(dataHtml);
		$('.data-table').dataTable({
			"bJQueryUI": true,
			"sPaginationType": "full_numbers",
			"sDom": '<""l>t<"F"fp>'
		});
		$('select').select2();
	});
}

//编辑文章
function editArticle(id){
	$.post('/blog/manage/func/app/editId.php' , { type : 2 , articleId : id } , function(res){
		if(res == 1){
			location.href = '/blog/manage/editArticle.html';
		}
	});
}

//删除文章
function delArticle(id){
	layer.confirm('是否确认删除？', {
	  btn: ['是','否'], //按钮
	  title : false
	}, function(){
	  	$.post('/blog/manage/func/app/delArticle.php' , { id : id } , function(res){
			if(res == 1){//删除成功
				layer.msg('文章已删除！',{ time : 2000 },function(){
					location.reload();
				});
			}
			else{
				layer.msg('删除失败！',{ time : 2000 },function(){
					return false;
				});
			}
		});
	});
}