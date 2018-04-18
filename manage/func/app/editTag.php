<?php
	require_once './common/connectDb.php';

	if(isset($_POST['tagName']) && !empty($_POST['tagName'])){
		$tagName = $_POST['tagName'];
		$echoR = 0;
		$conn = connectDb();
		session_start();
		if(isset($_SESSION['tagId']) && !empty($_SESSION['tagId'])){//编辑
			$tagId = $_SESSION['tagId'];
			if($tagId){
				$flag = isTagExists($tagId,$conn,$tagName);
				if(!$flag){
					$sql = "SELECT tagName FROM tb_tag WHERE id = $tagId";
					$result = mysqli_query($conn,$sql);
					$resultArr = mysqli_fetch_assoc($result);
					$oldTagName = $resultArr['tagName'];
					$sql = "UPDATE tb_tag set tagName = '$tagName' WHERE id = $tagId";
					$result = mysqli_query($conn,$sql);
					if($result){
						$sql = "UPDATE tb_article SET articleTag = '$tagName' WHERE articleTag = '$oldTagName'";
						$result = mysqli_query($conn,$sql);
						if($result){
							$echoR = 1;
						}
						else{
							$echoR = -3;
						}
					}
					else{
						$echoR = -2;
					}
				}
				else{
					$echoR = -1;
				}
				
			}
		}
		else{//新增
			$flag = isTagExists(false,$conn,$tagName);
			if(!$flag){
				$sql = "INSERT INTO tb_tag(tagName) VALUES ('$tagName')";
				$result = mysqli_query($conn,$sql);
				if($result){
					$echoR = 2;
				}
			}
			else{//存在
				$echoR = -1;
			}
		}
		echo $echoR;
	}

	//返回bool，标签是否存在
	function isTagExists($isTagId,$conn,$tagName){
		$flag = false;
		if(!$isTagId){//新增，不是编辑
			$sql = "SELECT COUNT(1) FROM tb_tag WHERE tagName = '$tagName'";
			$result = mysqli_query($conn,$sql);
			$tempArr = mysqli_fetch_row($result);
			if($tempArr[0] > 0){
				$flag = true;
			}
		}
		else{//编辑
			$sql = "SELECT id,tagName FROM tb_tag WHERE tagName = '$tagName'";
			$result = mysqli_query($conn,$sql);
			if($result){
				$tempArr = mysqli_fetch_assoc($result);
				if($tempArr){
					$selectId = $tempArr['id'];
					$selectTagName = $tempArr['tagName'];
					if(($selectId != $isTagId) && ($selectTagName == $tagName)){
						//不同标签且tagName相同
						$flag = true;
					}
				}
			}
		}
		return $flag;
	}

	

	
	
	
	