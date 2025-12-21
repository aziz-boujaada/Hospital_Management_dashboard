// document.addEventListener("DOMContentLoaded" , ()=>{

// })
const ContentZone = document.getElementById("content");
//active tab 
function activeTab(){
  const dashboardTab = document.getElementById("dashboard_tab");
  const patientsTab = document.getElementById("patients_tab");
  const deaprtementTab = document.getElementById("deaprtement_tab");
  const doctorTab = document.getElementById("doctor_tab");

  dashboardTab.addEventListener("click" , ()=>{
    dashboardTab.classList.add("active_tab")
    patientsTab.classList.remove("active_tab")
    deaprtementTab.classList.remove("active_tab")
    doctorTab.classList.remove("active_tab")
  })

  patientsTab.addEventListener("click" , ()=>{
    patientsTab.classList.add("active_tab")
    dashboardTab.classList.remove("active_tab")
    deaprtementTab.classList.remove("active_tab")
    doctorTab.classList.remove("active_tab")
  })

  deaprtementTab.addEventListener("click" , ()=>{
    deaprtementTab.classList.add("active_tab")
    patientsTab.classList.remove("active_tab")
    dashboardTab.classList.remove("active_tab")
    doctorTab.classList.remove("active_tab")
  })

  doctorTab.addEventListener("click" , ()=>{
    doctorTab.classList.add("active_tab")
    deaprtementTab.classList.remove("active_tab")
    patientsTab.classList.remove("active_tab")
    dashboardTab.classList.remove("active_tab")
  })
}
activeTab()
// console.log("btn patient clicked", patientsTab);
// console.log("content loaded" ,ContentZone)
async function loadhDashboardPage() {
  // const dashboardTab = document.getElementById("dashboard_tab");
  // dashboardTab.addEventListener("click", async (e) => {
    // e.preventDefault();
    // console.log("btn dash clicked", dashboardTab);
    try {
      const res = await fetch("Back-End/managment/dashboard.php");
      const data = await res.text();
      ContentZone.innerHTML = data;
      setTimeout(()=>{
         fetchPatientsStatistics();

      },100)
    } catch (err) {
      console.error(err);
    }
  }
  const dashboardTab = document.getElementById("dashboard_tab");
  dashboardTab.addEventListener("click", async (e) => {
    dashboardTab.classList.add("active_tab")
    e.preventDefault();
    loadhDashboardPage()
    console.log("btn dash clicked", dashboardTab);
    });
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

// fetch patients page
function loadPatientsPage() {
  // console.log("content loaded" ,ContentZone)
  const patientsTab = document.getElementById("patients_tab");
  patientsTab.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("btn patient clicked", patientsTab);
  
    try {
      fetch("Back-End/managment/get_patients_page.php")
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
    DispalayAllPatient();
  });
}
// save patients information
function savePatients() {
  const savePatientsBtn = document.getElementById("save_patient");
  const patientForm = document.getElementById("form_patients");
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
    SendPaitentData(patientData, patientForm);
  });
}
function SendPaitentData(patientData, form) {
  try {
    fetch("Back-End/managment/patient.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);

        const responseMessage = document.getElementById("responseMessage");
        const patientForm = document.getElementById("patient_form");
        responseMessage.innerHTML = "";
        if (data.success) {
          responseMessage.innerHTML = `
              <p class = "bg-green-500 text-white rounded-md p-1 text-center">${data.message}</p>
            `;
          form.reset();
          patientForm.classList.add("hidden");
        } else {
          responseMessage.innerHTML = `
              <p class = "bg-red-500 text-white rounded-md p-1 text-center">${data.message}</p>
            `;
        }

        setTimeout(() => {
          responseMessage.innerHTML = "";
        }, 3000);
        DispalayAllPatient();
      });
  } catch (err) {
    console.error(err);
  }
}

async function fetchPatientsStatistics() {
  try {
    const res = await fetch("Back-End/managment/get_dashboard_stats.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const statistics = await res.json();
    console.log(statistics);

    const totalPatients = document.getElementById("nbr_patients");
    const totalDoctors = document.getElementById("nbr_doctors");
    const totalDepartemnts = document.getElementById("nbr_departements");
    const DoctorsInDepartemnts = document.getElementById("nbr_dr_departements");
    if (!totalPatients || ! totalDoctors || !totalDepartemnts) {
      console.log("not found");
      return;
    }
    totalPatients.textContent = `Patients : ${statistics.totalPatients}`;
    totalDoctors.textContent = `Doctors : ${statistics.totalDoctors}`;
    totalDepartemnts.textContent = `Departements : ${statistics.totalDepartements}`;



  const chartLabel = statistics.doctorsIndepartement.map(
    item => item.departementName
  );

  const doctorCount = statistics.doctorsIndepartement.map(
    item => Number(item.DrIndepartement)
  );

  const chartDiv= document.getElementById("doctorsChart")


  new Chart(chartDiv, {
    type: 'doughnut',
    data: {
      labels: chartLabel,
      datasets: [{
        label: `Number of doctors in this departement`,
        data: doctorCount,
        backgroundColor: [
          '#3498db',
          '#2ecc71',
          '#e74c3c',
          '#f1c40f',
          '#9b59b6'
        ]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });




  } catch (err) {
    console.error("Fetch error:", err);
    if (totalPatients) {
      totalPatients.innerHTML = `<p>Error loading statistics</p>`;
    }
  }
}

async function DispalayAllPatient() {
  try {
    const res = await fetch("Back-End/managment/patient.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const patientData = await res.json();
    console.log("all patients", patientData);
    const patientTable = document.getElementById("patient_table");
    patientTable.innerHTML = patientData.patientData
      .map((data) => {
        return `
      <tr>
      <td class="px-6 py-3">${data.patient_id}</td>
      <td class="px-6 py-3">${data.first_name}</td>
      <td class="px-6 py-3">${data.last_name}</td>
      <td class="px-6 py-3">${data.email}</td>
      <td class="px-6 py-3">${data.phone_number}</td>
      <td class="px-6 py-3">${data.gender}</td>
      <td class="px-6 py-3">${data.age}</td>
      <td class="px-6 py-3">${data.adress}</td>
      <td class="px-6 py-3 flex items-center gap-4">
      <span class="delete_patient text-red-600 hover:text-red-900 cursor-pointer transition-al" data-id="${
        data.patient_id
      }" onClick = "deletPatients(${
          data.patient_id
        })"><i class="fa-solid fa-trash"></i>delete</span>
      <sapn id="edit_patient" class = "text-yellow-600 pl-3  hover:text-yellow-300 cursor-pointer transition-all" onClick = 'editPatient(${JSON.stringify(
        data
      )})'><i class="fa-solid fa-pen"></i>edit<sapn>
      </td>
      </tr>
      
      `;
      })
      .join("");
      serchPatients(patientData)
  } catch (err) {
    console.error(err);
  }
}
function serchPatients(patientData){
   const searchInput = document.getElementById("search_input")
      searchInput.addEventListener("input" , () => {
        const inputValue = searchInput.value.trim()
        console.log(inputValue)
       const filtredPatient = patientData.patientData.filter((patient)=>{
          patient.first_name.toLowerCase().includes(inputValue.toLowerCase())
          console.log(patient.first_name)
        })
        console.log(filtredPatient)
        DispalayAllPatient(filtredPatient)
       
      })
}
async function deletPatients(id) {
  console.log(id);
  try {
    const res = await fetch("Back-End/managment/patient.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const response = await res.json();
    console.log(response);
    if (response.success) {
      DispalayAllPatient();
    }
  } catch (err) {
    console.error(err);
  }
}

async function editPatient(data) {
  console.log(typeof data, data.patient_id, data.first_name);

  const savePatientsBtn = document.getElementById("save_patient");
  savePatientsBtn.classList.add("hidden");
  const updatePatientsBtn = document.getElementById("update_patient");
  updatePatientsBtn.classList.remove("hidden");
  const patientFormDiv = document.getElementById("patient_form");

  const patientForm = document.getElementById("form_patients");

  patientFormDiv.classList.remove("hidden");
  document.getElementById("first-name").value = data.first_name;
  document.getElementById("last-name").value = data.last_name;
  document.getElementById("gender").value = data.gender;
  document.getElementById("patient-email").value = data.email;
  document.getElementById("patient-phone").value = data.phone_number;
  document.getElementById("age").value = data.age;
  document.getElementById("adress").value = data.adress;

  updatePatientsBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    //updated data
    const updatedData = {
      patient_id: data.patient_id,
      first_name: document.getElementById("first-name").value,
      last_name: document.getElementById("last-name").value,
      gender: document.getElementById("gender").value,
      email: document.getElementById("patient-email").value,
      phone_number: document.getElementById("patient-phone").value,
      age: document.getElementById("age").value,
      adress: document.getElementById("adress").value,
    };
    console.log("updates data", updatedData);
    try {
      console.log("form", patientForm);

      const res = await fetch("Back-End/managment/patient.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const response = await res.json();
      console.log(response);
      patientForm.reset();
      patientFormDiv.classList.add("hidden");
      updatePatientsBtn.classList.add("hidden");
      savePatientsBtn.classList.remove("hidden");
      const responseMessage = document.getElementById("responseMessage");

      responseMessage.innerHTML = "";
      if (response.success) {
        responseMessage.innerHTML = `
              <p class = "bg-green-500 text-white rounded-md p-1 text-center">${response.message}</p>
            `;
      } else {
        responseMessage.innerHTML = `
              <p class = "bg-red-500 text-white rounded-md p-1 text-center">${response.message}</p>
            `;
      }

      setTimeout(() => {
        responseMessage.innerHTML = "";
      }, 3000);
      DispalayAllPatient();
    } catch (err) {
      console.error(err);
    }
  });
}

//// departnemets

// fetch departement page
function loadDepartemntPage() {
  // console.log("content loaded" ,ContentZone)
  const deaprtementTab = document.getElementById("deaprtement_tab");
  deaprtementTab.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("btn patient clicked", deaprtementTab);
    try {
      fetch("Back-End/managment/departements_page.php")
        .then((res) => res.text())
        .then((data) => {
          ContentZone.innerHTML = data;
          setTimeout(() => {
            openDepartmentModal();
            closeDepartmentModal();
            savePDepartements();
            DispalayAllDepartement();
          }, 100);
        });
    } catch (err) {
      console.error(err);
    }
  });
}
function openDepartmentModal() {
  const departementForm = document.getElementById("departement_form");
  const openForm = document.getElementById("add_departement");

  if (!openForm || !departementForm) return;

  openForm.addEventListener("click", () => {
    departementForm.classList.remove("hidden");
  });
}

function closeDepartmentModal() {
  const departementForm = document.getElementById("departement_form");
  const closeForm = document.getElementById("close_departement_form");
  if (!closeForm || !departementForm) return;
  closeForm.addEventListener("click", () => {
    departementForm.classList.add("hidden");
  });
}

// save deaprtement information
function savePDepartements() {
  const saveDepartementBtn = document.getElementById("save_departement");
  const departementForm = document.getElementById("form_departement");
  if (!saveDepartementBtn) return;
  console.log("save btn", saveDepartementBtn);
  saveDepartementBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const departementName = document.getElementById("departement-name").value;
    const departementLocation = document.getElementById(
      "departement-location"
    ).value;

    const deaprtementData = {
      departementName: departementName,
      departementLocation: departementLocation,
    };
    console.log(deaprtementData);
    SendDepartementData(deaprtementData, departementForm);
  });
}
function SendDepartementData(deaprtementData, form) {
  try {
    fetch("Back-End/managment/departements.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deaprtementData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);

        const responseMessage = document.getElementById("responseMessage");
        const departementForm = document.getElementById("departement_form");
        responseMessage.innerHTML = "";
        if (data.success) {
          responseMessage.innerHTML = `
              <p class = "bg-green-500 text-white rounded-md p-1 text-center">${data.message}</p>
            `;
          form.reset();
          departementForm.classList.add("hidden");
        } else {
          responseMessage.innerHTML = `
              <p class = "bg-red-500 text-white rounded-md p-1 text-center">${data.message}</p>
            `;
        }

        setTimeout(() => {
          responseMessage.innerHTML = "";
        }, 3000);
        DispalayAllDepartement();
      });
  } catch (err) {
    console.error(err);
  }
}
async function DispalayAllDepartement() {
  try {
    const res = await fetch("Back-End/managment/departements.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const departementData = await res.json();
    console.log("all patients", departementData);
    const departementTable = document.getElementById("departement_table");
    departementTable.innerHTML = departementData.departementData
      .map((data) => {
        return `
      <tr>
      <td class="px-6 py-3">${data.departement_id}</td>
      <td class="px-6 py-3">${data.departement_name}</td>
      <td class="px-6 py-3">${data.departement_location}</td>
     <td class="px-6 py-3 flex items-center gap-4">
      <span class="delete_departement text-red-600 hover:text-red-900 cursor-pointer transition-al" data-id="${
        data.departement_id
      }" onClick = "deletDepartements(${
          data.departement_id
        })"><i class="fa-solid fa-trash"></i>delete</span>
         <sapn id="edit_patient" class = "text-yellow-600 pl-3  hover:text-yellow-300 cursor-pointer transition-all" onClick = 'editDepartement(${JSON.stringify(
           data
         )})'><i class="fa-solid fa-pen"></i>edit<sapn>
      </td>
      </tr>
      
      `;
      })
      .join("");
  } catch (err) {
    console.error(err);
  }
}

async function deletDepartements(id) {
  console.log(id);
  try {
    const res = await fetch("Back-End/managment/departements.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const response = await res.json();
    console.log(response);
    if (response.success) {
      DispalayAllDepartement();
    }
  } catch (err) {
    console.error(err);
  }
}

async function editDepartement(data) {
  const saveDepartementBtn = document.getElementById("save_departement");
  saveDepartementBtn.classList.add("hidden");
  const updateDepartementBtn = document.getElementById("update_departement");
  updateDepartementBtn.classList.remove("hidden");
  const departementFormDiv = document.getElementById("departement_form");

  const departementForm = document.getElementById("form_departement");

  departementFormDiv.classList.remove("hidden");
  document.getElementById("departement-name").value = data.departement_name;
  document.getElementById("departement-location").value =
    data.departement_location;

  updateDepartementBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    //updated data
    const updatedData = {
      id: data.departement_id,
      departement_name: document.getElementById("departement-name").value,
      departement_location: document.getElementById("departement-location")
        .value,
    };
    console.log("updates data", updatedData);
    try {
      console.log("form", departementForm);

      const res = await fetch("Back-End/managment/departements.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const response = await res.json();
      console.log(response);
      departementForm.reset();
      departementFormDiv.classList.add("hidden");
      updateDepartementBtn.classList.add("hidden");
      saveDepartementBtn.classList.remove("hidden");
      const responseMessage = document.getElementById("responseMessage");

      responseMessage.innerHTML = "";
      if (response.success) {
        responseMessage.innerHTML = `
              <p class = "bg-green-500 text-white rounded-md p-1 text-center">${response.message}</p>
            `;
      } else {
        responseMessage.innerHTML = `
              <p class = "bg-red-500 text-white rounded-md p-1 text-center">${response.message}</p>
            `;
      }

      setTimeout(() => {
        responseMessage.innerHTML = "";
      }, 3000);
      DispalayAllDepartement();
    } catch (err) {
      console.error(err);
    }
  });
}

//// doctors

// fetch doctors page
function loadDoctorsPage() {
  const doctorTab = document.getElementById("doctor_tab");
  doctorTab.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      fetch("Back-End/managment/doctors_page.php")
        .then((res) => res.text())
        .then((data) => {
          ContentZone.innerHTML = data;
          setTimeout(() => {
            openDoctorModal();
            closeDoctorModal();
            saveDoctor();
            displayAllDoctors();
          }, 100);
        });
    } catch (err) {
      console.error(err);
    }
  });
}
async function loadDepartmentsForDoctor() {
  try {
    const res = await fetch("Back-End/managment/departements.php", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const select = document.getElementById("doctor-department-id");
    if (!select) return;
    select.innerHTML = '<option value="">Select Department</option>';
    data.departementData.forEach((dept) => {
      const option = document.createElement("option");
      option.value = dept.departement_id;
      option.textContent = dept.departement_name;
      select.appendChild(option);
    });
  } catch (err) {
    console.error(err);
  }
}

// open doctor modal
function openDoctorModal() {
  const doctorForm = document.getElementById("doctor_form");
  const openForm = document.getElementById("add_doctor");
  if (!openForm || !doctorForm) return;

  openForm.addEventListener("click", () => {
    doctorForm.classList.remove("hidden");
    loadDepartmentsForDoctor();
  });
}

// close doctor modal
function closeDoctorModal() {
  const doctorForm = document.getElementById("doctor_form");
  const closeForm = document.getElementById("close_doctor_form");
  if (!closeForm || !doctorForm) return;

  closeForm.addEventListener("click", () => {
    doctorForm.classList.add("hidden");
  });
}

// save doctor information
function saveDoctor() {
  const saveDoctorBtn = document.getElementById("save_doctor");
  const doctorForm = document.getElementById("form_doctors");
  if (!saveDoctorBtn) return;

  saveDoctorBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const doctorData = {
      first_name: document.getElementById("doctor-first-name").value,
      last_name: document.getElementById("doctor-last-name").value,
      specialization: document.getElementById("doctor-specialization").value,
      phone_number: document.getElementById("doctor-phone").value,
      email: document.getElementById("doctor-email").value,
      id_departement: document.getElementById("doctor-department-id").value,
    };
    console.log(doctorData);
    SendDoctorData(doctorData, doctorForm);
  });
}

// send doctor data to backend
function SendDoctorData(doctorData, form) {
  try {
    fetch("Back-End/managment/doctors.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctorData),
    })
      .then((res) => res.json())
      .then((data) => {
        const responseMessage = document.getElementById("responseMessage");
        const doctorForm = document.getElementById("doctor_form");
        responseMessage.innerHTML = "";

        if (data.success) {
          responseMessage.innerHTML = `<p class="bg-green-500 text-white rounded-md p-1 text-center">${data.message}</p>`;
          form.reset();
          doctorForm.classList.add("hidden");
        } else {
          responseMessage.innerHTML = `<p class="bg-red-500 text-white rounded-md p-1 text-center">${data.message}</p>`;
        }

        setTimeout(() => {
          responseMessage.innerHTML = "";
        }, 3000);

        displayAllDoctors();
      });
  } catch (err) {
    console.error(err);
  }
}

// display all doctors
async function displayAllDoctors() {
  try {
    const res = await fetch("Back-End/managment/doctors.php", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const doctorData = await res.json();
    const doctorTable = document.getElementById("doctor_table");

    doctorTable.innerHTML = doctorData.doctorData
      .map((data) => {
        return `
      <tr>
        <td class="px-6 py-3">${data.doctor_id}</td>
        <td class="px-6 py-3">${data.first_name}</td>
        <td class="px-6 py-3">${data.last_name}</td>
        <td class="px-6 py-3">${data.specialization}</td>
        <td class="px-6 py-3">${data.phone_number}</td>
        <td class="px-6 py-3">${data.email}</td>
        <td class="px-6 py-3">
        ${data.dep_name ? data.dep_name : "No Department"}
      </td>
        <td class="px-6 py-3 flex items-center gap-4">
          <span class="delete_doctor text-red-600 hover:text-red-900 cursor-pointer transition-all" data-id="${
            data.doctor_id
          }" onClick="deleteDoctor(${data.doctor_id})">
            <i class="fa-solid fa-trash"></i> delete
          </span>
          <span id="edit_doctor" class="text-yellow-600 pl-3 hover:text-yellow-300 cursor-pointer transition-all" onClick='editDoctor(${JSON.stringify(
            data
          )})'>
            <i class="fa-solid fa-pen"></i> edit
          </span>
        </td>
      </tr>
      `;
      })
      .join("");
  } catch (err) {
    console.error(err);
  }
}

// delete doctor
async function deleteDoctor(id) {
  try {
    const res = await fetch("Back-End/managment/doctors.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const response = await res.json();
    if (response.success) {
      displayAllDoctors();
    }
  } catch (err) {
    console.error(err);
  }
}

// edit doctor
async function editDoctor(data) {
  const saveDoctorBtn = document.getElementById("save_doctor");
  const updateDoctorBtn = document.getElementById("update_doctor");
  const doctorFormDiv = document.getElementById("doctor_form");
  const doctorForm = document.getElementById("form_doctors");

  saveDoctorBtn.classList.add("hidden");
  updateDoctorBtn.classList.remove("hidden");
  doctorFormDiv.classList.remove("hidden");

  document.getElementById("doctor-first-name").value = data.first_name;
  document.getElementById("doctor-last-name").value = data.last_name;
  document.getElementById("doctor-specialization").value = data.specialization;
  document.getElementById("doctor-phone").value = data.phone_number;
  document.getElementById("doctor-email").value = data.email;
  document.getElementById("doctor-department-id").value = data.id_departement;

  updateDoctorBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const updatedData = {
      doctor_id: data.doctor_id,
      first_name: document.getElementById("doctor-first-name").value,
      last_name: document.getElementById("doctor-last-name").value,
      specialization: document.getElementById("doctor-specialization").value,
      phone_number: document.getElementById("doctor-phone").value,
      email: document.getElementById("doctor-email").value,
      id_departement: document.getElementById("doctor-department-id").value,
    };

    try {
      const res = await fetch("Back-End/managment/doctors.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const response = await res.json();
      doctorForm.reset();
      doctorFormDiv.classList.add("hidden");
      updateDoctorBtn.classList.add("hidden");
      saveDoctorBtn.classList.remove("hidden");

      const responseMessage = document.getElementById("responseMessage");
      responseMessage.innerHTML = "";
      if (response.success) {
        responseMessage.innerHTML = `<p class="bg-green-500 text-white rounded-md p-1 text-center">${response.message}</p>`;
      } else {
        responseMessage.innerHTML = `<p class="bg-red-500 text-white rounded-md p-1 text-center">${response.message}</p>`;
      }

      setTimeout(() => {
        responseMessage.innerHTML = "";
      }, 3000);

      displayAllDoctors();
    } catch (err) {
      console.error(err);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadhDashboardPage();
  loadPatientsPage();
  loadDepartemntPage();
  loadDoctorsPage();
});
