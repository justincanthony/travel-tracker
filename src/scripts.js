// *************************************************import styling pages here

import './css/base.scss';
// ****************************************************importing classes here

import Traveler from './Traveler';
import Agency from './Agency';
let dayjs = require('dayjs');

// ******************************************************* importing functions

import displayAllData from './domUpdates';
import { show } from './domUpdates';
import { getAllData, requestTrip } from './apiCalls';
import { hide } from './domUpdates';
import { displayLoginError, getTripEstimate } from './domUpdates';

// ************************************************ exporting global variables

export {
  destinationDropDown,
  traveler,
  agency,
  trip,
  destinations,
  travelerId,
};
// ******************************************* declaration of query selectors

const userNameInput = document.getElementById('userName');
const password = document.getElementById('pass');
const loginButton = document.getElementById('log');
const loginPage = document.getElementById('logIn');
const mainPage = document.querySelector('.main');
const submit = document.getElementById('submitButton');
const durationInput = document.getElementById('duration');
const travelersInput = document.getElementById('travelers');
const startDateInput = document.getElementById('start');
const destinationDropDown = document.getElementById('dropDown');
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
        traveler = new Traveler(data[0]);
        traveler.trips = data[1].trips.filter(
          (trip) => trip.userID === travelerId
        );
        agency = new Agency(
          data[3].travelers,
          data[1].trips,
          data[2].destinations
        );
      })
      .then(displayAllData);
  }
};

loginButton.addEventListener('click', checkPassword);

submit.addEventListener('click', (event) => {
  getTripEstimate();
  sendNewTrip(event);
});

const sendNewTrip = (event) => {
  event.preventDefault();

  let newTrip = {
    id: Date.now(),
    userID: travelerId,
    destinationID: Number(
      destinationDropDown.options[destinationDropDown.selectedIndex].value
    ),
    travelers: Number(travelersInput.value),
    date: dayjs(startDateInput.value).format('YYYY/MM/DD'),
    duration: Number(durationInput.value),
    status: 'pending',
    suggestedActivities: [],
  };
  requestTrip(newTrip).then((data) => {
    getAllData(travelerId).then((data) => {
      traveler = new Traveler(data[0]);
      traveler.trips = data[1].trips.filter(
        (trip) => trip.userID === travelerId
      );
      agency = new Agency(
        data[3].travelers,
        data[1].trips,
        data[2].destinations
      );
    });
    setTimeout(() => {
      displayAllData();
    }, 1000);
  });
};
