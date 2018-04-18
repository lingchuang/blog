<?php
	require_once './common/connectDb.php';

	$articleId = $_GET['articleId'];
	
	$conn = connectDb();
	
	//浏览次数 + 1
	$sql = "UPDATE tb_article SET viewCount = viewCount + 1 WHERE id = $articleId";
	mysqli_query($conn,$sql);