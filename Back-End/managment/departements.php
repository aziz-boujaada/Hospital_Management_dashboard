<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json");
require_once '../config/config_db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    if (! $data) {
        echo json_encode(["success" => false, "message" => "there is no data"]);
        exit;
    }

    $depqrtement_name   = htmlspecialchars($data["departementName"]);
    $departement_location    = htmlspecialchars($data["departementLocation"]);
    //validate data
  
    if (empty($depqrtement_name)) {
        echo json_encode(["success" => false, "message" => "depqrtement name is required"]);
        exit;
    } 

    if (empty($departement_location)) {
        echo json_encode(["success" => false, "message" => "depqrtement location is required"]);
        exit;
    } 

    /// isert data to database
    $sql = "INSERT INTO departements
         (departement_name , departement_location)
          VALUES(? , ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "prepare database field"]);
        exit;
    }

    $stmt->bind_param(
        "ss",
       $depqrtement_name,
       $departement_location
    );

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "departement added successfuly"
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "insert field"]);
    }
    $stmt->close();
    $conn->close();
    exit;
}elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT * FROM departements";
    $all_departement = $conn->query($query);
    $departements = [];
    while ($row = $all_departement->fetch_assoc()) {
        $departements[] = $row;
    }
    echo json_encode(["departementData" => $departements]);
    exit;
}elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $id = (int)$data['id'];
    $stmt = $conn->prepare("DELETE FROM departements WHERE departement_id = ? ");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "departement  deleted"]);
        exit;
    } else {
        echo json_encode(["success" => false, "message" => "delete field"]);
        exit;
    }
    $stmt->close();
    $conn->close();
}elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    $id = (int)$data['id'];
    $departement_name = htmlspecialchars($data['departement_name']);
    $departement_location    = htmlspecialchars($data["departement_location"]);
   
    $stmt = $conn->prepare( "UPDATE departements SET departement_name = ? , departement_location = ?    WHERE departement_id = ? "
    );

    $stmt->bind_param(
        "ssi",
        $departement_name,
        $departement_location,
        $id
    );
    if ($stmt->execute()) {
        echo json_encode(["success" => true , "message" => "departemnt updated successfully"]);
        exit;
    }else{
       echo json_encode(["success" => false , "message" => "field updated "]);
        exit; 
    }
}