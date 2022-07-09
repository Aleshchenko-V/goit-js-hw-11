// old file, which replaced by class
import axios from 'axios';

//const PRIVATE_KEY = '28409097-bdffd10554a2c77d4883d4778';
const BASE_URL = 'https://pixabay.com/api/';

// parameters for query
const queryParams = {
  key: '28409097-bdffd10554a2c77d4883d4778',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

export function fetchImage(query) {
  const URL = `${BASE_URL}?q=${query}`;

  return axios
    .get(URL, { params: queryParams })
    .then(response => {
      console.log('response', response.data.hits);
      return response.data.hits;
    })
    .catch(console.error);
}
