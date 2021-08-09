// *************************************************import styling pages here

import './css/base.scss';
// import './css/styles.scss';

// *****************************************************importing images here

// import './images/turing-logo.png';

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

// let loginButton = document.querySelector('.menu-bar');

// ******************************************* declaration of global variables

let traveler, agency, trip, destinations, id, password, trips;

// ****************************************************** event listeners here

document.querySelector('.menu-bar').addEventListener('click', () => {
  getAllData(5)
    .then((data) => {
      traveler = new Traveler(data[0]);
      traveler.trips = data[1].trips.filter((trip) => trip.userID === 5);
      agency = new Agency(
        data[1].trips,
        data[2].destinations,
        data[3].travelers
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
// agency holds all data and new classes are instantiated from that as needed
