console.log("connected")

const pdDashboardCont = document.getElementById('pd-dasboard-container');
const pdIncidentCont = document.getElementById('pd-incident-container');
const btnPdDashboard = document.getElementById('btnPdDashboard');
const btnPdIncidents = document.getElementById('btnPdIncidents');
const btnDuty = document.getElementById('btn-duty');
const btnCallSign = document.getElementById('btn-call-sign');
const btnPopupSubmit = document.getElementById('popup-btn-submit');
const btnOfficerAvailable = document.getElementById('btn-officer-available');

window.addEventListener('DOMContentLoaded', function() {
  assignUser()

  btnPdDashboard.addEventListener("click", function() {
    changeToPdDashboard();
  });

  btnPdIncidents.addEventListener("click", function() {
    changeToPdIncidents();
  });

  btnDuty.addEventListener("click", toggleDuty);

  btnCallSign.addEventListener("click", function() {
    funcPopup("Call Sign");
  });
  btnPopupSubmit.addEventListener("click", function() {
    funcPopup.popupSubmit();
});

  btnOfficerAvailable.addEventListener("click", toggleOfficerAvailable);
});


/**
 * Change MDT to Dashboard screen
 */
 function changeToPdDashboard() {
  pdDashboardCont.style.display = "flex";
  pdIncidentCont.style.display = "none";
 }


 /**
 * Change MDT to Incident screen
 */
function changeToPdIncidents() {
  pdDashboardCont.style.display = "none";
  pdIncidentCont.style.display = "flex";
}


/**
 * Toggle on and off duty
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
 * Toggle availability
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
  const spanUserCallSign = document.getElementById("user-call-sign");
  spanUserName.textContent = "Graves"
  spanUserRank.textContent = "Captain"
  spanUserCallSign.textContent = "315"
}


/**
 * Open / Close popup
 */
 function funcPopup(r_reason) {
  const popup = document.getElementById("popup");
  var reason = r_reason
  
  h2 = popup.getElementsByTagName("h2");
  h2[0].innerHTML = reason;
  
  if (popup.style.display != "block") {

    popup.style.display = "block";
  }

  function popupSubmit() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
    let input1 = document.getElementById("popup-input1");
    var data = input1.value;
    popup.style.display = "none";

    switch(reason) {
      case "Call Sign":
        changeCallSign(data)
        break;
      default:
        // code block
    }
  }

  funcPopup.popupSubmit = popupSubmit;

}

/**
 * Change call sign
 */
 function changeCallSign(data) {
  const spanUserCallSign = document.getElementById("-");
  spanUserCallSign.textContent = data
}
