const getData = (suffix) => {
  const baseURL = 'http://localhost:3001/api/v1/';
  return fetch(`${baseURL}${suffix}`).then((response) => response.json());
};

const getTravelerData = (id) => {
  id = `${id}`;
  const baseURL = 'http://localhost:3001/api/v1/travelers/';
  return fetch(`${baseURL}${id}`).then((response) => response.json());
};

const getAllData = (id) => {
  return Promise.all([
    getTravelerData(id),
    getData('trips'),
    getData('destinations'),
    getData('travelers'),
  ]);
};

export default getAllData;

// ****************************************Error Handling
//

// export const getTraveler = (path) => {
//   return fetch(`${endPoint}${path}`)
//     .then((response) => displayError(response))
//     .then((data) => data)
//     .catch((error) => console.error(error));
// };

// displayError(response)
// const displayError = (response) => {
//   if (!response.ok) {
//     console.log('Something went wrong, try again!');
//   } else {
//     console.log(response.json());
//     return response.json();
//   }
// };

// .catch((error) => console.error(error));
