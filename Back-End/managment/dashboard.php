<?php
?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />



<div class="grid grid-cols-1 md:grid-cols-3 gap-6 m-6 h-[70vh]">

  <!-- Patients -->
  <div class="bg-blue-500 rounded-xl shadow-lg p-6 flex items-center justify-between text-white">
    <div>
      <p class="text-sm opacity-80">Patients</p>
      <h2 id="nbr_patients" class="text-3xl font-bold mt-1"></h2>
    </div>
    <div class="bg-white/20 p-4 rounded-full">
      <i class="fas fa-user-injured fa-2x"></i>
    </div>
  </div>

  <!-- Doctors -->
  <div class="bg-orange-500 rounded-xl shadow-lg p-6 flex items-center justify-between text-white">
    <div>
      <p class="text-sm opacity-80">Doctors</p>
      <h2 id="nbr_doctors" class="text-3xl font-bold mt-1"></h2>
    </div>
    <div class="bg-white/20 p-4 rounded-full">
      <i class="fas fa-user-md fa-2x"></i>
    </div>
  </div>

  <!-- Departments -->
  <div class="bg-purple-500 rounded-xl shadow-lg p-6 flex items-center justify-between text-white">
    <div>
      <p class="text-sm opacity-80">Departments</p>
      <h2 id="nbr_departements" class="text-3xl font-bold mt-1"></h2>
    </div>
    <div class="bg-white/20 p-4 rounded-full">
      <i class="fas fa-hospital fa-2x"></i>
    </div>
  </div>
<!--number of doctors in departements -->
  <canvas id="doctorsChart" class="w-full h-80"></canvas>



<script src="../../assets/ui.js"></script>
</div>

