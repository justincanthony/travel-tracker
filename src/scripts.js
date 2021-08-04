// *************************************************import styling pages here

import './css/base.scss';
import './css/styles.scss';

// *****************************************************importing images here

import './images/turing-logo.png'

// ****************************************************importing classes here

import Traveler from './Traveler';
import Agency from './Agency';
import Agent from './Agent';
import Trip from './Trip';
import Destination from './Destination';

// *******************************************************importing funcitons

import displayAllData from './updateDOM';
import getAllData from './apiCalls';

// ************************************************exporting global variables

export { traveler, agency, agent, trip, destination };


// *******************************************declaration of global variables

let traveler, agency, agent, trip, destination;


// *******************************************resolving promise from api call
// All data will be returned to this function in an array
// will need to access with bracket notation
// possible to use iterator here to get the user form login maybe the 
// agency holds all data and new classes are instantiated from that as needed

getAllData()
  .then((data) => {
    traveler = new Traveler();
    travelAgency = new Agency();
    destination = new Destination();
    trip = new Trip();
    agent = new Agent();
  })
  .then(displayAllData);
