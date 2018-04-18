<?php

	require_once './common/connectDb.php';

	if(isset($_POST['id']) && !empty($_POST['id'])){
		
		$echoR = 0;
		$conn = connectDb();
		$id = $_POST['id'];
		$sql = "SELECT imgName FROM tb_img WHERE id = $id";
		$res = mysqli_query($conn,$sql);
		$resultArr = mysqli_fetch_assoc($res);
		$imgName = $resultArr['imgName'];
		if($imgName){
			$deleteDir = '../../../images/upload/';
			$deleteDir .= iconv('UTF-8','GBK',$imgName);
			$isExists = file_exists($deleteDir);
			if($isExists){
				if(unlink($deleteDir)){
					$sql = "DELETE FROM tb_img WHERE id = $id";
					$res = mysqli_query($conn,$sql);
					if($res){
						$echoR = 1; 
					}
					else{
						$echoR = -2;
					}
				}
				else{
					$echoR = -1;
				}
			}
			else{
				$echoR = -3;
			}
		}
		else{
			$echoR = '-4';
		}

		echo $echoR;
	}

	