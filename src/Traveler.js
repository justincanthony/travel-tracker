let dayjs = require('dayjs');
var isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);
class Traveler {
  constructor(travelerData) {
    this.userID = travelerData.id;
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

  getFutureTrips(date, status) {
    return this.trips.filter((trip) => {
      if (dayjs(date).isBefore(dayjs(trip.date)) && trip.status === status) {
        return trip;
      }
    });
  }

  getDestinationIDs() {
    return this.trips.map((trip) => trip.destinationID);
  }

  getPastTrips(date, status) {
    return this.trips.filter((trip) => {
      if (dayjs(date).isAfter(dayjs(trip.date)) && trip.status === status) {
        return trip;
      }
    });
  }

  getCurrentTrips(date) {
    return this.getApprovedTrips().filter((trip) => {
      let endDate = dayjs(trip.date)
        .add(trip.duration, 'day')
        .format('YYYY/MM/DD');

      if (dayjs(date).isBetween(dayjs(trip.date), dayjs(endDate), null, '[]')) {
        return trip;
      }
    });
  }
}
export default Traveler;
