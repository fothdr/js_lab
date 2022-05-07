<?php
    $host = 'localhost';
    $database = 'f0668507_ajax';
    $user = 'f0668507_ajax';
    $password = 'gGVeHHFb';
    $kol = $_POST['kol'];
    $tek = $_POST['tek'];
    
    $json_data = [];
    
    $link = mysqli_connect($host, $user, $password, $database) or die('Ошибка');
    
    $query = 'SELECT * FROM news LIMIT '.$tek.', '.$kol;
    mysqli_query($link, 'SET NAMES utf8mb4'); 
    $result = mysqli_query($link, $query) or die("Ошибка");
    while ($row = $result->fetch_assoc()) {
        $json_data[] = $row;
    }
    echo json_encode($json_data, JSON_UNESCAPED_UNICODE);
?>