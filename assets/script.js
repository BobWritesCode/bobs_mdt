console.log("connected")

const doc = document;
const pdIncidentCont = doc.getElementById('pd-incident-container');
const btnPdDashboard = doc.getElementById('btnPdDashboard');
const btnPdSearch = doc.getElementById('btnPdSearch');
const btnPdIncidents = doc.getElementById('btnPdIncidents');
const btnDuty = doc.getElementById('btn-duty');
const btnCallSign = doc.getElementById('btn-call-sign');
const btnPopupSubmit = doc.getElementById('popup-btn-submit');
const btnOfficerAvailable = doc.getElementById('btn-officer-available');
const btnAddEvent = doc.getElementById('btn-add-event');
const btnPerformPDSearch = doc.getElementById('pd-search-person-button');
const btnPerformPDIncident = doc.getElementById('pd-search-incident-button');

const currentUser = "Graves"
const currentUserRank = "Captain"
const currentCallSign = "315"

window.addEventListener('DOMContentLoaded', function() {
  assignUser()

	// Navigation function calls
	btnPdDashboard.addEventListener("click", function() {
		changeMdtScreen.makeChange('pd-dashboard-container');
	});
	btnPdSearch.addEventListener("click", function() {
		changeMdtScreen.makeChange('pd-search-person-container');
	});
	btnPdIncidents.addEventListener("click", function() {
		changeMdtScreen.makeChange('pd-search-incident-container');
	});

	// Dashboard function calls
  btnDuty.addEventListener("click", toggleDuty);
	btnOfficerAvailable.addEventListener("click", toggleOfficerAvailable);
  btnPopupSubmit.addEventListener("click", function() {
    funcPopup.popupSubmit();
	});

	// PD search function calls
	btnPerformPDSearch.addEventListener("click", performPdSearch);
	btnPerformPDIncident.addEventListener("click", performPdIncidentSearch);

	// PD incidents function calls
  btnAddEvent.addEventListener("click", function() {
    let date = new Date();
    let currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let currentDate = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
    let timeUT = currentTime;
    let msg = doc.getElementById("txt-add-event").value;
    let incidentNumber = doc.getElementById('incident-inc-number').innerHTML
    fakeIncidents[incidentNumber].eventHistory.push([currentUser, timeUT, currentDate, msg]);
    const data = [];
    data[0] = [];
    data[0][0] = currentUser;
    data[0][1] = currentCallSign;
    data[0][2] = timeUT;
    data[0][3] = currentDate;
    data[0][4] = msg;
    addEventToEventHistory(data);
  });

});

/**
* Change MDT to screen screen
*/
function changeMdtScreen() {
	let changeFrom = 'pd-dashboard-container';

	function makeChange(data) {
		const changeToDoc = doc.getElementById(data);
		const changeFromDoc = doc.getElementById(changeFrom);
		changeFromDoc.style.display = "none";
		changeToDoc.style.display = "flex";
		changeFrom = data;
	}

	changeMdtScreen.makeChange = makeChange;
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
  const spanUserName = doc.getElementById("user-name");
  const spanUserRank = doc.getElementById("user-rank");
  const spanUserCallSign = doc.getElementById("user-call-sign");
  spanUserName.textContent = currentUser;
  spanUserRank.textContent = currentUserRank;
  spanUserCallSign.textContent = "315";
}


/**
* Open / Close popup
*/
function funcPopup(r_reason) {
  const popup = doc.getElementById("popup");
  let reason = r_reason;
  h2 = popup.getElementsByTagName("h2");
  h2[0].innerHTML = reason;
  if (popup.style.display != "block") {

    popup.style.display = "block";
  }

  function popupSubmit() {
    const popup = doc.getElementById("popup");
    popup.style.display = "none";
    let input1 = doc.getElementById("popup-input1");
    let data = input1.value;
    popup.style.display = "none";
    switch(reason) {
      case "Call Sign":
        changeCallSign(data)
        break;
      default:
    }
  }

  funcPopup.popupSubmit = popupSubmit;
}

/**
* Change call sign
*/
function changeCallSign(data) {
  const spanUserCallSign = doc.getElementById("-");
  spanUserCallSign.textContent = data
}


/**
* Add incident to dashboard
*/
function addIncidentToDash(data) {
  // Get time
  let date = new Date();
	let current_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	let timeUT = current_time;
  let incNum = data.incidentNumber;
  let tenCode = data.tenCode;
  let incTitle = data.title;
  let incLoc = data.location;
  let incInf = 'Seen heading west.'
  let newDiv = `<div class='mdt-inc'>`
             + `<button onclick='openIncident("${incNum}")'></button>`
             + `<p><span class="code10"> ${tenCode} </span><span> ${incTitle}</span></p>`
             + `<p><strong>Inc:</strong> ${incNum}</p>`
             + `<p><strong>Time:</strong> ${timeUT} UT / ${timeUT} LT</p>`
             + `<p><strong>Loc:</strong> ${incLoc}</p>`
             + `<p><strong>Info:</strong> ${incInf}</p>`
             + `</div>`
  const incidentCol = doc.getElementById("pd-dashboard-incidents");
  incidentCol.innerHTML += newDiv;
}

/**
* Add BOLO to dashboard
*/
function addBoloToDash(data) {
  let fname = data.fname;
  let lname = data.lname;
  let boloReason = data.boloReason;
  let warnings = data.warnings;
  let newDiv = `<div class='mdt-inc'>`
             + `<button onclick="openPerson('${data.uid}')"></button>`
             + `<p><strong>${fname} ${lname}</strong></p>`
             + `<p><strong>Wanted for:</strong> ${boloReason}</p>`
             + `<p><strong>Warning:</strong> ${warnings}</p>`
             + `</div>`;
  const incidentCol = doc.getElementById("pd-dashboard-bolos");
  incidentCol.innerHTML += newDiv;
}

/**
* Add Most Wanted to dashboard
*/
function addMostWantedToDash(data) {
  let incTitle = "Shots Fired";
  let incNum = "43247";
  let incLoc = "The Beach";
  let incInf = "Seen heading west."
  let newDiv = `<div class='mdt-inc'>`
             + `<button>R</button>`
             + `<button>P</button>`
             + `<p><span>${incTitle}</span></p>`
             + `<p>Inc: ${incNum}</p>`
             + `<p>Loc: ${incLoc}</p>`
             + `<p>Info: ${incInf}</p>`
             + `</div>`;
  const incidentCol = doc.getElementById("pd-dashboard-most-wanted");
  incidentCol.innerHTML += newDiv;
}

/**
* Add Event to incident event history.
* `data = [name, time, data, message]`
*/
function addEventToEventHistory(data) {
  data = data;
  if (data[0][3]) {
    for (let i=0; i < data.length; i++) { 
      let person = data[i][0];
      let callSign = data[i][1];
      let time = data[i][2];
      let date = data[i][3];
      let newDiv = `<div class='event-entry'>`
                 + `<p><strong>${person}</strong> (${callSign}) @ ${time} on ${date}.</p>`
                 + `<p>${data[i][4]}</p>`
                 + `</div>`
      const incidentCol = doc.getElementById("incident-event-history");
      incidentCol.innerHTML += newDiv;
    }
  }
  doc.getElementById("txt-add-event").value = "";
}


/**
* Perform search on the PD MDT Search screen
*/
function performPdSearch() {
  const user = [];
	user[0] = doc.getElementById('pd-search-fname').value.toLowerCase();
	user[1] = doc.getElementById('pd-search-sname').value.toLowerCase();
	user[2] = doc.getElementById('pd-search-dob').value;
	user[3] = doc.getElementById('pd-search-address').value.toLowerCase();
	// Set up table header
	const searchResults = doc.getElementById("search-results");
	searchResults.innerHTML =	"<tr>"
													+ "<th>Name</th>"
													+ "<th>DOB</th>"
													+ "<th>Address</th>"
													+ "<th>Flags</th>"
                          + "</tr>"; 

	for (let i=0; i < fakePeople.length; i++) {
		let key = fakePeople[i]
		let addToList = false;
    if (user[0] != "") {
      addToList = key.fname.toLowerCase().includes(user[0]) ? true : false;
    }
    if (user[1] != "") {
      addToList = key.lname.toLowerCase().includes(user[1]) ? true : false;
    }
		// If potential match add to search results
		if (addToList) {
      const row = searchResults.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.innerHTML = `${fakePeople[i].fname} ${fakePeople[i].lname}`;
      cell2.innerHTML = fakePeople[i].dob;
      cell3.innerHTML = fakePeople[i].address;
			cell4.innerHTML = "";
      cell5.innerHTML = `<button data-uid='${fakePeople[i].uid}' class='btn-goto-person btn-yellow' value>Goto</button>`; 
		};
	};
  // Create button function.
  const btnPdOpenPerson = document.getElementsByClassName("btn-goto-person");
  for (let i = 0; i < btnPdOpenPerson.length; i++) {
    btnPdOpenPerson[i].addEventListener("click", function() {
      openPerson(btnPdOpenPerson[i].dataset.uid);
    });
  }
};

/**
* Perform Incident search on the PD MDT Search screen
*/
function performPdIncidentSearch() {
  const user = [];
	user[0] = doc.getElementById('pd-search-incident-number').value;
	user[1] = doc.getElementById('pd-search-incident-type').value.toLowerCase();
	// Set up table header
	const searchResults = doc.getElementById("search-incident-results");
	searchResults.innerHTML =	"<tr>"
													+ "<th>Incident number:</th>"
													+ "<th>Type</th>"
													+ "<th>Flags</th>"
													+ "<th>Goto</th>"
													+ "</tr>"; 

	// Search each row 1 by 1
	tableData = fakeIncidents;
	for (let i = 0; i < tableData.length; i++) {
    let key = tableData[i];
		let addToList = false;
    if (user[0] != "") {
      addToList = key.incidentNumber.includes(user[0]) ? true : false;
    }
    if (user[1] != "") {
      addToList = key.title.toLowerCase().includes(user[1]) ? true : false;
    }
		// If potential match add to search results
		if (addToList) {
			const row = searchResults.insertRow(-1);
			let cell1 = row.insertCell(0);
			let cell2 = row.insertCell(1);
			let cell3 = row.insertCell(2);
			let cell4 = row.insertCell(3);
			cell1.innerHTML = tableData[i]["incidentNumber"];
			cell2.innerHTML = tableData[i]["title"];
			cell3.innerHTML = "";
			cell4.innerHTML = `<button data-uid='${key.incidentNumber}' class='btn-goto-incident btn-yellow' value>Goto</button>`;
		};
	};
  // Create button function.
  const btnPdOpenIncident = document.getElementsByClassName("btn-goto-incident");
  for (let i = 0; i < btnPdOpenIncident.length; i++) {
    btnPdOpenIncident[i].addEventListener("click", function() {
      openIncident(btnPdOpenIncident[i].dataset.uid);
    });
  };
};

/**
* Open Incident record on MDT
*/
function openIncident(r_uid) {
  changeMdtScreen.makeChange('pd-incident-container');
  for (let i = 0; i < fakeIncidents.length; i++) {
    if(r_uid == fakeIncidents[i].incidentNumber) {
      doc.getElementById("incident-inc-number").innerHTML = fakeIncidents[i].incidentNumber;
      doc.getElementById("incident-inc-title").textContent = fakeIncidents[i].title;
      doc.getElementById("incident-inc-location").textContent = fakeIncidents[i].location;
      doc.getElementById("incident-inc-date").textContent = fakeIncidents[i].date;
      doc.getElementById("incident-inc-uni-time").textContent = fakeIncidents[i].uT;
      doc.getElementById("incident-inc-loc-time").textContent = fakeIncidents[i].lT;
      addEventToEventHistory(fakeIncidents[i].eventHistory);
      break;
    };
  };
};

/**
* Open Person's record on MDT
*/
function openPerson(r_uid) {
  changeMdtScreen.makeChange('pd-person-container');
  for (let i = 0; i < fakePeople.length; i++) {
    if(r_uid == fakePeople[i].uid) {
      doc.getElementById("person-name").textContent = `${fakePeople[i].fname} ${fakePeople[i].lname}`;
      doc.getElementById("person-dob").textContent = fakePeople[i].dob;
      doc.getElementById("person-address").textContent = fakePeople[i].address;
      break;
    }
  }
  // Incident table
	const personIncidents = doc.getElementById("person-incidents-tbl");
	personIncidents.innerHTML =	"<tr>"
														+ "<th>Incident</th>"
														+ "<th>title</th>"
														+ "<th>Involvement</th>"
														+ "<th>Flags</th>"
                            + "<th>Go to</th>"
														+ "</tr>"; 
  if(fakePersonToIncident[r_uid]) {
    for (let i=0; i < fakePersonToIncident[r_uid].length; i++) {
      const row = personIncidents.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.innerHTML = fakePersonToIncident[r_uid][i][0];
      cell2.innerHTML = fakePersonToIncident[r_uid][i][1];
      cell3.innerHTML = fakePersonToIncident[r_uid][i][2];
      cell4.innerHTML = "";
      cell5.innerHTML = `<button id='${fakePersonToIncident[r_uid][i][0]}' data-id='${fakePersonToIncident[r_uid][i][0]}' class='btn-goto-incident btn-yellow' value>Goto</button>`;
    };
  };

  // Create button function to open incidents.
  const btnPdOpenIncident = document.getElementsByClassName("btn-goto-incident");
  for (let i = 0; i < btnPdOpenIncident.length; i++) {
    btnPdOpenIncident[i].addEventListener("click", function() {
      // Character unique ID to assign to button.
      openIncident(fakeCars[i][1]);
    });
  };
  // Vehicles table
	const personVehicles = doc.getElementById("person-vehicles-tbl");
	personVehicles.innerHTML =	"<tr>"
													 + "<th>Red</th>"
											 	   + "<th>Make</th>"
										 			 + "<th>Model</th>"
													 + "<th>Flags</th>"
													 + "<th>Go to</th>"
													 + "</tr>"; 

  for (let i = 0;  i < fakeCars.length; i++) {
    if(r_uid == fakeCars[i][0]) {
      const row = personVehicles.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.innerHTML = fakeCars[i][1];
      cell2.innerHTML = fakeCars[i][2];
      cell3.innerHTML = fakeCars[i][3];
      cell4.innerHTML = "";
      cell5.innerHTML = `<button id='${fakeCars[i][1]}' data-id='${fakeCars[i][1]}fakeCars[i][1]' class='btn-goto-vehicle btn-yellow' value>Goto</button>`;
    };
  };
  
  // Create button function for vehicles.
  const btnPdOpenVehicle = document.getElementsByClassName("btn-goto-vehicle");
  for (let i = 0; i < btnPdOpenVehicle.length; i++) {
    btnPdOpenVehicle[i].addEventListener("click", function() {
      // Character unique ID to assign to button.
      openVehicle(fakeCars[i][1]);
    });
  };
};


/**
* 
*/
function openVehicle(data){

};

const fakePeople = [];
fakePeople[0] = {
  "uid": "67dsf",
  "fname": 'George',
  "lname": 'Bones',
  "dob": '12/01/85',
  "address": '7 Park Lane',
  "bolo": true,
  "boloReason": "Bank Robbery",
  "warnings": "Armed and Dangerous",
}
fakePeople[1] = {
  "uid": "34234g",
  "fname": 'Gary',
  "lname": 'Bones',
  "dob": '27/09/88',
  "address": '6 Park Lane',
  "bolo": false,
  "boloReason": ""
}

const fakeCars = [];
fakeCars[0] = ["67dsf","84DNT74", "Fiat", "Puma"];
fakeCars[1] = ["67dsf","92HGN22", "Ford", "Mustang"];
fakeCars[2] = ["67dsf","15IFT63", "Smart", "Pigeon"];
fakeCars[3] = ["67dsf","26TFC84", "Fiat", "Fox"];
fakeCars[4] = ["67dsf","21TJD46", "Ford", "Panda"];
fakeCars[5] = ["67dsf","54TDB48", "Junk", "Lion"];

const fakePersonToIncident = {
  "67dsf": [["544841", "Bank Robbery", "Witness"],["345323", "Noise complaint", "Witness"],],
}

const fakeIncidents = [];
fakeIncidents[0] = {
  'incidentNumber': "544841",
  'title': "Bank Robbery",
  "tenCode": "10-99",
  'location': "West Coast Highway",
  'date': "28th Oct 2022",
  'uT': "6:54pm",
  'lT': "10:21am",
  'creation': "Dispatch",
  'eventHistory': [
    ["Dispatch", "000", "6:59pm", "28/10/2022", "Officer Graves has arrived on scene"],
    ["Graves", "315", "7:01pm", "28/10/2022", "2 suspects, 1 hostage."],
    ["Graves", "315", "7:01pm", "28/10/2022", "Negotiated hostage to be set free in exchange for clean chase."],
  ],
  'suspects': [
    ["Unknown", "Clown suit"],
    ["Unknown", "Clown suit"],
  ],
  'vehicles': [
    ["67RGH65", "Fiat", "Punto", "Black", "Gary Marlow"],
  ],
  'witnesses': [
    ["67dsf", "Taken hostage at local park, was blind folded so could not see any faces."],
  ],
  'evidence': [
    ["Fingerprint", "Collected by Graves", "n/a"],
  ],
}

changeMdtScreen();
addBoloToDash(fakePeople[0]);
addIncidentToDash(fakeIncidents[0]);
addIncidentToDash(fakeIncidents[0]);
addIncidentToDash(fakeIncidents[0]);
addMostWantedToDash();
addMostWantedToDash();
addMostWantedToDash();
addMostWantedToDash();
