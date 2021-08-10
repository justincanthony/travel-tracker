import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/Trip';

describe('Trip', () => {
  let trip;

  beforeEach(() => {
    trip = new Trip({
      id: 18,
      userID: 18,
      destinationID: 2,
      travelers: 2,
      date: '2022/09/25',
      duration: 17,
      status: 'approved',
      suggestedActivities: [],
    });
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceOf(Trip);
  });

  it('should have an id', () => {
    expect(trip.id).to.equal(18);
  });

  it('should have a user id', () => {
    expect(trip.userID).to.equal(18);
  });

  it('should have a destination id', () => {
    expect(trip.destinationID).to.equal(2);
  });

  it('should store the number of travelers', () => {
    expect(trip.travelers).to.equal(2);
  });

  it('should have a date', () => {
    expect(trip.date).to.equal('2022/09/25');
  });

  it('should have a duration', () => {
    expect(trip.duration).to.equal(17);
  });

  it('should have a default status of "pending', () => {
    expect(trip.status).to.equal('pending');
  });

  it('should have suggested activities', () => {
    expect(trip.suggestedActivities).to.deep.equal([]);
  });

  it('should be able update status to approved', () => {
    expect(trip.upDateStatus('approved')).to.equal('approved');
  });
});
