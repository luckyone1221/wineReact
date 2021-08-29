<?php
ini_set( 'display_errors', 1 );
require __DIR__ . '/vendor/autoload.php';
 // $to='trifectahealthnyc@gmail.com';    
$mail = new PHPMailer(true);
$mail->IsMail();
$mail->IsHTML(true);
$mail->Priority = '1';
$mail->Encoding = 'base64';
$mail->CharSet = 'utf-8';

///who send 
$mail->setFrom('info@info.com','info info');

 $mail->addAddress('luckyone1221@gmail.com');
 // $mail->addAddress('horenkova369@gmail.com');
// $mail->addAddress('stab@inbox.support');



//Субъект
$mail->Subject = 'Покупка с сайта AROMATNOE vineyard';

$time = date('d.m.Y в H:i');
$html = '
<table style="width: 100%;">';
    if (!empty($_POST['message-from'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;">Заявка отправлена с форми:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['message-from'] . '</b></td></tr>';
    }
    if (!empty($_POST['name'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;">Name:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['name'] . '</b></td></tr>';
    }
    
    if (!empty($_POST['tel'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Телефон:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['tel'] . '</b></td></tr>';
    }
    
    if (!empty($_POST['email'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Email:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['email'] . '</b></td></tr>';
    }
    //modal reg
    if (!empty($_POST['cert-num'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Номер сертификата:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['cert-num'] . '</b></td></tr>';
    }
    if (!empty($_POST['cert-code'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Скретч код: </td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['cert-code'] . '</b></td></tr>';
    }
    //cart
    if (!empty($_POST['cart'])) {
        $cart_data = json_decode($_POST['cart']);
        $html .= '<tr style="background-color: #89785F; color: #fff;"> 
                    <td style="padding: 10px; border: #e9e9e9 1px solid;" colspan="2"> Корзина:</td>
                  </tr>';
        foreach ($cart_data as $item_id => $item_props){
            $html .= '<tr style="background-color: white; color: #fff;"> 
                    <td style="padding: 10px;"></td>
                  </tr>';
            foreach ($item_props as $prop_name => $prop_val){
                $html .= '<tr style="background-color: #f8f8f8;">
                        <td style="padding: 10px; border: #e9e9e9 1px solid;">
                          ' . $prop_name . '
                        </td>
                        <td style="padding: 10px; border: #e9e9e9 1px solid;">
                          ' . $prop_val . '
                        </td>
                    </tr>';
            }
            $html .= '<tr style="background-color: #f8f8f8;"></tr>';
        }
        $html .= '<tr style="background-color: #89785F; color: #fff;"> 
                    <td style="padding: 10px; border: #e9e9e9 1px solid; color: transparent;" colspan="2">.</td>
                  </tr>';
    }


    // if (!empty($_POST['tech'])) {
    //     $html .= ' <tr style="background-color: #f8f8f8;">  <td style="padding: 10px; border: #e9e9e9 1px solid;"> Техника:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . implode(", ",$_POST['tech']) . '</b></td></tr>';
    // }

    if (!empty($_POST['utm_source'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> utm_source:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['utm_source'] . '</b></td>';
    }
    
    if (!empty($_POST['utm_term'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> utm_term:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['utm_term'] . '</b></td>';
    }    
    if (!empty($_POST['utm_medium'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> utm_medium:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['utm_medium'] . '</b></td>';
    }  
      
    if (!empty($_POST['utm_campaign'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> utm_campaign:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['utm_campaign'] . '</b></td>';
    }
     $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;">  Время отправки:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $time . '</b></td>
      <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> IP:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_SERVER['REMOTE_ADDR'] . '</b></td> 
</table>
';
$mail->Body = $html;

$uploaddir = __DIR__ . '/upload/';

if ($_FILES['file']['tmp_name']) {    
    $mail->addAttachment($_FILES['file']['tmp_name'],$_FILES['file']['name']);
}

// if ($_FILES['file2']['tmp_name']) {    
//  $mail->addAttachment($_FILES['file2']['tmp_name'],$_FILES['file2']['name']);
// }

//send the message, check for errors
if (empty($_POST['example-input-field'])) {

    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";
    }
    if (isset($uploadfile))unlink($uploadfile);
    if (isset($uploadfile2))unlink($uploadfile2);
}

?>


<?php 
?>