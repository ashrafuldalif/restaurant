<?php


// $host = "localhost";
// $usr = "root";
// $pass = "";
// $database = "mydb";

// $ser = new mysqli($host, $usr, $pass, $database);


$name=$_POST["name"];
$number=$_POST["phone"];
$person=$_POST["person"];
$date=$_POST["reservation-date"];
$time=$_POST["time-outline"];
$message=$_POST["message"];

echo "<script> $name </script>"

// $sql = "INSER INTO RESERVE_Table (name,number,person,date,time,msg) values ($name,$number,$person,$date,$time,$message);";

// if ($ser->query($sql)) {
//     echo "<script> alert(' Reservation Complete') </script>";
//     header("Location: http://localhost/");
// } else {
//     echo "Error: " . $sql . "<br>" . $ser->error;
// }

// $ser->close();


?>