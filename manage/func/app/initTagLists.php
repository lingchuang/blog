<?php
	require_once './common/connectDb.php';

	$conn = connectDb();
	$sql = "SELECT * FROM tb_tag";
	$result = mysqli_query($conn,$sql);
	
	$count = mysqli_num_rows($result);
	if($count > 0){
		$resultArr = array();
		for($i = 0;$i < $count;$i ++){
			$tempResultArr = mysqli_fetch_assoc($result);
			array_push($resultArr , $tempResultArr);
		}
		mysqli_free_result($result);
		mysqli_close($conn);
		echo json_encode($resultArr);
	}
	else{
		echo 0;
	}