class Trip {
  constructor(trips, userID) {
    this.trips = trips;
    this.userID = userID || null;
    this.travelerTrips = trips.filter((trip) => trip.userID === userID);
  }
}
export default Trip;
