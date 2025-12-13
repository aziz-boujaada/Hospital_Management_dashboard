<?php

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
  <div class=" mt-8 mr-8 overflow-x-auto rounded-lg shadow">

    <table id="patient_table" class=" min-w-full text-left text-sm text-gray-700">
      <thead class="bg-gray-100 text-gray-900 uppercase text-xs font-semibold">
        <tr>
          <th class="px-6 py-3">Id</th>
          <th class="px-6 py-3">First Name</th>
          <th class="px-6 py-3">Last Name</th>
          <th class="px-6 py-3">Email</th>
          <th class="px-6 py-3">Phone Number</th>
          <th class="px-6 py-3">Gender</th>
          <th class="px-6 py-3">Age</th>
          <th class="px-6 py-3">Address</th>
        </tr>
      </thead>
    </table>
    <div
      id="patient_form"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 hidden ">
      <form
        id="form_patients"
        class="bg-white w-[95%] sm:w-[500px] max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl p-6">
        <div class="text-right">
          <button
            id="close_patient_form"
            type="button"
            class="bg-gray-300 p-1 rounded-md hover:text-red-600">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <h2 class="text-2xl font-semibold text-transparent bg-clip-text bg-blue-600 text-center mb-3">
          Add New Patients
        </h2>

        <div class="flex flex-col gap-1">
          <label for="worker name" class="font-medium text-gray-700">First Name</label>
          <input
            name=""
            type="text"
            id="first-name"
            placeholder="Enter first name"
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          <div id="first-name-error" class="error hidden"></div>
        </div>
        <div class="flex flex-col gap-1">
          <label for="worker name" class="font-medium text-gray-700">Last Name</label>
          <input
            name=""
            type="text"
            id="last-name"
            placeholder="Enter last name"
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          <div id="last-name-error" class="error hidden"></div>
        </div>

        <div class="flex flex-col gap-1">
          <label for="gender" class="font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
            <option value="male">Male</option>
            <option value="female">Female</option>

          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label for="email" class="font-medium text-gray-700">Email</label>
          <input
            name=""
            type="email"
            id="patient-email"
            placeholder="example@mail.com"
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          <div id="patient-email-error" class="error hidden"></div>
        </div>
        <div class="flex flex-col gap-1">
          <label for="phone" class="font-medium text-gray-700">Phone Number</label>
          <input
            name=""
            type="text"
            id="patient-phone"
            placeholder="+212612345678"
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          <div id="patient-phone-error" class="error hidden"></div>
        </div>

        <div class="flex flex-col gap-1">
          <label for="age" class="font-medium text-gray-700">Age</label>
          <input
            name=""
            type="number"
            id="age"
            placeholder=""
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          <div id="patient-age-error" class="error hidden"></div>
        </div>

        <div class="flex flex-col gap-1">
          <label for="adress" class="font-medium text-gray-700">Adress</label>
          <input
            name=""
            type="text"
            id="adress"
            placeholder="EX:srteet 123,Los Angelos,USA"
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          <div id="patient-adress-error" class="error hidden"></div>
        </div>



        <div class="text-right pt-4">

          <button
            type="button"
            id="save_patient"
            class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-400 transition">
            Save Patient
          </button>
        </div>
      </form>
    </div>
  </div>
  <div>
    <button id="add_patient" class="px-4 py-2 mt-10 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-400 transition">Add New Patients</button>
  </div>
 <div id="responseMessage" class=" fixed top-5 right-1/2 z-50"></div>

  <script src="../../assets//ui.js"></script>
</body>

</html>