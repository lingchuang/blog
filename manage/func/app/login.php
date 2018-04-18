<?php
	require_once './common/connectDb.php';

	function getStr($string){ 
		return addslashes($string);
	}

	session_start();

	$userName = getStr($_POST['userName']);
	$userPwd = md5(getStr($_POST['userPwd']));

	$conn = connectDb();
	$sql = "SELECT COUNT(1) FROM tb_user WHERE userName = '$userName' and userPwd = '$userPwd'";
	$result = mysqli_query($conn,$sql);
	$count = mysqli_fetch_array($result);
	if($count[0] > 0){
		$_SESSION['userName'] = $userName;
		$_SESSION['userPwd'] = $userPwd;
		echo 1;
	}
	else{
		echo 0;
	}