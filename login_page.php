<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-blue-100 flex items-center justify-center">

  <div class=" bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
    <div id="login_meassage" class=" text-center text-white font-sans w-full transition-all"></div>
    <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">
      Login
    </h2>

    <form >
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Email</label>
        <input
          id="user_email"
          type="email"
          placeholder="Enter your email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 mb-2">Password</label>
        <input
          id="user_password"
          type="password"
          placeholder="Enter your password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        id="save_user_data"
        type="button"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Login
      </button>
    </form>

    <p class="text-center text-gray-600 mt-4">
       Dont have an account?
      <a href="#" class="text-blue-600 hover:underline">Sign up</a>
    </p>
  </div>
  

  <script src="./assets/login.js"></script>
</body>
</html>
