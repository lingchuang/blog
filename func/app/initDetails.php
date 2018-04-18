<?php
	require_once './common/connectDb.php';
	
	$articleId = $_GET['articleId'];
	
	$conn = connectDb();
	$resultArr = array();
	$sql = "SELECT * FROM tb_article WHERE id = $articleId AND isShow = 1";
	$result = mysqli_query($conn,$sql);
	$tempResultArr = mysqli_fetch_assoc($result);
	array_push($resultArr , $tempResultArr); 
	echo json_encode($resultArr);
	
	