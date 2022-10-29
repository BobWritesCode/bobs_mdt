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
  btnCallSign.addEventListener("click", function() {
    funcPopup("Call Sign");
  });
  btnPopupSubmit.addEventListener("click", function() {
    funcPopup.popupSubmit();
	});

	// PD search function calls
	btnPerformPDSearch.addEventListener("click", performPdSearch);
	btnPerformPDIncident.addEventListener("click", performPdIncidentSearch);

	// PD incidents function calls
  btnAddEvent.addEventListener("click", function() {
    var date = new Date();
    var currentTime = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    var currentDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+ date.getFullYear();
    var timeUT = currentTime;
    date = currentDate;
    var msg = doc.getElementById("txt-add-event").value;
    var incidentNumber = doc.getElementById('incident-inc-number').innerHTML
    fakeIncidents[incidentNumber].eventHistory.push([currentUser, timeUT, date, msg]);
    data = [];
    data[0] = [];
    data[0][0] = currentUser;
    data[0][1] = currentCallSign;
    data[0][2] = timeUT;
    data[0][3] = date;
    data[0][4] = msg;
    addEventToEventHistory(data);
  });

});

/**
* Change MDT to screen screen
*/
function changeMdtScreen() {
	var changeFrom = 'pd-dashboard-container';
	function makeChange(data) {
		var changeToDoc = doc.getElementById(data);
		var changeFromDoc = doc.getElementById(changeFrom);
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
  spanUserName.textContent = currentUser
  spanUserRank.textContent = currentUserRank
  spanUserCallSign.textContent = "315"
}


/**
 * Open / Close popup
 */
 function funcPopup(r_reason) {
  const popup = doc.getElementById("popup");
  var reason = r_reason
  h2 = popup.getElementsByTagName("h2");
  h2[0].innerHTML = reason;
  if (popup.style.display != "block") {

    popup.style.display = "block";
  }

  function popupSubmit() {
    const popup = doc.getElementById("popup");
    popup.style.display = "none";
    let input1 = doc.getElementById("popup-input1");
    var data = input1.value;
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
  var date = new Date();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	var timeUT = current_time;
  let incNum = data.incidentNumber;
  let tenCode = data.tenCode;
  let incTitle = data.title;
  let incLoc = data.location;
  let incInf = "Seen heading west."
  var data =    "<div class='mdt-inc'>"
                +   "<button onclick='openIncident(" + '"' + incNum + '"' + ")'>>></button>"
                +   "<p><span class='code10'>" + tenCode + "</span><span>" + incTitle + "</span></p>"
                +   "<p><strong>Inc:</strong> " + incNum + "</p>"
                +   "<p><strong>Time:</strong> " + timeUT + " UT / " + timeUT + " LT</p>"
                +   "<p><strong>Loc:</strong> " + incLoc + "</p>"
                +   "<p><strong>Info:</strong> " + incInf + "</p>"
                + "</div>"
  const incidentCol = doc.getElementById("pd-dashboard-incidents");
  incidentCol.innerHTML += data;
}

/**
 * Add BOLO to dashboard
 */
 function addBoloToDash(data) {
  var fname = data.fname;
  var lname = data.lname;
  var boloReason = data.boloReason;
  var warnings = data.warnings;
  var data =    "<div class='mdt-inc'>"
                +   "<button onclick='openPerson(" + '"' + data.uid + '"' + ")'>>></button>"
                +   "<p><strong>" + fname + " " + lname + "</strong></p>"
                +   "<p><strong>Wanted for:</strong> " + boloReason + "</p>"
                +   "<p><strong>Warning: </strong>" + warnings + "</p>"
                + "</div>";
  const incidentCol = doc.getElementById("pd-dashboard-bolos");
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
                + "</div>";
  const incidentCol = doc.getElementById("pd-dashboard-most-wanted");
  incidentCol.innerHTML += data;
}

/**
 * Add Event to incident event history.
 * 
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
      var newEntry =    "<div class='event-entry'>"
                    +   "<p><strong>" + person + "</strong> (" + callSign + ") @ " + time + " on " + date + ".</p>"
                    +   "<p>" + data[i][4] + "</p>"
                    + "</div>"
      const incidentCol = doc.getElementById("incident-event-history");
      incidentCol.innerHTML += newEntry;
    }
  }
  doc.getElementById("txt-add-event").value = "";
}


/**
 * Perform search on the PD MDT Search screen
 */
function performPdSearch() {
  var user = [];
	user[0] = doc.getElementById('pd-search-fname').value;
	user[1] = doc.getElementById('pd-search-sname').value;
	user[2] = doc.getElementById('pd-search-dob').value;
	user[3] = doc.getElementById('pd-search-address').value;

	// Set up table header
	const searchResults = doc.getElementById("search-results");
	searchResults.innerHTML =	"<tr>"
														+ "<th>Name</th>"
														+ "<th>DOB</th>"
														+ "<th>Address</th>"
														+ "<th>Flags</th>"
														+ "</tr>"; 

	// Search each row 1 by 1
	tableData = fakePeople;
	for (let i=0; i < tableData.length; i++) {
		var addToList = false;
		var key = tableData[i]

		// Check each user inout for blank
		// true continue
		// false check against person attr, if match add to list
		for (let j=0; j < user.length; j++) {
			if (user[j] == "") { continue }
				var a = key[j].toLowerCase();
				var b = user[j].toLowerCase();
			if (a.includes(b)) {	
				addToList = true;
			 } else {
				addToList = false;
				break;
			 }
		};

		// If potential match add to search results
		if (addToList) {
      var row = searchResults.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = tableData[i][0] + " " + tableData[i][1];
      cell2.innerHTML = tableData[i][2];
      cell3.innerHTML = tableData[i][3];
			cell4.innerHTML = "";
      cell5.innerHTML = "<button id='" + tableData[i][4] + "' data-id='"+ tableData[i][4] +"' class='btn-goto-person btn-yellow' value>\>\>\></button>";
		};
	};
  // Create button function.
  const btnPdOpenPerson = document.getElementsByClassName("btn-goto-person");
  for (let i = 0; i < btnPdOpenPerson.length; i++) {
    btnPdOpenPerson[i].addEventListener("click", function() {
      // Character unique ID to assign to button.
      openPerson(tableData[i][4]);
    });
  }
};


/**
 * Perform Incident search on the PD MDT Search screen
 */
 function performPdIncidentSearch() {
  var user = [];
	user[0] = doc.getElementById('pd-search-incident-number').value;
	user[1] = doc.getElementById('pd-search-incident-type').value;
	console.log(user)
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
	for (let i=0; i<tableData.length; i++) {
		var addToList = false;
		var j=0;
		for (const [key, value] of Object.entries(tableData[i])) {
			if (user[j] != "") { 
				var a = user[j].toLowerCase();
				var b = value.toLowerCase();
				if (b.includes(a)) {	
					addToList = true;
				} else {
					addToList = false;
					break;
				};

			};
			j+=1;
			if (j==2) { break };
		};
    
		// If potential match add to search results
		if (addToList) {
			var row = searchResults.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			cell1.innerHTML = tableData[i]["incidentNumber"];
			cell2.innerHTML = tableData[i]["title"];
			cell3.innerHTML = "";
			cell4.innerHTML = "<button id='" + tableData[i][0] + "' data-id='"+ tableData[i][0] +"' class='btn-goto-incident btn-yellow' value>\>\>\></button>";
		};

	};

  // Create button function.
  const btnPdOpenPerson = document.getElementsByClassName("btn-goto-person");
  for (let i = 0; i < btnPdOpenPerson.length; i++) {
    btnPdOpenPerson[i].addEventListener("click", function() {
      // Character unique ID to assign to button.
      openPerson(tableData[i][4]);
    });
  };
};

/**
 * Open Incident record on MDT
 */
 function openIncident(data) {
  changeMdtScreen.makeChange('pd-incident-container');
  if (doc.getElementById("incident-inc-number").innerHTML != fakeIncidents[data].incidentNumber) {
    doc.getElementById("incident-inc-number").innerHTML = fakeIncidents[data].incidentNumber;
    doc.getElementById("incident-inc-title").textContent = fakeIncidents[data].title;
    doc.getElementById("incident-inc-location").textContent = fakeIncidents[data].location;
    doc.getElementById("incident-inc-date").textContent = fakeIncidents[data].date;
    doc.getElementById("incident-inc-uni-time").textContent = fakeIncidents[data].uT;
    doc.getElementById("incident-inc-loc-time").textContent = fakeIncidents[data].lT;
    addEventToEventHistory(fakeIncidents[data].eventHistory);
  }
 }

/**
 * Open Person's record on MDT
 */
function openPerson(data) {
  changeMdtScreen.makeChange('pd-person-container');
  for (let i = 0; i < fakePeople.length; i++) {
    if(data == fakePeople[i][4]) {
      doc.getElementById("person-name").textContent = fakePeople[i][0] + " " + fakePeople[i][1];
      doc.getElementById("person-dob").textContent = fakePeople[i][2];
      doc.getElementById("person-address").textContent = fakePeople[i][3];
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
  if(fakePersonToIncident[data]) {
    for (let i=0; i < fakePersonToIncident[data].length; i++) {
      var row = personIncidents.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = fakePersonToIncident[data][i][0];
      cell2.innerHTML = fakePersonToIncident[data][i][1];
      cell3.innerHTML = fakePersonToIncident[data][i][2];
      cell4.innerHTML = "";
      cell5.innerHTML = "<button id='" + fakePersonToIncident[data][i][0] + "' data-id='"+ fakePersonToIncident[data][i][0] +"' class='btn-goto-incident btn-yellow' value>\>\>\></button>";
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

  for (let i=0; i<fakeCars.length; i++) {
    if(data == fakeCars[i][0]) {
      var row = personVehicles.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = fakeCars[i][1];
      cell2.innerHTML = fakeCars[i][2];
      cell3.innerHTML = fakeCars[i][3];
      cell4.innerHTML = "";
      cell5.innerHTML = "<button id='" + fakeCars[i][1] + "' data-id='"+ fakeCars[i][1] +"' class='btn-goto-vehicle btn-yellow' value>\>\>\></button>";;
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
  "uid": "67dsf",
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
fakeIncidents[544841] = {
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

addIncidentToDash(fakeIncidents[544841]);
addIncidentToDash(fakeIncidents[544841]);
addIncidentToDash(fakeIncidents[544841]);



addMostWantedToDash();
addMostWantedToDash();
addMostWantedToDash();
addMostWantedToDash();
