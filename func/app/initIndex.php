<?php

	require_once './common/connectDb.php';
	
	if(isset($_POST['articleAuthor']) && !empty($_POST['articleAuthor'])){
		$articleAuthor = $_POST['articleAuthor'];
		$conn = connectDb();
		$sql = "SELECT * FROM tb_article WHERE isShow != 0 AND isRecommend = 1 AND articleAuthor = '$articleAuthor' ORDER BY id DESC";
		$res = mysqli_query($conn,$sql);
		if($res){
			$resultArr = array();
			while($tempArr = mysqli_fetch_assoc($res)){
				array_push($resultArr , $tempArr);
			}
			echo json_encode($resultArr);
		}
	}