// *************************************************import styling pages here

import './css/base.scss';
// import './css/styles.scss';

// *****************************************************importing images here

import './images/turing-logo.png';

// ****************************************************importing classes here

import Traveler from './Traveler';
import Agent from './Agent';
import Trip from './Trip';
import Destination from './Destination';

// *******************************************************importing functions

import displayAllData from './domUpdates';
import getAllData from './apiCalls';

// ************************************************exporting global variables

export { traveler, agent, trip, destination };

// *******************************************declaration of global variables

let traveler, agent, trip, destination;

// ******************************************************event listeners here

// document.getElementById().addEventListener(
//   'click',
//   getTravelerData.then((data) => {
//     traveler = new Traveler(data);
//   })
// );

// *******************************************resolving promise from api call
// All data will be returned to this function in an array
// will need to access with bracket notation
// possible to use iterator here to get the user form login maybe the
// agency holds all data and new classes are instantiated from that as needed

// getTravelerData().then;

getAllData()
  .then((data) => {
    traveler = new Traveler(data[0]);
    trip = new Trip(data[1].trips);
    destination = new Destination(data[2].destinations);
    // agent = new Agent();
  })
  .then(displayAllData);
