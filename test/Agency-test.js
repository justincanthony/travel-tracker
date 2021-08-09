import chai from 'chai';
const expect = chai.expect;

import Agency from '../src/Agency';
import tripTestData from './trip-test-data';
import destinationTestData from './destination-test-data';
import travelersTestData from './travelers-test-data';

describe.only('Agency', () => {
  let agency, id;

  beforeEach(() => {
    id = 45;
    agency = new Agency(travelersTestData, tripTestData, destinationTestData);
  });

  it('should be a function', () => {
    expect(Agency).to.be.a('function');
  });

  it('should be an instance of Agency', () => {
    expect(agency).to.be.an.instanceOf(Agency);
  });

  it('should be able to store all users', () => {
    expect(agency.travelers).to.deep.equal(travelersTestData);
  });

  it('should be able to store all users trip data', () => {
    expect(agency.trips).to.deep.equal(tripTestData);
  });

  it('should be able to store all destinations', () => {
    expect(agency.destinations).to.deep.equal(destinationTestData);
  });

  it('should be able to filter any data set by an id', () => {
    expect(agency.filterData('trips', id)).to.deep.equal([
      {
        id: 45,
        userID: 45,
        destinationID: 5,
        travelers: 6,
        date: '2020/09/06',
        duration: 9,
        status: 'approved',
        suggestedActivities: [],
      },
      {
        id: 49,
        userID: 45,
        destinationID: 35,
        travelers: 1,
        date: '2020/05/14',
        duration: 16,
        status: 'approved',
        suggestedActivities: [],
      },
      {
        id: 64,
        userID: 45,
        destinationID: 25,
        travelers: 3,
        date: '2020/08/26',
        duration: 7,
        status: 'approved',
        suggestedActivities: [],
      },
    ]);
    expect(agency.filterData('travelers', id)).to.deep.equal([
      {
        id: 45,
        name: 'Ofilia Titman',
        travelerType: 'thrill-seeker',
      },
    ]);
    expect(agency.filterData('destinations', id)).to.deep.equal([
      {
        id: 45,
        destination: 'Calgary, Canada',
        estimatedLodgingCostPerDay: 200,
        estimatedFlightCostPerPerson: 125,
        image:
          'https://images.unsplash.com/photo-1523167508699-c34c50472b01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
        alt: 'city buildings reflection on body of water',
      },
    ]);
  });

  it('should be able to calculate the cost of a trip for a user by id', () => {
    expect(agency.calculateTotalTripsCostByID(45)).to.equal(10375);
  });
});
