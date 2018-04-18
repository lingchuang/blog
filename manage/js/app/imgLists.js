initImgLists();

//加载文章列表
function initImgLists(){
	$.post('/blog/manage/func/app/initImgLists.php' , '' , function(res){
		res = eval(res);
		var trHtml = '';
		for(var i = 0;i < res.length;i ++){
			var tempResult = res[i];
			//var imgLink = '/blog/images/upload/' + res[i].imgLink;
			//console.log('imgLink：' + imgLink);
			
			trHtml += '<tr>';
			trHtml += '<td><img src=' + tempResult.imgLink + ' class="w-200 h-200"></td>';
			trHtml += '<td class="v-middle"> ' + tempResult.imgLink +' </td>';
			trHtml += '<td style="vertical-align:middle;">';
			trHtml += 
					'<button class="btn btn-danger btn-mini" onclick="return delImg('+ res[i].id +');">' +
						'<i class="icon-remove icon-white"></i> ' +
						'删除' +
					'</button>';	
			trHtml += '</td>';
			trHtml += '</tr>';
		}
		$('#imgListsBody').empty().append(trHtml);
		$('.data-table').dataTable({
			"bJQueryUI": true,
			"sPaginationType": "full_numbers",
			"sDom": '<""l>t<"F"fp>'
		});
		$('select').select2();
	});
}

//删除图片
function delImg(id){
	layer.confirm('是否确认删除？', {
	  btn: ['是','否'], //按钮
	  title : false
	}, function(){
	  	$.post('/blog/manage/func/app/delImg.php' , { id : id } , function(res){
			if(res == '-1'){//图片删除失败
				layer.msg('图片删除失败！',{
					time : 2000
				});
				return false;
			}
			if(res == '-2'){//图片删除成功，但是图片路径删除失败
				layer.msg('图片路径删除失败！',{
					time : 2000
				});
				return false;
			}
			if(res == '-3'){//服务器上不存在该图片
				layer.msg('服务器上不存在该图片！',{
					time : 2000
				});
				return false;
			}
			if(res == '-4'){//数据库图片名称为空
				layer.msg('数据库图片名称为空！',{
					time : 2000
				});
				return false;
			}
			if(res == '1'){//图片删除成功，但是图片路径删除失败
				layer.msg('删除成功！',{
					time : 2000
				},function(){
					history.go(0);
				});
				return false;
			}
		});
	});
}