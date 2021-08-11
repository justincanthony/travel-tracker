// *************************************************import styling pages here

import './css/base.scss';
// ****************************************************importing classes here
import Traveler from './Traveler';
import Agency from './Agency';
// import Trip from './Trip';
// import Destination from './Destination';

// ******************************************************* importing functions
// import displayLoginError from './domUpdates';
import displayAllData from './domUpdates';
import { show } from './domUpdates';
import { getAllData } from './apiCalls';
import { hide } from './domUpdates';
import { displayLoginError } from './domUpdates';

// ************************************************ exporting global variables
export { traveler, agency, trip, destinations, travelerId };
// ******************************************* declaration of query selectors

const userNameInput = document.getElementById('userName');
const password = document.getElementById('pass');
const loginButton = document.getElementById('log');
const loginPage = document.getElementById('logIn');
const mainPage = document.querySelector('.main');

// ******************************************* declaration of global variables
let traveler, agency, trip, destinations, travelerId;

// ****************************************************** event listeners here

const checkPassword = (event) => {
  event.preventDefault();

  travelerId = parseInt(userNameInput.value.split('traveler')[1]);

  if (
    !travelerId ||
    travelerId < 1 ||
    travelerId > 50 ||
    password.value !== 'travel'
  ) {
    displayLoginError();
  } else {
    hide(loginPage);
    show(mainPage);
    getAllData(travelerId)
      .then((data) => {
        console.log('data', data);
        traveler = new Traveler(data[0]);
        console.log('trips', data[1].trips);
        traveler.trips = data[1].trips.filter(
          (trip) => trip.userID === travelerId
        );
        agency = new Agency(
          data[3].travelers,
          data[1].trips,
          data[2].destinations
        );
        console.log(traveler);
      })
      .then(displayAllData);
  }
};

loginButton.addEventListener('click', checkPassword);
