<?php
$email_to = "youremail@domain-name.com";
$success_message = "You message has been sent. I'll get back to you soon.";

$name = trim($_POST['name']);
$email = trim($_POST['email']);
$message = trim($_POST['message']);
$submitted = $_POST['submitted'];

if(isset($submitted)){
	if($name === '' || $name === 'Enter your name' ) {
		$name_empty = true;
		$error = true;
	} elseif ($email === '' || $email === 'Enter your email') {
		$email_empty = true;
		$error = true;
	} elseif (!eregi("^[A-Z0-9._%-]+@[A-Z0-9._%-]+\.[A-Z]{2,4}$", $email)){
		$email_unvalid = true;
		$error = true;	
	} elseif ($message === '' || $message === 'Enter your message'){
		$message_empty = true;
		$error = true;
	}
	
	if(isset($error)){
		echo '<span class="error"><ul>';
		if($name_empty){
			echo '<li>Please enter your name</li>';
		} elseif ($email_empty) {
			echo '<li>Please enter your email address</li>';
		} elseif ($email_unvalid) {
			echo '<li>Please enter a valid email address</li>'; 
		} elseif ($message_empty) {
			echo '<li>Please enter your message</li>';
		} else {
			echo '<li>An error has occurred while sending your message. Please try again later.</li>';
		}
		echo "</ul></span>";
	}
	
	if(!isset($error)){
		$subject = 'Contact Form Submission from '.$name;
		$body = "Name: $name \n\nEmail: $email \n\nMessage: $message";
		$headers = 'From: ' . $name . ' <' . $email . '> ' . "\r\n";
		mail($email_to, $subject, $body, $headers);
		
		echo '<span class="success">' . $success_message . '</span>';
	}
}
?>