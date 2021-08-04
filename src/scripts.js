// ******************************************************import styling pages here
import './css/base.scss';
import './css/styles.scss';

// **********************************************************importing images here
import './images/turing-logo.png'


// *********************************************************importing classes here
import Class from './file';
import Class from './file';
import Class from './file';
import Class from './file';
import Class from './file';

// ************************************************************importing funcitons
import displayAllData from './updateDOM';
import getAllData from './apiCalls';

// *****************************************************exporting global variables

// export { [global variables declared below] };


// ************************************************declaration of global variables

// let global [variable declared above];


// *************************************************resolving promise from api call
// All data will be returned to this function in an array
// will need to access with bracket notation
// possible to use iterator here to get the user foirm login
// maybe the agency holds all data and things are instantiated from that as needed

getAllData()
  .then((data) => {
    traveler = new Traveler();
    travelAgency = new Agency();
    destination = new Destination();
    trip = new Trip();
    agent = new Agent();
    );
  })
  .then(displayAllData);
