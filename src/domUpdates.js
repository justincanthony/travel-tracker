// import /*Classes*/ from '/*filepath*/';
import Destination from './Destination.js';
import { traveler, agency } from './scripts.js';
let dayjs = require('dayjs');

let todaysDate = dayjs();

const displayAllData = () => {
  displayTravelerData();
  displayDestinationData();
  displayFutureTripData();
};

const displayTravelerData = () => {
  document.getElementById('tripper-name').innerText = traveler.name;
};

const displayDestinationData = () => {
  agency.destinations.forEach((destination) => {
    document.getElementById('destinations').innerHTML += `<article class="card">
      <div class="card-header">
        <img src=${destination.image} alt=${destination.alt} class="destination-picture">
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
  const futureApprovedTrips = traveler.getFutureTrips(todaysDate);
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
  console.log(approvedDestinations);
  approvedDestinations.forEach((destination) => {
    futureApprovedTrips;
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

export default displayAllData;
