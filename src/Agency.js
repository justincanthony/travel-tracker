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

  calculateTotalTripsCostByID(UserID) {
    let userTrips = this.filterData('trips', UserID);
    let currentYearsTrips = userTrips.filter(
      (trip) => trip.date === currentYear
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

    return userDestinations.reduce((sum, destination, i) => {
      sum +=
        destination.estimatedLodgingCostPerDay * userTrips[i].duration +
        destination.estimatedFlightCostPerPerson * userTrips[i].travelers;
      return sum;
    }, 0);
  }
}
export default Agency;
