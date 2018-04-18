<?php
	require_once './common/connectDb.php';
	
	session_start();
	if(!empty($_SESSION['tagId'])){
		$tagId = $_SESSION['tagId'];

		if($tagId){
			$conn = connectDb();
			$resultArr = array();
			$sql = "SELECT tagName FROM tb_tag WHERE id = $tagId";
			$result = mysqli_query($conn,$sql);
			$tempResultArr = mysqli_fetch_assoc($result);
			array_push($resultArr , $tempResultArr); 
			echo json_encode($resultArr);
		}
		else{
			echo 0;
		}
	}
	
	