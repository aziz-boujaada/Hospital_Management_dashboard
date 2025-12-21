<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login_page.php");
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content=" permettre la gestion des patients, médecins, départements">
  <meta name="keywords" content="unity care clinic  vhvh">
  <title>Unity Care Clinic</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
  <link rel="stylesheet" href="./assets/style.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


</head>

<body class="font-sans">
  <main>
    <div class="flex gap-2 h-auto">
      <div class="w-[20%] bg-gray-300  shadow-xl p-2">
        <h1 class="text-2xl font-sans font-bold text-blue-700 text-center">Unity Care Clinic</h1>
        <div class="mt-8 ">
          <ul class="flex flex-col items-start gap-5 p-4">
            <li id="dashboard_tab" class="p-2 rounded-md w-full font-semibold text-black transition-all hover:bg-blue-400 cursor-pointer active_tab">
              <i class="fa-solid fa-chart-pie mr-2"></i> Dashboard
            </li>
            <li id="patients_tab" class="p-2 rounded-md w-full font-semibold text-black transition-all hover:bg-blue-400 cursor-pointer">
              <i class="fa-solid fa-user-injured mr-2"></i> Patients
            </li>
            <li id="doctor_tab" class="p-2 rounded-md w-full font-semibold text-black transition-all hover:bg-blue-400 cursor-pointer">
              <i class="fa-solid fa-user-doctor mr-2"></i> Doctors
            </li>
            <li id="deaprtement_tab" class="p-2 rounded-md w-full font-semibold text-black transition-all hover:bg-blue-400 cursor-pointer">
              <i class="fa-solid fa-building-columns mr-2"></i> Departements
            </li>
          </ul>

        </div>
      </div>
      <div class="w-full">
        <div class="w-full flex items-center justify-around py-3 px-6 bg-white shadow-md border-b border-gray-200">
          <div class="w-1/2">
            <input
              id="search_input"
              type="text"
              placeholder="Enter a Keyword to search"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200">
          </div>
          <div class="flex items-center justify-between gap-12 text-gray-600">
            <i class="fa-solid fa-bell text-xl cursor-pointer hover:text-blue-500 transition-colors"></i>
            <p class=" bg-gray-100 rounded px-3 py-1"><i class="fa-solid fa-user text-xl cursor-pointer text-blue-500 transition-colors"></i><span class="text-sm text-blue-600 pl-1 font-sans font-semibold"><?php echo $_SESSION['user_name']; ?></span></p>
            <button id="logout_btn" class="px-3 py-1 bg-red-500 text-white rounded">Logout</button>

          </div>
        </div>
        <div class=" mx-3 my-4 p-6 bg-blue-100 rounded-lg shadow-lg mb-6">
          <h2 class="text-2xl font-bold text-blue-700">
            Welcome back, <?php echo htmlspecialchars($_SESSION['user_name']); ?>👋!
          </h2>
          <p class="text-blue-600 mt-1">Hope you have a great day managing your patients.</p>
        </div>


        <div id="content" class="block"></div>
      </div>
    </div>
  </main>
  <script src="./assets/ui.js"></script>
</body>

</html>
<!--logout-->
<script>
  document.getElementById("logout_btn").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "Back-End/Ahutontification/logout.php"
  })
</script>