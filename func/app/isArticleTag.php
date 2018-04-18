<?php
	require_once './common/connectDb.php';

	if(isset($_GET['articleTag']) && !empty($_GET['articleTag'])){
		$articleTag = $_GET['articleTag'];
		$conn = connectDb();
		$sql = "SELECT COUNT(1) FROM tb_article WHERE articleTag = '$articleTag'";
		$tagResult = mysqli_query($conn,$sql);
		$tagCount = mysqli_fetch_array($tagResult)[0];
		echo $tagCount;
	}
	else{
		echo 0;
	}

	