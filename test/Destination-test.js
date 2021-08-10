import chai from 'chai';
import Destination from '../src/Destination';
const expect = chai.expect;

describe('Destination', () => {
  let destination, destination1;

  beforeEach(() => {
    (destination = {
      id: 13,
      destination: 'St. Petersburg, Russia',
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 1100,
      image:
        'https://images.unsplash.com/photo-1556543697-2fb00d31948a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      alt: 'buildings and people crossing the street carrying shoping bags during the day',
    }),
      (destination1 = new Destination(destination));
  });

  it('should be a function', () => {
    expect(Destination).to.be.a('function');
  });

  it('should be able to create an instance of Destination', () => {
    expect(destination1).to.be.an.instanceOf(Destination);
  });

  it('should be able to store a destination id', () => {
    expect(destination1.id).to.deep.equal(13);
  });
  it('should be able to store a destination lodging cost per day', () => {
    expect(destination1.estimatedLodgingCostPerDay).to.deep.equal(100);
  });
  it('should be able to store a destination flight cost per person', () => {
    expect(destination1.estimatedFlightCostPerPerson).to.deep.equal(1100);
  });
  it('should be able to store a destination image', () => {
    expect(destination1.image).to.deep.equal(
      'https://images.unsplash.com/photo-1556543697-2fb00d31948a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
    );
  });
  it('should be able to store a destination image alt text', () => {
    expect(destination1.alt).to.deep.equal(
      'buildings and people crossing the street carrying shoping bags during the day'
    );
  });
});
