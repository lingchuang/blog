<?php
	require_once './common/connectDb.php';

	function getFormData($formEle){
		if(isset($_POST["$formEle"]) && !empty($_POST["$formEle"])){
			return addslashes($_POST[$formEle]);
		}
		else{
			return ' ';
		}
	}

	$articleTitle = getFormData('articleTitle');
	$articleImgLink = getFormData('articleImgLink');
	$articleTag = getFormData('articleTag');
	$isRecommend = (int)getFormData('isRecommend');
	$isShow = (int)getFormData('isShow');
	$articleDesc = getFormData('articleDesc');
	$articleContent = getFormData('articleContent');
	$articleHtml = getFormData('articleHtml');
	$publishTime = getFormData('publishTime');

	$conn = connectDb();

	session_start();
	if(isset($_SESSION['userName']) && !empty($_SESSION['userName'])){
		$articleAuthor = $_SESSION['userName'];
	}
	else{
		$articleAuthor = '无名';
	}
	
	$echoR = 0;
	if(isset($_SESSION['articleId']) && !empty($_SESSION['articleId'])){
		$articleId = $_SESSION['articleId'];
		$sql = "UPDATE tb_article set articleTitle = '$articleTitle',articleImgLink = '$articleImgLink',articleDesc = '$articleDesc',articleContent = '$articleContent',articleHtml = '$articleHtml',articleTag = '$articleTag',isRecommend = $isRecommend,isShow = $isShow WHERE id = $articleId";
		$result = mysqli_query($conn,$sql);
		if($result){
			$echoR = 1;
		}
		else{
			echo mysqli_error($conn);
		}
	}
	else{
		$sql = "INSERT INTO tb_article(articleTitle,articleImgLink,articleDesc,articleContent,articleHtml,articleTag,isRecommend,isShow,publishTime,articleAuthor) VALUES ('$articleTitle','$articleImgLink','$articleDesc','$articleContent','$articleHtml','$articleTag',$isRecommend,$isShow,'$publishTime','$articleAuthor')";
		$result = mysqli_query($conn,$sql);
		if($result){
			$echoR = 2;	
		}
		else{
			echo mysqli_error($conn);
		}
	}
	echo $echoR;
	