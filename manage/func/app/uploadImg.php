<?php

	//header('Content-Type:text/html;charset=utf-8');

	require_once './common/connectDb.php';
	
	$uploadDir = '../../../images/upload/';
	$file = $_FILES['file'];
	$fileName = iconv('UTF-8','GBK',$file['name']);
	$uploadFileDir = $uploadDir.$fileName;
	
	$typeArr = ['jpg','png','gif'];							//支持上传的图片类型
	$type = strtolower(substr(strrchr($fileName, '.'), 1)); //获取文件类型 
	if(!in_array($type, $typeArr)){
	    echo -1;
	    exit;
	}
	$isExists = file_exists($uploadFileDir);
	if(!$isExists){
		$isUpload = move_uploaded_file($file['tmp_name'], $uploadFileDir);
		if($isUpload){
			$fileName = iconv('GBK','UTF-8',$fileName);
			$imgLink = '/blog/images/upload/' . $fileName;
			$conn = connectDb();
			$sql = "INSERT INTO tb_img(imgLink,imgName) VALUES ('$imgLink','$fileName')";
			$result = mysqli_query($conn,$sql);
			if($result){
				echo 1;
			}
			else{
				echo -3;
			}
			mysqli_close($conn);
		}
	}
	else{
	    echo -2;
	}









