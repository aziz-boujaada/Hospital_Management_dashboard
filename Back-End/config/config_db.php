<?php 
require __DIR__ . '/../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/../../");
$dotenv->load();
$servername = $_ENV["DB_HSOT"];
$username =  $_ENV["DB_USER"];
$password =  $_ENV["DB_PASSWORD"];
$dbname =  $_ENV["DB_NAME"];
$conn = new mysqli($servername, $username, $password, $dbname);


