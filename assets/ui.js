// document.addEventListener("DOMContentLoaded" , ()=>{

// })
const ContentZone = document.getElementById("content");

// console.log("content loaded" ,ContentZone)
async function loadhDashboardPage() {
  const dashboardTab = document.getElementById("dashboard_tab");
  dashboardTab.addEventListener("click", async(e) => {
    e.preventDefault();
    console.log("btn dash clicked", dashboardTab);
    try {
     const res = await fetch("Back-End/managment/dashboard.php")
      const data = await res.text()
      ContentZone.innerHTML = data
      await fetchPatientsStatistics()
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
      DispalayAllPatient()
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
    SendPaitentData(patientData , patientForm);
  });
  function SendPaitentData(patientData , form) {
    try {
      fetch("Back-End/managment/add_patient.php", {
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
            form.reset()
            patientForm.classList.add("hidden")
          } else {
            responseMessage.innerHTML = `
              <p class = "bg-red-500 text-white rounded-md p-1 text-center">${data.message}</p>
            `;          
          }
          
          setTimeout(()=> {
            responseMessage.innerHTML=""
          }, 3000)
        

        });
    } catch (err) {
      console.error(err);
    }
  }
}



async function fetchPatientsStatistics(){
  try{
    const res = await fetch("Back-End/managment/get_dashboard_stats.php" ,{
    method :"GET",
    headers : {
      "Content-Type" : "application/json"
    }
  })
  const statistics = await res.json()
  console.log(statistics)
  
  const totalPatients = document.getElementById("nbr_patients")
    if(!totalPatients){
      console.log("not found")
      return;
    }
    totalPatients.textContent= `Patients : ${statistics.totalPatients}`
  }catch (err) {
    console.error('Fetch error:', err)
    if (totalPatients) {
      totalPatients.innerHTML = `<p>Error loading statistics</p>`
    }
  }
}

async function DispalayAllPatient(){
   try{
    const res = await fetch("Back-End/managment/get_all_patients.php" ,{
      method : "GET",
      headers : {
        "Content-Type" : "application/json"
      }
    })

    const patientData = await res.json()
    console.log("all patients" , patientData)
    const patientTable = document.getElementById("patient_table")
    patientTable.innerHTML = patientData.patientData.map((data) => {
     return`
      <tr>
        <td class="px-6 py-3">${data.patient_id}</td>
        <td class="px-6 py-3">${data.first_name}</td>
        <td class="px-6 py-3">${data.last_name}</td>
        <td class="px-6 py-3">${data.email}</td>
        <td class="px-6 py-3">${data.phone_number}</td>
        <td class="px-6 py-3">${data.gender}</td>
        <td class="px-6 py-3">${data.age}</td>
        <td class="px-6 py-3">${data.adress}</td>
        <td class="px-6 py-3 flex items-center gap-3">
        sapn<i class="fa-solid fa-trash"></i>
        <i class="fa-solid fa-pen"></i>
        </td>
      </tr>
   
  `
    }).join("")
    
   }catch(err){
    console.error(err)
   }
}

document.addEventListener("DOMContentLoaded", () => {
  loadhDashboardPage();
  loadPatientsPage();
});
