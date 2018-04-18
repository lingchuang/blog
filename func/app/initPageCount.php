<?php
	require_once './common/connectDb.php';

	$showData = $_GET['showData'];
	$articleTag = $_GET['articleTag'];
	
	$conn = connectDb();
	
	if($articleTag == 'all'){
		$sql = "SELECT COUNT(1) FROM tb_article WHERE isShow != 0";
		$result = mysqli_query($conn,$sql);
	}
	else{
		$sql = "SELECT COUNT(1) FROM tb_article WHERE isShow != 0 AND articleTag = '$articleTag'";
		$result = mysqli_query($conn,$sql);
	};
	$dataCount = mysqli_fetch_array($result)[0];
	$pageCount = $dataCount % $showData == 0 ? $dataCount / $showData : ceil($dataCount / $showData);
	echo $pageCount;