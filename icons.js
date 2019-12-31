function icon_Search(id)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s ) { s = c.height; }

    ctx.translate(c.width / 2, c.height / 2);

    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.strokeStyle="white";
    ctx.arc( s / 6, -s / 6, s / 4, 0, 2 * Math.PI);
    ctx.moveTo( -s / 3, s / 3 );
    ctx.lineTo( 0, 0);
    ctx.stroke();
}
function icon_Add(id)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s ) { s = c.height; }

    ctx.translate(c.width / 2, c.height / 2);

    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.strokeStyle="white";
    ctx.moveTo( -s / 3,     0 );
    ctx.lineTo(  s / 3,     0 );
    ctx.lineTo(      0,     0 );
    ctx.lineTo(      0,  s / 3 );
    ctx.lineTo(      0, -s / 3 );
    ctx.stroke();
}
function icon_Play(id)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s ) { s = c.height; }

    ctx.translate(c.width / 2, c.height / 2);

    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.strokeStyle="white";
    ctx.fillStyle="white";
    ctx.moveTo( -s / 4, -s / 4 );
    ctx.lineTo( -s / 4,  s / 4 );
    ctx.lineTo(  s / 4,      0 );
    ctx.lineTo( -s / 4, -s / 4 );
    ctx.stroke();
    ctx.fill();
}
function icon_History(id)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s ) { s = c.height; }

    ctx.translate(c.width / 2, c.height / 2);

    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.strokeStyle="white";

    ctx.moveTo( (2 * -s) / 6, -s / 4 );
    ctx.lineTo( (2 * -s) / 6, -s / 4 );
    ctx.stroke();

    ctx.moveTo( -s / 6, -s / 4 );
    ctx.lineTo(  s / 2, -s / 4 );
    ctx.stroke();

    ctx.moveTo( (2 * -s) / 6, 0 );
    ctx.lineTo( (2 * -s) / 6, 0 );
    ctx.stroke();

    ctx.moveTo( -s / 6, 0 );
    ctx.lineTo(  s / 2, 0 );
    ctx.stroke();

    ctx.moveTo( (2 * -s) / 6, s / 4 );
    ctx.lineTo( (2 * -s) / 6, s / 4 );
    ctx.stroke();

    ctx.moveTo( -s / 6, s / 4 );
    ctx.lineTo(  s / 2, s / 4 );
    ctx.stroke();
}
function icon_Download(id)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s ) { s = c.height; }

    ctx.translate(c.width / 2, c.height / 2);

    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.strokeStyle="white";
    ctx.fillStyle="white";
    ctx.moveTo( -s / 2, -s / 2 );
    ctx.lineTo(  s / 2, -s / 2 );
    ctx.lineTo(  0, 0);
    ctx.lineTo( -s / 2, -s / 2 );
    ctx.stroke();
    ctx.fill();
    ctx.fillRect( -s / 2, s / 10, s, s / 4);
    ctx.fill();
}
function icon_Skip(id)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s ) { s = c.height; }

    ctx.translate(s / 2 - s / 8, s / 2);

    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.strokeStyle="white";
    ctx.fillStyle="white";
    ctx.moveTo( -s / 4, -s / 4 );
    ctx.lineTo( -s / 4,  s / 4 );
    ctx.lineTo(  s / 4,      0 );
    ctx.lineTo( -s / 4, -s / 4 );
    ctx.stroke();
    ctx.fill();

    ctx.fillRect( s / 4 + s / 10, (-2 * s) / 6, s / 6, (2 * s) / 3 );
    ctx.stroke();
    ctx.fill();
}
function icon_Pause(id)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s) { s = c.height; }

    ctx.translate(c.width / 2, c.height / 2);

    ctx.fillStyle = "white";
    ctx.fillRect(  s / 8, (-2 * s) / 6,  s / 4, ( 2 * s ) / 3);
    ctx.fillRect( -s / 8, (-2 * s) / 6, -s / 4, ( 2 * s ) / 3);
    ctx.fill()
}
function icon_Artist(id)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s) { s = c.height; }

    ctx.translate(c.width / 2, c.height / 2);

    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.arc(0, -s / 6, s / 6, 0, 2 * Math.PI);
    ctx.arc(0,  s / 5, s / 4, 0, 2 * Math.PI);
    ctx.fillRect( -s / 4, s / 5, s / 2, s );
    ctx.fill();
}
function icon_Title(id)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s) { s = c.height; }

    ctx.translate(c.width / 2, c.height / 2);

    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";

    ctx.lineWidth = 5;
    ctx.moveTo( s / 6, -s / 3);
    ctx.lineTo( s / 6,  s / 3);
    ctx.stroke();

    ctx.save();
    ctx.scale(2,1);
    ctx.beginPath();
    ctx.arc(0, (2 * s) / 6, s / 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
function icon_Power(id)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s) { s = c.height; }

    ctx.translate(c.width / 2, c.height / 2);

    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(0, 0, s / 3, -0.40 * Math.PI, -0.60 * Math.PI); 
    ctx.stroke();

    ctx.moveTo( 0, s * -0.45 );
    ctx.lineTo( 0, s * -0.1 );
    ctx.stroke();
}
function icon_Star(id,star_color)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s) { s = c.height; }

    ctx.save();
    ctx.translate(c.width / 2, c.height / 2);

    ctx.fillStyle = star_color;

    ctx.moveTo(                0, -s / 2.5);
    ctx.lineTo( (  1.3 * s ) / 6,  s / 3);
    ctx.lineTo( ( -2   * s ) / 6, (     -s ) / 6);
    ctx.lineTo( (  2   * s ) / 6, (     -s ) / 6);
    ctx.lineTo( ( -1.3 * s ) / 6,  s / 3);
    ctx.lineTo(                0, -s / 2.5);
    ctx.fill();
    ctx.restore();
}
function icon_Heart(id,heart_color)
{
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");

    s = c.width;
    if ( c.height < s) { s = c.height; }

    ctx.save();
    ctx.translate(c.width / 2, c.height / 2);

    ctx.fillStyle = heart_color;

    ctx.moveTo( 0, -0.25 * s );
    ctx.bezierCurveTo( -0.07 * s, -0.4 * s , -0.3 * s, -0.5 * s, -0.4 * s, -0.3 * s );
    ctx.bezierCurveTo( -0.5 * s, 0 , -0.25 * s, 0.3 * s, 0, 0.4 * s );
    ctx.moveTo( 0, -0.25 * s );
    ctx.bezierCurveTo( 0.07 * s, -0.4 * s , 0.3 * s, -0.5 * s, 0.4 * s, -0.3 * s );
    ctx.bezierCurveTo( 0.5 * s, 0 , 0.25 * s, 0.3 * s, 0, 0.4 * s );
    ctx.fill();
    ctx.restore();
}
