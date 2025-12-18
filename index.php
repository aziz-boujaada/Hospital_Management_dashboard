<?php ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content=" permettre la gestion des patients, médecins, départements">
  <meta name="keywords" content="unity care clinic  vhvh">
  <title>Unity Care Clinic</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


</head>

<body class="font-sans">
  <main>
    <div class="flex gap-10">
      <div class="w-[20%] bg-gray-300  shadow-xl h-screen p-2">
        <h1 class="text-2xl font-sans font-bold text-blue-700 text-center">Unity Care Clinic</h1>
        <div class="mt-8 text-center">
          <ul class="flex flex-col items-start gap-5 p-4">
            <li id="dashboard_tab" class="bg-blue-500 p-2 rounded-md w-full font-semibold text-white transition-all hover:bg-blue-400   cursor-pointer ">Dashboard</li>
            <li id="patients_tab" class="bg-blue-500 p-2 rounded-md w-full font-semibold text-white transition-all hover:bg-blue-400   cursor-pointer ">Patients</li>
            <li  id="doctor_tab" class="bg-blue-500 p-2 rounded-md w-full font-semibold text-white transition-all hover:bg-blue-400   cursor-pointer ">Doctors</li>
            <li id="deaprtement_tab" class="bg-blue-500 p-2 rounded-md w-full font-semibold text-white transition-all hover:bg-blue-400   cursor-pointer ">Departements</li>
          </ul>
        </div>
      </div>
      <div class="w-full">
        <div class="w-full flex items-start justify-between py-2 px-8 bg-gray-300 ">
          <div>
            <input type="text" placeholder="Enter a Keyword to search" class=" w-full border rounded-md px-3 py-2 shadow-xl focus:ring-2 focus:ring-blue-600 outline-none">
          </div>
          <div class="flex gap-6">
          <i class="fa-solid fa-bell"></i>
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
        <div id="content" class="block"></div>
      </div>
    </div>
  </main>
  <script src="./assets/ui.js"></script>
</body>

</html>