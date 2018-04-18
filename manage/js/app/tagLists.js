//clearTagSession();
function clearTagSession () {
	$.post('/blog/manage/func/app/clearSession.php','',function(res){
		console.log(res);
	});
}

initTagLists();

//加载标签列表
function initTagLists(){
	$.post('/blog/manage/func/app/initTagLists.php' , '' , function(res){
		res = eval(res);
		var trHtml = '';
		for(var i = 0;i < res.length;i ++){
			trHtml += '<tr>';
			trHtml += '<td>'+ res[i].tagName +'</td>';
			trHtml += '<td>';
			trHtml += 
					'<button class="btn btn-primary btn-mini" onclick="return editTag('+ res[i].id +');">' +
						'<i class="icon-pencil icon-white"></i> ' +
						'编辑' +
					'</button> ';
			trHtml += 
					//'<button class="btn btn-danger btn-mini" onclick="return delTag('+ res[i].id +','+ (res[i].tagName).toString() +');">' +
					'<button class="btn btn-danger btn-mini" data-delTag = "'+ res[i].tagName  +'" onclick="return delTag(this,'+ res[i].id +');">' +
						'<i class="icon-remove icon-white"></i> ' +
						'删除' +
					'</button>';	
			trHtml += '</td>';
			trHtml += '</tr>';
		}
		$('#tagListsBody').empty().append(trHtml);
		$('.data-table').dataTable({
			"bJQueryUI": true,
			"sPaginationType": "full_numbers",
			"sDom": '<""l>t<"F"fp>'
		});
		$('select').select2();
	});
}

//编辑标签
function editTag(id){
	$.post('/blog/manage/func/app/editId.php' , { type : 1 , tagId : id } , function(res){
		if(res == 1){
			location.href = '/blog/manage/editTag.html';
		}
	});
}

//删除标签
function delTag(obj,id){
	
	var delTagName = $(obj).attr('data-delTag');

	layer.confirm('是否确认删除？', {
	  btn: ['是','否'], //按钮
	  title : false
	}, function(){
	  	$.post('/blog/manage/func/app/delTag.php' , { id : id , delTagName : delTagName} , function(res){
			if(res == -2){//删除失败
				layer.msg('该标签删除失败！',{ time : 2000 },function(){
					return false;
				});
			}
			if(res == -1){//删除失败
				layer.msg('有文章正在使用该标签，该标签不能删除！',{ time : 2000 },function(){
					return false;
				});
			}
			if(res == 1){//删除成功
				layer.msg('该标签已删除！',{ time : 2000 },function(){
					location.reload();
				});
			}

		});
	});
}