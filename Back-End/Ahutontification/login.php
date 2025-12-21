<?php
session_start();
header("Content-Type: application/json");
require_once '../config/config_db.php';

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data) && !empty($data)) {
        $email = $data['userEmail'];
        $password = $data['userPassword'];

        $query = "SELECT * FROM user WHERE user_email = ? LIMIT 1";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if ($password == $user['user_password'] && $email == $user['user_email']) {
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['user_email'] = $user['user_email'];
                $_SESSION['user_name'] = $user['user_name'];

                echo json_encode(["success" => true, "message" => "Login successfully"]);
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "Incorrect password"
                ]);
            }
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Email not found"
            ]);
        }
    }
}
