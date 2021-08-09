let dayjs = require('dayjs');
class Traveler {
  constructor(travelerData) {
    this.UserID = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = [];
  }

  getPendingTrips() {
    return this.trips.filter((trip) => trip.status === 'pending');
  }

  getApprovedTrips() {
    return this.trips.filter((trip) => trip.status === 'approved');
  }

  getFutureTrips(date) {
    return this.trips.filter((trip) => {
      if (
        dayjs(date).isBefore(dayjs(trip.date)) &&
        trip.status === 'approved'
      ) {
        return trip;
      }
    });
  }

  getDestinationIDs(data) {
    return this[data].map((trip) => trip.destinationID);
  }

  getPastTrips(date) {
    return this.trips.filter((trip) => {
      if (dayjs(date).isAfter(dayjs(trip.date)) && trip.status === 'approved') {
        return trip;
      }
    });
  }
}
export default Traveler;
