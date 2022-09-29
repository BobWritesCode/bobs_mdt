console.log("connected")

const pdDasboardCont = document.getElementById('pd-dasboard-container');
const pdIncidentCont = document.getElementById('pd-incident-container');
const btnPdDashboard = document.getElementById('btnPdDashboard');
const btnPdIncidents = document.getElementById('btnPdIncidents');

window.addEventListener('DOMContentLoaded', function() {
  btnPdDashboard.addEventListener("click", function() {
    changeToPdDashboard();
  });
  btnPdIncidents.addEventListener("click", function() {
    changeToPdIncidents();
  });

});


/**
 * 
 */
 function changeToPdDashboard() {
  pdDasboardCont.style.display = "flex";
  pdIncidentCont.style.display = "none";
 }

 /**
 * 
 */
function changeToPdIncidents() {
  pdDasboardCont.style.display = "none";
  pdIncidentCont.style.display = "flex";
}