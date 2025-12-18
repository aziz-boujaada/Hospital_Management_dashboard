<?php

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
  <div class=" mt-8 mr-8 h-[80vh] overflow-x-auto rounded-lg shadow">

    <table class=" min-w-full text-left text-sm text-gray-700">
      <thead class="bg-gray-400 text-gray-900 uppercase text-xs font-semibold">
        <tr>
          <th class="px-6 py-3">Id</th>
          <th class="px-6 py-3">Departement Name</th>
          <th class="px-6 py-3">Departemen Location</th>
          <th class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody  id="departement_table" class="bg-gray-100 text-gray-900 uppercase text-xs font-semibold " ></tbody>
    </table>
    <div
      id="departement_form"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 hidden ">
      <form
        id="form_departement"
        class="bg-white w-[95%] sm:w-[500px] max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl p-6">
        <div class="text-right">
          <button
            id="close_departement_form"
            type="button"
            class="bg-gray-300 p-1 rounded-md hover:text-red-600">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <h2 class="text-2xl font-semibold text-transparent bg-clip-text bg-blue-600 text-center mb-3">
          Add New Departemen
        </h2>

        <div class="flex flex-col gap-1">
          <label for="" class="font-medium text-gray-700">Departement Name</label>
          <input
            name=""
            type="text"
            id="departement-name"
            placeholder="Enter departement name"
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          <div id="departement-name-error" class="error hidden"></div>
        </div>
        <div class="flex flex-col gap-1">
          <label for="" class="font-medium text-gray-700">Departemen Location</label>
          <input
            name=""
            type="text"
            id="departement-location"
            placeholder="Enter departement location"
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          <div id="departement-location-error" class="error hidden"></div>
        </div>
        <div class="text-right pt-4">

          <button
            type="button"
            id="save_departement"
            class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-400 transition">
            Save Departement
          </button>
          <button
            type="button"
            id="update_departement"
            class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-400 transition hidden">
            update Departement
          </button>
        </div>
      </form>
    </div>
  </div>
  <div>
    <button id="add_departement" class="px-4 py-2 mt-10 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-400 transition">Add New Departemen</button>
  </div>
 <div id="responseMessage" class=" fixed top-5 right-1/2 z-50"></div>

  <script src="../../assets//ui.js"></script>
</body>

</html>