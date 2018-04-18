<?php
	require_once './common/connectDb.php';

	$showData = $_GET['showData'];
	$currentPage = $_GET['currentPage'];
	$articleTag = $_GET['articleTag'];
	$start = ($currentPage - 1) * $showData;
	
	$conn = connectDb();
	
	if($articleTag == 'all'){
		$sql = "SELECT * FROM tb_article WHERE isShow != 0 ORDER BY id DESC LIMIT $start,$showData";
		$result = mysqli_query($conn,$sql);
	}
	else{
		$sql = "SELECT * FROM tb_article WHERE isShow != 0 AND articleTag = '$articleTag' ORDER BY id DESC LIMIT $start,$showData";
		$result = mysqli_query($conn,$sql);
	}
	
	$count = mysqli_num_rows($result);
	if($count > 0){
		$resultArr = array();
		for($i = 0;$i < $count;$i ++){
			$tempResultArr = mysqli_fetch_assoc($result);
			array_push($resultArr , $tempResultArr);
		}
		echo json_encode($resultArr);
	}
	else{
		echo 0;
	}
	