<?php
	
	if(isset($_POST['type']) && !empty($_POST['type'])){

		$type = $_POST['type'];

		session_start();
	
		if($type == 1){//清除标签tagId
			if(isset($_SESSION['tagId']) && !empty($_SESSION['tagId'])){
				unset($_SESSION['tagId']);
			}
		}
		
		if($type == 2){//清除文章articleId
			if(isset($_SESSION['articleId']) && !empty($_SESSION['articleId'])){
				unset($_SESSION['articleId']);
			}
		}
		
		if($type == 3){//清除登录用户
			if(isset($_SESSION['userName']) && !empty($_SESSION['userName'])){
				unset($_SESSION['userName']);
				echo 1;
			}
			else{
				echo 1;
			}
		}

	}
	
	
	
	