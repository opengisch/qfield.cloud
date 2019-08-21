<?php


function isEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if ($_POST) {
    
    // Enter the email where you want to receive the message
    $emailTo = 'pixininja@csmthemes.com';
    
    $name        = addslashes(trim($_POST['name']));
    $clientEmail = addslashes(trim($_POST['email']));
    $message     = addslashes(trim($_POST['message']));
    $antispam    = addslashes(trim($_POST['antispam']));
    
    $array = array(
        'nameMessage' => '',
        'emailMessage' => '',
        'messageMessage' => '',
        'antispamMessage' => ''
    );
    
    
    
    if ($name == '') {
        $array['nameMessage'] = 'Empty name!';
    }
    if (!isEmail($clientEmail)) {
        $array['emailMessage'] = 'Invalid email!';
    }
    if ($message == '') {
        $array['messageMessage'] = 'Empty message!';
    }
    if ($antispam != '12') {
        $array['antispamMessage'] = 'Wrong antispam answer!';
    }
    if ($name != '' && isEmail($clientEmail) && $message != '' && $antispam == '12') {
        
        $headers = "From: " . $clientEmail . " <" . $clientEmail . ">" . "\r\n" . "Reply-To: " . $clientEmail;
        mail($emailTo, $name . " sent you a message", $message, $headers);
    }
    
    echo json_encode($array);
    
}

?>