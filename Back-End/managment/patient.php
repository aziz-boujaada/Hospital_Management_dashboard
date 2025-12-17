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

    $first_name   = htmlspecialchars($data["firstName"]);
    $last_name    = htmlspecialchars($data["lastName"]);
    $email        = htmlspecialchars($data["email"]);
    $gender       = $data["gender"];
    $age          = $data["age"];
    $phone_number = $data["phoneNumber"];
    $adress       = htmlspecialchars($data["adress"]);

    $nameRegex  = "/^[a-zA-Z\s]{2,}$/";
    $emailRegex = "/^[\w.-]+@[\w.-]+\.\w{3}$/";

    //validate data
    //first name
    if (empty($first_name)) {
        echo json_encode(["success" => false, "message" => "first name is required"]);
        exit;
    } elseif (!preg_match($nameRegex, $first_name)) {
        echo json_encode(["success" => false, "message" => "first name must be only charcters"]);
        exit;
    }
    //last name
    if (empty($first_name)) {
        echo json_encode(["success" => false, "message" => "last first is required"]);
        exit;
    } elseif (! preg_match($nameRegex, $last_name)) {
        echo json_encode(["success" => false, "message" => "name must be only charcters"]);
        exit;
    }
    //email
    if (empty($email)) {
        echo json_encode(["success" => false, "message" => "Email is required"]);
        exit;
    } elseif (! preg_match($emailRegex, $email)) {
        echo json_encode(["success" => false, "message" => "invalid Email"]);
        exit;
    }

    /// isert data to database
    $sql = "INSERT INTO patients
         (first_name , last_name , email , gender, age , phone_number , adress)
          VALUES(? , ? , ? , ? , ? , ? , ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "prepare database field"]);
        exit;
    }

    $stmt->bind_param(
        "ssssiss",
        $first_name,
        $last_name,
        $email,
        $gender,
        $age,
        $phone_number,
        $adress
    );

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "patient added successfuly"
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "insert field"]);
    }
    $stmt->close();
    $conn->close();
    exit;
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = (int)$data['id'];
    $stmt = $conn->prepare("DELETE FROM patients WHERE patient_id = ? ");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "patient deleted"]);
        exit;
    } else {
        echo json_encode(["success" => false, "message" => "delete field"]);
        exit;
    }
    $stmt->close();
    $conn->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT * FROM patients";
    $all_patients = $conn->query($query);
    $patients = [];
    while ($row = $all_patients->fetch_assoc()) {
        $patients[] = $row;
    }
    echo json_encode(["patientData" => $patients]);
    exit;
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    $id = (int)$data['patient_id'];
    $first_name = htmlspecialchars($data['first_name']);
    $last_name    = htmlspecialchars($data["last_name"]);
    $email        = htmlspecialchars($data["email"]);
    $gender       = $data["gender"];
    $age          = (int)$data["age"];
    $phone_number = $data["phone_number"];
    $adress       = htmlspecialchars($data["adress"]);
    $stmt = $conn->prepare( "UPDATE patients SET first_name = ? , last_name = ?  , email = ?  , gender = ?  , age = ?  , phone_number = ?  , adress = ?    WHERE patient_id = ? "
    );

    $stmt->bind_param(
        "ssssissi",
        $first_name,
        $last_name,
        $email,
        $gender,
        $age,
        $phone_number,
        $adress,
        $id
    );
    if ($stmt->execute()) {
        echo json_encode(["success" => true , "message" => "patient updated successfully"]);
        exit;
    }else{
       echo json_encode(["success" => false , "message" => "field updated "]);
        exit; 
    }
} else {
    echo json_encode(["success" => false, "message" => "invalid request method"]);
    exit;
}
