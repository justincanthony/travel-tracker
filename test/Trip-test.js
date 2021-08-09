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
});

//  need to finish testing new trip class
