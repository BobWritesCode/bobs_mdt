console.log("connected")

const pdIncidentCont = document.getElementById('pd-incident-container');
const btnPdDashboard = document.getElementById('btnPdDashboard');
const btnPdIncidents = document.getElementById('btnPdIncidents');
const btnDuty = document.getElementById('btn-duty');
const btnCallSign = document.getElementById('btn-call-sign');
const btnPopupSubmit = document.getElementById('popup-btn-submit');
const btnOfficerAvailable = document.getElementById('btn-officer-available');
const btnAddEvent = document.getElementById('btn-add-event');

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
  btnAddEvent.addEventListener("click", addEventToEventHistory);
});


/**
 * Change MDT to Dashboard screen
 */
 function changeToPdDashboard() {
  const pdDashboardCont = document.getElementById('pd-dashboard-container');
  pdDashboardCont.style.display = "flex";
  pdIncidentCont.style.display = "none";
 }


 /**
 * Change MDT to Incident screen
 */
function changeToPdIncidents() {
  const pdDashboardCont = document.getElementById('pd-dashboard-container');
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


/**
 * Add incident to dashboard
 */
 function addIncidentToDash(data) {
  let tenCode = "10-36";
  let incTitle = "Shots Fired";
  let incNum = "43247";
  let incLoc = "The Beach";
  let incInf = "Seen heading west."
  var data =    "<div class='mdt-inc'>"
                +   "<button>R</button>"
                +   "<p><span class='code10'>" + tenCode + "</span><span>" + incTitle + "</span></p>"
                +   "<p>Inc: " + incNum + "</p>"
                +   "<p>Loc: " + incLoc + "</p>"
                +   "<p>Info: " + incInf + "</p>"
                + "</div>"
  const incidentCol = document.getElementById("pd-dashboard-incidents");
  incidentCol.innerHTML += data;
}

/**
 * Add BOLO to dashboard
 */
 function addBoloToDash(data) {
  let tenCode = "10-36";
  let incTitle = "Shots Fired";
  let incNum = "43247";
  let incLoc = "The Beach";
  let incInf = "Seen heading west."
  var data =    "<div class='mdt-inc'>"
                +   "<button>R</button>"
                +   "<button>P</button>"
                +   "<p><span>" + incTitle + "</span></p>"
                +   "<p>Inc: " + incNum + "</p>"
                +   "<p>Loc: " + incLoc + "</p>"
                +   "<p>Info: " + incInf + "</p>"
                + "</div>"
  const incidentCol = document.getElementById("pd-dashboard-bolos");
  incidentCol.innerHTML += data;
}

/**
 * Add Most Wanted to dashboard
 */
 function addMostWantedToDash(data) {
  let tenCode = "10-36";
  let incTitle = "Shots Fired";
  let incNum = "43247";
  let incLoc = "The Beach";
  let incInf = "Seen heading west."
  var data =    "<div class='mdt-inc'>"
                +   "<button>R</button>"
                +   "<button>P</button>"
                +   "<p><span>" + incTitle + "</span></p>"
                +   "<p>Inc: " + incNum + "</p>"
                +   "<p>Loc: " + incLoc + "</p>"
                +   "<p>Info: " + incInf + "</p>"
                + "</div>"
  const incidentCol = document.getElementById("pd-dashboard-most-wanted");
  incidentCol.innerHTML += data;
}

/**
 * Add Most Wanted to dashboard
 */
 function addEventToEventHistory(data) {
  let text = document.getElementById("txt-add-event").value;
  let person = "Graves";
  let time = "5:00pm";
  var data =    "<div class='event-entry'>"
                +   "<p><strong>" + person + "</strong> @ " + time + ".</p>"
                +   "<p>" + text + "</p>"
                + "</div>"
  const incidentCol = document.getElementById("incident-event-history");
  incidentCol.innerHTML += data;
  document.getElementById("txt-add-event").value = "";
}



addBoloToDash();
addBoloToDash();
addBoloToDash();
addBoloToDash();
addBoloToDash();
addBoloToDash();
addBoloToDash();
addBoloToDash();
addBoloToDash();

addIncidentToDash();
addIncidentToDash();
addIncidentToDash();
addIncidentToDash();
addIncidentToDash();
addIncidentToDash();
addIncidentToDash();
addIncidentToDash();
addIncidentToDash();
addIncidentToDash();
addIncidentToDash();
addIncidentToDash();

addMostWantedToDash();
addMostWantedToDash();
addMostWantedToDash();
addMostWantedToDash();