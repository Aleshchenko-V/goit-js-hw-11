import galleryCards from './templates/card.hbs';
import PicturesAPIService from './js/pictures-api-service';
import LoadMoreBtn from './js/load-more';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
const picturesAPIService = new PicturesAPIService();

const onFormSubmit = async e => {
  e.preventDefault();
  picturesAPIService.query = e.currentTarget.elements.searchQuery.value;
  // restrict to itput empty string
  if (picturesAPIService.query.trim() === '') {
    return;
  }

  picturesAPIService.resetPage();
  clearGallery();
  loadMoreBtn.show();

  fetchImg();
};

refs.form.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', fetchImg);

function appendImagesMarkup(images) {
  refs.galleryEl.insertAdjacentHTML('beforeend', galleryCards(images));
}

function clearGallery() {
  refs.galleryEl.innerHTML = '';
}

async function fetchImg() {
  loadMoreBtn.disable();
  const response = await picturesAPIService.fetchImages();
  loadMoreBtn.enable();
  const amountOfPictures = picturesAPIService.page * response.data.hits.length;
  console.log(amountOfPictures);
  if (amountOfPictures - 40 > response.data.totalHits) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtn.hide();
    return;
  } else if (amountOfPictures === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.hide();
  }
  appendImagesMarkup(response.data.hits);
  const lightbox = new SimpleLightbox('.gallery a');
}
