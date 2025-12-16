<?php
header("Content-Type: application/json");
require_once '../config/config_db.php';

if($_SERVER['REQUEST_METHOD'] ==='GET'){
    $query = "SELECT * FROM patients";
    $all_patients = $conn->query($query);
    $patients = [];
         while($row = $all_patients->fetch_assoc()){
             $patients[] = $row;     
         }
            
            echo json_encode(["patientData" => $patients]);
        }

?>