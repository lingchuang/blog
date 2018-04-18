<?php
	require_once './common/connectDb.php';

	$id = $_POST['id'];
	$delTagName = $_POST['delTagName'];

	$conn = connectDb();
	$echoR = 0;

	$sql = "SELECT COUNT(1) FROM tb_article WHERE articleTag = '$delTagName'";
	$result = mysqli_query($conn,$sql);
	$resultArr = mysqli_fetch_row($result);
	if($resultArr[0] > 0){//有文章正在使用该标签
		$echoR = -1;
	}
	else{
		$sql = "DELETE FROM tb_tag WHERE id = $id";
		$result = mysqli_query($conn,$sql);
		if($result){
			$echoR = 1;
		}
		else{//删除标签失败
			$echoR = -2;
		}
	}
	echo $echoR;
	



	