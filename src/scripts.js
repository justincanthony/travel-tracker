// *************************************************import styling pages here

import './css/base.scss';
// import './css/styles.scss';

// *****************************************************importing images here

// ****************************************************importing classes here

import Traveler from './Traveler';
import Agency from './Agency';
// import Trip from './Trip';
// import Destination from './Destination';

// ******************************************************* importing functions
import displayAllData from './domUpdates';
import getAllData from './apiCalls';
// ************************************************ exporting global variables
export { traveler, agency, trip, destinations };
// ******************************************* declaration of query selectors
// const select = document.getElementById('destinationSelect');
// let option = select.options[select.selectedIndex];
// let value = select.options[select.selectedIndex].value;
// ******************************************* declaration of global variables
let traveler, agency, trip, destinations;
// id = 44;
// ****************************************************** event listeners here
getAllData(44)
  .then((data) => {
    traveler = new Traveler(data[0]);
    console.log(traveler);
    traveler.trips = data[1].trips.filter((trip) => trip.userID === 44);
    agency = new Agency(data[3].travelers, data[1].trips, data[2].destinations);
    displayAllData();
  })
 

// .then(displayAllData)
// document.querySelector('.menu-bar').addEventListener('click', () => {
//   getAllData(id)
//     .then((data) => {
//       traveler = new Traveler(data[0]);
//       traveler.trips = data[1].trips.filter((trip) => trip.userID === id);
//       agency = new Agency(
//         data[3].travelers,
//         data[1].trips,
//         data[2].destinations
//       );
//     })
//     .then(displayAllData);
// });
