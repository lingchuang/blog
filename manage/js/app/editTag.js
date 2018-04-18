
isEdit();
function isEdit() {
	$.post('/blog/manage/func/app/isEdit.php', { type : 1 } , function(res) {
		if(res != 0){//编辑标签
			initTag();
		}
	});
}

function initTag () {
	$.post('/blog/manage/func/app/initTag.php', '' , function(res) {
		if(res != 0){
			res = eval(res);
			$('input[name=tagName]').val(res[0].tagName);
		}
	});
}

//保存标签
$('a[name=save]').on('click',function(){
	var tagName = $('input[name = tagName]').val();
	tagName = handleStr(tagName);
	if(tagName){
		$.post('/blog/manage/func/app/editTag.php', { tagName : tagName } , function(res) {
			if(res != 0){
				if(res == -3){//文章表标签修改失败
					layer.msg('文章表标签修改失败！',{ 
						time : 2000 
					},function(){
						return false;
					});
				}
				if(res == -2){//标签表修改失败
					layer.msg('标签表修改失败！',{ 
						time : 2000 
					},function(){
						return false;
					});
				}
				if(res == -1){//已存在
					layer.msg('该标签已存在！',{ 
						time : 2000 
					},function(){
						return false;
					});
				}
				if(res == 1){//修改成功
					layer.msg('标签修改成功！',{ 
						time : 2000 
					},function(){
						location.href = '/blog/manage/tagLists.html';
					});
				}
				if(res == 2){//添加成功
					layer.msg('标签添加成功！',{ 
						time : 2000 
					},function(){
						history.go(0);
					});
				}
			}
			else{
				layer.msg('操作失败！',{ 
					time : 2000 
				},function(){
					return false;
				});
			}
		});
	}
	else{
		layer.msg('请输入标签名！',{ 
			time : 2000 
		});
		$('input[name = tagName]').focus();
		return false;
	}
});