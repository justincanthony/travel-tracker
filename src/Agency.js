let dayjs = require('dayjs');

class Agency {
  constructor(travelersData, tripsData, destinationsData) {
    this.travelers = travelersData;
    this.trips = tripsData;
    this.destinations = destinationsData;
  }

  filterData(dataSet, id) {
    return this[dataSet].filter((data) => {
      if (!data.userID) {
        return data.id === id;
      } else {
        return data.userID === id;
      }
    });
  }

  calculateCurrentYearTripsCostByID(userID) {
    let currentYear = dayjs().format('YYYY');
    let userTrips = this.filterData('trips', userID);
    let currentYearsTrips = userTrips.filter(
      (trip) =>
        dayjs(trip.date).format('YYYY') === currentYear &&
        trip.status === 'approved'
    );

    let userDestIDs = currentYearsTrips.map((trip) => {
      if (trip.status === 'approved') {
        return trip.destinationID;
      }
    });

    let userDestinations = [];

    userDestIDs.forEach((id) => {
      this.destinations.filter((destination) => {
        if (id === destination.id) {
          userDestinations.push(destination);
        }
      });
    });

    return (
      userDestinations.reduce((sum, destination, i) => {
        sum +=
          destination.estimatedLodgingCostPerDay *
            currentYearsTrips[i].duration +
          destination.estimatedFlightCostPerPerson *
            currentYearsTrips[i].travelers;
        return sum;
      }, 0) * 1.1
    );
  }
}
export default Agency;
