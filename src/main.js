import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImagesByQuery } from './js/pixabay-api';
import { renderImagesCards } from './js/render-functions';

const formEl = document.querySelector('.form-gallery');
const inputEl = document.querySelector('.form-gallery-input');
const loaderEl = document.querySelector('.loader');
const galleryListEl = document.querySelector('.gallery-list');

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  galleryListEl.innerHTML = '';
  loaderEl.classList.remove('visually-hidden');

  const inputValue = inputEl.value.trim().toLowerCase();
  if (inputValue === '') {
    loaderEl.classList.add('visually-hidden');
    return;
  }
  searchImagesByQuery(inputValue)
    .then(images => {
      loaderEl.classList.add('visually-hidden');
      if (images.hits.length === 0) {
        iziToast.error({
          maxWidth: '370px',
          position: 'topRight',
          messageColor: 'white',
          backgroundColor: 'red',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        loaderEl.classList.add('visually-hidden');
        renderImagesCards(images, galleryListEl);
      }
    })
    .catch(error => {
      loaderEl.classList.add('visually-hidden');
      iziToast.error({
        maxWidth: '370px',
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: ' Sorry, there was an error connecting to the server!',
      });
      console.error(error);
    })
    .finally(() => {
      inputEl.value = '';
      event.target.reset();
    });
}
