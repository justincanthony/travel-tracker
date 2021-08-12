const getData = (suffix) => {
  const baseURL = 'http://localhost:3001/api/v1/';
  return fetch(`${baseURL}${suffix}`).then((response) => response.json());
};

const getTravelerData = (id) => {
  const baseURL = 'http://localhost:3001/api/v1/travelers/';
  return fetch(`${baseURL}${id}`).then((response) => response.json());
};

export const requestTrip = (newTrip) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTrip),
  }).then((response) => response.json());
};

export const getAllData = () => {
  return Promise.all([
    getTravelerData(44),
    getData('trips'),
    getData('destinations'),
    getData('travelers'),
  ]);
};
