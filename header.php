<?php
session_start();
error_reporting( E_ALL );
ini_set('display_errors', 1);

if ( isset($_GET["logout"] ))
{
    unset($_SESSION["user_id"]);
}
if ( ! isset($_SESSION["user_id"] ) or isset($_GET["logout"]) )
{
    header('Location: index.php');
}
header("context-type: text/html; charset=UTF-8");
$str_page = basename($_SERVER["PHP_SELF"]);
?>
<html>
<head>
<title>Karaoke PI</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" type="text/css" href="karaoke.css">
<script src="icons.js"></script>
<script>
function shutdown()
{
    if ( confirm("Are you sure you want to\nshutdown the Karaoke Pi\n machine?" ) )
    {
        location.assign("shutdown.php");
    }
}
</script>
</head>
<body>
<h1>Karaoke-pi</h1>

<ul>
  <li><a href="search.php"   <?php if($str_page == "search.php" ){echo "class=\"active\"";} ?>><canvas id="icn_Srch" width="30px" height="30px">Search</canvas></a></li>
  <li><a href="add.php"      <?php if($str_page == "add.php"    ){echo "class=\"active\"";} ?>><canvas id="icn_Add"  width="30px" height="30px">Add</canvas></a></li>
  <li><a href="playing.php"  <?php if($str_page == "playing.php"){echo "class=\"active\"";} ?>><canvas id="icn_Play" width="30px" height="30px">Now Playing</canvas></a></li>
  <li><a href="list.php"     <?php if($str_page == "list.php"   ){echo "class=\"active\"";} ?>><canvas id="icn_Hsty" width="30px" height="30px">History</canvas></a></li>
  <li style="float:right"><a class="active text" href="index.php?logout=true"><?php echo $_SESSION["user_id"] ?></a></li>
</ul>

<script>
icon_Search("icn_Srch");
icon_Add("icn_Add" );
icon_Play("icn_Play");
icon_History("icn_Hsty");
</script>

<?php
if ( isset($_SESSION["message"]) )
{
    echo "<div class='msg'>" . $_SESSION["message"] . "</div>";
    unset($_SESSION["message"]);
}
?>
<br />
