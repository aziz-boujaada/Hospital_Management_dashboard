function saveUserData() {
  const userEmail = document.getElementById("user_email");
  const userpassword = document.getElementById("user_password");
  const saveUserDataBtn = document.getElementById("save_user_data");

  saveUserDataBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const userData = {
      userEmail: userEmail.value.trim(),
      userPassword: userpassword.value.trim(),
    };
    console.log(userData);
    login(userData);
  });
}
saveUserData();
async function login(userData) {
  const loginMeassage = document.getElementById("login_meassage");
  try {
    const res = await fetch("Back-End/Ahutontification/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const response = await res.json();
    console.log(response);
    if (response.success) {
        loginMeassage.innerHTML =`<p class="bg-green-500 p-1 rounded-md"> ${response.message}</p>`;
      setTimeout(() => {
          window.location.href = "index.php";
      },1000);
    } else {
        loginMeassage.innerHTML = `<p class="bg-red-500 p-1 rounded-md"> ${response.message}</p>`;
        setTimeout(()=>{
           loginMeassage.innerHTML = ""
        },3000)
    }
  } catch (err) {
    console.error(err);
  }
}
