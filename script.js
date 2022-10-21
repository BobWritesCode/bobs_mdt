console.log("connected")

const pdDasboardCont = document.getElementById('pd-dasboard-container');
const pdIncidentCont = document.getElementById('pd-incident-container');
const btnPdDashboard = document.getElementById('btnPdDashboard');
const btnPdIncidents = document.getElementById('btnPdIncidents');

window.addEventListener('DOMContentLoaded', function() {
  assignUser()
  btnPdDashboard.addEventListener("click", function() {
    changeToPdDashboard();
  });
  btnPdIncidents.addEventListener("click", function() {
    changeToPdIncidents();
  });

});
const btnDuty = document.getElementById('btn-duty');
btnDuty.addEventListener("click", toggleDuty);

const btnOfficerAvailable = document.getElementById('btn-officer-available');
btnOfficerAvailable.addEventListener("click", toggleOfficerAvailable);

/**
 * Change MDT to Dashboard screen
 */
 function changeToPdDashboard() {
  pdDasboardCont.style.display = "flex";
  pdIncidentCont.style.display = "none";
 }

 /**
 * Change MDT to Incident screen
 */
function changeToPdIncidents() {
  pdDasboardCont.style.display = "none";
  pdIncidentCont.style.display = "flex";
}

/**
 * Toogle on and off duty
 */
function toggleDuty() {
  if (btnDuty.textContent == "On") {
    btnDuty.textContent = "Out";
    btnDuty.style.backgroundColor = "red";
  } else {
    btnDuty.textContent = "On";
    btnDuty.style.backgroundColor = "green";
  }
}

/**
 * Toggle availabilty
 */
function toggleOfficerAvailable() {
  if (btnOfficerAvailable.textContent == "Yes") {
    btnOfficerAvailable.textContent = "No";
    btnOfficerAvailable.style.backgroundColor = "red";
  } else {
    btnOfficerAvailable.textContent = "Yes";
    btnOfficerAvailable.style.backgroundColor = "green";
  }
}

/**
 * Assign user
 */
 function assignUser() {
  const spanUserName = document.getElementById("user-name");
  const spanUserRank = document.getElementById("user-rank");
  const spanUserCallsign = document.getElementById("user-callsign");
  spanUserName.textContent = "Graves"
  spanUserRank.textContent = "Captain"
  spanUserCallsign.textContent = "315"
}