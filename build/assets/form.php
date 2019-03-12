<?php
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $msg = $_POST['msg'];
    
    $mail_message = '
    <html>
    <head>
        <title>Запись на обслуживание</title>
    </head>
    <body>
        <h2>Запись на обслуживание</h2>
        <ul>
            <li>Имя:' . $name . '</li>
            <li>Телефон: ' . $phone . '</li>
            <li>Сообщение: ' . $msg . '</li>
        </ul>
    </body>
    </html>';
    $headers = "From: Администратор сайта <admin@front-dev.com>\r\n".
                "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";
    $mail = mail('vankert353@gmail.com', 'Запись на обслуживание', $mail_message, $headers);
?>