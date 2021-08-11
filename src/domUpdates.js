// imports
import Traveler from './Traveler';
import Agency from './Agency';
import Destination from './Destination.js';
import { traveler, agency, travelerId } from './scripts.js';
import { requestTrip, getAllData } from './apiCalls.js';

let dayjs = require('dayjs');
let todaysDate = dayjs();

// *******Query Slectors
const pendingTrips = document.getElementById('pendingTrips');
const submit = document.getElementById('submitButton');
const durationInput = document.getElementById('duration');
const travelersInput = document.getElementById('travelers');
const startDateInput = document.getElementById('start');
const destinationDropDown = document.getElementById('dropDown');

// *******Event Listener

submit.addEventListener('click', () => {
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
    console.log(data);
    return getAllData(travelerId)
      .then((data) => {
        console.log(data);
        let traveler = new Traveler(data[0]);
        traveler.trips.push(
          data[1].trips.filter((trip) => trip.travelerId === travelerId)
        );
        let agency = new Agency(
          data[3].travelers,
          data[1].trips,
          data[2].destinations
        );
      })
      .then(displayAllData);
  });
};

export const addTripToPage = (trip) => {
  pendingTrips.innerHTML += `<p>${trip.name}</p>`;
};

export const displayAllData = () => {
  displayTravelerData();
  displayDestinationData();
  displayFutureTripData();
  displayPendingTrips();
  displayPastTrips();
  displayCurrentTrips();
  populateDropDownMenu();
};

const displayTravelerData = () => {
  console.log(traveler);
  document.getElementById('loginTitle').innerText = traveler.name;
  document.getElementById(
    'tripCost'
  ).innerText = `Total Spent This Year ${agency.calculateCurrentYearTripsCostByID(
    traveler.userID
  )}`;
};

const displayDestinationData = () => {
  agency.destinations.forEach((destination) => {
    document.getElementById('destinations').innerHTML += `<article class="card">
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

  approvedDestinations.forEach((destination) => {
    document.getElementById('future-trips').innerHTML += `<article class="card">
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

  pendingDestinations.forEach((destination) => {
    document.getElementById(
      'pending-trips'
    ).innerHTML += `<article class="card">
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
  const pastTrips = traveler.getFutureTrips(todaysDate, 'pending');
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

  pastDestinations.forEach((destination) => {
    document.getElementById(
      'pending-trips'
    ).innerHTML += `<article class="card">
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

  currentDestinations.forEach((destination) => {
    document.getElementById('pendingTrips').innerHTML += `<article class="card">
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
