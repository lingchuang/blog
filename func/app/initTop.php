<?php
	require_once './common/connectDb.php';
	
	$type = $_POST['type'];
	$resultArr = array();
	$conn = connectDb();
	if($type == 1){//最新文章
		$sql = "SELECT id,articleTitle FROM tb_article WHERE isShow != 0 ORDER BY id DESC LIMIT 0,10";
		$result = mysqli_query($conn,$sql);
	}
	if($type == 2){//点击排行
		$sql = "SELECT id,articleTitle FROM tb_article WHERE isShow != 0 ORDER BY viewCount DESC LIMIT 0,10";
		$result = mysqli_query($conn,$sql);
	}
	$count = mysqli_num_rows($result);
	for($i = 0;$i < $count;$i ++){
		$tempResultArr = mysqli_fetch_assoc($result);
		array_push($resultArr , $tempResultArr);
	}
	echo json_encode($resultArr);
	