<?php

	if(isset($_POST['type']) && !empty($_POST['type'])){

		$type = $_POST['type'];

		session_start();
	
		if($type == 1){//记录标签tagId
			if(isset($_POST['tagId']) && !empty($_POST['tagId'])){
				$_SESSION['tagId'] = $_POST['tagId'];
			}
		}
		
		if($type == 2){//记录文章articleId
			if(isset($_POST['articleId']) && !empty($_POST['articleId'])){
				$_SESSION['articleId'] = $_POST['articleId'];
			}
		}

		echo 1;
	}
	
	
