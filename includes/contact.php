<?php 
if( isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']) ){
    //flag
    $myFlag = false;
    //set SMTP & smtp_port
    ini_set('SMTP', 'mail.helloericsmith.com');
    ini_set('smtp_port', 25);
    //assign form values to vars
    $name = $_POST['name'];
    $email = $_POST['email'];
    //use nl2br function to change new lines to break tags
    $message = nl2br($_POST['message']);
    //php validation
    //name
    if(!empty($name)){
        $name = htmlspecialchars($name);
    }else{
        $nameErr = '<span class="form-error">Please Enter Your Name</span>';
        $myFlag = true;
    }
    //email
    if(!empty($email)){
        $email = htmlspecialchars($email);
    }else{
        $emailErr = '<span class="form-error">Please Enter Your Email</span>';
        $myFlag = true;
    }
    //message
    if(!empty($message)){
        $message = htmlspecialchars($message);
    }else{
        $messageErr = '<span class="form-error">Please Enter a Message</span>';
        $myFlag = true;
    }
    if(!$myFlag) {
        //other vars needed for mail()
        $to = "ericsmth884@gmail.com";
        $from = $email;
        $subject = "Contact From Website";
        $message = '<b>Name:</b>' . $name . '<br><b>Email:</b>' . $email . '<p>' . $message . '</p>';
        $headers = "From: $from\n";
        $headers .= "MIME-Version: 1.0\n";
        $headers .= "Content-type: text/html; charset=iso-8859-1\n";
        if (mail($to, $subject, $message, $headers)) {
            echo "success";
        } else {
            echo "message could not be sent, please try again.";
        }
    }
}//end isset

?>