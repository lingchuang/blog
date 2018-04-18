<?php

	define('MYSQL_SERVER' , 'localhost');
	define('MYSQL_USER' , 'root');
	define('MYSQL_PWD' , '81633ddc0de46795');
	define('MYSQL_DATABASE' , 'db_blog');

	//返回连接对象
	function connectDb(){
		$conn = mysqli_connect(MYSQL_SERVER , MYSQL_USER , MYSQL_PWD , MYSQL_DATABASE);
		if($conn){
			mysqli_query($conn,'set names utf8');
			return $conn;
		}
	}
