import axios from 'axios';

export default class PicturesAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/';
    const URL = `${BASE_URL}?q=${this.searchQuery}&page=${this.page}`;

    // parameters for query

    const queryParams = {
      key: '28409097-bdffd10554a2c77d4883d4778',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
    };

    return axios
      .get(URL, { params: queryParams })
      .then(response => {
        console.log('response', response.data.hits);
        this.incrementPage();
        return response.data.hits;
      })
      .catch(console.error);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
