import addTripToPage from './domUpdates';

const getData = (suffix) => {
  const baseURL = 'http://localhost:3001/api/v1/';
  return fetch(`${baseURL}${suffix}`).then((response) => response.json());
};

const getTravelerData = (id) => {
  id = `${id}`;

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

export const getAllData = (id) => {
  return Promise.all([
    getTravelerData(id),
    getData('trips'),
    getData('destinations'),
    getData('travelers'),
  ]);
};

// const postTrip = (tripRequestObject) => {
//   fetch('http://localhost:3001/api/v1/trips', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(tripRequestObject),
//   })
//   .then(response => response.json())
//   .then(data => console.log(data, 'DATA<><><>'))
// }

// ****************************************Error Handling
//

// const displayError = (error) => {
//   if (error) {
//     document.querySelector('.js-error').innerText =
//       'You must fill out all fields!';
//   }
// };

// const checkForError = (response) => {
//   console.log(response);
//   if (!response.ok) {
//     throw new Error('Please make sure that all fields are filled out.');
//   } else {
//     return response.json();
//   }
// };

// export const getTraveler = (path) => {
//   return fetch(`${endPoint}${path}`)
//     .then((response) => displayError(response))
//     .then((data) => data)
//     .catch((error) => console.error(error));
// // };

// displayError(response)
// const displayError = (response) => {
//   if (!response.ok) {
//     console.log('Something went wrong, try again!');
//   } else {
//     console.log(response.json());
//     return response.json();
//   }
// };

// // .catch((error) => console.error(error));
// .then((res) => checkForError(res))
//     .then((trip) => addTripToPage(trip))
//     .catch((err) => displayError(err));
