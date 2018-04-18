<?php
	
	if(isset($_POST['type']) && !empty($_POST['type'])){
		$type = $_POST['type'];
		session_start();
		
		$echoR = 0;
		
		if($type == 1){//标签
			$tagId = $_SESSION['tagId'];
			if($tagId){
				$echoR = $tagId;
			}
		}
		
		if($type == 2){//文章
			$articleId = $_SESSION['articleId'];
			if($tagId){
				$echoR = $tagId;
			}
		}
		
		echo $echoR;
	}

	
	
