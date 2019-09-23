<?php
header('Access-Control-Allow-Origin: *'); 
date_default_timezone_set('Asia/Bangkok');
if(isset($_POST)) {
    $data = [];
    // foreach (json_decode($_POST['json_data']) as $item) {
    //     $data[$item->name] = $item->value;
    // }
    $data['ip'] = $_SERVER['REMOTE_ADDR'];
    $data['time'] = date('H:i:s d/m/Y');
    $data['device'] = isset($_POST['device']) ? $_POST['device'] : '';
    $data['utm'] = isset($_POST['utm']) ? $_POST['utm'] : '';
    $data['action'] = isset($_POST['action']) ? $_POST['action'] : '';
    $data['json_data'] = isset($_POST['json_data']) ? $_POST['json_data'] : '';
    $data = json_encode($data)."||";
    $ret = file_put_contents('ds-data.txt', $data, FILE_APPEND | LOCK_EX);
    echo '';
    if($ret === false) {
        echo 'There was an error writing this file';
    }
    else {
        echo '{"save":"1"}';
    }
}
else {
   die('no post data to process');
}