<?php
	require_once './common/connectDb.php';
	
	session_start();
	if(!empty($_SESSION['articleId'])){
		$articleId = $_SESSION['articleId'];

		if($articleId){
			$conn = connectDb();
			$resultArr = array();
			$sql = "SELECT * FROM tb_article WHERE id = $articleId";
			$result = mysqli_query($conn,$sql);
			$tempResultArr = mysqli_fetch_assoc($result);
			array_push($resultArr , $tempResultArr); 
			echo json_encode($resultArr);
		}
		else{
			echo 0;
		}
	}
	
	