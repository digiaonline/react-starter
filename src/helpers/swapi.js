const SWAPI_URL = 'http://swapi.co/api';

export function getPlanets(page = 1) {
  return fetch(`${SWAPI_URL}/planets/?page=${page}`)
    .then(
      response => handleResponse(response),
      error => handleError(error)
    );
}

export function handleResponse(response) {
  return response.json()
    .then(data => {
      return { response, data };
    });
}

export function handleError(err) {
  console.error(err);
}
