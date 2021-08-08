import chai from 'chai';
const expect = chai.expect;
import tripTestData from './trip-test-data';
import Trip from '../src/Trip';

describe('Trip', () => {
  let trip, userID;

  beforeEach(() => {
    userID = 45;
    trip = new Trip(tripTestData, userID);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceOf(Trip);
  });

  it('should be able to hold trip data', () => {
    expect(trip.trips).to.deep.equal(tripTestData);
  });

  it('should be able to take in a user id if provided', () => {
    expect(trip.userID).to.equal(45);
  });

  it('should be able to hold trip data', () => {
    expect(trip.trips).to.deep.equal(tripTestData);
  });

  it("should be able to hold a single user's trip data", () => {
    expect(trip.travelerTrips).to.deep.equal([
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
  });
});
