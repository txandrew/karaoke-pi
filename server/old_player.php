<html>
<head>
<link rel="stylesheet" type="text/css" href="/karaoke.css">
<script>
var str_c_status = "STARTING";
var str_c_youtube_id = "STARTING";
var http_status = false;

function startCron()
{
    setInterval(getStatus,1000);
}
function getStatus() 
{
    console.log("getStaus");
    if ( ! http_status )
    {
        http_status = true;
        var xhttp;
        xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                receiveStatus(this);
            }
        };
        xhttp.open("GET", "/karaoke/server/getStatus.php", true);
        xhttp.send();
    }
}
function receiveStatus(xmlhttp)
{
    var ply = document.getElementById("vidPlayer");
    var src = document.getElementById("vidSource");
    
    var str_n_status = getValue(xmlhttp,"status");
    var str_n_youtube_id = getValue(xmlhttp,"youtube_id");

    document.getElementById("log").innerHTML += str_c_status + " &emsp; --> &emsp; " + str_n_status + "<br />";

    if ( str_n_status == "PLAYING" && str_n_youtube_id == "" )
    {
        setWaiting();
        setNextSong();
    }
    if ( str_n_status != str_c_status )
    {
        if ( str_n_status == "PLAYING"  ) { ply.play();    }
        if ( str_n_status == "PAUSED"   ) { ply.pause();   }
        if ( str_n_status == "SKIPPING" ) { setNextSong(); }
        if ( str_n_status == "STANDBY"  ) { setWaiting();  }
    }
    if ( str_n_youtube_id != str_c_youtube_id &&
         str_n_status     == "PLAYING" )
    {
        startVideo(str_n_youtube_id);
    }
    if ( str_n_status == "STANDBY" ) { setNextSong(); }

    str_c_status     = str_n_status;
    str_c_youtube_id = str_n_youtube_id;
    
    document.getElementById("hStatus").innerHTML=str_c_status;
    if ( getValue(xmlhttp,"title") != "" )
    {
        document.getElementById("hSong").innerHTML= getValue(xmlhttp,"title");
        document.getElementById("hSong").innerHTML+="<br />by<br/>";
        document.getElementById("hSong").innerHTML+=getValue(xmlhttp,"artist");
        document.getElementById("hGenre").innerHTML=getValue(xmlhttp,"genre");
        document.getElementById("hSType").innerHTML=getValue(xmlhttp,"song_type");
        document.getElementById("hQueBy").innerHTML=getValue(xmlhttp,"queued_by");
    }
    else
    {
        document.getElementById("hSong").innerHTML = "";
        document.getElementById("hGenre").innerHTML = "";
        document.getElementById("hSType").innerHTML = "";
        document.getElementById("hQueBy").innerHTML = "";
    }
    document.getElementById("hQueSz").innerHTML=getValue(xmlhttp,"que_size");

    http_status = false;
}
function setWaiting()
{
    var ply = document.getElementById("vidPlayer");
    var src = document.getElementById("vidSource");

    src.src = "/karaoke/videos/~WAITING.mp4";
    console.log("setWaiting");
    ply.load();
    setTimeout(playVideo,1000);
    ply.addEventListener("ended",setWaiting);
}
function playVideo()
{
    var ply = document.getElementById("vidPlayer");
    var src = document.getElementById("vidSource");
    console.log(src.src);

    ply.play();
}
function getValue(xmlhttp,strField)
{
    return xmlhttp.responseXML.getElementsByTagName(strField)[0].textContent;
}
function setNextSong()
{
    document.getElementById("log").innerHTML += "Set New Song<br />";
    
    
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.open("GET", "/karaoke/server/nextSong.php", true);
    xhttp.send();
    http_status = true;
    setTimeout(function(){http_status = false;},1000);
}
function startVideo(str_ytid)
{
    var ply = document.getElementById("vidPlayer");
    var src = document.getElementById("vidSource");
    
    src.src = "/karaoke/videos/~LOADING.mp4";
    console.log("startVideo");
    ply.load();
    setTimeout(playVideo,1000);
    ply.addEventListener("ended",function(){startVideo2(str_ytid);},false);
}
function startVideo2(str_ytid)
{
    var ply = document.getElementById("vidPlayer");
    var src = document.getElementById("vidSource");
    
    src.src = "/karaoke/videos/" + str_ytid + ".mp4";
    console.log("startVideo2");
    ply.load();
    //setTimeout(playVideo,1000);
    ply.addEventListener('loadedmetadata',function(){this.play();},false)
    ply.addEventListener("ended",function(){setNextSong();},false);
}
</script>
<style>
h2
{
    text-align:center;
}
h3
{
    text-align:center;
}
</style>
</head>
<body onload="setTimeout(startCron,1000)" >
<table border=1 width="100%" height="100%" >
<tr>
<td width="68%">
<video width="100%" controls id="vidPlayer" >Doesn't Support HTML
<source id="vidSource" type="video/mp4" src="/karaoke/videos/~LOADING.mp4" >
</video>
</td>
<td style='vertical-align:top'>
<h1>Karaoke-Pi</h1><hr />
<h2>Navigate to:</h2>
<h3>
<?php 
$str_self = exec("ip addr | grep -oE 'inet [0-9]+\.[0-9]+\.[0-9]+\.[0-9]+'");
$str_self = str_replace("127.0.0.1","",$str_self);
$str_self = str_replace("inet ","",$str_self);
echo $str_self;
?>
</h3>
<hr />
<span style="width:100%;text-align:center;">
<h2 id="hStatus"></h2>
<h2 id="hQueBy"></h2>
<h2 id="hSong"></h2>
<h3 id="hSType"></h3>
<h3 id="hGenre"></h3>
<hr />
<h3>Songs in Queue: <span id="hQueSz"></span></h3>
</span>
</h2>
</td>
</table>
<div id='log'>Log<br /></div>
</body>
</html>

