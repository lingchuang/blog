<?php
	require_once './common/connectDb.php';

	$conn = connectDb();
	
	$sql = "SELECT COUNT(1) FROM tb_tag";
	$tagResult = mysqli_query($conn,$sql);
	if($tagResult){
		$tagCount = mysqli_fetch_array($tagResult)[0];
		$randArr = array();
		for ($i = 0;$i < 4; $i ++){
			$randNum = rand(0, $tagCount - 1);
			array_push($randArr , $randNum);  
	    }
	    $tagArr = array();
	    for($i = 0;$i < 4; $i ++){
	    	$start = $randArr[$i];
	    	$sql = "SELECT * FROM tb_tag LIMIT $start , 1";
	    	$result = mysqli_query($conn,$sql);
	    	if($result){
	    		$resultArr = mysqli_fetch_assoc($result);
	    		array_push($tagArr , $resultArr);
	    	}
	    }
	    echo json_encode($tagArr);
	}
