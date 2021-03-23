import './styles.css';
import cardTemplate from './templates/imageCard.hbs';

import ImagesApiService from './js/apiService';

import { noImagesMessage, noMoreImagesMessage } from './js/notifications';

import refs from './js/getRefs';


const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  imagesApiService.searchQuery = refs.input.value;
  if (refs.searchForm.elements.query.value === '') {
    refs.gallery.innerHTML = '';
    return;
    }
  refs.gallery.innerHTML = '';
  imagesApiService.resetPage();

  refs.searchForm.reset();

  imagesApiService.fetchImages().then(hits => {
    if (hits.length === 0) {
      noImagesMessage();
      return;
    }
    updateImageMarkup(hits);
    refs.loadBtn.classList.remove('is-hidden');
    refs.loadAllBtn.classList.add('is-hidden');
    refs.inputWrap.classList.add('blk-wrap');
    refs.btnWrap.classList.add('blk-wrap');
    scrollingWindow();
  });
});

function updateImageMarkup (hits) {
    const markup = cardTemplate(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

refs.loadBtn.addEventListener('click', () => {
  imagesApiService.fetchImages().then(hits => {
    if (hits.length === 0) {
      noMoreImagesMessage();
      return;
    }
    updateImageMarkup(hits);
    refs.loadBtn.classList.remove('is-hidden');
    refs.loadAllBtn.classList.add('is-hidden');
    refs.inputWrap.classList.add('blk-wrap');
    refs.btnWrap.classList.add('blk-wrap');
    scrollingWindow();
  });
});

refs.loadAllBtn.addEventListener('click', () => {
  imagesApiService.fetchImages().then(hits => {
    if (hits.length === 0) {
      noMoreImagesMessage();
      return;
    }
    updateImageMarkup(hits);
    refs.loadAllBtn.classList.add('is-hidden');
    refs.loadBtn.classList.remove('is-hidden');
    refs.inputWrap.classList.add('blk-wrap');
    refs.btnWrap.classList.add('blk-wrap');
    scrollingWindow();
  });
});

function scrollingWindow() {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
}