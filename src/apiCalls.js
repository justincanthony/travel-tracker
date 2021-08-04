const getData = (suffix) => {
  const baseURL = 'http://localhost:3001/api/v1/';
  return fetch(`${baseURL}${suffix}`).then((response) => response.json());
};

const getAllData = () => {
  return Promise.all([
    // getData('travelers'),
    getData('travelers/1'),
    getData('trips'),
    getData('destinations'),
  ]);
};

export default getAllData;

// ****************************************Get User
// Input for UsernameID
// Input For password
// if password === travel, then fire Get User Data

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
