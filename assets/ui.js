// document.addEventListener("DOMContentLoaded" , ()=>{

// })
const ContentZone = document.getElementById("content");

// console.log("content loaded" ,ContentZone)
function loadhDashboardPage() {
  const dashboardTab = document.getElementById("dashboard_tab");
  dashboardTab.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("btn dash clicked", dashboardTab);
    try {
      fetch("Back-End/managment/dashboard.php")
        .then((res) => res.text())
        .then((data) => {
          // const conentDiv = document.createElement("div")
          // conentDiv.innerHTML = data ;
          // ContentZone.appendChild(conentDiv)
          ContentZone.innerHTML = data;
        });
    } catch (err) {
      console.error(err);
    }
  });
}

// fetch patients page
function loadPatientsPage() {
  // console.log("content loaded" ,ContentZone)
  const patientsTab = document.getElementById("patients_tab");
  patientsTab.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("btn patient clicked", patientsTab);
    try {
      fetch("Back-End/managment/patients.php ")
        .then((res) => res.text())
        .then((data) => {
          ContentZone.innerHTML = data;
          setTimeout(() => {
            openPatientModal();
            closePatientModal();
            savePatients();
          }, 100);
        });
    } catch (err) {
      console.error(err);
    }
  });
}

function openPatientModal() {
  const patientForm = document.getElementById("patient_form");
  const addPatientBtn = document.getElementById("add_patient");
  if (!addPatientBtn || !patientForm) return;
  addPatientBtn.addEventListener("click", () => {
    patientForm.classList.remove("hidden");
    console.log(patientForm, addPatientBtn);
  });
}
function closePatientModal() {
  const patientForm = document.getElementById("patient_form");
  const closeForm = document.getElementById("close_patient_form");
  if (!closeForm || !patientForm) return;
  closeForm.addEventListener("click", () => {
    patientForm.classList.add("hidden");
  });
}

// save patients information
function savePatients() {
  const savePatientsBtn = document.getElementById("save_patient");
  if (!savePatientsBtn) return;
  console.log("save btn", savePatientsBtn);
  savePatientsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("patient-email").value;
    const phoneNumber = document.getElementById("patient-phone").value;
    const age = document.getElementById("age").value;
    const adress = document.getElementById("adress").value;
    const patientData = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      phoneNumber: phoneNumber,
      age: age,
      adress: adress,
    };
    console.log(patientData);
    SendPaitentData(patientData);
    
  });
  function SendPaitentData(patientData) {
    const patientTable = document.getElementById("patient_table");
    try {
      fetch("Back-End/managment/patients.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          patientTable.innerHTML = `

    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4">1</td>
        <td class="px-6 py-4">${data.firstName}</td>
        <td class="px-6 py-4">${data.lastName}</td>
        <td class="px-6 py-4">${data.email}</td>
        <td class="px-6 py-4">555-1234</td>
        <td class="px-6 py-4">Male</td>
        <td class="px-6 py-4">28</td>
        <td class="px-6 py-4">123 Main St</td>
      </tr>
    </tbody>
  </table>
`;
        });
    } catch (err) {
      console.error(err);
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  loadhDashboardPage();
  loadPatientsPage();
});
