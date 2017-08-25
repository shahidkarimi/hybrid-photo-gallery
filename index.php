<?php
namespace authApp;
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

use Controllers;
use Models;
spl_autoload_register(function ($class_name) {
    include $class_name . '.php';
});
if(!isset($_GET['r'])){
    die("Not found");
}
$r_raw = $_GET['r'];
$r_arr = explode("/",$r_raw);

$cls = 'Controllers\\'.$r_arr[0];

$d = new Models\Db();

$sur = new $cls();
$action = $r_arr[1];
echo $sur->$action();
?>