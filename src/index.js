import galleryCards from './templates/card.hbs';
//import { fetchImage } from './js/fetch-images';
import PicturesAPIService from './js/pictures-api-service';
//import axios from 'axios';
import LoadMoreBtn from './js/load-more';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  //loadBtn: document.querySelector('.load-more'),
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
  //console.log(searchQueryValue);
  picturesAPIService.resetPage();
  clearGallery();
  loadMoreBtn.show();

  //loadMoreBtn.disable();
  //const response = await picturesAPIService.fetchImages();
  //loadMoreBtn.enable();
  //appendImagesMarkup(response);
  fetchImg();
};

refs.form.addEventListener('submit', onFormSubmit);
//refs.loadBtn.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', fetchImg);

//refs.loadBtn.addEventListener('click', () => console.log('click'));
//async function onLoadMore() {
//  //loadMoreBtn.disable();
//  //const response = await picturesAPIService.fetchImages();
//  //loadMoreBtn.enable();
//  //appendImagesMarkup(response);
//  fetchImg();
//}

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
  appendImagesMarkup(response);
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
