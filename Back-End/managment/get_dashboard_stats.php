<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Content-type: application/json");
require_once '../config/config_db.php';

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  //all patients
  $total_patients = 0;
  $query = "SELECT COUNT(*) AS total FROM patients";
  $total_patients = $conn->query($query);
  if ($total_patients && $total_patients->num_rows > 0) {
    $patient_row = $total_patients->fetch_assoc();
    $total = $patient_row['total'];
  }
  // all doctors

  $total_doctors = 0;
  $query = "SELECT COUNT(*) AS total_dr FROM doctors";
  $total_doctors = $conn->query($query);
  if ($total_doctors && $total_doctors->num_rows > 0) {
    $row = $total_doctors->fetch_assoc();
    $total_dr = $row['total_dr'];
  }
  // all departements
  $total_departemnts = 0;
  $query = "SELECT COUNT(*) AS total_dep FROM departements";
  $total_departemnts = $conn->query($query);
  if ($total_departemnts && $total_departemnts->num_rows > 0) {
    $row = $total_departemnts->fetch_assoc();
    $total_dep = $row['total_dep'];
  }
  //number of doctors in departement 
  $doctors_in_departement = [];
  $query = "SELECT departements.departement_name,
 COUNT(*) AS nbr_dr_in_dep
 FROM doctors
 INNER JOIN departements ON departements.departement_id = doctors.id_departement
 GROUP BY doctors.id_departement";
  $result = $conn->query($query);
  if ($result && $result->num_rows > 0) {
   while( $row = $result->fetch_assoc()){

     $doctors_in_departement [] = [
      "departementName" => $row['departement_name'],
       "DrIndepartement" => $row['nbr_dr_in_dep']
     ];
   }
  }
  echo json_encode([
    "totalPatients" => $total,
    "totalDoctors" => $total_dr,
    "totalDepartements" => $total_dep,
    "doctorsIndepartement" => $doctors_in_departement,
  ]);
}
