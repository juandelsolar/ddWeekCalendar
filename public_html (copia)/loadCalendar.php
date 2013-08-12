<?php
header("Content-type: text/xml");
$page = $_REQUEST['page'];
$dbconn = pg_connect("host=localhost port=5432 dbname=ucm user=postgres password=justgoon") or die('NO HAY CONEXION: ' . pg_last_error());
/*$query = "SELECT count(*)  FROM calendar";
$result = pg_query($query) or die('Query failed: ' . pg_last_error());
$line = pg_fetch_array($result, null, PGSQL_ASSOC);
$total = $line['total'];*/
$query = "SELECT c.date_c, c.hour_c, p.name, p.lastname, c.exam_state, r.name as room_name FROM calendar c, patient p, room r WHERE r.id=c.room and p.id=c.patient";
$result = pg_query($query) or die('Query failed: ' . pg_last_error());
$rows = pg_numrows($result);
/*for($i=1;$i<=4; $i++){
	$line = pg_fetch_array($result, null, PGSQL_ASSOC);
	$date_c =  $line['date_c'];
	$hour_c =  $line['hour_c'];
	$room =  $line['room_name'];
	$patient =  $line['name'];
	$xml .= '<room_'.$i.'>'.$room.'</room_'.$i.'><date_'.$i.'>'.$date_c.'</date_'.$i.'><name_'.$i.'>'.$patient.'</name_'.$i.'><hour_'.$i.'>'.$hour_c.'</hour_'.$i.'>';
}*/
$line = pg_fetch_array($result, null, PGSQL_ASSOC);
/*echo '<xmlresponse><total>'.$total.'</total>'.$xml.'</xmlresponse>';*/
echo json_encode($line);

pg_free_result($result);
// Closing connection
pg_close($dbconn);
?>