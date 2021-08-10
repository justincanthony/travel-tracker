// *************************************************import styling pages here

import './css/base.scss';
// import './css/styles.scss';

// *****************************************************importing images here

// ****************************************************importing classes here

import Traveler from './Traveler';
import Agency from './Agency';
import Trip from './Trip';
import Destination from './Destination';

// ******************************************************* importing functions

import displayAllData from './domUpdates';
import getAllData from './apiCalls';

// ************************************************ exporting global variables

export { traveler, agency, trip, destinations };

// ******************************************* declaration of query selectors
const submitTripRequest = document.getElementById('tripRequest');

const pendingTrips = document.getElementById('pendingTrips');
// const select = document.getElementById('destinationSelect');
// let option = select.options[select.selectedIndex];
// let value = select.options[select.selectedIndex].value;
// ******************************************* declaration of global variables

let traveler, agency, trip, destinations, id, password, trips;
id = 44;
// ****************************************************** event listeners here

const addTripToPage = (trip) => {
  pendingTrips.innerHTML += `<p>${trip.name}</p>`;
};

submitTripRequest.addEventListener('submit', (event) => {
  event.preventDefault();

  console.log(value);

  const formData = new FormData(event.target);
  const tripRequest = {
    id: pendingTrips.childElementCount + 1,
    userID: 44,
    destinationID: document.getElementById('value').value,
    travelers: formData.get4('trip'),
    date: formData.get(),
    duration: 4,
    status: 'pending',
    suggestedActivities: [],
  };
});

// formElem.addEventListener('submit', (e) => {
//   e.preventDefault;

//   fetch('http://localhost:3001/api/v1/trips', {
//     method: 'POST',
//     headers: { 'Content-Tyoe': 'application/json' },
//     body: JSON.stringify(),
//   });
// });

// var form = document.forms.namedItem("fileInfo");

// form.addEventListener('submit', function(ev) {

//   var oOutput = document.querySelector("div"),
//       oData = new FormData(form);

//   oData.append("CustomField", "This is some extra data");

//   var oReq = new XMLHttpRequest();
//   oReq.open("POST", "stash.php", true);
//   oReq.onload = function(oEvent) {
//     if (oReq.status == 200) {
//       oOutput.innerHTML = "Uploaded!";
//     } else {
//       oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
//     }
//   };

//   oReq.send(oData);
//   ev.preventDefault();
// }

document.querySelector('.menu-bar').addEventListener('click', () => {
  getAllData(id)
    .then((data) => {
      traveler = new Traveler(data[0]);
      traveler.trips = data[1].trips.filter((trip) => trip.userID === id);
      agency = new Agency(
        data[3].travelers,
        data[1].trips,
        data[2].destinations
      );
    })
    .then(displayAllData);
});

// loginButton.addEventListener('click', () => {
// NEED to get a value from the query selector

// id = document
//   .querySelector('#user-name-input')
//   .value.split('at last two index numbers');
// password = document.querySelector('#password-input').value;

// if (password === 'travel') {
//   getAllData()
//     .then((data) => {
//       traveler = new Traveler(data[0]);
//       traveler.trips = data[1].trips.filter((trip) => trip.userID === id);
//       agency = new Agency(
//         data[1].trips,
//         data[2].destinations,
//         data[3].travelers
//       );
//     })
//     .then(displayAllData);
// } else {
//   // function to display error message
//     //   displayErrorMessage();
//   }
// });

// ******************************************* resolving promise from api call
// All data will be returned to this function in an array
// will need to access with bracket notation
// possible to use iterator here to get the user form login maybe the
// agency holds all data and new classes are instantiated from that as n
