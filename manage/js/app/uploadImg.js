// 初始化上传图片插件
$(function(){
	$("#zyUpload").zyUpload({
		width            :   "650px",                 // 宽度
		height           :   "400px",                 // 宽度
		itemWidth        :   "140px",                 // 文件项的宽度
		itemHeight       :   "115px",                 // 文件项的高度
		url              :   "/blog/manage/func/app/uploadImg.php", // 上传文件的路径
		fileType         :   ["jpg","png","gif"],	  // 上传文件的类型
		fileSize         :   51200000,                // 上传文件的大小
		multiple         :   true,                    // 是否可以多个文件上传
		dragDrop         :   false,                   // 是否可以拖动上传文件
		tailor           :   false,                   // 是否可以裁剪图片
		del              :   true,                    // 是否可以删除文件
		finishDel        :   true,  				  // 是否在上传文件完成后删除预览
		
		/* 外部获得的回调接口 */
		onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
		
		},
		onDelete: function(file, files){              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
		
		},
		onSuccess: function(file, response){ // 文件上传成功的回调方法
			response = Number(response);
			var msg = '';
			switch (response){
				case -3:
					msg = '数据库写入出错！';
					break;
				case -2:
					msg = '图片已存在！';
					break;
				case -1:
					msg = '媳妇儿，要上传jpg、png或者gif类型的图片哦~！';
					break;
				case 1:
					msg = '上传成功！';
					break;
				default:
					msg = '未知错误！';
			}
			layer.msg(msg,{ time : 2000 });
		},
		onFailure: function(file, response){          // 文件上传失败的回调方法
			
		},
		onComplete: function(response){           	  // 上传完成的回调方法
			
		}
	});
})
