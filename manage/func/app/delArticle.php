<?php
	require_once './common/connectDb.php';

	$id = $_POST['id'];

	$conn = connectDb();
	$sql = "UPDATE tb_article SET isShow = 0 WHERE id = $id";
	$result = mysqli_query($conn,$sql);
	if($result){
		echo 1;
	}
	else{
		echo 0;
	}
	mysqli_close($conn);