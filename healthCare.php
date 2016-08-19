<?php
	//
	include_once "classes/PDOHelper.class.php";

	// item type name
	$itemType = "";

	if(isset($_GET["id"]))
	{
		// get id
		$id = $_GET["id"];

		//get inforamtion by id
		$pdo = new PDOHelper(array('charset'=> 'UTF8'));

		//build query string
		$sql="SELECT * FROM items AS i WHERE id='$id'";

		//call pdoHelper method getRow() and get result.
		$res = $pdo->getRow($sql);

		//
		if ($res["itemType"] == 1) {
			$itemType = "化妆护肤品";
		}
		else if ($res["itemType"] == 2) {
			$itemType = "服饰/鞋";
		}
		else if ($res["itemType"] == 3) {
			$itemType = "首饰/饰品";
		}
		else if ($res["itemType"] == 4) {
			$itemType = "保健";
		}
		else if ($res["itemType"] == 5) {
			$itemType = "日用";
		}
		else if ($res["itemType"] == 6) {
			$itemType = "母婴";
		}
		else if ($res["itemType"] == 7) {
			$itemType = "食品";
		}
		else if ($res["itemType"] == 8) {
			$itemType = "包";
		}
		else if ($res["itemType"] == 9) {
			$itemType = "其他";
		}
		else if (condition) {
			$itemType = "优惠信息";
		}

		echo $itemType;
	}
?>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html"; charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/contentIndex.js"></script>
<link type="text/css" rel="stylesheet" href="css/style.css">
<link type="text/css" rel="stylesheet" href="css/index.css">

<title>E-Commerce</title>
</head>
<body>
<div class="col-sm-1"></div>
<div class="col-sm-10">
	<div class="page-header">
		<div class="logo" id="floatleft"></div>
    	<h1>好虚荣代购</h1>
    </div>
	<nav class="navbar navbar-inverse">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="index.html">WebSiteName</a>
	    </div>
	    <div class="collapse navbar-collapse" id="myNavbar">
	      <ul class="nav navbar-nav">
	        <li class="active"><a href="index.html">Home</a></li>
	        <li class="dropdown">
	          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li><a href="#">Page 1-1</a></li>
	            <li><a href="#">Page 1-2</a></li>
	            <li><a href="#">Page 1-3</a></li>
	          </ul>
	        </li>
	        <li><a href="#">Page 2</a></li>
	        <li><a href="#">Page 3</a></li>
	      </ul>
	    </div>
	  </div>
	</nav>
		<table class="table">
			<thead>
			  <tr>
			    <h3><?php echo $res["itemTypeName"];?></h3>
			  </tr>
			</thead>
			<tbody>
			  <tr>
			    <td>John</td>
			    <td>Doe</td>
			  </tr>
			  <tr>
			    <td>Mary</td>
			    <td>Moe</td>
			  </tr>
			  <tr>
			    <td>July</td>
			    <td>Dooley</td>
			  </tr>
			</tbody>
		</table>
	<div/>

</div>
<div class="col-sm-1"></div>
</div>

</body>
</html>