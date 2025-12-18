<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json");
require_once '../config/config_db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode(["success" => false, "message" => "No data received"]);
        exit;
    }

    $first_name = htmlspecialchars($data["first_name"]);
    $last_name = htmlspecialchars($data["last_name"]);
    $specialization = htmlspecialchars($data["specialization"]);
    $phone_number = htmlspecialchars($data["phone_number"]);
    $email = htmlspecialchars($data["email"]);
    $id_departement = (int)$data["id_departement"];

    // Validate required fields
    if (empty($first_name)) {
        echo json_encode(["success" => false, "message" => "First name is required"]);
        exit;
    }
    if (empty($last_name)) {
        echo json_encode(["success" => false, "message" => "Last name is required"]);
        exit;
    }
    if (empty($specialization)) {
        echo json_encode(["success" => false, "message" => "Specialization is required"]);
        exit;
    }
    if (empty($phone_number)) {
        echo json_encode(["success" => false, "message" => "Phone number is required"]);
        exit;
    }
    if (empty($email)) {
        echo json_encode(["success" => false, "message" => "Email is required"]);
        exit;
    }

    // Insert doctor into database
    $sql = "INSERT INTO doctors (first_name, last_name, specialization, phone_number, email, id_departement)
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Database prepare failed"]);
        exit;
    }

    $stmt->bind_param("sssssi", $first_name, $last_name, $specialization, $phone_number, $email, $id_departement);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Doctor added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Insert failed"]);
    }

    $stmt->close();
    $conn->close();
    exit;

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $query = "SELECT doctors.* , departements.departement_name AS dep_name FROM doctors left join departements on departements.departement_id = doctors.id_departement    ";
    $all_doctors = $conn->query($query);
    $doctors = [];
    while ($row = $all_doctors->fetch_assoc()) {
        $doctors[] = $row;
    }
    echo json_encode(["doctorData" => $doctors]);
    exit;

} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $data = json_decode(file_get_contents("php://input"), true);
    $id = (int)$data['id'];

    $stmt = $conn->prepare("DELETE FROM doctors WHERE doctor_id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Doctor deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Delete failed"]);
    }

    $stmt->close();
    $conn->close();
    exit;

} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    $data = json_decode(file_get_contents("php://input"), true);

    $doctor_id = (int)$data['doctor_id'];
    $first_name = htmlspecialchars($data['first_name']);
    $last_name = htmlspecialchars($data['last_name']);
    $specialization = htmlspecialchars($data['specialization']);
    $phone_number = htmlspecialchars($data['phone_number']);
    $email = htmlspecialchars($data['email']);
    $id_departement = (int)$data['id_departement'];

    $stmt = $conn->prepare(
        "UPDATE doctors 
         SET first_name = ?, last_name = ?, specialization = ?, phone_number = ?, email = ?, id_departement = ? 
         WHERE doctor_id = ?"
    );

    $stmt->bind_param("ssssssi", $first_name, $last_name, $specialization, $phone_number, $email, $id_departement, $doctor_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Doctor updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed"]);
    }

    $stmt->close();
    $conn->close();
    exit;

    
}
