<?php
	//
	include_once "classes/PDOHelper.class.php";

	// item type name
	$itemType = "";
	$total = "";

	if(isset($_GET["id"]))
	{
		// get id
		$id = $_GET["id"];

		// get inforamtion by id
		$pdo = new PDOHelper(array('charset'=> 'UTF8'));

		// build query string to get itemtypeName info.
		$sql ="SELECT * FROM itemTypes WHERE id = '$id'";

		// get itemtypeName.
		$res = $pdo->getRow($sql);

		// set itemtype.
		$itemType =$res["itemTypeName"];

		//build query string
		$sql="SELECT i.id, i.itemName, it.itemTypeName, i.itemPicture, i.itemDescription, i.itemType 
			  FROM items AS i 
			  INNER JOIN itemTypes AS it 
			  ON it.id = i.itemType
		      HAVING i.itemType = '$id'";

		//call pdoHelper method getRow() and get result.
		$res = $pdo->getAll($sql);
	}
	else if (isset($_GET["itemBrand"])) {

		// get name of itemBrand
		$itemBrand = $_GET["itemBrand"];

		// initial PDOHelper.
		$pdo = new PDOHelper(array('charset'=> 'UTF8'));

		// build query string to get itemtypeName info.
		$sql ="SELECT * FROM items WHERE itemBrand = $itemBrand";

		// get itemtypeName.
		$res = $pdo->getAll($sql);
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
<link type="text/css" rel="stylesheet" href="css/healthCare.css">

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
		<table class="table" id="tab">
			<thead>
			  <tr>
			    <h3><?php if (isset($itemType)) {
			    	echo $itemType;
			    }
			    else if (isset($itemBrand)) {
			    	echo $itemBrand;
			    }?>
			    </h3>
			  </tr>
			</thead>
			<?php
				foreach ($res as $value) {
					echo "<tbody><tr>";
			?>
			    	<td>
			    		<img src="<?php echo $value["itemPicture"] ?>"  class="img-thumbnail" alt="Cinque Terre" width="1000" height="1000"></img>
			    	</td>
			    	<td><h3><?php echo $value["itemName"];?></h3><br />
			    		<h4><?php echo $value["itemDescription"];?></h4>
			    	</td>
			<?php 
					echo"</tr></tbody>";
					}
			?>
		</table>
	<div/>
</div>
<div class="col-sm-1"></div>
</div>

</body>
</html>