// import /*Classes*/ from '/*filepath*/';
import Destination from './Destination.js';
import { traveler, agency } from './scripts.js';
let dayjs = require('dayjs');

let todaysDate = dayjs();

const startDateInput = document.getElementById('start');
const destinationDropDown = document.getElementById('optionSelect');

const displayAllData = () => {
  displayTravelerData();
  displayDestinationData();
  displayFutureTripData();
  displayPendingTrips();
  displayPastTrips();
  displayCurrentTrips();
  populateDropDownMenu();
};

const displayTravelerData = () => {
  document.getElementById('tripper-name').innerText = traveler.name;
  document.getElementById('tripCost').innerText =
    agency.calculateCurrentYearTripsCostByID(traveler.userID);
};

const displayDestinationData = () => {
  agency.destinations.forEach((destination) => {
    document.getElementById('destinations').innerHTML += `<article class="card">
      <div class="card-header">
        <img src=${destination.image} class="destination-picture">
      </div>
      <div class="card-main">
        <div class="card-div">
          <h3>${destination.destination}</h3>
          <h5>Date 02/23/16 10:22am</h5>
        </div>
        <div class="card-div-grey">
          <h5></h5>
        </div>
        <div class="card-div">
          <h5></h5>
          <h3></h3>
        </div>
        <div class="card-div">
          <h5>Cost</h5>
          <h3 id="blue"></h3>
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

export default displayAllData;
