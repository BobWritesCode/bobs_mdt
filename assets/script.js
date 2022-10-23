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
const btnPerformPDSearch = doc.getElementById('pd-search-button');


window.addEventListener('DOMContentLoaded', function() {
  assignUser()

	// Navigation function calls
	btnPdDashboard.addEventListener("click", function() {
		changeMdtScreen.makeChange('pd-dashboard-container');
	});
	btnPdSearch.addEventListener("click", function() {
		changeMdtScreen.makeChange('pd-search-container');
	});
	btnPdIncidents.addEventListener("click", function() {
		changeMdtScreen.makeChange('pd-incident-container');
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

	// PD incidents function calls
  btnAddEvent.addEventListener("click", addEventToEventHistory);

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
  spanUserName.textContent = "Graves"
  spanUserRank.textContent = "Captain"
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
  const incidentCol = doc.getElementById("pd-dashboard-incidents");
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
 * Add Most Wanted to dashboard
 */
 function addEventToEventHistory(data) {
  let text = doc.getElementById("txt-add-event").value;
  let person = "Graves";
  let time = "5:00pm";
  let date = "23/10/22"
  var data =    "<div class='event-entry'>"
                +   "<p><strong>" + person + "</strong> @ " + time + " on " + date + ".</p>"
                +   "<p>" + text + "</p>"
                + "</div>"
  const incidentCol = doc.getElementById("incident-event-history");
  incidentCol.innerHTML += data;
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
		console.log(key);

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
			var newRow =	"<tr>"
										+ "<td>" + tableData[i][0] + " " + tableData[i][1] + "</td>"
										+ "<td>" + tableData[i][2] + "</td>"
										+ "<td>" + tableData[i][3] + "</td>"
										+ "<td>" +  + "</td>"
										+ "<td>	<button id='btn-goto-person'>\>\>\></button>	</td>"
										+ "</tr>";
			searchResults.innerHTML += newRow;
		};
	
	};
};

const fakePeople = [];
fakePeople[0] = ['George', 'Bones', '12/01/85', '7 Park Lane'];
fakePeople[1] = ['Gary', 'Bones', '27/09/88', '6 Park Lane'];

changeMdtScreen()

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
