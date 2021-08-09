import chai from 'chai';
const expect = chai.expect;

import Agency from '../src/Agency';
import Traveler from '../src/Traveler';
import tripTestData from './trip-test-data';
import destinationTestData from './destination-test-data';
import travelersTestData from './travelers-test-data';

let dayjs = require('dayjs');

describe.only('Traveler', () => {
  let traveler, agency;

  beforeEach(() => {
    traveler = new Traveler({
      id: 46,
      name: 'Evanne Finnie',
      travelerType: 'relaxer',
    });
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should start with no trips', () => {
    expect(traveler.trips).to.deep.equal([]);
  });

  it('should be able to store their trips', () => {
    agency = new Agency(travelersTestData, tripTestData, destinationTestData);
    traveler.trips = agency.filterData('trips', 46);
    expect(traveler.trips).to.deep.equal([
      {
        id: 24,
        userID: 46,
        destinationID: 26,
        travelers: 5,
        date: '2019/11/15',
        duration: 7,
        status: 'approved',
        suggestedActivities: [],
      },
      {
        id: 52,
        userID: 46,
        destinationID: 14,
        travelers: 2,
        date: '2020/01/24',
        duration: 18,
        status: 'approved',
        suggestedActivities: [],
      },
    ]);
  });

  it('should be able to retrieve their destination Ids', () => {
    agency = new Agency(travelersTestData, tripTestData, destinationTestData);

    traveler.trips = agency.filterData('trips', 46);
    expect(traveler.getDestinationIDs()).to.deep.equal([26, 14]);
  });

  it('should be able to get pending trips', () => {
    agency = new Agency(travelersTestData, tripTestData, destinationTestData);

    traveler.trips = agency.filterData('trips', 46);

    expect(traveler.getPendingTrips()).to.deep.equal([]);
  });

  it('should be able to get approved trips', () => {
    agency = new Agency(travelersTestData, tripTestData, destinationTestData);

    traveler.trips = agency.filterData('trips', 46);

    expect(traveler.getApprovedTrips()).to.deep.equal([
      {
        id: 24,
        userID: 46,
        destinationID: 26,
        travelers: 5,
        date: '2019/11/15',
        duration: 7,
        status: 'approved',
        suggestedActivities: [],
      },
      {
        id: 52,
        userID: 46,
        destinationID: 14,
        travelers: 2,
        date: '2020/01/24',
        duration: 18,
        status: 'approved',
        suggestedActivities: [],
      },
    ]);
  });

  it('should be able to get trips after a specific date that are approved', () => {
    agency = new Agency(travelersTestData, tripTestData, destinationTestData);
    traveler.trips = agency.filterData('trips', 22);
    const date = '2019/08/09';

    expect(traveler.getFutureTrips(date)).to.deep.equal([
      {
        id: 22,
        userID: 22,
        destinationID: 9,
        travelers: 4,
        date: '2022/05/01',
        duration: 19,
        status: 'approved',
        suggestedActivities: [],
      },
    ]);
  });

  it('should be able to get all trips before a specific date that are approved', () => {
    agency = new Agency(travelersTestData, tripTestData, destinationTestData);
    traveler.trips = agency.filterData('trips', 24);
    const date = '2020/08/09';

    expect(traveler.getPastTrips(date)).to.deep.equal([
      {
        id: 9,
        userID: 24,
        destinationID: 19,
        travelers: 5,
        date: '2019/12/19',
        duration: 19,
        status: 'approved',
        suggestedActivities: [],
      },
    ]);
  });
});
