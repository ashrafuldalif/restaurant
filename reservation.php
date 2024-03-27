<?php
include('smtp/PHPMailerAutoload.php');

$host = "localhost";
$usr = "u735289645_limmon";
$pass = "Limmon@@123";
$database = "u735289645_mydb";








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
        // echo "<script>alert('Reservation Complete')</script>";
        header("Location: https://limmons.de/");
    } else {
        echo "Error: " . $sql . "<br>" . $ser->error;
    }

    $stmt->close();
    $ser->close();
}



require 'smtp/PHPMailerAutoload.php';

function smtp_mailer($to, $subject, $msg){
    $mail = new PHPMailer(); 
    $mail->SMTPDebug = 0; // Set to 2 for debugging
    $mail->IsSMTP(); 
    $mail->SMTPAuth = true; 
    $mail->SMTPSecure = 'ssl'; 
    $mail->Host = "smtp.hostinger.com";
    $mail->Port = 465; 
    $mail->IsHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Username = "contact@limmons.de";
    $mail->Password = 'A1b2c3@@';
    $mail->SetFrom("contact@limmons.de");
    $mail->Subject = $subject;
    $mail->Body = $msg;
    $mail->AddAddress($to);
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => false
        )
    );
    if(!$mail->Send()) {
        return false; // Failed to send email
    } else {
        return true; // Email sent successfully
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form validation
    $errors = [];
    $name = $_POST["name"] ?? "";
    $number = $_POST["phone"] ?? "";
    $person = $_POST["person"] ?? "";
    $date = $_POST["reservation-date"] ?? "";
    $time = $_POST["time-outline"] ?? "";
    $message = $_POST["message"] ?? "";

    if(empty($name) || empty($number) || empty($person) || empty($date) || empty($time)) {
        $errors[] = "All fields are required.";
    }

    if(empty($errors)) {
        $wholeData = "Name : $name\nNumber : $number\nPerson : $person\nDate : $date\nTime : $time\nMessage : $message";
        
        // Send email
        if(smtp_mailer("ashrafulalif26@gmail.com", "Reservation Request", $wholeData)) {
            // smtp_mailer($Email , "reservation confirm","Thank you");
            header("Location: https://limmons.de/");
            exit;
        } else {
            // Email sending failed
            $errors[] = "Failed to send email.";
        }
    }
}

// Output errors
if(!empty($errors)) {
    foreach($errors as $error) {
        echo "<p>Error: $error</p>";
    }
}
?>