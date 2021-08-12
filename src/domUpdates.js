import Destination from './Destination.js';
import { destinationDropDown, traveler, agency } from './scripts.js';

let dayjs = require('dayjs');
let todaysDate = dayjs();

// *******Query Selectors
const pendingTrips = document.getElementById('pendingTrips');

export const addTripToPage = (trip) => {
  pendingTrips.innerHTML += `<p>${trip.name}</p>`;
};

export const displayAllData = () => {
  displayTravelerData();
  displayFutureTripData();
  displayPendingTrips();
  displayPastTrips();
  displayCurrentTrips();
  populateDropDownMenu();
};

const displayTravelerData = () => {
  document.getElementById('loginTitle').innerText = traveler.name;
  document.getElementById(
    'tripCost'
  ).innerText = `Total Spent This Year ${agency.calculateCurrentYearTripsCostByID(
    traveler.userID
  )}`;
};

export const getTripEstimate = () => {
  let tripEstimateDisplay = document.getElementById('tripEst');
  let durationInput = Number(document.getElementById('duration').value);
  let travelersInput = Number(document.getElementById('travelers').value);
  let destinationID = Number(document.getElementById('dropDown').value);
  let destination = agency.filterData('destinations', destinationID)[0];
  let estimate = Math.round(
    destination.estimatedLodgingCostPerDay * durationInput +
      destination.estimatedFlightCostPerPerson * travelersInput * 1.1
  );
  tripEstimateDisplay.innerText = `Your estimated cost for this trip is: $${estimate}`;
};

const displayFutureTripData = () => {
  const futureApprovedTrips = traveler.getFutureTrips(todaysDate, 'approved');
  const approvedDestinations = [];

  agency.destinations.forEach((destination) => {
    futureApprovedTrips.forEach((trip) => {
      if (trip.destinationID === destination.id) {
        let newDestination = new Destination(destination);
        newDestination.date = trip.date;
        approvedDestinations.push(newDestination);
      }
    });
  });

  let futureTripsArea = document.getElementById('futureTrips');
  futureTripsArea.innerHTML = '';

  approvedDestinations.forEach((destination) => {
    futureTripsArea.innerHTML += `<article class="card">
    <div class="card-header">
      <img src=${destination.image} alt=${
      destination.alt
    } class="destination-picture">
    </div>
    <div class="card-main">
      <div class="card-div">
        <h3>${destination.destination}</h3>
        <h5>${dayjs(destination.date).format('M/DD/YY')}</h5>
      </div>
      <div class="card-div-grey">
      <h5>Lodging Cost Per Day $${destination.estimatedLodgingCostPerDay}</h5>
        <h5>Flight Cost Per Person $${
          destination.estimatedFlightCostPerPerson
        }</h5>
      </div>
    </div>
  </article>`;
  });
};

const displayPendingTrips = () => {
  const futurePendingTrips = traveler.getFutureTrips(todaysDate, 'pending');
  const pendingDestinations = [];

  agency.destinations.forEach((destination) => {
    futurePendingTrips.forEach((trip) => {
      if (trip.destinationID === destination.id) {
        let newDestination = new Destination(destination);
        newDestination.date = trip.date;
        pendingDestinations.push(newDestination);
      }
    });
  });

  let displayPendingArea = document.getElementById('pendingTrips');
  displayPendingArea.innerHTML = '';

  pendingDestinations.forEach((destination) => {
    displayPendingArea.innerHTML += `<article class="card">
    <div class="card-header">
      <img src=${destination.image} alt=${
      destination.alt
    } class="destination-picture">
    </div>
    <div class="card-main">
      <div class="card-div">
        <h3>${destination.destination}</h3>
        <h5>${dayjs(destination.date).format('M/DD/YY')}</h5>
      </div>
      <div class="card-div-grey">
      <h5>Lodging Cost Per Day $${destination.estimatedLodgingCostPerDay}</h5>
        <h5>Flight Cost Per Person $${
          destination.estimatedFlightCostPerPerson
        }</h5>
      </div>
    </div>
  </article>`;
  });
};

const displayPastTrips = () => {
  const pastTrips = traveler.getPastTrips(todaysDate, 'approved');
  const pastDestinations = [];

  agency.destinations.forEach((destination) => {
    pastTrips.forEach((trip) => {
      if (trip.destinationID === destination.id) {
        let newDestination = new Destination(destination);
        newDestination.date = trip.date;
        pastDestinations.push(newDestination);
      }
    });
  });

  let displayPastArea = document.getElementById('pastTrips');
  displayPastArea.innerHTML = '';

  pastDestinations.forEach((destination) => {
    displayPastArea.innerHTML += `<article class="card">
    <div class="card-header">
      <img src=${destination.image} alt=${
      destination.alt
    } class="destination-picture">
    </div>
    <div class="card-main">
      <div class="card-div">
        <h3>${destination.destination}</h3>
        <h5>${dayjs(destination.date).format('M/DD/YY')}</h5>
      </div>
      <div class="card-div-grey">
      <h5>Lodging Cost Per Day $${destination.estimatedLodgingCostPerDay}</h5>
        <h5>Flight Cost Per Person $${
          destination.estimatedFlightCostPerPerson
        }</h5>
      </div>
    </div>
  </article>`;
  });
};

const displayCurrentTrips = () => {
  const currentTrips = traveler.getCurrentTrips(todaysDate);
  const currentDestinations = [];
  agency.destinations.forEach((destination) => {
    currentTrips.forEach((trip) => {
      if (trip.destinationID === destination.id) {
        let newDestination = new Destination(destination);
        newDestination.date = trip.date;
        currentDestinations.push(newDestination);
      }
    });
  });

  let currentArea = document.getElementById('currentTrips');
  currentArea.innerHTML = '';

  currentDestinations.forEach((destination) => {
    currentArea.innerHTML += `<article class="card">
      <div class="card-header">
        <img src=${destination.image} alt=${
      destination.alt
    } class="destination-picture">
      </div>
      <div class="card-main">
        <div class="card-div">
          <h3>${destination.destination}</h3>
          <h5>${dayjs(destination.date).format('M/DD/YY')}</h5>
        </div>
        <div class="card-div-grey">
        <h5>Lodging Cost Per Day $${destination.estimatedLodgingCostPerDay}</h5>
          <h5>Flight Cost Per Person $${
            destination.estimatedFlightCostPerPerson
          }</h5>
        </div>
      </div>
    </article>`;
  });
};

const populateDropDownMenu = () => {
  agency.destinations.forEach((destination) => {
    destinationDropDown.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`;
  });
};

export const displayLoginError = () => {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.innerText =
    'Oops! Your Username or Password is Incorrect, Please Try Again.';
};

export const show = (element) => {
  element.classList.remove('hidden');
};

export const hide = (element) => {
  element.classList.add('hidden');
};

export default displayAllData;
