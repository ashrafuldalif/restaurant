<?php

$host = "localhost";
$usr = "root";
$pass = "";
$database = "mydb";

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Create connection
    $ser = new mysqli($host, $usr, $pass, $database);

    // Check connection
    if ($ser->connect_error) {
        die("Connection failed: " . $ser->connect_error);
    }

    // Prepare and bind SQL statement
    $sql = "INSERT INTO RESERVE_Table (name, number, person, date, time, msg) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $ser->prepare($sql);
    $stmt->bind_param("ssisss", $name, $number, $person, $date, $time, $message);

    // Set parameters and execute
    $name = $_POST["name"];
    $number = $_POST["phone"];
    $person = $_POST["person"];
    $date = $_POST["reservation-date"];
    $time = $_POST["time-outline"];
    $message = $_POST["message"];

    if ($stmt->execute()) {
        echo "<script>alert('Reservation Complete')</script>";
        header("Location: http://localhost/");
    } else {
        echo "Error: " . $sql . "<br>" . $ser->error;
    }

    $stmt->close();
    $ser->close();
}
?>