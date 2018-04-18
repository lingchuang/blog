<?php
	require_once './common/connectDb.php';

	$conn = connectDb();
	$sql = "SELECT * FROM tb_img ORDER BY id DESC";
	$result = mysqli_query($conn,$sql);
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
	