<?php
    $email = $_POST['email'];
    $name = $_POST['name'];
    $message = $_POST['text'];
    $host = 'localhost';
    $database = 'f0668507_ajax';
    $user = 'f0668507_ajax';
    $password = 'gGVeHHFb';

    

    
    $link = mysqli_connect($host, $user, $password, $database) or die('Ошибка');
    $query = "INSERT INTO `feedback` (`id`, `name`, `email`, `message`) VALUES (NULL, '".$name."', '".$email."', '".$message."')";
    mysqli_query($link, 'SET NAMES utf8mb4'); 
    $result = mysqli_query($link, $query) or die("Ошибка при отправке отзыва, проверьте данные в форме!");
    echo "Отзыв успешно отправлен!";
?>