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

// document.querySelector('.menu-bar').addEventListener('click', () => {
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
// });
